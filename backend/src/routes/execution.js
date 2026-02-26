const express = require('express');
const router = express.Router();
const pool = require('../db/postgres');
const Assignment = require('../models/Assignment');
const { getSQLHint } = require('../services/llmService');

// Middleware to validate read-only SELECT queries
const validateReadOnly = (req, res, next) => {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: { message: 'No query provided' } });

    const normalizedQuery = query.trim().toUpperCase();

    // Strict check: Must start with SELECT or WITH (for CTEs)
    if (!normalizedQuery.startsWith('SELECT') && !normalizedQuery.startsWith('WITH')) {
        return res.status(403).json({
            error: { message: 'Unauthorized query type. Only SELECT statements are allowed.' }
        });
    }

    // Block destructive keywords
    const forbidden = [
        'INSERT', 'UPDATE', 'DELETE', 'DROP', 'ALTER', 'TRUNCATE',
        'CREATE', 'GRANT', 'REVOKE', 'COPY', 'CALL', 'EXECUTE'
    ];

    for (const keyword of forbidden) {
        const regex = new RegExp(`\\b${keyword}\\b`, 'i');
        if (regex.test(query)) {
            return res.status(403).json({
                error: { message: `Query contains forbidden keyword: ${keyword}` }
            });
        }
    }

    // Block multiple statements
    if (query.includes(';')) {
        const parts = query.split(';').filter(p => p.trim().length > 0);
        if (parts.length > 1) {
            return res.status(403).json({ error: { message: 'Multiple SQL statements are not allowed.' } });
        }
    }

    next();
};

// Execute query
router.post('/', validateReadOnly, async (req, res) => {
    const { query } = req.body;
    const client = await pool.connect();
    try {
        // Set statement timeout for safety
        await client.query("SET LOCAL statement_timeout = '5000ms'");
        const result = await client.query(query);
        res.json({
            columns: result.fields.map(f => f.name),
            rows: result.rows,
            rowCount: result.rowCount,
        });
    } catch (error) {
        res.status(400).json({
            error: {
                message: error.message,
                code: error.code,
                hint: error.hint,
            },
        });
    } finally {
        client.release();
    }
});

// Get hint
router.post('/hint', async (req, res) => {
    const { assignmentId, query, errorMessage } = req.body;
    try {
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ error: { message: 'Assignment not found' } });
        }

        // Fetch schema for context
        const schema = [];
        for (const tableName of assignment.relatedTables) {
            const colRes = await pool.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = $1
      `, [tableName]);
            schema.push({ table: tableName, columns: colRes.rows });
        }

        const hint = await getSQLHint({
            question: assignment.question,
            schema,
            query,
            errorMessage,
        });

        res.json({ hint });
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
});

module.exports = router;

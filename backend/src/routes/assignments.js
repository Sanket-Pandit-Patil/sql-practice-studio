const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const pool = require('../db/postgres');

// Get all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find({}, 'title difficulty description');
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
});

// Get single assignment with schema and sample data
router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ error: { message: 'Assignment not found' } });
        }

        // Fetch schema and sample data for related tables
        const tableData = [];
        for (const tableName of assignment.relatedTables) {
            // 1. Get columns
            const columnRes = await pool.query(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = $1
        ORDER BY ordinal_position
      `, [tableName]);

            // 2. Get sample rows
            const sampleRes = await pool.query(`SELECT * FROM ${tableName} LIMIT 10`);

            tableData.push({
                name: tableName,
                columns: columnRes.rows,
                sampleRows: sampleRes.rows,
            });
        }

        res.json({
            assignment,
            tables: tableData,
        });
    } catch (error) {
        res.status(500).json({ error: { message: error.message } });
    }
});

module.exports = router;

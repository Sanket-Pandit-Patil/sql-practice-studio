const express = require('express');
const router = express.Router();
const Attempt = require('../models/Attempt');
const auth = require('../middleware/auth');

// Save a new attempt (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { assignmentId, query, isCorrect, error } = req.body;
        const attempt = new Attempt({
            user: req.user.id,
            assignment: assignmentId,
            query,
            isCorrect,
            error
        });
        await attempt.save();
        res.status(201).json(attempt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's history for a specific assignment
router.get('/:assignmentId', auth, async (req, res) => {
    try {
        const attempts = await Attempt.find({
            user: req.user.id,
            assignment: req.params.assignmentId
        }).sort({ timestamp: -1 });
        res.json(attempts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user's overall progress (grouped by assignment)
router.get('/progress/summary', auth, async (req, res) => {
    try {
        const progress = await Attempt.aggregate([
            { $match: { user: req.user.id, isCorrect: true } },
            { $group: { _id: '$assignment', totalCorrect: { $sum: 1 } } }
        ]);
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

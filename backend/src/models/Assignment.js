const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    difficulty: {
        type: String,
        enum: ['Basic', 'Intermediate', 'Advanced'],
        default: 'Basic',
    },
    description: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    relatedTables: [{
        type: String, // e.g., ['employees', 'departments']
    }],
    solution: {
        type: String, // Reference for internal use (optional)
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Assignment', assignmentSchema);

const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: String, // Or ObjectId if we linked to Users, but simple string is fine for now
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    source: {
        type: String,
        default: 'Website'
        // Removed enum to allow flexible sources from seed data
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Converted', 'Lost'],
        default: 'New'
    },
    notes: [NoteSchema],
    followUpDate: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Lead', LeadSchema);
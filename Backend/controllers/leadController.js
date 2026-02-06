const Lead = require('../models/Lead.js');

// @route   POST api/leads
// @desc    Create a new lead (Public usually, or protected depending on implementation)
// @access  Public
exports.createLead = async (req, res) => {
    try {
        const { name, email, source } = req.body;
        const newLead = new Lead({ name, email, source }); // status defaults to New
        const lead = await newLead.save();
        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/leads
// @desc    Get all leads
// @access  Private
exports.getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   GET api/leads/:id
// @desc    Get lead by ID
// @access  Private
exports.getLead = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ msg: 'Lead not found' });
        res.json(lead);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Lead not found' });
        res.status(500).send('Server Error');
    }
};

// @route   PUT api/leads/:id
// @desc    Update lead status or details
// @access  Private
exports.updateLead = async (req, res) => {
    const { name, email, source, status, followUpDate } = req.body;

    // Build lead object
    const leadFields = {};
    if (name) leadFields.name = name;
    if (email) leadFields.email = email;
    if (source) leadFields.source = source;
    if (status) leadFields.status = status;
    if (followUpDate) leadFields.followUpDate = followUpDate;

    try {
        let lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        lead = await Lead.findByIdAndUpdate(req.params.id, { $set: leadFields }, { new: true });
        res.json(lead);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   DELETE api/leads/:id
// @desc    Delete lead
// @access  Private
exports.deleteLead = async (req, res) => {
    try {
        let lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        await Lead.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Lead removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @route   POST api/leads/:id/notes
// @desc    Add a note to a lead
// @access  Private
exports.addNote = async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ msg: 'Lead not found' });

        const newNote = {
            text: req.body.text,
            author: 'Admin', // In a real app, req.user.name from auth middleware
            date: new Date()
        };

        lead.notes.unshift(newNote);
        await lead.save();
        res.json(lead.notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
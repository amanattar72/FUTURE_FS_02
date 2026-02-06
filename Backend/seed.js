const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lead = require('./models/Lead');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const mockLeads = [
    {
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        status: 'New',
        source: 'Website',
        notes: [{ text: 'Interested in the premium plan', author: 'System', date: new Date() }]
    },
    {
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        status: 'Contacted',
        source: 'Referral',
        notes: [{ text: 'Called on Monday, asked to call back', author: 'System', date: new Date() }]
    },
    {
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        status: 'Converted',
        source: 'LinkedIn',
        notes: [{ text: 'Signed the contract!', author: 'System', date: new Date() }]
    },
    {
        name: 'Guy Hawkins',
        email: 'guy.hawkins@example.com',
        status: 'New',
        source: 'Twitter',
    },
    {
        name: 'Devon Lane',
        email: 'devon.lane@example.com',
        status: 'Lost',
        source: 'Email Campaign',
    },
    {
        name: 'Courtney Henry',
        email: 'courtney.henry@example.com',
        status: 'Contacted',
        source: 'Website',
    },
    {
        name: 'Arlene McCoy',
        email: 'arlene.mccoy@example.com',
        status: 'Converted',
        source: 'Referral',
    },
    {
        name: 'Kristin Watson',
        email: 'kristin.watson@example.com',
        status: 'New',
        source: 'Facebook',
    }
];

const seedData = async () => {
    try {
        await Lead.deleteMany(); // Clear existing data
        console.log('Data destroyed...');

        await Lead.insertMany(mockLeads);
        console.log('Data Imported!');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
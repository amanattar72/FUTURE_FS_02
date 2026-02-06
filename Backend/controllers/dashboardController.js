const Lead = require('../models/Lead.js');

exports.getStats = async (req, res) => {
    try {
        const totalLeads = await Lead.countDocuments();

        // Count by status
        const newLeads = await Lead.countDocuments({ status: 'New' });
        const contacted = await Lead.countDocuments({ status: 'Contacted' });
        const converted = await Lead.countDocuments({ status: 'Converted' });
        const lost = await Lead.countDocuments({ status: 'Lost' });

        // Calculate some "mock" metrics based on real counts
        const conversionRate = totalLeads > 0 ? ((converted / totalLeads) * 100).toFixed(1) : 0;

        // Mock revenue: assume each converted lead is worth $1200 on average roughly
        const revenue = converted * 1200;

        res.json([
            {
                id: 1,
                title: 'Total Leads',
                value: totalLeads.toString(),
                type: 'increase',
                change: '+12%' // visual mock 
            },
            {
                id: 2,
                title: 'Conversion Rate',
                value: `${conversionRate}%`,
                type: 'increase',
                change: '+2.1%'
            },
            {
                id: 3,
                title: 'Estimated Revenue',
                value: `$${revenue.toLocaleString()}`,
                type: 'increase',
                change: '+8.5%'
            },
            {
                id: 4,
                title: 'Active Leads',
                value: (newLeads + contacted).toString(),
                type: 'neutral',
                change: 'Stable'
            }
        ]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
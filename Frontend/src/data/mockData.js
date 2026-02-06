export const mockStats = [
    { id: 1, title: 'Total Leads', value: '12,345', change: '+12%', type: 'increase' },
    { id: 2, title: 'New Leads', value: '145', change: '+5%', type: 'increase' },
    { id: 3, title: 'Contacted', value: '8,234', change: '-2%', type: 'decrease' },
    { id: 4, title: 'Converted', value: '4,567', change: '+8%', type: 'increase' },
];

export const mockLeads = [
    { id: 1, name: 'Jane Cooper', email: 'jane.cooper@example.com', source: 'Website', status: 'New', lastContact: '2 days ago' },
    { id: 2, name: 'Cody Fisher', email: 'cody.fisher@example.com', source: 'Ads', status: 'Contacted', lastContact: '1 day ago' },
    { id: 3, name: 'Esther Howard', email: 'esther.howard@example.com', source: 'Email', status: 'Converted', lastContact: '5 days ago' },
    { id: 4, name: 'Jenny Wilson', email: 'jenny.wilson@example.com', source: 'Website', status: 'New', lastContact: 'Just now' },
    { id: 5, name: 'Kristin Watson', email: 'kristin.watson@example.com', source: 'Ads', status: 'New', lastContact: '3 days ago' },
];

export const mockNotes = [
    { id: 1, leadId: 1, text: 'Initial inquiry about pricing.', date: '2023-10-27' },
    { id: 2, leadId: 1, text: 'Sent brochure via email.', date: '2023-10-28' }
];
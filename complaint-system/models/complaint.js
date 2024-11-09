// models/Complaint.js
const mongoose = require('mongoose');

// Define the schema for a complaint
const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the complaint
    description: { type: String, required: true }, // Detailed description
    status: { type: String, default: 'Pending' }, // Status of the complaint (e.g., Pending, Resolved)
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the complaint was created
});

// Export the model
module.exports = mongoose.model('Complaint', complaintSchema);


// routes/complaints.js
const express = require('express');
const router = express.Router();
const Complaint = require('../models/complaint');

// Create a new complaint
router.post('/', async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();
        res.status(201).send(complaint);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.status(200).send(complaints);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a specific complaint by ID
router.get('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).send();
        }
        res.status(200).send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a complaint
router.patch('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!complaint) {
            return res.status(404).send();
        }
        res.status(200).send(complaint);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a complaint
router.delete('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) {
            return res.status(404).send();
        }
        res.status(200).send(complaint);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/test', (req, res) => {
    res.send('Complaints route is working');
});

module.exports = router;

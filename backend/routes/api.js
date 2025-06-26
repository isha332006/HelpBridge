const Donation = require('../models/Donation');
const express = require('express');
const router = express.Router();
const Report = require('../models/Report');
const Volunteer = require('../models/Volunteer');

router.post('/report', async (req, res) => {
  console.log("✅ Disaster report received:", req.body);
  try {
    const newReport = new Report(req.body);
    await newReport.save();
    res.status(201).json({ message: '✅ Report submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/volunteer', async (req, res) => {
  console.log("✅ Volunteer received:", req.body);
  try {
    const newVolunteer = new Volunteer(req.body);
    await newVolunteer.save();
    res.status(201).json({ message: '✅ Volunteer registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

// Add a new donation
router.post('/donate', async (req, res) => {
  try {
    const donation = new Donation({ amount: req.body.amount });
    await donation.save();
    res.status(201).json({ message: "✅ Donation successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total donated amount
router.get('/donations/total', async (req, res) => {
  try {
    const total = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    res.json({ total: total[0]?.total || 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

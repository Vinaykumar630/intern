const express = require('express');
const router = express.Router();
const TrackingModel = require('../models/TrackingModel');

router.post('/add', async (req, res) => {
  try {
    // Implement admin functionality to add tracking information
    const trackingData = req.body;
    const trackingId = await TrackingModel.createTracking(trackingData);

    res.status(201).json({ id: trackingId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/update/:trackingNumber', async (req, res) => {
  try {
    // Implement admin functionality to update tracking information
    const { trackingNumber } = req.params;
    const trackingData = req.body;

    // Ensure the tracking number exists before updating
    const existingTracking = await TrackingModel.getTrackingByNumber(trackingNumber);
    if (!existingTracking) {
      return res.status(404).send('Tracking information not found');
    }

    await TrackingModel.updateTracking(trackingNumber, trackingData);

    res.status(200).send('Tracking information updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/delete/:trackingNumber', async (req, res) => {
  try {
    // Implement admin functionality to delete tracking information
    const { trackingNumber } = req.params;

    await TrackingModel.deleteTracking(trackingNumber);

    res.status(200).send('Tracking information deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

import express from 'express';
import Trip from '../models/Trip.js';
import { callFlowise } from '../utils/flowiseAPI.js';

const router = express.Router();

router.post('/plan-trip', async (req, res) => {
  try {
    console.log('Received trip planning request:', req.body);
    const tripInput = req.body;
    
    console.log('Calling Flowise API...');
    const flowiseResult = await callFlowise(tripInput);
    console.log('Flowise result:', flowiseResult);
    
    const trip = new Trip({
      input: tripInput,
      ...flowiseResult
    });
    
    console.log('Saving trip to database...');
    await trip.save();
    console.log('Trip saved successfully:', trip._id);
    
    res.json(trip);
  } catch (error) {
    console.error('Error in plan-trip route:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/trips/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) return res.status(404).json({ error: 'Trip not found' });

    // Transform transport data to ensure consistent format for frontend
    if (trip.transport && Array.isArray(trip.transport)) {
      trip.transport = trip.transport.map(transport => {
        // If it has old format (recommendedMode), transform to new format
        if (transport.recommendedMode) {
          return {
            type: transport.recommendedMode.charAt(0).toUpperCase() + transport.recommendedMode.slice(1),
            description: transport.notes || `${transport.from} to ${transport.to} transfer`,
            estimatedCost: transport.currency ? `${transport.currency} ${transport.approxCost}` : `₹${transport.approxCost || 'N/A'}`
          };
        }
        // If already in new format, return as is
        return transport;
      });
    }

    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
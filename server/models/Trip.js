import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  userId: String,
  input: {
    origin: String,
    destination: String,
    startDate: String,
    endDate: String,
    numDays: Number,
    budgetLevel: String,
    travellersType: String
  },
  summary: String,
  flights: [Object],
  hotels: [Object],
  transport: [Object],
  poi: [Object],
  itinerary: [Object]
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema);
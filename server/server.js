import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tripRoutes from './routes/trips.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'https://intelligent-trip-planner.vercel.app', 'https://intelligent-trip-planner-git-main-ahamed-atheep-ks-projects.vercel.app', 'https://intelligent-trip-planner-ginbk8gl6-ahamed-atheep-ks-projects.vercel.app']
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', tripRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

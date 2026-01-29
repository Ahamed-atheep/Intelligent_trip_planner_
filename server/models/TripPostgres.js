// Alternative Trip model for PostgreSQL
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export const createTrip = async (tripData) => {
  const query = `
    INSERT INTO trips (input, summary, flights, hotels, transport, poi, itinerary, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
    RETURNING *
  `;
  const values = [
    JSON.stringify(tripData.input),
    tripData.summary,
    JSON.stringify(tripData.flights),
    JSON.stringify(tripData.hotels),
    JSON.stringify(tripData.transport),
    JSON.stringify(tripData.poi),
    JSON.stringify(tripData.itinerary)
  ];
  
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const getTrip = async (id) => {
  const query = 'SELECT * FROM trips WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};
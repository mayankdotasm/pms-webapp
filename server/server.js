//server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();

// Middleware
app.use(express.json());

// Routes
import viewRecordsRoutes from './routes/viewRecordsRoutes.js';
app.use("/viewRecords", viewRecordsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went really wrong",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import Routes
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected Successfully ✅"))
    .catch(err => console.log("Database Connection Error ❌:", err));

// Use Routes
app.use('/api/tasks', taskRoutes);

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('Sprint-Sync Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is sprinting on port ${PORT}`);
});
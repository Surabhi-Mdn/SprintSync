require('dotenv').config(); // 1. Load environment variables first!
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 2. Import your routes
// const taskRoutes = require('./routes/taskRoutes');

const app = express();

// 3. Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Allow the server to read JSON in the request body

// 4. Connect to MongoDB using the variable from .env
const URI = process.env.MONGO_URI;
mongoose.connect(URI)
    .then(() => console.log("Database connection established! ✅"))
    .catch(err => console.log("Database connection error: ", err));

// 5. Use the routes
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
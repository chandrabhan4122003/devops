const connectDB = require("./config/db");
connectDB();

const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config({path: "../.env"});

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
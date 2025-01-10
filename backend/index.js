import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
    origin: [
        "*"
    ],
    credentials: true,
};

// Database connection
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB database connected");
    } catch (err) {
        console.log("MongoDB database connection failed:", err);
    }
};

// Testing endpoint
app.get("/", (req, res) => {
    res.send("API is working");
});

// Debugging Middleware: Log incoming requests
app.use((req, res, next) => {
    console.log(`[DEBUG] Incoming request from ${req.headers.origin}`);
    console.log(`[DEBUG] Request URL: ${req.url}`);
    console.log(`[DEBUG] Request Method: ${req.method}`);
    next();
});

// Middleware
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Debugging Middleware: Log response status
app.use((req, res, next) => {
    res.on("finish", () => {
        console.log(`[DEBUG] Response status: ${res.statusCode}`);
    });
    next();
});

// Error handling middleware (log errors)
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    res.status(500).send("Internal Server Error");
});

// Start server
app.listen(port, () => {
    connect();
    console.log("Server listening on port", port);
});

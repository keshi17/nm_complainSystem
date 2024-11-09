const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const complaintRoutes = require('./routes/complaints');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(express.static('frontend')); 
app.use('/complaints', complaintRoutes); // Use complaint routes// Use complaint routes

// MongoDB connection string (replace with your actual connection string)
const mongoURI = "mongodb+srv://bharath_9803:bharath9803@cluster0.nzb5u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(error => console.log("MongoDB connection error:", error));

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

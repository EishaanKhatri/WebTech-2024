// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const twilio = require('twilio');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define User schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    otp: String,
    verified: Boolean
});

const User = mongoose.model('User', userSchema);

// Initialize Twilio client
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Endpoint for user sign up
app.post('/signup', async (req, res) => {
    const { name, phone } = req.body;

    // Generate random OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        // Save user data to database
        const newUser = new User({ name, phone, otp, verified: false });
        await newUser.save();

        // Send OTP to user's phone
        await client.messages.create({
            body: `Your OTP for phone verification is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        res.status(200).json({ message: 'OTP sent for verification' });
    } catch (err) {
        console.error('Error in sign up:', err);
        res.status(500).json({ message: 'Error signing up user' });
    }
});

// Endpoint for OTP verification and user login
app.post('/verify', async (req, res) => {
    const { phone, otp } = req.body;

    try {
        // Find user by phone number and OTP
        const user = await User.findOne({ phone, otp });

        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Update user verification status
        user.verified = true;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (err) {
        console.error('Error in OTP verification:', err);
        res.status(500).json({ message: 'Error verifying OTP' });
    }
});

// Endpoint for user login
app.post('/login', async (req, res) => {
    const { phone } = req.body;

    try {
        // Find user by phone number
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.verified) {
            return res.status(401).json({ message: 'Phone number not verified' });
        }

        // Redirect to welcome page or return JWT token for authorization
        res.status(200).json({ message: 'Login successful. Redirecting to welcome page...' });
    } catch (err) {
        console.error('Error in login:', err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

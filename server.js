require("dotenv").config();
const express = require("express");
const cors = require("cors");
const twilio = require("twilio");

const app = express();

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: "*", // In production, replace with your actual domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Serve static files
app.use(express.static(".")); // This will serve HTML files from current directory

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Store verification codes (in production, use a proper database)
const verificationCodes = new Map();

// Generate random 6-digit code
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send verification code
app.post("/api/send-code", async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: "Phone number is required",
      });
    }

    // Generate a new verification code
    const code = generateCode();

    // Store the code
    verificationCodes.set(phoneNumber, {
      code,
      timestamp: Date.now(),
    });

    try {
      // Send real SMS using Twilio
      await twilioClient.messages.create({
        body: `Your verification code is: ${code}. Valid for 5 minutes.`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      res.json({
        success: true,
        message: "Verification code sent to your phone",
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError);
      res.status(500).json({
        success: false,
        message: "Failed to send SMS. Please try again.",
      });
    }
  } catch (error) {
    console.error("Error sending code:", error);
    res.status(500).json({
      success: false,
      message: "Error sending verification code",
    });
  }
});

// Verify code
app.post("/api/verify-code", (req, res) => {
  try {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      return res.status(400).json({
        success: false,
        message: "Phone number and code are required",
      });
    }

    // Get stored code data
    const storedData = verificationCodes.get(phoneNumber);

    if (!storedData) {
      return res.status(400).json({
        success: false,
        message: "No verification code found. Please request a new code.",
      });
    }

    // Check if code is expired (5 minutes)
    const now = Date.now();
    if (now - storedData.timestamp > 5 * 60 * 1000) {
      verificationCodes.delete(phoneNumber);
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    if (storedData.code === code) {
      // Clear the code after successful verification
      verificationCodes.delete(phoneNumber);
      res.json({
        success: true,
        message: "Phone number verified successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying code",
    });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Make sure you have set up your Twilio credentials in .env file`);
  console.log(`Test the server: http://localhost:${PORT}/health`);
  console.log(
    "Note: SMS will be sent in production mode. Check your Twilio account for delivery status."
  );
});

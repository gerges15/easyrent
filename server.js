const express = require("express");
// server.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/process-payment", async (req, res) => {
  try {
    const { paymentMethodId, amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    res.json({
      success: true,
      transactionId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message || "Payment processing failed",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:3000", // أو نطاقك
    methods: ["POST"],
  })
);

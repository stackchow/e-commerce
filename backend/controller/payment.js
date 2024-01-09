const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require("dotenv").config({
  path: "config/.env",
});
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await paystack.transaction.initialize({ // Initiate payment
      email: req.body.email,
      amount: req.body.amount,
      currency: "NGN",
      metadata: {
        company: "Stackchow",
      },
    });

    res.status(200).json({
      data: myPayment.data,
      success: true,
    });
  })
);

// Verify payments

router.get(
  "/paystackPk",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ paystackPk: process.env.PAYSTACK_API_KEY });
  })
);

module.exports = router;
const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Order = require("../model/order");
require("dotenv").config({
  path: "config/.env",
});
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const {email, amount, paymentInfo} = req.body;

    const initPayment = await paystack.transaction.initialize({ // Initiate payment
      email, 
      amount,
      currency: "NGN",
      metadata: {
        company: "Stackchow"
      },
    });

    res.status(200).json({
      data: initPayment.data,
      status: initPayment.status
    });
    next();
  })
);

// Verify payments

router.get('/verify-payment', (req, res) => {
  const verifyTrans = catchAsyncErrors(async (req, res) => {
    const response = await paystack.transaction.verify({
      reference: user.paystack_ref
    });
    return response
  });

})

router.get(
  "/paystackPk",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ paystackPk: process.env.PAYSTACK_API_KEY });
  })
);

module.exports = router;
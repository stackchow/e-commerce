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
    const {email, amount} = req.body;

    const initPayment = await paystack.transaction.initialize({ // Initiate payment
      email, 
      amount,
      currency: "NGN",
      metadata: {
        company: "Stackchow"
      },
    });

    const paymentInfo = {
      type: "Pay with paystack",
      paystack_ref: initPayment.data.reference
    };

    res.status(200).json({
      data: initPayment.data,
      status: initPayment.status,
      paymentInfo,
    });
    next();
  })
);

// Verify payments

router.get('/verify-payment/:id',
  // catchAsyncErrors()
  async (req, res) => {
    try {
      
      const ref = req.params.id;
      const response = await paystack.transaction.verify({
        reference: ref
      });

      res.status(200).json({
        response,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
);

module.exports = router;
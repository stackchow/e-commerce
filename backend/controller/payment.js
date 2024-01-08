const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { response } = require("../app");
require("dotenv").config({
  path: "config/.env",
});
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    console.log("payment/process route");
    const myPayment = await paystack.transaction.initialize({ // Paystack instead
      email: req.body.email,
      amount: req.body.amount,
      currency: "NGN",
      metadata: {
        company: "Stackchow",
      },
    });

    // const data = {
    //   paystack_ref: response.data.reference,
    // };
    res.status(200).json({
      data: myPayment.data,
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripeapikey",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApikey: process.env.PAYSTACK_API_KEY });
  })
);


module.exports = router;
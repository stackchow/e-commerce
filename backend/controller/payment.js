const express = require("express");
const https = require("https");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require("dotenv").config({
  path: "config/.env",
});
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const { email, amount } = req.body;

    const initPayment = await paystack.transaction.initialize({
      // Initiate payment
      email,
      amount,
      currency: "NGN",
      metadata: {
        company: "Stackchow",
      },
    });

    const paymentInfo = {
      type: "Pay with paystack",
      paystack_ref: initPayment.data.reference,
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
router.get("/verifyPayment/:reference", async (req, res) => {
  const reference = req.params.reference;
  try {
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: `/transaction/verify/${reference}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    };

    const apiReq = https.request(options, (apiRes) => {
      let data = "";

      apiRes.on("data", (chunk) => {
        data += chunk;
      });

      apiRes.on("end", () => {
        const parsedData = JSON.parse(data);
        console.log(parsedData.data?.status)
        return res.status(200).send(parsedData);
      });
    });

    apiReq.on("error", (error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    });

    // End the request
    apiReq.end();
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
});

module.exports = router;

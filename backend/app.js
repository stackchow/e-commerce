const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json({ limit: "100mb" }));
app.use(cookieParser());
app.use("/test", (req, res) => {
  res.send("Hello world!");
});

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }));

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// import routes
const user = require("./routes/userRoutes");
const shop = require("./routes/shopRoutes");
const product = require("./routes/productRoutes");
const event = require("./routes/eventRoutes");
const coupon = require("./routes/couponCodeRoutes");
const payment = require("./controller/payment");
const order = require("./routes/orderRoutes");
const conversation = require("./routes/conversationRoutes");
const message = require("./routes/messageRoutes");
const withdraw = require("./routes/withdrawRoutes");

app.use("/api/v1/user", user);
app.use("/api/v1/conversation", conversation);
app.use("/api/v1/message", message);
app.use("/api/v1/order", order);
app.use("/api/v1/shop", shop);
app.use("/api/v1/product", product);
app.use("/api/v1/event", event);
app.use("/api/v1/coupon", coupon);
app.use("/api/v1/payment", payment);
app.use("/api/v1/withdraw", withdraw);

// it's for ErrorHandling
app.use(ErrorHandler);

module.exports = app;

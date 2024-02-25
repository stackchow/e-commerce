import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../src/server";

const HomePage = () => {
  const [orderData, setOrderData] = useState([]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const paystackPaymentSuccessful = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const latestOrder = JSON.parse(localStorage.getItem("latestOrder"))
      const reference = latestOrder?.paymentRef
      const verifyPayment = await axios.get(
        `${server}/payment/verifyPayment/${reference}`
      );

      const order = {
        cart: orderData?.cart,
        shippingAddress: orderData?.shippingAddress,
        user: user && user,
        totalPrice: orderData?.totalPrice,
        paymentInfo: {
          type: "Paystack payment",
          reference: orderData?.paymentRef,
          status: verifyPayment?.data.status,
        },
      };

      const res = await axios.post(
        `${server}/order/create-order`,
        order,
        config
      );
      console.log(res);

      navigate("/order/success");
      toast.success("Order successful!");
      localStorage.setItem("cartItems", JSON.stringify([]));
      localStorage.setItem("latestOrder", JSON.stringify(res.data));
      window.location.reload();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  const location = useLocation();
  const paymentQueryParam = new URLSearchParams(location.search).get("payment");

  useEffect(() => {
    if (paymentQueryParam === "successful") {
      paystackPaymentSuccessful().then(alert("Payment successful!"));
    }
  }, [paymentQueryParam]);

  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Sponsored />
      <Footer />
    </div>
  );
};

export default HomePage;

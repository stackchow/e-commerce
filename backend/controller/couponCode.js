const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const couponCode = require("../model/couponCode");

// create coupoun code
const createNewCoupon = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const csCouponCodeExists = await couponCode.find({
        name: req.body.name,
      });

      if (csCouponCodeExists.length !== 0) {
        return next(new ErrorHandler("Coupoun code already exists!", 400));
      }

      const couponCode = await couponCode.create(req.body);

      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

// get all coupons of a shop
const getShopCoupons =   catchAsyncErrors(
  async (req, res, next) => {
    try {
      const couponCodes = await couponCode.find({ shopId: req.seller.id });
      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

// delete coupoun code of a shop
const deleteCouponById = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const couponCode = await couponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Coupon code dosen't exists!", 400));
      }
      res.status(201).json({
        success: true,
        message: "Coupon code deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

// get coupon code value by its name
const getCouponByName = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const couponCode = await couponCode.findOne({ name: req.params.name });

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

module.exports = {
  createNewCoupon,
  getShopCoupons,
  deleteCouponById,
  getCouponByName
};

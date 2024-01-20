const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
const cloudinary = require("cloudinary").v2;
const ErrorHandler = require("../utils/ErrorHandler");

// create product
const createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid!", 400));
    } else {
      let images = [];
      let video;

      if (typeof req.body.images === "string") {
        images.push(req.body.images);
      } else {
        images = req.body.images;
      }

      if (typeof req.body.video === "string") {
        video = req.body.video;
      } else {
        return;
      }

      const imagesLinks = [];
      let videoLink;

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      const resultVid = await cloudinary.uploader.upload(video, {
        resource_type: "video",
        folder: "products/videos",
      });

      videoLink = {
        public_id: resultVid.public_id,
        url: resultVid.secure_url,
      };

      const productData = req.body;
      productData.images = imagesLinks;
      productData.video = videoLink;
      productData.shop = shop;

      const product = await Product.create(productData);

      res.status(201).json({
        success: true,
        product,
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 400));
  }
});

// get all products of a shop
const getAllProductsByShop = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// delete product of a shop
const delShopProductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }

    for (let i = 0; i < product.images.length; i++) {
      const result = await cloudinary.uploader.destroy(
        product.images[i].public_id
      );
    }

    await Product.findByIdAndDelete(productId);

    res.status(201).json({
      success: true,
      message: "Product Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all products
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// review for a product
const createNewReview = catchAsyncErrors(async (req, res, next) => {
  try {
    const { user, rating, comment, productId, orderId } = req.body;

    const product = await Product.findById(productId);

    const review = {
      user,
      rating,
      comment,
      productId,
    };

    const isReviewed = product.reviews.find(
      (rev) => rev.user._id === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user._id === req.user._id) {
          (rev.rating = rating), (rev.comment = comment), (rev.user = user);
        }
      });
    } else {
      product.reviews.push(review);
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    await Order.findByIdAndUpdate(
      orderId,
      { $set: { "cart.$[elem].isReviewed": true } },
      { arrayFilters: [{ "elem._id": productId }], new: true }
    );

    res.status(200).json({
      success: true,
      message: "Reviwed succesfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// all products --- for admin
const adminGetAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.status(201).json({
      success: true,
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

module.exports = {
  createProduct,
  getAllProductsByShop,
  delShopProductById,
  getAllProducts,
  createNewReview,
  adminGetAllProducts,
};

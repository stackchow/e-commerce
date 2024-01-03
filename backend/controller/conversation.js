const Conversation = require("../model/conversation");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// create a new conversation
const createNewConvo = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { groupTitle, userId, sellerId } = req.body;
  
      const isConversationExist = await Conversation.findOne({ groupTitle });
  
      if (isConversationExist) {
        const conversation = isConversationExist;
        res.status(201).json({
          success: true,
          conversation,
        });
      } else {
        const conversation = await Conversation.create({
          members: [userId, sellerId],
          groupTitle: groupTitle,
        });
  
        res.status(201).json({
          success: true,
          conversation,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.response.message), 500);
    }
  }
);

// get seller conversations
const getAllConvoSellerById = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  }
);

// get user conversations
const getAllConvoUserById = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const conversations = await Conversation.find({
        members: {
          $in: [req.params.id],
        },
      }).sort({ updatedAt: -1, createdAt: -1 });

      res.status(201).json({
        success: true,
        conversations,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  }
);

// update the last message
const updateLastMesById = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const { lastMessage, lastMessageId } = req.body;

      const conversation = await Conversation.findByIdAndUpdate(req.params.id, {
        lastMessage,
        lastMessageId,
      });

      res.status(201).json({
        success: true,
        conversation,
      });
    } catch (error) {
      return next(new ErrorHandler(error), 500);
    }
  }
);

module.exports = {
  createNewConvo,
  getAllConvoSellerById,
  getAllConvoUserById,
  updateLastMesById
};

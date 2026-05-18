import User  from "../models/User.js"
import { HTTP_STATUS, MESSAGES }  from "../config/constants.js"

const getAllUsers= async (req, res, next) => {
    try {
      const users = await User.find().select("-password");
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  };

const getUserById= async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id).select("-password");
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.NOT_FOUND,
        });
      }
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

const createUser= async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const newUser = new User({ name, email, password });
      await newUser.save();
      res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User created successfully",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  };

const updateUser= async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.NOT_FOUND,
        });
      }
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

const deleteUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          success: false,
          message: MESSAGES.NOT_FOUND,
        });
      }
      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

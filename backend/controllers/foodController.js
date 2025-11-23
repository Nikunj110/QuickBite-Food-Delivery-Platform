import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";
import fs from "fs";

// add food items
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      await food.save();
      res.json({ success: true, message: "Food Added" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      
      if (!food) {
        return res.json({ success: false, message: "Food item not found" });
      }

      // Remove image file
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log("Error deleting image file:", err);
      });

      // Delete the food item
      await foodModel.findByIdAndDelete(req.body.id);

      // Clean up cart items from all users
      try {
        // Remove the food item from all users' cartData
        await userModel.updateMany(
          { "cartData": { $exists: true } },
          { $unset: { [`cartData.${req.body.id}`]: 1 } }
        );
      } catch (cartError) {
        console.log("Cart cleanup error:", cartError.message);
      }

      // Clean up orders containing this food item
      try {
        const orderModel = (await import("../models/orderModel.js")).default;
        if (orderModel) {
          // Remove the food item from all orders
          await orderModel.updateMany(
            { "items.foodId": req.body.id },
            { $pull: { items: { foodId: req.body.id } } }
          );
          
          // Remove orders that now have no items
          await orderModel.deleteMany({ items: { $size: 0 } });
        }
      } catch (orderError) {
        console.log("Order cleanup skipped:", orderError.message);
      }

      res.json({ success: true, message: "Food Removed Successfully" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error removing food item" });
  }
};

export { addFood, listFood, removeFood };

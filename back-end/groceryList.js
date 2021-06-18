const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const { isBoolean } = require('util');
const User = users.model;
const validUser = users.valid;

const groceryItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  text: String,
  isPurchased: Boolean

});

groceryItemSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

groceryItemSchema.methods.toJSON = function() {
  var obj = this.toObject();
  return obj;
}

const GroceryItem = mongoose.model('GroceryItem', groceryItemSchema);

// create new item
router.post("/", validUser, async (req, res) => {
  if (!req.body.text)
    return res.status(400).send({
      message: "An item description is required"
    });
  
  const groceryItem = new GroceryItem({
    user: req.user,
    text: req.body.text,
    isPurchased: req.body.isPurchased
  });

  try {
    await groceryItem.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/:id", validUser, async (req, res) => {
  if (typeof req.body.isPurchased === "undefined" )
    return res.status(400).send({
      message: "An item isPurchased identifier is required"
    });

  try {
    let groceryItem = await GroceryItem.findOne({
      _id: req.params.id
    });
    groceryItem.isPurchased = req.body.isPurchased;
    await groceryItem.save();
    return res.send(groceryItem);
  }catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my groceryItems
router.get("/", validUser, async (req, res) => {
  // return grocery items
  try {
    let groceryItems = await GroceryItem.find({
      user: req.user 
    }).sort({
      created: -1
    }).populate('user');
    return res.send(groceryItems);
  }catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/all", async (req, res) => {
  try {
    let groceryItems = await GroceryItem.find().sort({
      created: -1
    }).populate('user');
    return res.send(groceryItems);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
})

// get specific grocery Item
router.get("/:id", async (req, res) => {
  try {
    let groceryItem = await GroceryItem.findOne({
      _id: req.params.id
    })
    return res.send(groceryItem);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// delete specific grocery Item
router.delete("/:id", validUser, async (req, res) => {
  try {
    await GroceryItem.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// delete purchased grocery Items
router.delete("/many", validUser, async (req, res) => {
  try {
    await GroceryItem.deleteMany(
      { isPurchased : { $ne : [true]}}
    );
    return res.sendStatus(200);
  }catch(error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  model: GroceryItem,
  routes: router,
}
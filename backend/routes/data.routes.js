const express = require("express");
const verifyUser = require("../middleware/verifyUser");
const Data = require("../models/Data");
const router = express.Router();

router.post("/createData", verifyUser, async (req, res) => {
  try {
    const { category, keyPoints, image, content, isPublic } = req.body;
    let addData = await Data.create({
      category,
      keyPoints,
      image,
      content,
      isPublic,
      user: req.user._id,
    });
    res.send(addData);
  } catch (error) {
    res.send("Error");
  }
});
router.post("/deleteData/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await Data.findById(id);
    console.log(id, notes._id.toString());
    if (notes) {
      if (notes._id.toString() == id) {
        await Data.findByIdAndDelete(id);
        return res.send({ message: "Deleted sucessfully", success: true });
      }
      return res.send({ message: "Invalid", success: false });
    }
    return res.send({ message: "Error", success: false });
  } catch (error) {
    res.send({ message: error, success: false });
  }
});
router.post("/editData/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    let notes = await Data.findById(id);
    if (notes) {
      const { category, keyPoints, image, content, isPublic } = req.body;
      const saved = {
        category,
        keyPoints,
        image,
        content,
        isPublic,
      };
      notes = await Data.findByIdAndUpdate(id, { $set: saved }, { new: true });
      return res.send({ message: "Edited sucessfully", success: true });
    }
    return res.send({ message: "Invalid", success: false });
  } catch (error) {
    res.send(error);
  }
});
router.post("/fetchPublicData", async (req, res) => {
  let data = await Data.find({ isPublic: false });
  res.send(data);
});
router.get("/fetchUserData", verifyUser, async (req, res) => {
  try {
    let data = await Data.find({ user: req.user._id });
    res.send(data);
  } catch (error) {
    res.send("Failde");
  }
});
router.get("/fetchParticularData/:id", verifyUser, async (req, res) => {
  try {
    const { id } = req.params;
    let data = await Data.findById(id);
    res.send(data);
  } catch (error) {
    res.send({ message: error });
  }
});
router.get("/fetchPublicData", async (req, res) => {
  try {
    let data = await Data.find({ isPublic: true });
    res.send(data);
  } catch (error) {
    res.send({ message: error });
  }
});
router.get("/fetchParticularPublicData/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let data = await Data.findById(id);
    res.send(data);
  } catch (error) {
    res.send({ message: error });
  }
});
module.exports = router;

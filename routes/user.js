const express = require("express");
const { User } = require("../models");
const { authenticate } = require("../middlewares/auth");
const router = new express.Router();

router.post("/users", authenticate, async (req, res) => {
  try {
    const {
      userId,
      name,
      addressLines,
      postalTown,
      postalCode,
      country,
      dateOfBirth,
      email,
      phoneNumber,
      accountStatus,
      signupTime,
    } = req.body;
    const newUser = await User.create({
      userId,
      name,
      addressLines,
      postalTown,
      postalCode,
      country,
      dateOfBirth,
      email,
      phoneNumber,
      accountStatus,
      signupTime,
      customerId: req.customer.customerId,
    });
    res
      .status(201)
      .json({ message: "User submitted successfully", data: newUser });
  } catch (error) {
    console.error("Error submitting user:", error);
    res
      .status(500)
      .json({ message: "Error submitting user", error: error.message });
  }
});

router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await User.findAll({
      where: { customerId: req.customer.customerId },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
});

module.exports = router;

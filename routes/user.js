const express = require("express");
const { User } = require("../models");
const { authenticate } = require("../middlewares/auth");
const router = new express.Router();
const { Op } = require("sequelize");

router.post("/users", authenticate, async (req, res) => {
  try {
    const {
      user_id,
      signup_time,
      name,
      address_lines,
      postal_area,
      postal_code,
      country,
      email,
      phone_number,
      account_status,
      date_of_birth,
      customer_id,
    } = req.body;
    const newUser = await User.create({
      id: Date.now() + Math.random(),
      user_id,
      signup_time,
      name,
      address_lines,
      postal_area,
      postal_code,
      country,
      email,
      phone_number,
      account_status,
      date_of_birth,
      customer_id,
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
    const customerId = req.customer.customer_id; // Ensure this value is correct
    const users = await User.findAll({
      where: { customer_id: { [Op.eq]: customerId } },
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

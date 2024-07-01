const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Customer } = require("../models");
const { JWT_SECRET } = require("../utils/constants");
const router = new express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    const customer = await Customer.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ customerId: customer.customerId }, JWT_SECRET);
    res.status(201).send({ customer, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      throw new Error("Invalid login credentials");
    }
    const token = jwt.sign({ customerId: customer.customerId }, JWT_SECRET);
    res.send({ customer, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;

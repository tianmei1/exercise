const express = require("express");
const { Alert } = require("../models");
const { authenticate } = require("../middlewares/auth");
const router = new express.Router();

router.get("/alerts", authenticate, async (req, res) => {
  try {
    const alerts = await Alert.findAll({
      include: [
        { model: User, where: { customerId: req.customer.customerId } },
      ],
    });
    res.status(200).json(alerts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving alerts", error: error.message });
  }
});

module.exports = router;

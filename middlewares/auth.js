const jwt = require("jsonwebtoken");
const { Customer } = require("../models");
const { JWT_SECRET } = require("../utils/constants");

module.exports = {
  authenticate: async (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "");
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const customer = await Customer.findByPk(decoded.customerId);
      if (!customer) {
        throw new Error();
      }
      req.customer = customer;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authenticate." });
    }
  },
};

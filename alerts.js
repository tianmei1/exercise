const { Sequelize, DataTypes, Op } = require("sequelize");
const axios = require("axios");
const { User, Alert } = require("./models");
const { PROHIBITED_POSTCODES } = require("./utils/constants");
const { isValidEmail } = require("./utils/emailValidator");

const THRESHOLD_AGE = 18;

// Replace with actual credentials
const credentials = {
  email: "customer@example.com",
  password: "password123",
};

// Function to register and login customer
async function login() {
  try {
    const response = await axios.post(
      "http://localhost:3000/login",
      credentials
    );
    return response.data;
  } catch (error) {
    console.error(
      "Login failed:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
}

async function fetchData() {
  const customerData = await login();
  console.log("Customer Data:", customerData.customer.customerId);

  try {
    const users = await User.findAll({
      where: { customer_id: { [Op.eq]: customerData.customer.customerId } },
    });
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    return [];
  }
}

function analyzeData(users) {
  const alerts = [];
  const currentDate = new Date();

  users.forEach((user) => {
    if (!user.user_id) {
      return false;
    }
    const age =
      currentDate.getFullYear() - new Date(user.date_of_birth).getFullYear();
    if (age < THRESHOLD_AGE) {
      alerts.push({
        user_id: user.user_id,
        type: "Age Alert",
        message: `User ${user.name} is under 18 years old.`,
      });
    }
    if (PROHIBITED_POSTCODES.includes(user.postal_code.substring(0, 2))) {
      alerts.push({
        user_id: user.user_id,
        type: "Prohibited Postal Code",
        message: `User ${user.name} is from a prohibited postal code: ${user.postal_code}.`,
      });
    }
    if (!isValidEmail(user.email)) {
      alerts.push({
        user_id: user.user_id,
        type: "Invalid Email",
        message: `User ${user.name} has an invalid email address: ${user.email}.`,
      });
    }
  });

  return alerts;
}

async function storeAlerts(alerts) {
  for (const alert of alerts) {
    try {
      console.log(alert);
      await Alert.create(alert);
    } catch (error) {
      console.error("Failed to store alert:", error.message);
    }
  }
}

async function processDataAndAlert() {
  const users = await fetchData();
  if (users.length === 0) {
    console.error("No users fetched");
    return;
  }

  const alerts = analyzeData(users);
  if (alerts.length) {
    await storeAlerts(alerts);
  }
}

// Schedule this function to run periodically (e.g., using cron or a task scheduler)
processDataAndAlert();

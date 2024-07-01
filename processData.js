const { Sequelize, DataTypes, Op } = require("sequelize");
const { User, Alert } = require("./models");
const { PROHIBITED_POSTCODES } = require("./utils/constants");
const { isValidEmail } = require("./utils/emailValidator");

const THRESHOLD_AGE = 18;

async function fetchData() {
  const users = await User.findAll({
    where: { accountStatus: { [Op.contains]: ["active"] } },
  });
  return users;
}

function analyzeData(users) {
  const alerts = [];
  const currentDate = new Date();

  users.forEach((user) => {
    const age =
      currentDate.getFullYear() - new Date(user.dateOfBirth).getFullYear();
    if (age < THRESHOLD_AGE) {
      alerts.push({
        userId: user.userId,
        type: "Age Alert",
        message: `User ${user.name} is under 18 years old.`,
      });
    }
    if (PROHIBITED_POSTCODES.includes(user.postalCode.substring(0, 2))) {
      alerts.push({
        userId: user.userId,
        type: "Prohibited Postal Code",
        message: `User ${user.name} is from a prohibited postal code: ${user.postalCode}.`,
      });
    }
    if (!isValidEmail(user.email)) {
      alerts.push({
        userId: user.userId,
        type: "Invalid Email",
        message: `User ${user.name} has an invalid email address: ${user.email}.`,
      });
    }
  });

  return alerts;
}

async function storeAlerts(alerts) {
  for (const alert of alerts) {
    await Alert.create(alert);
  }
}

async function processDataAndAlert() {
  const users = await fetchData();
  const alerts = analyzeData(users);
  if (alerts.length) {
    await storeAlerts(alerts);
  }
}

// Schedule this function to run periodically (e.g., using cron or a task scheduler)
processDataAndAlert();

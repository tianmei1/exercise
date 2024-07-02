const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});

const User = require("./user")(sequelize, DataTypes);
const Customer = require("./customer")(sequelize, DataTypes);
const Alert = require("./alert")(sequelize, DataTypes);

Customer.hasMany(User, { foreignKey: "customer_id" });
User.belongsTo(Customer, { foreignKey: "customer_id" });
User.hasMany(Alert, { foreignKey: "user_id" });
Alert.belongsTo(User, { foreignKey: "user_id" });

sequelize.sync(); // Sync the database

module.exports = { sequelize, User, Customer, Alert };

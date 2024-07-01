const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data.db",
});

const User = require("./user")(sequelize, DataTypes);
const Customer = require("./customer")(sequelize, DataTypes);
const Alert = require("./alert")(sequelize, DataTypes);

Customer.hasMany(User, { foreignKey: "customerId" });
User.belongsTo(Customer, { foreignKey: "customerId" });
User.hasMany(Alert, { foreignKey: "userId" });
Alert.belongsTo(User, { foreignKey: "userId" });

sequelize.sync(); // Sync the database

module.exports = { sequelize, User, Customer, Alert };

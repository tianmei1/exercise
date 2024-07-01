module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Alert",
    {
      alertId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: { type: DataTypes.STRING, allowNull: false },
      type: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.STRING, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Customer",
    {
      customerId: {
        type: DataTypes.UUID, // Use UUID for a unique identifier
        defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};

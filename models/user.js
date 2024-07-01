module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      userId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
      name: { type: DataTypes.STRING, allowNull: false },
      addressLines: { type: DataTypes.JSON, allowNull: false },
      postalTown: { type: DataTypes.STRING, allowNull: false },
      postalCode: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      dateOfBirth: { type: DataTypes.DATE, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.STRING, allowNull: false },
      accountStatus: { type: DataTypes.JSON, allowNull: false },
      signupTime: { type: DataTypes.DATE, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};

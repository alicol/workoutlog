module.exports = (sequelize, DataTypes) => {
  const Logg = sequelize.define("logg", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    definition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner: {
      type: DataTypes.INTEGER,
    },
  });
  return Logg;
};

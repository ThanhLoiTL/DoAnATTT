'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'role',
        allowNull: false
      });
      User.belongsTo(models.Position, {
        foreignKey: 'position',
        allowNull: false
      });
      User.belongsTo(models.Label, {
        foreignKey: 'label',
        allowNull: false
      });
      User.hasMany(models.Job, {
        foreignKey: 'job',
        onDelete: "cascade"
      });
      User.hasMany(models.Report, {
        foreignKey: 'report',
        onDelete: "cascade"
      });
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    role: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    label: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
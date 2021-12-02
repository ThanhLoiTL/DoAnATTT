'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Label extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Label.hasMany(models.Contract, {
                foreignKey: 'label',
                onDelete: "cascade"
            });
            Label.hasMany(models.Partner, {
                foreignKey: 'label',
                onDelete: "cascade"
            });
            Label.hasMany(models.Project, {
                foreignKey: 'label',
                onDelete: "cascade"
            });
            Label.hasMany(models.User, {
                foreignKey: 'label',
                onDelete: "cascade"
            });
            Label.hasMany(models.Report, {
                foreignKey: 'label',
                onDelete: "cascade"
            });
        }
    };
    Label.init({
        name: DataTypes.STRING,
        value: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Label',
    });
    return Label;
};
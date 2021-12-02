'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Report extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Report.belongsTo(models.User, {
                foreignKey: 'user',
                allowNull: false
            });
            Report.belongsTo(models.Label, {
                foreignKey: 'label',
                allowNull: false
            });
        }
    };
    Report.init({
        user: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        label: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Report',
    });
    return Report;
};
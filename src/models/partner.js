'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Partner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Partner.belongsTo(models.Lable, {
                foreignKey: 'label',
                allowNull: false
            });
        }
    };
    Partner.init({
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        label: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Partner',
    });
    return Partner;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Contract extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Contract.belongsTo(models.Lable, {
                foreignKey: 'label',
                allowNull: false
            });
        }
    };
    Contract.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        label: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Contract',
    });
    return Contract;
};
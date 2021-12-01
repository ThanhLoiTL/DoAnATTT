'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Job extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Job.belongsTo(models.User, {
                foreignKey: 'user',
                allowNull: false
            });
        }
    };
    Job.init({
        name: DataTypes.STRING,
        user: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Job',
    });
    return Job;
};
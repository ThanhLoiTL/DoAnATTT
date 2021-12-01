'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Project extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Project.belongsTo(models.Role, {
                foreignKey: 'role',
                allowNull: false
            });
            Project.belongsTo(models.Label, {
                foreignKey: 'label',
                allowNull: false
            });
        }
    };
    Project.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        label: DataTypes.INTEGER,
        role: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Project',
    });
    return Project;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Auction extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Auction.belongsTo(models.Banner, {
                foreignKey: 'bannerId',
                allowNull: false
            });
            Auction.belongsToMany(models.User, {
                through: 'AuctionUser',
                foreignKey: 'userId'
            })
        }
    };
    Auction.init({
        timeStart: DataTypes.TIME,
        timeEnd: DataTypes.TIME,
        date: DataTypes.DATE,
        auctionMoney: DataTypes.BIGINT,
        bannerId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Auction',
    });
    return Auction;
};
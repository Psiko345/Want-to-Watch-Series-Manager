"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tvShows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  tvShows.init(
    {
      seriesUUID: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "tvShows"
    }
  );
  return tvShows;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  var future = sequelize.define('future', {
    rId: DataTypes.STRING,
    title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    source_url: DataTypes.STRING,
    img_url: DataTypes.STRING,
    publisher: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });
  future.associate = function(models){
    models.future.belongsTo(models.user);
  }
  return future;
};
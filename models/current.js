'use strict';
module.exports = (sequelize, DataTypes) => {
  var current = sequelize.define('current', {
    rId: DataTypes.STRING,
    title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    source_url: DataTypes.STRING,
    img_url: DataTypes.STRING,
    publisher: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    directions: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    user_img: DataTypes.STRING
  });
  current.associate = function(models){
    models.current.belongsTo(models.user);
  }
  return current;
};
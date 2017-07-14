'use strict';
module.exports = function(sequelize, DataTypes) {
  var snippetTags = sequelize.define('snippetTags', {
    tagId: DataTypes.INTEGER,
    snippetId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return snippetTags;
};

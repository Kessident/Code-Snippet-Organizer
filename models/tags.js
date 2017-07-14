'use strict';
module.exports = function(sequelize, DataTypes) {
  var tags = sequelize.define('tags', {
    name: DataTypes.STRING
  }, {});

  tags.associate = function (models) {
    tags.belongsToMany(models.snippets, {through:"snippet-tags", foreignKey:"tagId"});
  };
  return tags;
};

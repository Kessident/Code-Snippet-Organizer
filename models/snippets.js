'use strict';
module.exports = function(sequelize, DataTypes) {
  var snippets = sequelize.define('snippets', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    notes: DataTypes.STRING,
    language: DataTypes.STRING
  }, {});

  snippets.associate = function (models) {
    snippets.belongsToMany(models.tags, {through:"snippet-tags", foreignKey:"snippetId"});
  };
  return snippets;
};

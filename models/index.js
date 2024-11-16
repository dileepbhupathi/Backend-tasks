const db = require('./connection');
const { DataTypes } = require('sequelize');

const schemas = {
    user: require('./schema/User')(db, DataTypes),
    collection: require('./schema/Collection')(db, DataTypes),
    recommendation: require('./schema/Recommendation')(db, DataTypes)
}

schemas.user.hasMany(schemas.collection, { foreignKey: 'user_id', as: 'collections' });
schemas.collection.belongsTo(schemas.user, { foreignKey: 'user_id', onDelete: 'CASCADE' });
schemas.collection.hasMany(schemas.recommendation, { foreignKey: 'collection_id', as: 'recommendations' });
schemas.recommendation.belongsTo(schemas.collection, { foreignKey: 'collection_id', onDelete: 'CASCADE' });

module.exports = schemas;

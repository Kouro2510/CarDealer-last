'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Image.belongsTo(models.User, { foreignKey: 'user_id' });
            Image.belongsTo(models.Brand, { foreignKey: 'brand_id' });
            Image.belongsTo(models.Category, { foreignKey: 'cat_id' });

            Image.belongsTo(models.Product, {
                foreignKey: 'product_id',
            });

            Image.hasMany(models.ProductOrder, {
                foreignKey: 'product_id',
            });
        }
    }
    Image.init(
        {

            photo: DataTypes.BLOB,
        },
        {
            sequelize,
            modelName: 'Image',
        },
    );
    return Image;
};

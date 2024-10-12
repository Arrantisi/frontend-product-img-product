import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Product from "./productModel.js";

const ImgProduct = sequelize.define('ImgProduct', {
    img_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

Product.hasOne(ImgProduct, {
    foreignKey: 'productId' // Pastikan untuk menetapkan foreign key jika perlu
});
ImgProduct.belongsTo(Product, {
    foreignKey: 'productId'
});

export default ImgProduct;
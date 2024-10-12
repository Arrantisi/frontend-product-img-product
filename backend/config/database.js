import { Sequelize } from "sequelize";

const sequelize = new Sequelize('product_db', "root", null, {
    dialect: 'mysql',
    host: "localhost"
});

export default sequelize;
const { Sequelize } = require('sequelize');

let sequelize;
const psqlConfig = {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    options: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        schema: "public",
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
            }
        },
        logging: false,
    }
};

(()=> {
    try {
        sequelize = new Sequelize(psqlConfig.database, psqlConfig.user, psqlConfig.password, psqlConfig.options);
        (async () => {
            await sequelize.authenticate();
            await sequelize.sync({ alter: true });
            console.log('SQL Connection has been established successfully...');
        })()
    } catch (error) {
        console.error('SQL Unable to connect to the database:', error);
    }
})()

module.exports = sequelize

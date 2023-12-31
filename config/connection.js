//! This file contains the configuration to connect to the data base.

const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize; 

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: '127.0.0.1', //!<--- "127.0.0.1" or "localhost"
            dialect: 'mysql',
            // dialectOptions: {
            //     socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
            //   },
            port: 3306
        }
        );
};

module.exports = sequelize;
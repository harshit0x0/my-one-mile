import { Sequelize } from "sequelize";
import * as tedious from 'tedious';

const { DB_NAME: database, DB_USERNAME: username, DB_PASSWORD: password, DB_HOST: host } = process.env;
if (database == null || username == null || password == null || host == null) {
    throw new Error('DB config not set');
}
// export const db = new Sequelize(database, username, password, { dialect: 'mssql', dialectModule: tedious, host: host });

//mysql
export const db = new Sequelize('myonemile', 'root', process.env.LOCAL_DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    dialectModule: require('mysql2')
});



export async function test() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test();
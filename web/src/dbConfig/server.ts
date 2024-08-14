import { Sequelize } from "sequelize";
import * as tedious from 'tedious';
const { DB_NAME: database, DB_USERNAME: username, DB_PASSWORD: password, DB_HOST: host } = process.env;
if (database == null || username == null || password == null || host == null) {
    throw new Error('DB config not set');
}
export const db = new Sequelize(database, username, password, { dialect: 'mssql', dialectModule: tedious, host: host });

async function test() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        // console.log(database, username, password);
        console.error('Unable to connect to the database:', error);
    }
}
test();
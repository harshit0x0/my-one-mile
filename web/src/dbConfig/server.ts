import { Sequelize } from "sequelize";
const { DB_NAME: database, DB_USERNAME: username, DB_PASSWORD: password } = process.env;
export const db = new Sequelize({ database, username, password, dialect: 'mssql' });

async function test() {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
test();
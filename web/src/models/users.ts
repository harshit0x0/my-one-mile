import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';
import { v4 as uuidv4 } from 'uuid';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: string;
    name: CreationOptional<string>;
    email: string;
    password: string;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
    timestamps: false
});
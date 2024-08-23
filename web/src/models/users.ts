import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: string;
    name: CreationOptional<string>;
    email: string;
    password: string;
    role_id: number;
    dob: Date | null;
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
    },
    role_id: {
        type: DataTypes.NUMBER,
    },
    dob: {
        type: DataTypes.DATE,
    }
}, {
    tableName: 'users',
    createdAt: true,
    updatedAt: false,
});

export interface UserType {
    id: string;
    name: string | null;
    email: string;
    password: string;
    createdAt: Date;
    location: string | null;
    dob: Date | null;
    role_id: number;
}
import { Model, InferAttributes, InferCreationAttributes, DataTypes } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    role_id: number;
    role: string;
}

export const Role = sequelize.define<RoleModel>('Role', {
    role_id: {
        primaryKey: true,
        type: DataTypes.NUMBER
    },
    role: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'roles',
    createdAt: false,
    updatedAt: false,
});

export interface RoleType {
    id: number;
    name: string;
}
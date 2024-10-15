import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

export interface ActivityStatusModel extends Model<InferAttributes<ActivityStatusModel>, InferCreationAttributes<ActivityStatusModel>> {
    status_id: number;
    status: string;
}

export const ActivityStatus = sequelize.define<ActivityStatusModel>('ActivityStatus', {
    status_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'activity_statuses',
    createdAt: false,
    updatedAt: false,
});
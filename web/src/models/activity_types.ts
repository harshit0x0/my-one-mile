import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

export interface ActivityTypeModel extends Model<InferAttributes<ActivityTypeModel>, InferCreationAttributes<ActivityTypeModel>> {
    type_id: number;
    type: string;
}

export const ActivityType = sequelize.define<ActivityTypeModel>('ActivityType', {
    type_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'activity_types',
    createdAt: false,
    updatedAt: false,
});

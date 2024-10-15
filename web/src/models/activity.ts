import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import { User } from './users';
import { Location } from './location';
import { ActivityType } from './activity_types';
import { ActivityStatus } from './activity_status';
import { db as sequelize } from '../dbConfig/server';

export interface ActivityModel extends Model<InferAttributes<ActivityModel>, InferCreationAttributes<ActivityModel>> {
    activity_id: string,
    type_id: number;
    status_id: number;
    location: string;
    description: string;
    title: string;
    createdBy: string;
    createdAt: Date;
}

export const Activity = sequelize.define<ActivityModel>('Activity', {
    activity_id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
    },
    type_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ActivityType,
            key: 'type_id',
        },
    },
    status_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ActivityStatus,
            key: 'status_id',
        },
    },
    location: {
        type: DataTypes.STRING,
        references: {
            model: Location,
            key: 'location_id',
        },
    },
    description: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.STRING,
    },
    createdBy: {
        type: DataTypes.UUIDV4,
        references: {
            model: User,
            key: 'id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
    },
}, {
    tableName: 'activities',
    createdAt: true,
    updatedAt: false,
});


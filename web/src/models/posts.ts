import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';
import { User } from './users';
import { Activity } from './activity';
import { ActivityStatus } from './activity_status';

export interface PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
    post_id: string;
    likes: number;
    data: string;
    user_id: string;
    activity_id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    status_id: number;
}

DataTypes.DATE.prototype._stringify = function _stringify(date: Date, options: any) { return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS'); };

export const Post = sequelize.define<PostModel>('Post', {
    post_id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
    },
    likes: {
        type: DataTypes.INTEGER,
    },
    data: {
        type: DataTypes.TEXT,
    },
    user_id: {
        type: DataTypes.UUIDV4,
        references: {
            model: User,
            key: 'id',
        },
    },
    activity_id: {
        type: DataTypes.UUIDV4,
        references: {
            model: Activity,
            key: 'activity_id',
        },
    },
    title: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
    status_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ActivityStatus,
            key: 'status_id',
        },
    },
}, {
    tableName: 'posts',
    createdAt: true,
    updatedAt: true,
});
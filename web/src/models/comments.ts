import { DataTypes } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';
import { Post } from './posts';
import { CommentStatus } from './comment_status';
import { InferCreationAttributes, InferAttributes, Model } from 'sequelize';

DataTypes.DATE.prototype._stringify = function _stringify(date: Date, options: any) { return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS'); };

export interface CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
    comment_id: string;
    likes: number;
    data: string;
    post_id: string;
    reply_id: string | null;
    created_by: string;
    createdAt: Date;
    updatedAt: Date;
    status_id: number;
}

export const Comment = sequelize.define<CommentModel>('Comment', {
    comment_id: {
        primaryKey: true,
        type: DataTypes.UUIDV4,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    data: {
        type: DataTypes.TEXT,
    },
    post_id: {
        type: DataTypes.UUIDV4,
        references: {
            model: Post,
            key: 'post_id',
        },
        onDelete: 'CASCADE',
    },
    reply_id: {
        type: DataTypes.UUIDV4,
        allowNull: true, // Null means it's not a reply, but a direct comment on the post
        references: {
            model: 'Comment',
            key: 'comment_id',
        },
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_by: {
        type: DataTypes.UUIDV4,
        references: {
            model: 'User',
            key: 'id',
        },
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status_id: {
        type: DataTypes.INTEGER,
        references: {
            model: CommentStatus,
            key: 'status_id',
        },
    },
}, {
    tableName: 'comments',
    timestamps: true, // Enables createdAt and updatedAt automatically
});


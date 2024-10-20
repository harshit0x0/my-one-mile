import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

interface CommentStatusModel extends Model<InferAttributes<CommentStatusModel>, InferCreationAttributes<CommentStatusModel>> {
    status_id: number;
    status: string;
}

export const CommentStatus = sequelize.define<CommentStatusModel>('CommentStatus', {
    status_id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'comment_statuses',
    createdAt: false,
    updatedAt: false,
});
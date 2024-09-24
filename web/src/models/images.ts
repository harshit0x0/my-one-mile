import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';
import { db as sequelize } from '../dbConfig/server';

interface ImageModel extends Model<InferAttributes<ImageModel>, InferCreationAttributes<ImageModel>> {
    image_id: string;
    url: CreationOptional<string>;
}

export const Image = sequelize.define<ImageModel>('Image', {
    image_id: {
        primaryKey: true,
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'images',
    createdAt: false,
    updatedAt: false,
});

export interface ImageType {
    image_id: string;
    url: string;
}
import { db as sequelize } from "../dbConfig/server";
import { InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";

interface LocationModel extends Model<InferAttributes<LocationModel>, InferCreationAttributes<LocationModel>> {
    id: string;
    city: string | null;
    state: string | null;
    country: string | null;
}

export const Location = sequelize.define('Location', {
    id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    country: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'locations',
    createdAt: false,
    updatedAt: false,
}
);
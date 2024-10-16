import { db as sequelize } from "../dbConfig/server";
import { InferAttributes, InferCreationAttributes, Model, DataTypes } from "sequelize";
import { Activity } from "./activity";

interface LocationModel extends Model<InferAttributes<LocationModel>, InferCreationAttributes<LocationModel>> {
    location_id: string;
    block: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
}

export type LocationType = {
    location_id: string;
    block: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
}

const Location = sequelize.define<LocationModel>('Location', {
    location_id: {
        primaryKey: true,
        type: DataTypes.STRING
    },
    block: {
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
    tableName: 'location',
    createdAt: false,
    updatedAt: false,
}
);
export { Location };
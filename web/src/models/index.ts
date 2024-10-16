import { Location } from "./location";
import { Activity } from "./activity";


Location.hasMany(Activity, { foreignKey: 'location', onDelete: 'cascade' });
Activity.belongsTo(Location, { foreignKey: 'location' });

export { Location, Activity };
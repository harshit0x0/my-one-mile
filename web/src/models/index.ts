import { Location } from "./location";
import { Activity } from "./activity";
import { Post } from "./posts";
import { User } from "./users";

User.hasMany(Activity, { foreignKey: 'createdBy' });
Activity.belongsTo(User, { foreignKey: 'createdBy' });

Location.hasMany(Activity, { foreignKey: 'location', onDelete: 'cascade' });
Activity.belongsTo(Location, { foreignKey: 'location' });

Activity.hasOne(Post, { foreignKey: 'activity_id', onDelete: 'cascade' });
Post.belongsTo(Activity, { foreignKey: 'activity_id' });

User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'cascade' });
Post.belongsTo(User, { foreignKey: 'user_id' });


export { Location, Activity, Post, User };
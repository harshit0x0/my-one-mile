import { Location } from "./location";
import { Activity } from "./activity";
import { Post } from "./posts";
import { User } from "./users";
import { Comment } from "./comments";

User.hasMany(Activity, { foreignKey: 'createdBy' });
Activity.belongsTo(User, { foreignKey: 'createdBy' });

Location.hasMany(Activity, { foreignKey: 'location', onDelete: 'cascade' });
Activity.belongsTo(Location, { foreignKey: 'location' });

Activity.hasOne(Post, { foreignKey: 'activity_id', onDelete: 'cascade' });
Post.belongsTo(Activity, { foreignKey: 'activity_id' });

User.hasMany(Post, { foreignKey: 'user_id', onDelete: 'cascade' });
Post.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'created_by', onDelete: 'cascade' });
Comment.belongsTo(User, { foreignKey: 'created_by' });

// Post.hasMany(Comment, { foreignKey: 'post_id', onDelete: 'cascade' });
// Comment.belongsTo(Post, { foreignKey: 'post_id' });

// Comment.hasMany(Comment, { foreignKey: 'reply_id', onDelete: 'cascade' });
// Comment.belongsTo(Comment, { foreignKey: 'reply_id' });

export { Location, Activity, Post, User, Comment };
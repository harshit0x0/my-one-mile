import { ActivityModel } from '@/src/models/activity';

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];


export default function ActivityItem({ activity }: { activity: ActivityModel }) {
    const getStatusColor = (status: number): string => {
        switch (status) {
            case 1: return 'bg-yellow-500';
            case 2: return 'bg-green-500';
            case 3: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    return (
        <div className="mb-4 p-4 bg-secondary rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg hover:scale-101">
            <h3 className="text-lg font-semibold text-primary mb-2">{activity.title}</h3>
            <p className="text-text mb-2">Location: {activity.location}</p>
            <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(activity.status_id)}`}>
                    {activityStatuses[activity.status_id - 1]}
                </span>
                <span className="text-sm text-secondary_accent">{activityTypes[activity.type_id - 1]}</span>
            </div>
        </div>
    );
};
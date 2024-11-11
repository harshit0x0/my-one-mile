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
        <div className="mb-4 p-4 bg-secondary rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-lg hover:bg-secondary_accent">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-semibold text-background mb-2">{activity.title}</h2>
                <div className="flex space-x-3 mb-3">
                    <span className="text-sm max-h-8 px-2 py-1 bg-white text-secondary_accent">{activityTypes[activity.type_id - 1]}</span>
                    <span className={`px-2 max-h-8 py-1 rounded text-xs text-white ${getStatusColor(activity.status_id)}`}>
                        {activityStatuses[activity.status_id - 1]}
                    </span>
                </div>

            </div>
            <div className="flex justify-between">
                <p className="text-text mb-2">Location: {activity.location}</p>
                {/* @ts-ignore */}
                <div className='font-semibold'> -{activity.User.name}</div>
            </div>
            <div className='font-bold text-text'>{activity.createdAt.toString()}</div>
        </div >
    );
};
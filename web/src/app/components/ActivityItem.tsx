import { ActivityModel } from '@/src/models/activity';

const activityTypes = ['issue', 'appreciation', 'emergency'];
const activityStatuses = ['pending', 'resolved', 'ignored'];
import moment from 'moment';

export default function ActivityItem({ activity }: { activity: ActivityModel }) {
    const getStatusColor = (status: number): string => {
        switch (status) {
            case 1: return 'bg-yellow-500';
            case 2: return 'bg-green-500';
            case 3: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };
    const getActivityColor = (type: number): string => {
        switch (type) {
            case 1: return 'bg-red-500';
            case 2: return 'bg-green-500';
            case 3: return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    }

    return (
        <div className="mb-4 py-2 px-4 bg-secondary rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-lg hover:bg-secondary_accent">
            <div className='flex justify-between'>
                <h2 className="text-lg md:text-xl font-bold text-text mt-1 mb-2">{activity.title}</h2>
                <div className="flex space-x-3 mb-3">
                    <span className={`max-h-8 px-2 py-1 text-xs rounded-xl text-white ${getActivityColor(activity.type_id)} text-secondary_accent`}>{activityTypes[activity.type_id - 1]}</span>
                    <span className={`px-2 max-h-8 py-1 rounded-xl text-xs text-white ${getStatusColor(activity.status_id)}`}>
                        {activityStatuses[activity.status_id - 1]}
                    </span>
                </div>
            </div>
            <p className='text-text_accent px-5 pr-8 pb-3 text-sm'>{activity.description.substring(0, 200)}...</p>
            <div className="flex justify-between">
                <p className="text-background_accent text-sm italic mb-2"><i className="fa-solid fa-location-dot"></i> {activity.location}</p>
                <div className='flex my-0 px-2 space-x-1'>

                    {/* @ts-ignore */}
                    <div className='font-semibold text-background_accent italic text-sm my-auto'> {activity.User.name},</div>
                    <div className='text-background_accent my-auto text-xs'>
                        {moment(activity.createdAt).fromNow()}
                    </div>
                </div>
            </div>
        </div >
    );
};
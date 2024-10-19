// app/activity/[id]/page.tsx
import { Suspense } from 'react';
import ActivityDetails from '../../components/ActivityDetails';
import Loading from './loading';

export default function ActivityPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-background text-text">
            <Suspense fallback={<Loading />}>
                <ActivityDetails id={params.id} />
            </Suspense>
        </div>
    );
}


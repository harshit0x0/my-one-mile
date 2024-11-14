// app/activity/[id]/page.tsx
import { Suspense } from 'react';
import ActivityDetails from '../../components/ActivityDetails';
import Loading from './loading';
import { getUser } from '../../actions';
export default async function ActivityPage({ params }: { params: { id: string } }) {

    const user = await getUser();
    return (
        <div className="max-w-4xl mx-auto px-2 py-6 md:p-6 bg-background text-text">
            <Suspense fallback={<Loading />}>
                <ActivityDetails id={params.id} user={user} />
            </Suspense>
        </div>
    );
}


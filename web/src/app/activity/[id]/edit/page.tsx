import { Suspense } from 'react';
import EditActivityForm from '@/src/app/components/EditActivityForm'
import Loading from '../loading';

export default function EditActivityPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">Edit Activity</h1>
            <Suspense fallback={<Loading />}>
                <EditActivityForm id={params.id} />
            </Suspense>
        </div>
    );
}
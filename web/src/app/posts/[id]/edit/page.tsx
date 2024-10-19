import { Suspense } from 'react';
import EditPostForm from '@/src/app/components/EditPostForm'
import Loading from '../loading';

export default function EditActivityPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-background text-text">
            <h1 className="text-3xl font-bold mb-6 text-primary">Edit Post</h1>
            <Suspense fallback={<Loading />}>
                <EditPostForm id={params.id} />
            </Suspense>
        </div>
    );
}
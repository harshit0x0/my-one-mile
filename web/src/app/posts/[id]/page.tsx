import { Suspense } from 'react';
import PostDetails from '@/src/app/components/PostDetails';
import Loading from './loading';

export default function PostPage({ params }: { params: { id: string } }) {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-background text-text">
            <Suspense fallback={<Loading />}>
                <PostDetails id={params.id} />
            </Suspense>
        </div>
    );
}
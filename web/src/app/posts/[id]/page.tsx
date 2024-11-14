import PostDetails from '@/src/app/components/PostDetails';
import Loading from './loading';
import { getUser } from '../../actions';

export default async function PostPage({ params }: { params: { id: string } }) {
    const user = await getUser();
    return (
        <div className="max-w-4xl mx-auto px-2 py-6 md:p-6 bg-background text-text">
            <PostDetails id={params.id} user={user} />
        </div>
    );
}
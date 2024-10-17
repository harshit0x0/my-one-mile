// // web/src/app/profile/[id]/page.tsx
// 'use client';

// import { usePathname } from 'next/navigation';
// import { getUserById } from '@/src/app/actions';
// import ProfileCard from '../../components/ProfileCard';
// import { useEffect, useState } from 'react';
// import { UserType } from '@/src/models/users';

const UserProfilePage = () => {
    //     const pathname = usePathname();
    //     const id = pathname.split('/').pop() as string;
    //     const [user, setUser] = useState<UserType | null>(null);
    //     useEffect(() => {
    //         async function getUser() {
    //             const data = await getUserById(id);
    //             const user = JSON.parse(data as string);
    //             setUser(user);
    //         }
    //         getUser();
    //     }, [])


    //     if (!user) {
    //         return <div>User not found</div>;
    //     }

    return (
        <div className="flex flex-col items-center min-h-screen bg-background">
            {/* <ProfileCard user={user} /> */}
            <h3 className="my-auto text-text font-bold ">This feature will be available soon!</h3>
        </div>
    );
};

export default UserProfilePage;
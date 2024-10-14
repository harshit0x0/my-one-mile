import logo from '../../public/logo-white.png';
import Image from "next/image";
import AuthButtons from "./authButtons";
import { UserType } from "@/src/models/users";
import Link from "next/link";

export default function Header({ user }: { user: UserType | null }) {
    return (
        <header className="w-full bg-primary shadow-lg sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Flex container with wrapping support */}
                <div className="flex justify-between items-center py-3">
                    {/* Logo and title */}
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src={logo}
                            alt="My One Mile logo"
                            className="h-12 w-auto"
                            width={48}
                            height={48}
                        />
                        <span className="text-xl font-bold tracking-wide text-text pt-4 hover:underline">My One Mile</span>
                    </Link>

                    {/* Spacer to push AuthButtons to the right */}
                    <div className="flex-grow"></div>

                    {/* Authentication buttons */}
                    <div className="fixed top-3 right-8 flex-shrink-0">
                        <AuthButtons user={user} />
                    </div>
                </div>
            </div>
        </header>
    );
}




import Link from "next/link";
export default function Header() {
    return (
        <div className="min-h-full w-full border-b-2 flex flex-1 justify-center items-center p-3">
            <h1 className="flex flex-1 ml-4 justify-center">My One Mile</h1>
            <div className="flex flex space-x-4">
                <Link className="bg-white text-orange underline d-flex rounded px-4 py-2 hover:bg-orange hover:text-white" href="/login">Login</Link>
                <Link className="bg-white text-orange underline d-flex rounded px-4 py-2 hover:bg-orange hover:text-white" href="/signup">Sign Up</Link>
            </div>
        </div>
    );
}
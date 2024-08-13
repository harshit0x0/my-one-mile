import Link from "next/link";
import logo from '../public/logo-white.png';
import Image from "next/image";
export default function Header() {
    return (
        <div className="w-full border-b-2 flex flex-1 justify-between items-center p-3 bg-orange">
            <div className="inline-flex justify-center items-center">
                <span className="mx-2"><Image src={logo} alt="my-one-mile-logo" className="mx-auto h-12 w-auto" /></span>
                <span>My One Mile</span>
            </div>
            <div className="">
                <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="/login">Login</Link>
                <Link className="text-background underline d-flex rounded px-4 py-3 hover:bg-white" href="/signup">Sign Up</Link>
            </div>
        </div>
    );
}
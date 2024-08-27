import logo from '../../public/logo-white.png';
import Image from "next/image";
import AuthButtons from "./authButtons";

export default function Header() {
    return (
        <div className="w-full border-b-2 flex flex-1 justify-between items-center p-3 bg-orange sticky top-0">
            <div className="inline-flex justify-center items-center">
                <span className="mx-2"><Image src={logo} alt="my-one-mile-logo" className="mx-auto h-12 w-auto" /></span>
                <span>My One Mile</span>
            </div>
            <AuthButtons />
        </div>
    );
}
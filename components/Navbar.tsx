import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center p-4 bg-indigo-700 m-0 border-b-2 border-red-500">
            <div className="text-2xl font-bold">
                <Link href="/" className="flex items-center gap-4 md:gap-8">
                    <h2 className="text-2xl md:text-5xl font-bold text-white italic bg-blue-500 p-px md:p-2 pr-2 md:pr-4 rounded-lg shadow shadow-red-500 border-b-4 border-l-4 border-red-500 ">SE</h2>
                    <h2 className="text-xl md:text-5xl font-bold text-white flex flex-col md:gap-4"><span>SIN-TECH</span> <span>ELECTRONIC</span></h2>
                </Link>
            </div>
        </div>
    )
}
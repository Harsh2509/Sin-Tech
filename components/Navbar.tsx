import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import ShimmerButton from "./magicui/shimmer-button";
import { BsCart2 } from "react-icons/bs";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex justify-between items-center bg-indigo-700 m-0 border-b-2 border-red-500 px-4 md:px-10 py-4 max-h-[12vh]">
      <div className="text-2xl font-bold">
        <Link href="/" className="flex items-center md:gap-6 gap-3">
          <h2 className="text-2xl md:text-4xl font-bold text-white italic bg-blue-500 p-px md:p-2 pr-2 md:pr-4 rounded-lg shadow shadow-red-500 border-b-4 border-l-4 border-red-500 ">
            SE
          </h2>
          <h2 className="text-xl md:text-2xl font-bold text-white flex flex-col md:gap-2">
            <span>SIN-TECH</span> <span>ELECTRONIC</span>
          </h2>
        </Link>
      </div>

      <div className="md:mr-4 flex items-center gap-5 md:gap-10 justify-center">
        <Link href="/cart">
          <BsCart2 className=" text-4xl md:text-5xl text-white pb-2" />
        </Link>
        {session ? (
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button>
              <img
                src={session?.user?.image as string}
                alt="user"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer"
              />
            </button>
          </form>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <ShimmerButton
              type="submit"
              className=" font-bold text-sm md:text-lg bg-cyan-600 px-2 py-1 md:px-4 md:py-3"
            >
              SignIn
            </ShimmerButton>
          </form>
        )}
      </div>
    </div>
  );
}

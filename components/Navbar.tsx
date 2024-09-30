import { auth, signIn, signOut } from "@/auth";
import Link from "next/link";
import ShimmerButton from "./magicui/shimmer-button";
import { BsCart2 } from "react-icons/bs";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex justify-between items-center bg-indigo-700 m-0 border-b-2 border-red-500 px-6 md:px-10 py-5 md:py-7">
      <div className="text-2xl font-bold">
        <Link href="/" className="flex items-center gap-4 md:gap-8">
          <h2 className="text-2xl md:text-5xl font-bold text-white italic bg-blue-500 p-px md:p-2 pr-2 md:pr-4 rounded-lg shadow shadow-red-500 border-b-4 border-l-4 border-red-500 ">
            SE
          </h2>
          <h2 className="text-xl md:text-4xl font-bold text-white flex flex-col md:gap-4">
            <span>SIN-TECH</span> <span>ELECTRONIC</span>
          </h2>
        </Link>
      </div>

      <div className="md:mr-4 flex items-center gap-10">
        <Link href="/cart">
          <BsCart2 className=" text-5xl text-white" />
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
                className="w-12 h-12 rounded-full cursor-pointer"
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

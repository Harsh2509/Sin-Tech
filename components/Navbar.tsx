import { auth, signIn } from "@/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await auth();
  return (
    <div className="flex justify-between items-center p-4 bg-indigo-700 m-0 border-b-2 border-red-500 max-h-[16vh] h-[16vh]">
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
      <div className="mr-4">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          {session ? (
            <img
              src={session?.user?.image as string}
              alt="user"
              className="w-12 h-12 rounded-full"
            />
          ) : (
            <button type="submit" className=" font-bold text-2xl">
              SignIn
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

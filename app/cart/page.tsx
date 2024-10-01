import { auth, signIn } from "@/auth";

export default async function () {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex items-center justify-center h-[80vh] w-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
          <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
          <p className="text-gray-600 text-center mb-4">
            Access the cart by signing in.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </div>
    );
  }
  const email = session?.user?.email as string;
  return <div></div>;
}

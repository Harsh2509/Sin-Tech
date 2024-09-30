import { auth } from "@/auth";

export default async function () {
  const session = await auth();

  return <div></div>;
}

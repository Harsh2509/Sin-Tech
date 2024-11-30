import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createDb } from "@/db";
import { users } from "@/db/schema";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const DB = getRequestContext().env.DB;
      const db = createDb(DB);
      if (account?.provider === "google") {
        try {
          const userr = await db
            .insert(users)
            .values({
              email: user.email as string,
              name: user.name,
              image: user.image,
            })
            .onConflictDoUpdate({
              target: users.email,
              set: {
                name: user.name,
                image: user.image,
              },
            });
          console.log("User inserted:");
          console.log(userr);
          return true;
        } catch (error) {
          console.error("Error inserting user:", error);
          return false;
        }
      }
      return true;
    },
  },
});

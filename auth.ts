import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";
import { users } from "@/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          await db
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

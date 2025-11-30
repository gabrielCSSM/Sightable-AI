import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as dbTools from "../../../lib/databaseTools";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        type: {
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email. Ex: test@sightable.ai.",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password.",
        },
      },

      async authorize(credentials) {
        const { type, email, password } = credentials ?? {};
        // console.log(credentials);
        switch (type) {
          case "user":
            if (!email || !password) throw new Error("No hay parametros");

            if ((await dbTools.checkPassword(email, password)) == 1) {
              let query = await dbTools.getFullLoggedUser(email, password);
              query["role"] = "user";
              const user = query;
              return user;
            }

            break;
          case "guest":
            if (!email) throw new Error("No hay parametros");

            if (await dbTools.checkGuestUser(email)) {
              let query = await dbTools.getGuestUser(email);
              //console.log(query)
              query["role"] = "guest";
              const user = query;
              return user;
            }

            break;
          case "pending":
            if (!email) throw new Error("No hay parametros");
            if (await dbTools.checkPendingUser(email)) {
              let query = await dbTools.getPendingUser(email);
              query["role"] = "pending";
              const user = query;
              return user;
            }
            break;
          default:
            return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.user = user;
      }

      // Handle session updates
      if (trigger === "update" && session) {
        token.user = session.user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user = token.user;
      }
      return session;
    },
    async redirect() {
      const baseURL = `http://localhost:3000/`;
      return baseURL + `/main`;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "../../../login/",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

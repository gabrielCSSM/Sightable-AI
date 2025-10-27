import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as dbTools from "../../../lib/databaseTools";

const handler = NextAuth({
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

        console.log(type);
        console.log(email);
        console.log(password);
        if(type == "User") console.log("asddddddd");

        if (type == "User") {
          if (!email || !password) throw new Error("No hay parametros");
          console.log("CREDENTIALS USER");
          console.log(credentials);

          if (await dbTools.checkPassword(email, password)) {
            const user = await dbTools.getUser(email, password);
            return user;
          }
        }

        if (type == "Guest") {
          if (!email) throw new Error("No hay parametros");
          console.log("CREDENTIALS GUEST");
          console.log(credentials);

          if (await dbTools.checkGuestUser(email)) {
            const user = await dbTools.getGuestUser(email);
            return user;
          }
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      console.log(token);
      return token;
    },

    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async redirect() {
      return `/main`;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "../../../login/",
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

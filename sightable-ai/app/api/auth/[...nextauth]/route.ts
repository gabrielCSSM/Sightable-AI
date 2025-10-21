import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "email" },
        password: { label: "Password", type: "password"},
      },

      async authorize(credentials) {
        if (
          credentials?.username === process.env.LOGIN_TEST_EMAIL_USER &&
          credentials?.password === process.env.LOGIN_TEST_EMAIL_PASS
        ) {
          return {
            id: "1",
            name: "Test Sightable AI",
            email: "test@sightable.ai",
          };
        }
        return null;
      },
    }),
  ],

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async jwt({token, user}) {
        if (user) token.user = user;
        return token;
    }
  },
  
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };

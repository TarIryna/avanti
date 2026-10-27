import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/helpers/verifyPassword";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDB();
        const user = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error("Користувача не знайдено");
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Невірний пароль");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.username || "",
          image: user.image || null,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },
  useSecureCookies: true,
  trustHost: true,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectToDB();
        const dbUser = await User.findOne({ email: user.email });

        token.id = dbUser._id.toString();
        token.email = dbUser.email;
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      const dbUser = await User.findById(token.id).lean();

      if (dbUser) {
        session.user = {
          ...dbUser,
          id: dbUser._id.toString(),
        };
      }
      return session;
    },

    async signIn({ account, profile, credentials }) {
      try {
        await connectToDB();

        const email = profile?.email ?? credentials?.email;
        const userExists = await User.findOne({ email });

        if (!userExists && account.provider === "google") {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch {
        return false;
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

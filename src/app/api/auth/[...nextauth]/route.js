import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/helpers/verifyPassword";
import { loginUserAction, logoutUserAction } from "@/store/actions/user";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "your-email@example.com",
        },
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

      // 👇 обязательно приведи Mongoose-документ к простому объекту
      const plainUser =
        typeof user.toObject === "function" ? user.toObject() : user;


      return {
        id: plainUser._id.toString(),
        email: plainUser.email,
        name: plainUser.username || plainUser.name || "",
        image: plainUser.image || null,
      };
    }
    }),
  ],
  session: {
    strategy: "jwt", // Хранение сессий через JWT
  },
cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
    callbackUrl: {
      name: "__Secure-next-auth.callback-url",
      options: {
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
    csrfToken: {
      name: "__Host-next-auth.csrf-token",
      options: {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      const plainUser =
        typeof sessionUser.toObject === "function"
          ? sessionUser.toObject()
          : sessionUser;

      session.user = {
        ...plainUser,
        id: plainUser._id.toString(),
      };
      if (!!session.user) {
        loginUserAction();
      } else {
        logoutUserAction();
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();
        const email = profile?.email ?? credentials?.email ?? user?.email;

        // check if user already exists
        const userExists = await User.findOne({ email });

        // if not, create a new document and save user in MongoDB
        if (!userExists && account.provider !== "credentials") {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

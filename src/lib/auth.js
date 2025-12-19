import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // первый логин
      if (user) {
        await connectToDB();

        const dbUser = await User.findOne({ email: user.email });

        token.id = dbUser._id.toString(); // ✅ Mongo ObjectId
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id; // ✅ Mongo ObjectId
      return session;
    },
  },
};

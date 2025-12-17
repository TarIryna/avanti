import Profile from "@/components/Profile/Profile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
   const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return  <Profile />;
};


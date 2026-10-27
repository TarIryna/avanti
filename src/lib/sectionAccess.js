import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export async function requireSectionAccess(allowedEmails) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.trim().toLowerCase();
  const isAllowed = email && allowedEmails.some(
    (allowedEmail) => allowedEmail.trim().toLowerCase() === email
  );

  if (!isAllowed) {
    redirect("/");
  }
}

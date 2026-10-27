import { baseEmails } from "@/data/emails";
import { requireSectionAccess } from "@/lib/sectionAccess";

export default async function BaseLayout({ children }) {
  await requireSectionAccess(baseEmails);

  return children;
}

import { shopEmails } from "@/data/emails";
import { requireSectionAccess } from "@/lib/sectionAccess";

export default async function ShopLayout({ children }) {
  await requireSectionAccess(shopEmails);

  return children;
}

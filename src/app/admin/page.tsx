import { getAllLinks } from "@/lib/links/db";
import AdminClient from "@/components/admin/AdminClient";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const links = await getAllLinks();
  return <AdminClient initialLinks={links} />;
}

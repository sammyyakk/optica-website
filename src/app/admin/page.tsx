import { getAllLinks } from "@/lib/links/db";
import AdminClient from "@/components/admin/AdminClient";

// Same reasoning as /links/page.tsx — no dynamic API here for Next to key
// off, so without this the initial list would get baked in at build time.
export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const links = await getAllLinks();
  return <AdminClient initialLinks={links} />;
}

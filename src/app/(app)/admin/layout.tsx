import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AdminLayoutShell } from "@/app/(app)/admin/admin-layout-shell";
import { requireAdmin } from "@/auth/authorization";
import { getAuthService } from "@/auth/services/mock-auth-service";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const auth = getAuthService();
  const session = await auth.getSession();
  let serverAuthorized = false;
  try {
    requireAdmin(session);
    serverAuthorized = true;
  } catch {
    serverAuthorized = false;
  }

  if (!serverAuthorized && process.env.GITHUB_PAGES !== "true") {
    redirect("/");
  }

  return (
    <AdminLayoutShell serverAuthorized={serverAuthorized}>
      {children}
    </AdminLayoutShell>
  );
}
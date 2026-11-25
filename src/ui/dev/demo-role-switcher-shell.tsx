import { getAuthService } from "@/auth/services/mock-auth-service";
import type { ClientDemoRole } from "@/auth/client-demo-session";
import { DemoRoleSwitcher } from "@/ui/dev/demo-role-switcher";

function resolveDemoRole(session: Awaited<
  ReturnType<ReturnType<typeof getAuthService>["getSession"]>
>): ClientDemoRole {
  if (!session) return "guest";
  return session.user.role === "admin" ? "admin" : "user";
}

export async function DemoRoleSwitcherShell() {
  const session = await getAuthService().getSession();
  return <DemoRoleSwitcher initialRole={resolveDemoRole(session)} />;
}
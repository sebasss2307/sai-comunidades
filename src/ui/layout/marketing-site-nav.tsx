import { isAdmin } from "@/domain/user";
import { getAuthService } from "@/auth/services/mock-auth-service";
import { MarketingSiteNavShell } from "@/ui/layout/marketing-site-nav-shell";

export async function MarketingSiteNav() {
  const session = await getAuthService().getSession();

  return (
    <MarketingSiteNavShell
      isLoggedIn={Boolean(session)}
      userName={session?.user.name ?? null}
      isAdmin={session ? isAdmin(session.user) : false}
    />
  );
}
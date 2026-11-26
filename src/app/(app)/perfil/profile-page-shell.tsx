"use client";

import { useEffect, useState } from "react";

import {
  DEMO_SESSION_CHANGE_EVENT,
  readClientDemoSession,
} from "@/auth/client-demo-session";
import { mockUsers } from "@/data/mock/users";
import type { User } from "@/domain/user";
import { publicAssetPath } from "@/lib/public-asset-path";
import { ProfileForm } from "@/ui/forms/profile-form";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

type ProfilePageShellProps = {
  serverUser: User | null;
};

function userFromClientSession(): User | null {
  const session = readClientDemoSession();
  if (!session) return null;
  const fromMock = mockUsers.find((item) => item.id === session.user.id);
  if (fromMock) {
    return {
      ...fromMock,
      name: session.user.name,
      email: session.user.email,
      avatarUrl: session.user.avatarUrl,
    };
  }
  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name,
    role: session.user.role,
    avatarUrl: session.user.avatarUrl,
    createdAt: new Date().toISOString(),
  };
}

export function ProfilePageShell({ serverUser }: ProfilePageShellProps) {
  const [user, setUser] = useState<User | null>(serverUser);
  const [ready, setReady] = useState(Boolean(serverUser));
  const useClientGuard = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  useEffect(() => {
    const sync = () => {
      if (serverUser) {
        setUser(serverUser);
        setReady(true);
        return;
      }
      if (!useClientGuard) {
        window.location.assign(publicAssetPath("/iniciar-sesion?next=/perfil"));
        return;
      }
      const clientUser = userFromClientSession();
      if (!clientUser) {
        window.location.assign(publicAssetPath("/iniciar-sesion?next=/perfil"));
        return;
      }
      setUser(clientUser);
      setReady(true);
    };

    sync();
    if (!useClientGuard || serverUser) return;
    window.addEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
    return () => window.removeEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
  }, [serverUser, useClientGuard]);

  if (!ready || !user) {
    return null;
  }

  return (
    <section className="appSection">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <MarketingPageHeader
          eyebrow="Cuenta"
          title="Mi perfil"
          lead="Actualiza tu nombre, correo y foto. Los cambios se guardan en el entorno MOCK."
        />
        <article className="forumPanel">
          <ProfileForm user={user} />
        </article>
      </div>
    </section>
  );
}
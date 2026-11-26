"use client";

import { useEffect, useState } from "react";

import {
  DEMO_SESSION_CHANGE_EVENT,
  readClientDemoSession,
} from "@/auth/client-demo-session";
import { isAdmin } from "@/domain/user";
import { MarketingSiteNavClient } from "@/ui/layout/marketing-site-nav-client";
import { useAppPathname } from "@/ui/layout/use-app-pathname";

type NavProps = {
  isLoggedIn: boolean;
  userName: string | null;
  isAdmin: boolean;
};

export function MarketingSiteNavShell(serverProps: NavProps) {
  const pathname = useAppPathname();
  const [props, setProps] = useState(serverProps);
  const useClientSession = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  useEffect(() => {
    const sync = () => {
      if (!useClientSession) {
        setProps(serverProps);
        return;
      }
      const session = readClientDemoSession();
      if (!session) {
        setProps({ isLoggedIn: false, userName: null, isAdmin: false });
        return;
      }
      setProps({
        isLoggedIn: true,
        userName: session.user.name,
        isAdmin: isAdmin(session.user),
      });
    };

    sync();

    if (!useClientSession) return;

    window.addEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
    return () => {
      window.removeEventListener(DEMO_SESSION_CHANGE_EVENT, sync);
    };
  }, [
    pathname,
    useClientSession,
    serverProps.isLoggedIn,
    serverProps.isAdmin,
    serverProps.userName,
  ]);

  return <MarketingSiteNavClient {...props} />;
}
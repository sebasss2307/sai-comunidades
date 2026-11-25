"use client";

import type { ReactNode } from "react";

import { logoutAction } from "@/app/actions/auth";
import { writeClientDemoSession } from "@/auth/client-demo-session";
import { publicAssetPath } from "@/lib/public-asset-path";

type LogoutButtonProps = {
  className?: string;
  children: ReactNode;
};

export function LogoutButton({ className, children }: LogoutButtonProps) {
  const clientMode = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  if (clientMode) {
    return (
      <button
        type="button"
        className={className}
        onClick={() => {
          writeClientDemoSession(null);
          window.location.assign(publicAssetPath("/"));
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <form action={logoutAction}>
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
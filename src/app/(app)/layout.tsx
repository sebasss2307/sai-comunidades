import "@/ui/landing/landing-static.css";
import "@/ui/auth/auth-marketing.css";
import "@/ui/layout/app-marketing.css";
import "@/ui/layout/form-controls.css";
import "@/ui/layout/nav-overrides.css";
import "@/ui/layout/mobile-layout.css";

import type { ReactNode } from "react";

import { DemoRoleSwitcherShell } from "@/ui/dev/demo-role-switcher-shell";
import { LandingFooter } from "@/ui/layout/landing-footer";
import { MarketingSiteNav } from "@/ui/layout/marketing-site-nav";

export default function AppSectionLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="sai-landing min-h-full">
        <MarketingSiteNav />
        <main>{children}</main>
        <LandingFooter />
      </div>
      <DemoRoleSwitcherShell />
    </>
  );
}
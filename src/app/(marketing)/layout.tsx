import "@/ui/landing/landing-static.css";
import "@/ui/layout/form-controls.css";
import "@/ui/layout/nav-overrides.css";
import "@/ui/layout/mobile-layout.css";
import "@/ui/landing/services-carousel.css";

import { DemoRoleSwitcherShell } from "@/ui/dev/demo-role-switcher-shell";

export default function MarketingLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div className="sai-landing min-h-full" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </div>
      <DemoRoleSwitcherShell />
    </>
  );
}
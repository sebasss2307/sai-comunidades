"use client";

import { useEffect, useState } from "react";

import { demoRoleAction } from "@/app/actions/auth";
import {
  getClientDemoRole,
  impersonateClientDemo,
  isClientDemoUiEnabled,
  type ClientDemoRole,
} from "@/auth/client-demo-session";
import { MOCK_DEMO_PASSWORD } from "@/data/mock/users";
import { publicAssetPath } from "@/lib/public-asset-path";

import "@/ui/dev/demo-role-switcher.css";

const roles = [
  ["guest", "Visitante"],
  ["user", "Miembro"],
  ["admin", "Admin"],
] as const satisfies ReadonlyArray<[ClientDemoRole, string]>;

type DemoRoleSwitcherProps = {
  initialRole?: ClientDemoRole;
};

export function DemoRoleSwitcher({ initialRole = "guest" }: DemoRoleSwitcherProps) {
  const [activeRole, setActiveRole] = useState<ClientDemoRole>(initialRole);

  useEffect(() => {
    if (!isClientDemoUiEnabled()) return;
    if (process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true") {
      setActiveRole(getClientDemoRole());
      return;
    }
    setActiveRole(initialRole);
  }, [initialRole]);

  if (!isClientDemoUiEnabled()) return null;

  const clientRoles = process.env.NEXT_PUBLIC_SHOW_DEMO_UI === "true";

  const onClientRole = (role: ClientDemoRole) => {
    impersonateClientDemo(role);
    setActiveRole(role);
    const target =
      role === "admin" ? "/admin" : role === "user" ? "/foro" : "/";
    window.location.assign(publicAssetPath(target));
  };

  return (
    <div
      className="demoRoleSwitcher"
      role="complementary"
      aria-label="Usuarios de prueba"
    >
      <p className="demoRoleSwitcher__title">Demo MOCK</p>
      <p className="demoRoleSwitcher__hint">
        Usuarios de prueba · contraseña{" "}
        <code>{MOCK_DEMO_PASSWORD}</code>
        <br />
        <code>miembro@demo.com</code> · <code>admin@demo.com</code>
      </p>
      <div className="demoRoleSwitcher__actions">
        {roles.map(([role, label]) => {
          const active = clientRoles && activeRole === role;
          const btnClass = [
            "demoRoleSwitcher__btn",
            active ? "demoRoleSwitcher__btn--active" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return clientRoles ? (
            <button
              key={role}
              type="button"
              className={btnClass}
              aria-pressed={active}
              onClick={() => onClientRole(role)}
            >
              {label}
            </button>
          ) : (
            <form key={role} action={demoRoleAction}>
              <input type="hidden" name="role" value={role} />
              <button type="submit" className={btnClass}>
                {label}
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
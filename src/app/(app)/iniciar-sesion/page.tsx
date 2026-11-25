import type { Metadata } from "next";
import { Suspense } from "react";

import { MOCK_DEMO_PASSWORD } from "@/data/mock/users";
import { LoginForm } from "@/ui/forms/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <section className="authPage">
      <div className="wrap authPageInner">
        <div className="eyebrow">Acceso miembros</div>
        <h1>Iniciar sesión</h1>
        <p className="authLead">
          Ingresa con tu cuenta para participar del foro comunitario y acceder a
          las zonas reservadas para miembros.
        </p>
        <div className="authPanel">
          <Suspense fallback={<div className="authPanel" aria-busy="true" />}>
            <LoginForm appearance="marketing" />
          </Suspense>
        </div>
        <p className="authDemoNote">
          <b>Demo MOCK:</b> usa <code>miembro@demo.com</code> o{" "}
          <code>admin@demo.com</code> con contraseña{" "}
          <code>{MOCK_DEMO_PASSWORD}</code>, o el selector de roles en la esquina
          inferior.
        </p>
      </div>
    </section>
  );
}
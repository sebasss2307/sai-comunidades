import type { Metadata } from "next";

import { RegisterForm } from "@/ui/forms/register-form";

export const metadata: Metadata = {
  title: "Registro",
};

export default function RegisterPage() {
  return (
    <section className="authPage">
      <div className="wrap authPageInner">
        <div className="eyebrow">Comunidad</div>
        <h1>Crear cuenta</h1>
        <p className="authLead">
          Regístrate para participar del foro comunitario y acceder a las
          conversaciones entre vecinos y administradores.
        </p>
        <div className="authPanel">
          <RegisterForm appearance="marketing" />
        </div>
      </div>
    </section>
  );
}
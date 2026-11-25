"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import type { ReactNode } from "react";

import {
  submitContactAction,
  type ContactActionState,
} from "@/app/actions/contact";
import {
  contactSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact";

const initial: ContactActionState = {};

type ContactFormProps = {
  messageRows?: number;
};

export function ContactForm({ messageRows = 6 }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(
    submitContactAction,
    initial,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("subject", values.subject);
    formData.set("message", values.message);
    await formAction(formData);
  });

  if (state.ok) {
    return (
      <div className="successBanner">
        <p style={{ margin: 0, fontWeight: 750 }}>¡Mensaje enviado!</p>
        <p style={{ margin: "8px 0 0", fontSize: "0.9rem" }}>
          Gracias por escribirnos. Te responderemos pronto (datos MOCK).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="postForm" style={{ marginBottom: 0 }}>
      <b style={{ color: "var(--green)", display: "block", marginBottom: 12 }}>
        Envíanos un mensaje
      </b>
      {state.error ? (
        <div className="authErrorBanner" role="alert">
          {state.error}
        </div>
      ) : null}
      <div className="formRow">
        <Field label="Nombre" error={errors.name?.message}>
          <input className="field" {...register("name")} />
        </Field>
        <Field label="Correo" error={errors.email?.message}>
          <input className="field" type="email" {...register("email")} />
        </Field>
      </div>
      <Field label="Asunto" error={errors.subject?.message}>
        <input className="field" {...register("subject")} />
      </Field>
      <Field label="Mensaje" error={errors.message?.message}>
        <textarea className="field" rows={messageRows} {...register("message")} />
      </Field>
      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Enviando…" : "Enviar mensaje ↗"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label style={{ display: "block", marginBottom: 8 }}>
      <span
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 750,
          color: "var(--green)",
          marginBottom: 4,
        }}
      >
        {label}
      </span>
      {children}
      {error ? <p className="authFieldError">{error}</p> : null}
    </label>
  );
}
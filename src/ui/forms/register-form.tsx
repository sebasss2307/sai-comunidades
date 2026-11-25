"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import type { InputHTMLAttributes } from "react";

import { registerAction, type AuthActionState } from "@/app/actions/auth";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/lib/schemas/auth";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { AuthSubmitMessage } from "@/ui/forms/auth-submit-message";

const initial: AuthActionState = {};

type RegisterFormProps = {
  appearance?: "app" | "marketing";
};

export function RegisterForm({ appearance = "marketing" }: RegisterFormProps) {
  const [state, formAction, pending] = useActionState(registerAction, initial);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.set("name", values.name);
    formData.set("email", values.email);
    formData.set("password", values.password);
    formData.set("confirmPassword", values.confirmPassword);
    await formAction(formData);
  });

  if (appearance === "marketing") {
    return (
      <form onSubmit={onSubmit}>
        {state.error ? (
          <div className="authErrorBanner" role="alert">
            {state.error}
          </div>
        ) : null}
        <MarketingField
          id="name"
          label="Nombre completo"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <MarketingField
          id="email"
          label="Correo electrónico"
          type="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <MarketingField
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <MarketingField
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <button type="submit" className="btn authSubmitBtn" disabled={pending}>
          {pending ? "Creando cuenta…" : "Crear cuenta ↗"}
        </button>
        <p className="authFootnote">
          ¿Ya tienes cuenta? <Link href="/iniciar-sesion">Inicia sesión</Link>
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AuthSubmitMessage state={state} />
      <Input
        label="Nombre completo"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register("password")}
      />
      <Input
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
      <p className="text-center text-sm text-muted">
        ¿Ya tienes cuenta?{" "}
        <Link href="/iniciar-sesion" className="font-medium text-brand-700">
          Inicia sesión
        </Link>
      </p>
    </form>
  );
}

function MarketingField({
  label,
  id,
  error,
  ...props
}: {
  label: string;
  id: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <>
      <label htmlFor={id}>
        {label}
        <input id={id} className="authField" {...props} />
      </label>
      {error ? <p className="authFieldError">{error}</p> : null}
    </>
  );
}
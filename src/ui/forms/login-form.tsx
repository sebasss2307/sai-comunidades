"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { useForm } from "react-hook-form";

import { loginAction, type AuthActionState } from "@/app/actions/auth";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { Button } from "@/ui/components/button";
import { Input } from "@/ui/components/input";
import { AuthSubmitMessage } from "@/ui/forms/auth-submit-message";

const initial: AuthActionState = {};

type LoginFormProps = {
  nextPath?: string;
  appearance?: "app" | "marketing";
};

export function LoginForm({
  nextPath,
  appearance = "app",
}: LoginFormProps) {
  const searchParams = useSearchParams();
  const resolvedNext =
    nextPath ?? searchParams.get("next") ?? undefined;
  const [state, formAction, pending] = useActionState(loginAction, initial);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();
    formData.set("email", values.email);
    formData.set("password", values.password);
    if (resolvedNext) formData.set("next", resolvedNext);
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
        <label htmlFor="email">
          Correo electrónico
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="miembro@demo.com"
            className="authField"
            {...register("email")}
          />
        </label>
        {errors.email?.message ? (
          <p className="authFieldError">{errors.email.message}</p>
        ) : null}

        <label htmlFor="password">
          Contraseña
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="authField"
            {...register("password")}
          />
        </label>
        {errors.password?.message ? (
          <p className="authFieldError">{errors.password.message}</p>
        ) : null}

        <button
          type="submit"
          className="btn authSubmitBtn"
          disabled={pending}
        >
          {pending ? "Ingresando…" : "Iniciar sesión ↗"}
        </button>

        <p className="authFootnote">
          ¿No tienes cuenta? <Link href="/registro">Crear cuenta</Link>
        </p>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <AuthSubmitMessage state={state} />
      <Input
        label="Correo electrónico"
        type="email"
        autoComplete="email"
        placeholder="miembro@demo.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Ingresando…" : "Iniciar sesión"}
      </Button>
      <p className="text-center text-sm text-muted">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-medium text-brand-700">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
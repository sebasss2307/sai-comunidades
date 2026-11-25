"use client";

import { useActionState, useMemo, useState, type ChangeEvent } from "react";

import {
  updateProfileAction,
  type ProfileActionState,
} from "@/app/actions/profile";
import type { User } from "@/domain/user";

const initial: ProfileActionState = {};
const MAX_AVATAR_BYTES = 240_000;

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initial,
  );
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const avatarPreview = useMemo(
    () => avatarUrl || user.avatarUrl || "",
    [avatarUrl, user.avatarUrl],
  );

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarError(null);

    if (!file.type.startsWith("image/")) {
      setAvatarError("El archivo debe ser una imagen.");
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      setAvatarError("La imagen no debe superar 240 KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setAvatarUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setAvatarUrl("");
    setAvatarError(null);
  };

  const initials = user.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <form action={formAction} className="postForm profileForm">
      {state.error || avatarError ? (
        <div className="authErrorBanner" role="alert">
          {state.error ?? avatarError}
        </div>
      ) : null}
      {state.ok ? (
        <div className="successBanner">
          <p style={{ margin: 0, fontWeight: 750 }}>Perfil actualizado</p>
        </div>
      ) : null}

      <div className="profileAvatarBlock">
        <div className="profileAvatarPreview" aria-hidden>
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarPreview} alt="" />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <input type="hidden" name="avatarUrl" value={avatarUrl} readOnly />
        <div className="profileAvatarActions">
          <label className="btn light profilePhotoPick">
            Cambiar foto
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              className="profilePhotoInput"
              onChange={handlePhoto}
            />
          </label>
          {avatarPreview ? (
            <button type="button" className="btn light" onClick={clearPhoto}>
              Quitar foto
            </button>
          ) : null}
        </div>
      </div>

      <label>
        <span className="fieldLabel">Nombre</span>
        <input
          className="field"
          name="name"
          defaultValue={user.name}
          required
        />
      </label>

      <label>
        <span className="fieldLabel">Correo</span>
        <input
          className="field"
          type="email"
          name="email"
          defaultValue={user.email}
          autoComplete="email"
          required
        />
      </label>

      <button type="submit" className="btn" disabled={pending}>
        {pending ? "Guardando…" : "Guardar perfil ↗"}
      </button>
    </form>
  );
}
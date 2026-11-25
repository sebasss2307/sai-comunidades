"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition, type ChangeEvent } from "react";

import {
  createCarouselItemAction,
  deleteCarouselItemAction,
  updateCarouselItemAction,
} from "@/app/actions/admin-carousel";
import type { LandingServiceItem } from "@/domain/landing-service";
import type { LandingCarouselFormValues } from "@/lib/schemas/landing-carousel";

type Props = {
  items: LandingServiceItem[];
};

const emptyDraft: LandingCarouselFormValues = {
  img: "",
  alt: "",
  num: "",
  title: "",
  body: "",
};

const MAX_IMAGE_BYTES = 300_000;

export function AdminCarouselPanel({ items }: Props) {
  const router = useRouter();
  const [localItems, setLocalItems] = useState(items);
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<LandingCarouselFormValues>(emptyDraft);
  const [deleteTarget, setDeleteTarget] = useState<LandingServiceItem | null>(
    null,
  );
  const [confirmSave, setConfirmSave] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const openCreate = () => {
    setMode("create");
    setEditingId(null);
    setDraft(emptyDraft);
    setActionError(null);
    setConfirmSave(false);
  };

  const openEdit = (item: LandingServiceItem) => {
    setMode("edit");
    setEditingId(item.id);
    setDraft({
      img: item.img,
      alt: item.alt,
      num: item.num,
      title: item.title,
      body: item.body,
    });
    setActionError(null);
    setConfirmSave(false);
  };

  const closeEditor = () => {
    setMode(null);
    setEditingId(null);
    setDraft(emptyDraft);
    setConfirmSave(false);
    setActionError(null);
  };

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setActionError("El archivo debe ser una imagen.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setActionError("La imagen no debe superar 300 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setDraft((current) => ({ ...current, img: result }));
      setActionError(null);
    };
    reader.readAsDataURL(file);
  };

  const saveItem = () => {
    startTransition(async () => {
      const result =
        mode === "create"
          ? await createCarouselItemAction(draft)
          : editingId
            ? await updateCarouselItemAction(editingId, draft)
            : { error: "Sin elemento seleccionado." };

      if (result.error) {
        setActionError(result.error);
        setConfirmSave(false);
        return;
      }

      setConfirmSave(false);
      closeEditor();
      router.refresh();
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteCarouselItemAction(deleteTarget.id);
      if (result.error) {
        setActionError(result.error);
        return;
      }
      setDeleteTarget(null);
      setActionError(null);
      router.refresh();
    });
  };

  return (
    <div className="adminCarouselPanel">
      <div className="adminContactToolbar">
        <p className="adminContactSummary" style={{ margin: 0 }}>
          {localItems.length} tarjeta{localItems.length === 1 ? "" : "s"} en el
          carrusel de la landing.
        </p>
        <button type="button" className="btn" onClick={openCreate}>
          Añadir tarjeta
        </button>
      </div>

      <ul className="adminForumList">
        {localItems.map((item) => (
          <li key={item.id} className="adminForumThread infoCard">
            <div className="adminCarouselRow">
              <div className="adminCarouselThumb" aria-hidden>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" />
              </div>
              <div>
                <p className="adminCarouselNum">{item.num}</p>
                <h3>{item.title}</h3>
                <p className="adminForumThreadMeta">{item.body}</p>
              </div>
              <div className="adminUsersRowActions">
                <button
                  type="button"
                  className="btn light"
                  onClick={() => openEdit(item)}
                >
                  Modificar
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={pending}
                  onClick={() => {
                    setActionError(null);
                    setDeleteTarget(item);
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {mode ? (
        <div
          className="adminContactModalBackdrop"
          role="presentation"
          onClick={closeEditor}
        >
          <div
            className="adminContactModal adminUsersModal"
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="adminContactModalHead">
              <div>
                <p className="adminContactModalEyebrow">
                  {mode === "create" ? "Nueva tarjeta" : "Editar tarjeta"}
                </p>
                <h2>Carrusel · Qué hacemos</h2>
              </div>
              <button
                type="button"
                className="adminContactModalClose"
                aria-label="Cerrar"
                onClick={closeEditor}
              >
                ×
              </button>
            </div>

            {actionError ? (
              <div className="authErrorBanner" role="alert">
                {actionError}
              </div>
            ) : null}

            <div className="adminUsersForm">
              <label className="adminUsersField">
                <span>Indicador (ej. 01 / ADMINISTRACIÓN)</span>
                <input
                  className="field"
                  value={draft.num}
                  onChange={(event) =>
                    setDraft({ ...draft, num: event.target.value })
                  }
                />
              </label>
              <label className="adminUsersField">
                <span>Título</span>
                <input
                  className="field"
                  value={draft.title}
                  onChange={(event) =>
                    setDraft({ ...draft, title: event.target.value })
                  }
                />
              </label>
              <label className="adminUsersField">
                <span>Descripción</span>
                <textarea
                  className="field"
                  rows={4}
                  value={draft.body}
                  onChange={(event) =>
                    setDraft({ ...draft, body: event.target.value })
                  }
                />
              </label>
              <label className="adminUsersField">
                <span>Texto alternativo de la imagen</span>
                <input
                  className="field"
                  value={draft.alt}
                  onChange={(event) =>
                    setDraft({ ...draft, alt: event.target.value })
                  }
                />
              </label>
              <label className="adminUsersField">
                <span>URL de imagen</span>
                <input
                  className="field"
                  value={draft.img.startsWith("data:") ? "" : draft.img}
                  placeholder="https://..."
                  onChange={(event) =>
                    setDraft({ ...draft, img: event.target.value })
                  }
                />
              </label>
              <label className="adminUsersField">
                <span>O subir imagen</span>
                <input className="field" type="file" accept="image/*" onChange={handleImageFile} />
              </label>
              {draft.img ? (
                <div className="adminCarouselThumb adminCarouselThumbLarge">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={draft.img} alt={draft.alt || "Vista previa"} />
                </div>
              ) : null}
            </div>

            <div className="adminContactModalActions">
              <button type="button" className="btn light" onClick={closeEditor}>
                Cancelar
              </button>
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={() => setConfirmSave(true)}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmSave ? (
        <div className="adminContactModalBackdrop adminUsersConfirmLayer">
          <div className="adminContactModal adminUsersConfirm" role="alertdialog">
            <h2>Confirmar cambios</h2>
            <p>¿Guardar esta tarjeta del carrusel en la página principal?</p>
            <div className="adminContactModalActions">
              <button
                type="button"
                className="btn light"
                onClick={() => setConfirmSave(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={saveItem}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteTarget ? (
        <div className="adminContactModalBackdrop adminUsersConfirmLayer">
          <div className="adminContactModal adminUsersConfirm" role="alertdialog">
            <h2>Eliminar tarjeta</h2>
            <p>
              ¿Eliminar <strong>{deleteTarget.title}</strong> del carrusel? Esta
              acción no se puede deshacer.
            </p>
            {actionError ? (
              <div className="authErrorBanner" role="alert">
                {actionError}
              </div>
            ) : null}
            <div className="adminContactModalActions">
              <button
                type="button"
                className="btn light"
                onClick={() => {
                  setDeleteTarget(null);
                  setActionError(null);
                }}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={confirmDelete}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
"use client";

import { useEffect, useState, useTransition } from "react";

import {
  deleteUserAction,
  updateUserAction,
} from "@/app/actions/admin-users";
import type { User, UserRole } from "@/domain/user";
import { formatDate } from "@/lib/utils/format-date";

type Props = {
  users: User[];
  currentUserId: string;
};

type ConfirmKind = "save" | "delete" | null;

type Draft = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
};

function roleLabel(role: UserRole) {
  return role === "admin" ? "Admin" : "Miembro";
}

export function AdminUsersTable({ users, currentUserId }: Props) {
  const [localUsers, setLocalUsers] = useState(users);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [confirmKind, setConfirmKind] = useState<ConfirmKind>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLocalUsers(users);
  }, [users]);

  const editingUser = editingId
    ? (localUsers.find((user) => user.id === editingId) ?? null)
    : null;

  const openEdit = (user: User) => {
    setActionError(null);
    setEditingId(user.id);
    setDraft({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
    });
  };

  const closeEdit = () => {
    setEditingId(null);
    setDraft(null);
    setConfirmKind(null);
    setActionError(null);
  };

  const requestSave = () => {
    if (!editingUser || !draft) return;
    setActionError(null);
    setConfirmKind("save");
  };

  const confirmSave = () => {
    if (!editingUser || !draft) return;
    startTransition(async () => {
      const result = await updateUserAction({
        id: editingUser.id,
        name: draft.name,
        email: draft.email,
        role: draft.role,
        password: draft.password,
      });
      if (result.error) {
        setActionError(result.error);
        setConfirmKind(null);
        return;
      }
      setLocalUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id
            ? {
                ...user,
                name: draft.name,
                email: draft.email,
                role: draft.role,
              }
            : user,
        ),
      );
      closeEdit();
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteUserAction(deleteTarget.id);
      if (result.error) {
        setActionError(result.error);
        setConfirmKind(null);
        return;
      }
      setLocalUsers((current) =>
        current.filter((user) => user.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
      setConfirmKind(null);
      setActionError(null);
    });
  };

  const renderRowActions = (user: User) => (
    <div className="adminUsersRowActions">
      <button
        type="button"
        className="btn light"
        onClick={() => openEdit(user)}
      >
        Modificar
      </button>
      {user.role !== "admin" ? (
        <button
          type="button"
          className="btn"
          disabled={pending || user.id === currentUserId}
          title={
            user.id === currentUserId
              ? "No puedes eliminar tu propia cuenta"
              : undefined
          }
          onClick={() => {
            setActionError(null);
            setDeleteTarget(user);
            setConfirmKind("delete");
          }}
        >
          Eliminar
        </button>
      ) : null}
    </div>
  );

  const toggleExpanded = (userId: string) => {
    setExpandedId((current) => (current === userId ? null : userId));
  };

  return (
    <div className="adminUsersPanel">
      <p className="adminUsersAccordionBar">Usuarios · panel MOCK</p>
      <div className="adminUsersAccordion" role="list">
        {localUsers.map((user) => {
          const isOpen = expandedId === user.id;
          const bodyId = `admin-user-accordion-${user.id}`;
          return (
            <article
              key={user.id}
              role="listitem"
              className={`adminUsersAccordionItem${
                isOpen ? " adminUsersAccordionItem--open" : ""
              }`}
            >
              <button
                type="button"
                className="adminUsersAccordionSummary"
                aria-expanded={isOpen}
                aria-controls={bodyId}
                onClick={() => toggleExpanded(user.id)}
              >
                <span
                  className={`adminUsersAccordionBadge adminUsersAccordionBadge--${user.role}`}
                >
                  {roleLabel(user.role)}
                </span>
                <span className="adminUsersAccordionTitle">{user.name}</span>
                <span className="adminUsersAccordionSub">{user.email}</span>
                <span className="adminUsersAccordionChevron" aria-hidden="true" />
              </button>
              <div
                id={bodyId}
                className="adminUsersAccordionBody"
                hidden={!isOpen}
              >
                <dl className="adminUsersAccordionGrid">
                  <div>
                    <dt>Nombre</dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div>
                    <dt>Correo</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div>
                    <dt>Rol</dt>
                    <dd>{roleLabel(user.role)}</dd>
                  </div>
                  <div>
                    <dt>Alta</dt>
                    <dd>{formatDate(user.createdAt)}</dd>
                  </div>
                </dl>
                {renderRowActions(user)}
              </div>
            </article>
          );
        })}
      </div>

      <div className="adminUsersTableWrap">
        <table className="dataTable adminUsersTable">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td
                  style={{ textTransform: "uppercase", fontSize: "0.75rem" }}
                >
                  {user.role}
                </td>
                <td style={{ color: "var(--muted)" }}>
                  {formatDate(user.createdAt)}
                </td>
                <td>{renderRowActions(user)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingUser && draft ? (
        <div
          className="adminContactModalBackdrop"
          role="presentation"
          onClick={closeEdit}
        >
          <div
            className="adminContactModal adminUsersModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-user-edit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="adminContactModalHead">
              <div>
                <p className="adminContactModalEyebrow">Modificar usuario</p>
                <h2 id="admin-user-edit-title">{editingUser.name}</h2>
              </div>
              <button
                type="button"
                className="adminContactModalClose"
                aria-label="Cerrar"
                onClick={closeEdit}
              >
                ×
              </button>
            </div>

            {actionError ? (
              <div className="authErrorBanner" role="alert">
                {actionError}
              </div>
            ) : null}

            <form
              className="adminUsersForm"
              onSubmit={(event) => {
                event.preventDefault();
                requestSave();
              }}
            >
              <label className="adminUsersField">
                <span>Nombre</span>
                <input
                  className="field"
                  value={draft.name}
                  onChange={(event) =>
                    setDraft({ ...draft, name: event.target.value })
                  }
                  required
                />
              </label>
              <label className="adminUsersField">
                <span>Correo</span>
                <input
                  className="field"
                  type="email"
                  value={draft.email}
                  onChange={(event) =>
                    setDraft({ ...draft, email: event.target.value })
                  }
                  required
                />
              </label>
              <label className="adminUsersField">
                <span>Rol</span>
                <select
                  className="field"
                  value={draft.role}
                  onChange={(event) =>
                    setDraft({
                      ...draft,
                      role: event.target.value as UserRole,
                    })
                  }
                >
                  <option value="user">Miembro</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label className="adminUsersField">
                <span>Nueva contraseña (opcional)</span>
                <input
                  className="field"
                  type="password"
                  value={draft.password}
                  autoComplete="new-password"
                  placeholder="Dejar vacío para no cambiar"
                  onChange={(event) =>
                    setDraft({ ...draft, password: event.target.value })
                  }
                />
              </label>
              <div className="adminContactModalActions">
                <button type="button" className="btn light" onClick={closeEdit}>
                  Cancelar
                </button>
                <button type="submit" className="btn" disabled={pending}>
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {confirmKind === "save" && editingUser ? (
        <div
          className="adminContactModalBackdrop adminUsersConfirmLayer"
          role="presentation"
          onClick={() => setConfirmKind(null)}
        >
          <div
            className="adminContactModal adminUsersConfirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="admin-user-save-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="admin-user-save-title">Confirmar cambios</h2>
            <p>
              ¿Deseas guardar los cambios del usuario{" "}
              <strong>{editingUser.name}</strong>?
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
                onClick={() => setConfirmKind(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={confirmSave}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmKind === "delete" && deleteTarget ? (
        <div
          className="adminContactModalBackdrop adminUsersConfirmLayer"
          role="presentation"
          onClick={() => {
            setConfirmKind(null);
            setDeleteTarget(null);
          }}
        >
          <div
            className="adminContactModal adminUsersConfirm"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="admin-user-delete-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="admin-user-delete-title">Eliminar usuario</h2>
            <p>
              ¿Eliminar a <strong>{deleteTarget.name}</strong> (
              {deleteTarget.email})? Esta acción no se puede deshacer.
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
                  setConfirmKind(null);
                  setDeleteTarget(null);
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
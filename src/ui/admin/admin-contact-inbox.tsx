"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useTransition } from "react";

import { setContactReadAction } from "@/app/actions/admin-contact";
import type { ContactMessage } from "@/domain/contact";
import { formatDate } from "@/lib/utils/format-date";

type SortKey = "date-desc" | "date-asc" | "unread-first" | "read-first";
type StatusFilter = "all" | "read" | "unread";

type Props = {
  messages: ContactMessage[];
};

function sortMessages(items: ContactMessage[], sort: SortKey) {
  const copy = [...items];
  copy.sort((a, b) => {
    switch (sort) {
      case "date-asc":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "unread-first":
        if (a.read !== b.read) return Number(a.read) - Number(b.read);
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "read-first":
        if (a.read !== b.read) return Number(b.read) - Number(a.read);
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "date-desc":
      default:
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });
  return copy;
}

export function AdminContactInbox({ messages }: Props) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("unread");
  const [sortKey, setSortKey] = useState<SortKey>("date-desc");
  const [localMessages, setLocalMessages] = useState(messages);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const filtered = useMemo(() => {
    const byStatus = localMessages.filter((message) => {
      if (statusFilter === "read") return message.read;
      if (statusFilter === "unread") return !message.read;
      return true;
    });
    return sortMessages(byStatus, sortKey);
  }, [localMessages, sortKey, statusFilter]);

  const selected = selectedId
    ? (localMessages.find((m) => m.id === selectedId) ?? null)
    : null;

  const toggleRead = (message: ContactMessage) => {
    const next = !message.read;
    startTransition(async () => {
      const result = await setContactReadAction(message.id, next);
      if (result.error) return;
      setLocalMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, read: next } : item,
        ),
      );
    });
  };

  return (
    <div className="adminContactInbox">
      <div className="adminContactToolbar">
        <div className="adminContactFilters">
          <label className="adminContactFilterField">
            <span>Estado</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as StatusFilter)
              }
            >
              <option value="unread">No vistos</option>
              <option value="read">Vistos</option>
              <option value="all">Todos</option>
            </select>
          </label>
          <label className="adminContactFilterField">
            <span>Ordenar</span>
            <select
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value as SortKey)}
            >
              <option value="date-desc">Fecha: más recientes</option>
              <option value="date-asc">Fecha: más antiguas</option>
              <option value="unread-first">No vistos primero</option>
              <option value="read-first">Vistos primero</option>
            </select>
          </label>
        </div>
        <Link href="/contacto" className="btn light adminContactFormLink">
          Abrir formulario público ↗
        </Link>
      </div>

      <p className="adminContactSummary">
        {filtered.length} mensaje{filtered.length === 1 ? "" : "s"} en esta vista
      </p>

      {filtered.length === 0 ? (
        <p className="adminContactEmpty">No hay mensajes con este filtro.</p>
      ) : (
        <ul className="adminContactList">
          {filtered.map((message) => (
            <li key={message.id} className="adminContactRow infoCard">
              <div className="adminContactRowMain">
                <h3>{message.subject}</h3>
                <p className="adminContactRowMeta">
                  {message.name} · {message.email} · {formatDate(message.createdAt)}
                </p>
                <span
                  className={
                    message.read
                      ? "adminContactBadge adminContactBadgeRead"
                      : "adminContactBadge adminContactBadgeUnread"
                  }
                >
                  {message.read ? "Visto" : "No visto"}
                </span>
              </div>
              <div className="adminContactRowActions">
                <button
                  type="button"
                  className="btn light"
                  onClick={() => setSelectedId(message.id)}
                >
                  Abrir
                </button>
                <button
                  type="button"
                  className="btn"
                  disabled={pending}
                  onClick={() => toggleRead(message)}
                >
                  {message.read ? "Marcar no visto" : "Marcar visto"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected ? (
        <div
          className="adminContactModalBackdrop"
          role="presentation"
          onClick={() => setSelectedId(null)}
        >
          <div
            className="adminContactModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-contact-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="adminContactModalHead">
              <div>
                <p className="adminContactModalEyebrow">Mensaje de contacto</p>
                <h2 id="admin-contact-modal-title">{selected.subject}</h2>
              </div>
              <button
                type="button"
                className="adminContactModalClose"
                aria-label="Cerrar"
                onClick={() => setSelectedId(null)}
              >
                ×
              </button>
            </div>
            <span
              className={
                selected.read
                  ? "adminContactBadge adminContactBadgeRead"
                  : "adminContactBadge adminContactBadgeUnread"
              }
            >
              {selected.read ? "Visto" : "No visto"}
            </span>
            <dl className="adminContactDetailGrid">
              <div>
                <dt>Nombre</dt>
                <dd>{selected.name}</dd>
              </div>
              <div>
                <dt>Correo</dt>
                <dd>
                  <a href={`mailto:${selected.email}`}>{selected.email}</a>
                </dd>
              </div>
              <div>
                <dt>Fecha</dt>
                <dd>{formatDate(selected.createdAt)}</dd>
              </div>
              <div className="adminContactDetailFull">
                <dt>Mensaje</dt>
                <dd>{selected.message}</dd>
              </div>
            </dl>
            <div className="adminContactModalActions">
              <button
                type="button"
                className="btn"
                disabled={pending}
                onClick={() => toggleRead(selected)}
              >
                {selected.read ? "Marcar no visto" : "Marcar visto"}
              </button>
              <a className="btn light" href={`mailto:${selected.email}`}>
                Responder por correo ↗
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
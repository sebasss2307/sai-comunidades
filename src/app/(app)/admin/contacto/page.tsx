import type { Metadata } from "next";

import { getContactRepository } from "@/repositories";
import { AdminContactInbox } from "@/ui/admin/admin-contact-inbox";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Contacto · Admin",
};

export default async function AdminContactPage() {
  const repo = getContactRepository();
  const messages = await repo.listAll();
  const unread = messages.filter((message) => !message.read).length;

  return (
    <>
      <MarketingPageHeader
        eyebrow="Registro"
        title="Mensajes de contacto"
        lead={`${messages.length} registros MOCK · ${unread} no vistos`}
      />
      <AdminContactInbox messages={messages} />
    </>
  );
}
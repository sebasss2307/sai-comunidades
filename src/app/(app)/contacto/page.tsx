import type { Metadata } from "next";

import { ContactMetaBar } from "@/ui/contact/contact-meta-bar";
import { ContactForm } from "@/ui/forms/contact-form";
import { MarketingPageHeader } from "@/ui/layout/marketing-page-header";

export const metadata: Metadata = {
  title: "Contacto",
};

export default function ContactPage() {
  return (
    <section className="appSection forum" id="contacto">
      <div className="wrap">
        <MarketingPageHeader
          eyebrow="Hablemos de tu comunidad"
          title="Contacto"
          lead="Escríbenos para sumarte como voluntario, proponer actividades o consultar sobre administración de tu condominio. Los envíos se guardan en MOCK y aparecen en el panel admin."
        />
        <article className="forumPanel contactPagePanel">
          <ContactForm messageRows={10} />
          <ContactMetaBar />
        </article>
      </div>
    </section>
  );
}
import type { ReactNode } from "react";

export function MarketingPageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <div className="sectionHead appSectionHead">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="appPageTitle">{title}</h2>
        {lead ? <p className="appPageLead">{lead}</p> : null}
      </div>
      {children}
    </div>
  );
}
const CONTACT_LINES = [
  {
    label: "Correo",
    value: "contacto@saicomunidades.cl",
    href: "mailto:contacto@saicomunidades.cl",
  },
  {
    label: "Teléfono",
    value: "+56 9 5555 0101",
    href: "tel:+56955550101",
  },
  {
    label: "Zona",
    value: "Santiago Poniente, Chile",
  },
] as const;

export function ContactMetaBar() {
  return (
    <div className="contactMetaBar contactMetaBar--footer">
      <ul className="contactMetaList" aria-label="Datos de contacto">
        {CONTACT_LINES.map((item) => (
          <li key={item.label}>
            <span className="contactMetaLabel">{item.label}</span>
            {"href" in item && item.href ? (
              <a className="contactMetaValue" href={item.href}>
                {item.value}
              </a>
            ) : (
              <span className="contactMetaValue">{item.value}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
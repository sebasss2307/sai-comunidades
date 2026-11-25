import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footerGrid">
          <div>
            <div className="footerBrand">
              SAI<span>COMUNIDADES</span>
            </div>
            <p>
              Administración y gestión de edificios y condominios.
              <br />
              Una comunidad bien administrada se nota.
            </p>
          </div>
          <div>
            <h4>Explorar</h4>
            <div className="footerLinks">
              <Link href="/#servicios">Servicios</Link>
              <Link href="/#seguridad">Seguridad</Link>
              <Link href="/#nosotros">Nosotros</Link>
              <Link href="/#preguntas">Preguntas frecuentes</Link>
              <Link href="/foro">Foro</Link>
            </div>
          </div>
          <div>
            <h4>Contacto</h4>
            <div className="footerLinks">
              <a href="mailto:contacto@saicomunidades.cl">
                contacto@saicomunidades.cl
              </a>
              <Link href="/contacto">Solicitar información</Link>
              <span style={{ color: "#c0cec5", fontSize: ".85rem" }}>
                Santiago Poniente, Chile
              </span>
            </div>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 SAI Comunidades. Prototipo de sitio web.</span>
          <span>Marca comercial en etapa de desarrollo.</span>
        </div>
        <p className="disclaimer" style={{ color: "#aabbb0" }}>
          La identidad SAI Comunidades es una marca comercial en desarrollo. La
          prestación efectiva de servicios debe identificar a la persona natural o
          jurídica que corresponda y sus datos legales vigentes.
        </p>
      </div>
    </footer>
  );
}
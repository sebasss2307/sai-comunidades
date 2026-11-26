import Image from "next/image";
import Link from "next/link";

import { LandingFaq } from "@/ui/landing/landing-faq";
import { LandingForumTeaser } from "@/ui/landing/landing-forum-teaser";
import { landingImages } from "@/ui/landing/landing-images";
import type { LandingService } from "@/ui/landing/landing-services";
import { LandingNav } from "@/ui/landing/landing-nav";
import { ServicesSection } from "@/ui/landing/services-section";
import { LandingFooter } from "@/ui/layout/landing-footer";

type Props = {
  services: LandingService[];
  initialNavIsAdmin?: boolean;
  initialNavIsLoggedIn?: boolean;
  initialNavUserName?: string | null;
};

export function SaiLandingPage({
  services,
  initialNavIsAdmin,
  initialNavIsLoggedIn,
  initialNavUserName,
}: Props) {
  return (
    <>
      <LandingNav
        initialIsAdmin={initialNavIsAdmin}
        initialIsLoggedIn={initialNavIsLoggedIn}
        initialUserName={initialNavUserName}
      />
      <main>
        <section className="hero" id="inicio">
          <div className="wrap heroGrid">
            <div>
              <div className="eyebrow heroEyebrow">
                Administración · Gestión · Comunidades
              </div>
              <h1>Una comunidad bien administrada se nota.</h1>
              <p>
                Administración y gestión de edificios y condominios con procesos
                claros, comunicación cercana y una mirada responsable sobre cada
                espacio compartido.
              </p>
              <div className="heroActions">
                <Link className="btn contactCtaRing" href="/contacto">
                  Solicitar una conversación ↗
                </Link>
                <a className="btn light" href="#servicios">
                  Conocer nuestros servicios
                </a>
              </div>
              <p className="heroNote">
                Una gestión presente, ordenada y transparente para la vida
                cotidiana de tu comunidad.
              </p>
            </div>
            <div className="heroVisual">
              <Image
                src={landingImages.edificio}
                alt="Arquitectura residencial contemporánea y espacios comunes"
                width={1200}
                height={800}
                className="h-full min-h-[480px] w-full object-cover"
                priority
              />
              <div className="visualTag">
                <b>Gestión con criterio.</b>
                <span>
                  El cuidado de una comunidad empieza por cómo se administra.
                </span>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        <section id="servicios">
          <ServicesSection services={services} />
        </section>

        <section id="seguridad" className="securitySection">
          <div className="wrap">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">Seguridad y control operativo</div>
                <h2>
                  Una comunidad más ordenada
                  <br />
                  también necesita prevención.
                </h2>
              </div>
              <p>
                Integramos conocimiento en CCTV y supervisión de seguridad a la
                gestión cotidiana del condominio, con foco en la prevención, la
                coordinación y el seguimiento responsable.
              </p>
            </div>
            <div className="securityGrid">
              <div className="securityPhoto">
                <Image
                  src={landingImages.cctv}
                  alt="Pasillos y accesos de un edificio residencial bajo administración"
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover"
                />
              </div>
              <SecurityCopy />
            </div>
          </div>
        </section>

        <section className="about" id="nosotros">
          <div className="wrap aboutGrid">
            <div className="aboutPhoto">
              <Image
                src={landingImages.conjunto}
                alt="Conjunto de edificios residenciales con gestión profesional"
                width={1200}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
            <AboutCopy />
          </div>
        </section>

        <section id="metodo">
          <MetodoSection />
        </section>

        <section className="law" id="actualidad">
          <LawSection />
        </section>

        <section id="preguntas">
          <div className="wrap">
            <div className="sectionHead">
              <div>
                <div className="eyebrow">Preguntas frecuentes</div>
                <h2>
                  Respuestas para partir
                  <br />
                  con claridad.
                </h2>
              </div>
              <p>
                Una guía inicial para comités y residentes. Cada comunidad tiene
                particularidades: los casos concretos deben revisarse con sus
                antecedentes.
              </p>
            </div>
            <LandingFaq />
            <p className="disclaimer">
              Contenido informativo general. No constituye asesoría jurídica ni
              reemplaza la revisión de la ley vigente, reglamentos, antecedentes
              y acuerdos de cada comunidad.
            </p>
          </div>
        </section>

        <section className="forum" id="foro">
          <div className="wrap forumGrid">
            <div className="forumIntro">
              <div className="eyebrow">Espacio abierto</div>
              <h2>Ideas, preguntas y conversación entre comunidades.</h2>
              <p>
                Un foro para compartir información útil sobre copropiedad,
                operación residencial y buenas prácticas de convivencia.
              </p>
            </div>
            <LandingForumTeaser />
          </div>
        </section>

        <section className="cta" id="contacto">
          <div className="wrap">
            <div className="ctaBox">
              <div>
                <div className="eyebrow">Hablemos de tu comunidad</div>
                <h2>
                  ¿Buscan una administración
                  <br />
                  con método y cercanía?
                </h2>
                <p>
                  Cuéntanos brevemente sobre tu comunidad y coordinemos una
                  conversación inicial.
                </p>
              </div>
              <Link className="btn contactCtaRing" href="/contacto">
                Ir al formulario de contacto ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </>
  );
}

function TrustBar() {
  return (
    <div className="trust">
      <div className="wrap trustGrid">
        <div className="trustItem">
          <div className="trustIcon">✓</div>
          <div>
            <b>Procesos claros</b>
            <span>Seguimiento y organización cotidiana.</span>
          </div>
        </div>
        <div className="trustItem">
          <div className="trustIcon">◎</div>
          <div>
            <b>Comunicación cercana</b>
            <span>Información comprensible y oportuna.</span>
          </div>
        </div>
        <div className="trustItem">
          <div className="trustIcon">⌂</div>
          <div>
            <b>Mirada residencial</b>
            <span>Atención a las necesidades de cada comunidad.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecurityCopy() {
  return (
    <div className="securityContent">
      <div className="securityIntro">
        La seguridad no depende solo de tener cámaras: requiere procedimientos
        claros, equipos operativos y personas que sepan cómo actuar.
      </div>
      <div className="securityPoints">
        <article>
          <span>01</span>
          <div>
            <h3>Conocimiento en CCTV</h3>
            <p>
              Apoyo en la revisión operativa de sistemas de videovigilancia,
              cobertura de cámaras, puntos críticos, funcionamiento general y
              buenas prácticas para el resguardo y uso responsable de registros.
            </p>
          </div>
        </article>
        <article>
          <span>02</span>
          <div>
            <h3>Supervisión de seguridad</h3>
            <p>
              Conocimiento de procesos de supervisión, control de cumplimiento
              de protocolos, coordinación con conserjería y seguimiento de
              novedades e incidencias de la comunidad.
            </p>
          </div>
        </article>
        <article>
          <span>03</span>
          <div>
            <h3>Prevención y trazabilidad</h3>
            <p>
              Promovemos canales de comunicación, registro de eventos, derivación
              oportuna y coordinación con proveedores y responsables, respetando
              las funciones de cada actor.
            </p>
          </div>
        </article>
      </div>
      <p className="securityNote">
        Este apoyo se enfoca en la gestión y supervisión operativa del
        condominio. No sustituye servicios de vigilancia, empresas de seguridad
        ni asesorías reguladas que deban ser prestadas por personas o entidades
        habilitadas conforme a la normativa vigente.
      </p>
    </div>
  );
}

function AboutCopy() {
  return (
    <div>
      <div className="eyebrow">Nuestra mirada</div>
      <h2>La confianza se construye con gestión visible.</h2>
      <p>
        En SAI Comunidades entendemos que cada edificio tiene su propia dinámica,
        prioridades y desafíos. Por eso, la administración debe partir
        escuchando, ordenar la información y trabajar con método.
      </p>
      <p>
        Buscamos que el comité y los residentes tengan claridad sobre los temas
        relevantes, los acuerdos y el estado de las gestiones.
      </p>
      <ValuesGrid />
    </div>
  );
}

function ValuesGrid() {
  const values = [
    ["Transparencia", "Información clara y trazable."],
    ["Responsabilidad", "Compromisos y seguimiento."],
    ["Proximidad", "Comunicación respetuosa."],
    ["Planificación", "Anticipar antes que improvisar."],
  ] as const;
  return (
    <div className="values">
      {values.map(([title, desc]) => (
        <div className="value" key={title}>
          <b>{title}</b>
          <span>{desc}</span>
        </div>
      ))}
    </div>
  );
}

function MetodoSection() {
  const steps = [
    ["01", "Conocer", "Revisamos la situación de la comunidad, sus necesidades, documentación y prioridades."],
    ["02", "Ordenar", "Definimos prioridades, responsables, calendario y canales de comunicación."],
    ["03", "Gestionar", "Coordinamos tareas, proveedores, requerimientos y acuerdos de la comunidad."],
    ["04", "Informar", "Realizamos seguimiento y mantenemos informados al comité y a los residentes."],
  ] as const;
  return (
    <div className="wrap">
      <div className="sectionHead">
        <div>
          <div className="eyebrow">Cómo trabajamos</div>
          <h2>
            Un método sencillo.
            <br />
            Una gestión consistente.
          </h2>
        </div>
        <p>
          La administración comienza con un diagnóstico y se sostiene con
          planificación, comunicación y revisión continua.
        </p>
      </div>
      <div className="steps">
        {steps.map(([num, title, body]) => (
          <article className="step" key={num}>
            <div className="num">{num}</div>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function LawSection() {
  return (
    <div className="wrap lawGrid">
      <div>
        <div className="eyebrow">Información para comunidades</div>
        <h2
          style={{
            fontSize: "clamp(2.2rem,4vw,3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-.05em",
            color: "var(--green)",
          }}
        >
          Conocer las reglas también es parte de convivir.
        </h2>
        <p style={{ color: "var(--muted)" }}>
          La Ley 21.442 regula la copropiedad inmobiliaria en Chile. Entender sus
          principios ayuda a comités, copropietarios y administradores a tomar
          decisiones informadas.
        </p>
        <div className="lawLinks">
          <a
            className="lawLink"
            href="https://www.bcn.cl/leychile/navegar?idNorma=1174663"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar Ley 21.442 en Ley Chile <span>↗</span>
          </a>
          <a
            className="lawLink"
            href="https://www.minvu.gob.cl/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Información del MINVU <span>↗</span>
          </a>
        </div>
      </div>
      <div className="lawBox">
        <div className="eyebrow" style={{ color: "#cbd8cf" }}>
          SAI / APUNTES DE COPROPIEDAD
        </div>
        <h3>
          La buena administración no reemplaza la participación de la comunidad.
        </h3>
        <p>
          El comité, la asamblea y la administración tienen funciones distintas.
          Los acuerdos deben adoptarse por los órganos que correspondan y quedar
          debidamente registrados.
        </p>
        <a
          className="btn"
          style={{
            background: "#f5f2ec",
            color: "#0f3b34",
            borderColor: "#f5f2ec",
          }}
          href="#foro"
        >
          Explorar el foro ↗
        </a>
      </div>
    </div>
  );
}

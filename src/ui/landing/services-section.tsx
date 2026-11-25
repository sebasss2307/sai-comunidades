import { ServicesCarousel } from "@/ui/landing/services-carousel";
import type { LandingService } from "@/ui/landing/landing-services";

export function ServicesSection({ services }: { services: LandingService[] }) {
  return (
    <div className="wrap">
      <div className="sectionHead">
        <div>
          <div className="eyebrow">Qué hacemos</div>
          <h2>
            Administrar es mucho más
            <br />
            que resolver urgencias.
          </h2>
        </div>
        <p>
          Una buena administración combina planificación, control, coordinación y
          comunicación. Estos son los ámbitos que estructuran nuestro trabajo.
        </p>
      </div>
      <ServicesCarousel items={services} />
    </div>
  );
}
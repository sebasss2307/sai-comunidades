import type { LandingServiceItem } from "@/domain/landing-service";
import { landingImages } from "@/ui/landing/landing-images";

export const mockLandingCarousel: LandingServiceItem[] = [
  {
    id: "svc_admin",
    img: landingImages.comunidad,
    alt: "Llaves y gestión de una propiedad en condominio",
    num: "01 / ADMINISTRACIÓN",
    title: "Gestión administrativa",
    body: "Organización documental, coordinación con el comité, seguimiento de acuerdos y atención de requerimientos de la comunidad.",
  },
  {
    id: "svc_finanzas",
    img: landingImages.finanzas,
    alt: "Firma de documentos y control financiero del edificio",
    num: "02 / CONTROL",
    title: "Gestión financiera",
    body: "Seguimiento presupuestario, revisión de gastos, apoyo en procesos de cobranza y rendición de cuentas clara.",
  },
  {
    id: "svc_mantencion",
    img: landingImages.mantencion,
    alt: "Mantención y cuidado de espacios comunes del edificio",
    num: "03 / OPERACIÓN",
    title: "Mantención y proveedores",
    body: "Coordinación de trabajos, control de solicitudes y seguimiento de mantenciones preventivas y correctivas.",
  },
  {
    id: "svc_comunicacion",
    img: landingImages.oficina,
    alt: "Equipo de administración en reunión con residentes",
    num: "04 / COMUNICACIÓN",
    title: "Información a residentes",
    body: "Canales de comunicación ordenados, avisos relevantes y apoyo para una convivencia informada.",
  },
  {
    id: "svc_convivencia",
    img: landingImages.comunInterior,
    alt: "Amenidades y espacios compartidos del condominio",
    num: "05 / CONVIVENCIA",
    title: "Apoyo a la comunidad",
    body: "Gestión de solicitudes, orientación sobre procedimientos y colaboración en la resolución temprana de situaciones.",
  },
  {
    id: "svc_normativa",
    img: landingImages.planificacion,
    alt: "Planos y revisión normativa del inmueble",
    num: "06 / CUMPLIMIENTO",
    title: "Gestión normativa",
    body: "Seguimiento de obligaciones y apoyo para mantener procedimientos alineados con la normativa aplicable.",
  },
];
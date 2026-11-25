"use client";

import { useState } from "react";

const faqs = [
  {
    q: "¿Qué hace un administrador de condominios?",
    a: "Ejecuta las labores de administración conforme a la Ley 21.442, su reglamento, el reglamento de copropiedad y los acuerdos válidamente adoptados por la comunidad. Entre otras tareas, coordina mantenciones, gestiona asuntos administrativos y financieros, y mantiene informados a los órganos de la comunidad.",
  },
  {
    q: "¿Cuál es la diferencia entre el comité y el administrador?",
    a: "El comité ejerce las atribuciones que le entrega la ley y representa a la asamblea en los términos legales. El administrador ejecuta la gestión cotidiana y los acuerdos dentro de sus facultades. No son roles intercambiables: deben coordinarse respetando sus competencias.",
  },
  {
    q: "¿Los gastos comunes son lo mismo que los honorarios de administración?",
    a: "No. Los gastos comunes son obligaciones económicas de los copropietarios para financiar gastos comunes del condominio. Los honorarios corresponden a la remuneración por el servicio de administración y deben tratarse de manera clara y documentada.",
  },
  {
    q: "¿Cómo se elige o cambia a un administrador?",
    a: "La designación y remoción deben realizarse conforme a la Ley 21.442 y las reglas aplicables a la asamblea y al comité. Es importante revisar el acta, las facultades y las formalidades correspondientes antes de implementar el cambio.",
  },
  {
    q: "¿El administrador debe estar inscrito en un registro?",
    a: "La Ley 21.442 contempla un Registro Nacional de Administradores de Condominios. Quienes ejerzan como administradores deben cumplir los requisitos e inscripción que correspondan según su calidad y modalidad de prestación.",
  },
  {
    q: "¿SAI puede administrar cualquier tipo de condominio?",
    a: "Cada comunidad requiere una evaluación previa. Antes de presentar una propuesta revisamos tamaño, instalaciones, dotación, situación administrativa, necesidades y carga operativa, para determinar si existe capacidad real de prestar un servicio adecuado.",
  },
];

export function LandingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faqList">
      {faqs.map((item, index) => {
        const open = openIndex === index;
        return (
          <div key={item.q} className={`faqItem${open ? " open" : ""}`}>
            <button
              type="button"
              className="faqQ"
              onClick={() => setOpenIndex(open ? null : index)}
            >
              {item.q} <span className="plus">＋</span>
            </button>
            <div className="faqA">{item.a}</div>
          </div>
        );
      })}
    </div>
  );
}
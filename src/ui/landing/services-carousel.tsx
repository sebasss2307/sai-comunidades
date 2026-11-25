"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";

import type { LandingService } from "@/ui/landing/landing-services";

type Props = {
  items: LandingService[];
};

const AUTOPLAY_MS = 5500;
const VISIBLE_RADIUS = 2;
/** Debe coincidir con el % usado en `slideTransform` (78% por slide). */
const SLIDE_STEP_RATIO = 0.78;
const DRAG_COMMIT_RATIO = 0.16;

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const candidates = [offset, offset - total, offset + total];
  return candidates.reduce(
    (best, candidate) =>
      Math.abs(candidate) < Math.abs(best) ? candidate : best,
    offset,
  );
}

function pxPerSlide(stageWidth: number) {
  return stageWidth * SLIDE_STEP_RATIO;
}

function slideTransform(effectiveOffset: number): {
  transform: string;
  opacity: number;
  zIndex: number;
} {
  const abs = Math.min(Math.abs(effectiveOffset), VISIBLE_RADIUS + 1);
  const scale = 1 - abs * 0.16;
  const translateXPercent = effectiveOffset * 78;
  const opacity = Math.max(0, 1 - abs * 0.28);

  return {
    transform: `translate(calc(-50% + ${translateXPercent}%), -50%) scale(${scale})`,
    opacity,
    zIndex: Math.round(20 - abs),
  };
}

export function ServicesCarousel({ items }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWidthRef = useRef(360);
  const dragStartXRef = useRef(0);
  const isDraggingRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      const total = items.length;
      setActiveIndex(((index % total) + total) % total);
    },
    [items.length],
  );

  const step = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => {
        const total = items.length;
        return ((current + direction) % total + total) % total;
      });
    },
    [items.length],
  );

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      stageWidthRef.current = el.getBoundingClientRect().width;
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const finishDrag = useCallback(
    (deltaPx: number) => {
      const pxPer = pxPerSlide(stageWidthRef.current);
      // Mismo sentido que el puntero: deltaPx < 0 (izquierda) mueve tarjetas a la izquierda.
      const visualShift = deltaPx / pxPer;
      let indexDelta = 0;

      if (Math.abs(visualShift) >= DRAG_COMMIT_RATIO) {
        indexDelta = -Math.round(visualShift);
        if (indexDelta === 0) {
          indexDelta = visualShift > 0 ? -1 : 1;
        }
      }

      // Compensa el cambio de índice para que el primer frame no salte.
      const remainderPx = (visualShift + indexDelta) * pxPer;

      setIsDragging(false);
      isDraggingRef.current = false;
      setDragPx(remainderPx);

      if (indexDelta !== 0) {
        setActiveIndex((current) => {
          const total = items.length;
          return ((current + indexDelta) % total + total) % total;
        });
      }

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setDragPx(0);
        });
      });
    },
    [items.length],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || isDragging) return;
    const id = window.setInterval(() => step(1), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, reducedMotion, isDragging, step]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    setPaused(true);
    dragStartXRef.current = event.clientX;
    setDragPx(0);
    stageRef.current?.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  /** Misma dirección que el puntero: izquierda → delta negativo. */
  const pointerDragPx = (clientX: number) =>
    clientX - dragStartXRef.current;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    setDragPx(pointerDragPx(event.clientX));
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    if (stageRef.current?.hasPointerCapture(event.pointerId)) {
      stageRef.current.releasePointerCapture(event.pointerId);
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    handlePointerEnd(event);
    if (!isDraggingRef.current) return;
    finishDrag(pointerDragPx(event.clientX));
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    handlePointerEnd(event);
    finishDrag(0);
  };

  const dragSlideOffset = dragPx / pxPerSlide(stageWidthRef.current);

  return (
    <div
      className="servicesCoverflowWrap"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!isDragging) setPaused(false);
      }}
    >
      <button
        type="button"
        className="coverflowNav coverflowNavPrev"
        aria-label="Servicio anterior"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => step(-1)}
      >
        ←
      </button>

      <div
        ref={stageRef}
        className={`servicesCoverflowStage${isDragging ? " isDragging" : ""}`}
        aria-roledescription="carrusel"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <p className="coverflowDragHint" aria-hidden>
          {isDragging ? "Suelta para elegir" : "Arrastra para explorar"}
        </p>
        <div className="servicesCoverflowTrack">
          {items.map((card, index) => {
            const displayOffset = getWrappedOffset(
              index,
              activeIndex,
              items.length,
            );

            if (Math.abs(displayOffset) > VISIBLE_RADIUS && !isDragging) {
              return null;
            }

            const effectiveOffset = displayOffset + dragSlideOffset;
            if (Math.abs(effectiveOffset) > VISIBLE_RADIUS + 0.6) {
              return null;
            }

            const { transform, opacity, zIndex } =
              slideTransform(effectiveOffset);

            const isCenter = Math.abs(effectiveOffset) < 0.35;

            return (
              <article
                key={card.id}
                className={`card servicesCoverflowSlide${
                  isCenter ? " isCenter" : ""
                }${!isDragging && !reducedMotion ? " animated" : ""}`}
                style={{
                  zIndex,
                  opacity,
                  transform,
                }}
                aria-hidden={!isCenter}
              >
                {card.img.startsWith("data:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={card.img}
                    alt={card.alt}
                    className="servicesCarouselImage"
                    draggable={false}
                  />
                ) : (
                  <Image
                    src={card.img}
                    alt={card.alt}
                    width={900}
                    height={400}
                    className="servicesCarouselImage"
                    draggable={false}
                    priority={displayOffset === 0 && !isDragging}
                  />
                )}
                <div className="cardBody">
                  <span className="number">{card.num}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="coverflowNav coverflowNavNext"
        aria-label="Servicio siguiente"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => step(1)}
      >
        →
      </button>

      <div className="servicesCarouselDots" role="tablist" aria-label="Servicios">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={activeIndex === index}
            aria-label={item.title}
            className={`carouselDot${activeIndex === index ? " active" : ""}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
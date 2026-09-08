import type { PointerEvent as ReactPointerEvent } from "react";
import { useEffect, useRef, useState } from "react";

// Idle auto-rotation speed, in degrees per second.
const AUTO_ROTATE_SPEED = 9;
// How many degrees the ring turns per pixel of horizontal drag.
const DRAG_SENSITIVITY = 0.4;
// How quickly the rotation velocity eases back toward AUTO_ROTATE_SPEED
// after a drag/flick - higher is snappier, lower feels floatier.
const MOMENTUM_EASING = 2.5;

// Drives a ring's rotateY transform directly on its DOM node (bypassing
// React state) so idle auto-rotation, drag and momentum all stay on one
// smooth requestAnimationFrame loop. The ring can be grabbed and dragged to
// spin it manually - releasing it carries the flick as momentum that eases
// back into the idle auto-rotation. Hovering pauses rotation entirely.
export function useDiskRotation(enabled: boolean) {
  const ringRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const velocityRef = useRef(AUTO_ROTATE_SPEED);
  const draggingRef = useRef(false);
  const hoveringRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    let frameId: number;
    let lastFrameTime: number | null = null;

    const step = (time: number) => {
      if (lastFrameTime === null) lastFrameTime = time;
      const dt = Math.min((time - lastFrameTime) / 1000, 0.1);
      lastFrameTime = time;

      if (!draggingRef.current && !hoveringRef.current) {
        velocityRef.current +=
          (AUTO_ROTATE_SPEED - velocityRef.current) *
          Math.min(1, dt * MOMENTUM_EASING);
        rotationRef.current += velocityRef.current * dt;
        if (ringRef.current) {
          ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }

      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frameId);
  }, [enabled]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    setIsDragging(true);
    lastPointerXRef.current = event.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;

    const now = performance.now();
    const dt = Math.max((now - lastMoveTimeRef.current) / 1000, 1 / 120);
    const deltaX = event.clientX - lastPointerXRef.current;
    const deltaDeg = deltaX * DRAG_SENSITIVITY;

    lastPointerXRef.current = event.clientX;
    lastMoveTimeRef.current = now;
    rotationRef.current += deltaDeg;
    velocityRef.current = deltaDeg / dt;

    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    setIsDragging(false);
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const handleMouseEnter = () => {
    hoveringRef.current = true;
  };

  const handleMouseLeave = () => {
    hoveringRef.current = false;
  };

  return {
    ringRef,
    isDragging,
    handlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
    },
  };
}

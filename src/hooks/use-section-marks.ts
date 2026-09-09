"use client";

import { useEffect, useState } from "react";

export interface SectionMark {
  id: string;
  percent: number;
}

// Where each section id sits along the page's total scroll range, as a
// percentage — lets the footer progress bar draw chapter dividers that stay
// aligned with the actual layout. Recomputed on resize/content reflow, not
// on every scroll tick, since offsets only shift when the layout does.
export function useSectionMarks(ids: readonly string[]): SectionMark[] {
  const [marks, setMarks] = useState<SectionMark[]>([]);

  useEffect(() => {
    const measure = () => {
      const { scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      if (max <= 0) return;

      setMarks(
        ids.map((id) => {
          const el = document.getElementById(id);
          // getBoundingClientRect + scrollY (not offsetTop) since offsetTop
          // is only relative to the nearest positioned ancestor, and several
          // sections have one — offsetTop would measure from that ancestor
          // instead of from the top of the document.
          const top = el
            ? el.getBoundingClientRect().top + window.scrollY
            : 0;
          return {
            id,
            percent: Math.min(100, Math.max(0, (top / max) * 100)),
          };
        })
      );
    };

    measure();
    window.addEventListener("resize", measure);
    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, [ids]);

  return marks;
}

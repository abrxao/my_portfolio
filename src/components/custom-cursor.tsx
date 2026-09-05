"use client";

import dynamic from "next/dynamic";

export const CustomCursor = dynamic(
  () => import("@/components/custom-cursor-inner"),
  { ssr: false },
);

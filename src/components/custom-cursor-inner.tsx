"use client";

import {
  CursorProvider,
  CursorFollow,
} from "@/components/ui/shadcn-io/animated-cursor";

export default function CustomCursor() {
  return (
    <CursorProvider>
      <CursorFollow>
        <div className="h-4 w-4 rounded-lg bg-zinc-600 dark:bg-zinc-200">
          .
        </div>
      </CursorFollow>
    </CursorProvider>
  );
}

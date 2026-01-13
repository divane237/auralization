"use client";

import { useEffect } from "react";

export default function ScrollToSubchapter({ anchor }) {
  useEffect(() => {
    if (!anchor) return;

    const target = document.getElementById(anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [anchor]);

  return null;
}

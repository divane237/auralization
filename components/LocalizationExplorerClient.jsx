"use client";

import dynamic from "next/dynamic";

const LocalizationExplorer = dynamic(
  () => import("@/components/LocalizationExplorer"),
  { ssr: false }
);

export default function LocalizationExplorerClient() {
  return <LocalizationExplorer />;
}

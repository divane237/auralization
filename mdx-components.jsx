import Callout from "@/components/Callout";
import ImageSection from "@/components/ImageSection";
import MathFormula from "@/components/MathFormula";
import PythonDemo from "@/components/PythonDemoClient";
import VideoSection from "@/components/VideoSection";

const baseComponents = {
  Callout,
  ImageSection,
  VideoSection,
  PythonDemo,
  MathFormula,
};

export function useMDXComponents(components) {
  return {
    ...baseComponents,
    ...components,
  };
}

import { Hero } from "@/components/landing/Hero";
import { CurriculumTracks } from "@/components/landing/CurriculumTracks";
import { ScrollEditorial } from "@/components/landing/ScrollEditorial";
import { BinarySearchPreview } from "@/components/landing/BinarySearchPreview";
import { SystemDesignPreview } from "@/components/landing/SystemDesignPreview";
import { RoadmapPreview } from "@/components/landing/RoadmapPreview";
import { PracticePreview } from "@/components/landing/PracticePreview";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <CurriculumTracks />
      <ScrollEditorial />
      <BinarySearchPreview />
      <SystemDesignPreview />
      <RoadmapPreview />
      <PracticePreview />
      <FinalCta />
    </div>
  );
}


import Hero from "@/features/home/Hero";
import DeveloperTools from "@/features/home/DeveloperTools";
import InterviewPreparation from "@/features/interview/InterviewPreparation";
import LearningPaths from "@/features/roadmap/LearningPaths";
import LatestResources from "@/features/home/LatestResources";




export default function HomePage() {
  return (
    <>
      <Hero />
      <DeveloperTools />
      <InterviewPreparation />
      <LearningPaths />
      <LatestResources />
    </>
  );
}
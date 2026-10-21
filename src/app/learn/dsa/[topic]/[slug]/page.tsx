import React from "react";
import { notFound } from "next/navigation";
import { getLessonBySlug, dsaTopics } from "@/content/dsa";
import { LessonSidebar } from "@/components/learning/LessonSidebar";
import { LessonWorkspace } from "@/components/learning/LessonWorkspace";

interface LessonPageProps {
  params: {
    topic: string;
    slug: string;
  };
}

export function generateStaticParams() {
  return dsaTopics.map((topic) => ({
    topic: "algorithms",
    slug: topic.slug,
  }));
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = getLessonBySlug(params.slug) || getLessonBySlug(params.topic);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <LessonSidebar currentSlug={lesson.slug} />
      <LessonWorkspace lesson={lesson} />
    </div>
  );
}

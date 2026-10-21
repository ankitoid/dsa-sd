import { systemDesignTopics } from "./curriculum";
import { urlShortenerCaseStudy } from "./case-studies/url-shortener";
import { rateLimiterCaseStudy } from "./case-studies/rate-limiter";
import { SystemDesignCaseStudy, SystemDesignTopic } from "@/types";

export { systemDesignTopics };

export const systemDesignCaseStudies: Record<string, SystemDesignCaseStudy> = {
  "url-shortener": urlShortenerCaseStudy,
  "rate-limiter": rateLimiterCaseStudy,
};

export function getCaseStudyBySlug(slug: string): SystemDesignCaseStudy | undefined {
  return systemDesignCaseStudies[slug];
}

export function getSystemDesignTopicBySlug(slug: string): SystemDesignTopic | undefined {
  return systemDesignTopics.find((t) => t.slug === slug);
}

import type { Metadata } from "next";
import { COURSES } from "@/lib/constants";
import CourseClient from "./course-client";

type Props = {
  params: Promise<{ courseId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const unwrappedParams = await params;
  const course = COURSES.find((c) => c.id === unwrappedParams.courseId);
  if (!course) {
    return {
      title: "Course Not Found | AeroSpark Academy",
    };
  }

  // Custom SEO titles requested in 6.12
  const seoTitles: Record<string, string> = {
    "cfd-analysis": "CFD Analysis Course for Aerospace & UAVs | AeroSpark",
    "aerodynamics": "Aerodynamics Course for Aerospace & UAVs | AeroSpark",
    "catia-design": "CATIA Aerospace Design Course | AeroSpark Academy",
    "dgca-drone-regulations": "DGCA Drone Regulations Course | AeroSpark Academy",
    "as9100d-quality": "AS9100D Aerospace Quality Course | AeroSpark Academy",
  };

  const title = seoTitles[course.id] || `${course.title} Course | AeroSpark Academy`;

  return {
    title,
    description: course.description,
  };
}

export default async function CourseDetailsPage({ params }: Props) {
  const unwrappedParams = await params;
  return <CourseClient courseId={unwrappedParams.courseId} />;
}

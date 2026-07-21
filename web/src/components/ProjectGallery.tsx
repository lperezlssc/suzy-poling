"use client";

import { useRef, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { SanityDocument } from "next-sanity";

interface ProjectGalleryProps {
  projects: SanityDocument[];
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - container.offsetLeft;
      scrollLeft.current = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDragging.current = false;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX.current) * 1.5;
      container.scrollLeft = scrollLeft.current - walk;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing select-none"
      style={{
        scrollBehavior: "smooth",
      }}
    >
      {projects.map((project: any) => (
        <div key={project._id} className="flex-shrink-0 w-96 snap-start">
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}

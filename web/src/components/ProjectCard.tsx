import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { urlFor } from "@/sanity/urlBuilder";

interface ProjectCardProps {
  project: SanityDocument & {
    title: string;
    slug: { current: string };
    description: string;
    image: any;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.image
    ? urlFor(project.image).width(600).height(400).url()
    : null;

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <article className="group relative overflow-hidden rounded-lg cursor-grab active:cursor-grabbing transition-transform">
        {imageUrl && (
          <div className="relative w-full aspect-video bg-gray-800">
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-white">{project.title}</h3>
            <p className="text-sm text-gray-200">{project.description}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

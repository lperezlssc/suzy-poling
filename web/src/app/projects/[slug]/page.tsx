import { client } from "@/sanity/client";
import { defineQuery, PortableText, type SanityDocument } from "next-sanity";
import { urlFor } from "@/sanity/urlBuilder";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const PROJECT_QUERY = defineQuery(
  `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    skills,
    body,
    externalLink,
    date,
    _createdAt
  }`
);

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await client.fetch<SanityDocument | null>(
    PROJECT_QUERY,
    { slug },
    options
  );

  if (!project) return notFound();

  const imageUrl = project.image
    ? urlFor(project.image).width(1200).height(600).url()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors mb-4 inline-block"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {project.title as string}
          </h1>
          <p className="text-gray-400 text-lg mb-4">
            {project.description as string}
          </p>
          {project.externalLink && (
            <a
              href={project.externalLink as string}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Visit Project →
            </a>
          )}
        </div>
      </header>

      {/* Hero Image */}
      {imageUrl && (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={project.title as string}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="md:col-span-2">
          {Array.isArray(project.body) && (
            <div className="prose prose-invert max-w-none">
              <PortableText
                value={project.body}
                components={{
                  block: {
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-bold text-white mt-8 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-bold text-white mt-6 mb-3">
                        {children}
                      </h3>
                    ),
                    normal: ({ children }) => (
                      <p className="text-gray-300 text-lg leading-relaxed mb-4">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-1">
          {Array.isArray(project.skills) && project.skills.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.date && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-2">Date</h3>
              <p className="text-gray-400">
                {new Date(project.date as string).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          )}
        </aside>
      </div>

      {/* Footer CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Interested in working together?
          </h2>
          <a
            href="mailto:hello@suzypoling.com"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </div>
  );
}

import { client } from "@/sanity/client";
import { defineQuery, type SanityDocument } from "next-sanity";
import { ProjectGallery } from "@/components/ProjectGallery";

const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    image,
    skills,
    date
  }`
);

const options = { next: { revalidate: 30 } };

export default async function Home() {
  let projects: SanityDocument[] = [];
  let error = null;

  try {
    projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY, {}, options);
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    error = err instanceof Error ? err.message : "Failed to load projects";
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tighter">
            Suzy Poling
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Creative director & designer crafting meaningful digital experiences
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#portfolio"
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </header>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Work
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Drag to explore. Click to view details.
          </p>

          {error ? (
            <div className="text-center py-20 bg-red-900/20 border border-red-800 rounded-lg">
              <p className="text-red-400 text-lg mb-2">⚠ Failed to load projects</p>
              <p className="text-red-300 text-sm">{error}</p>
              <p className="text-red-300 text-sm mt-4 text-xs">
                This is a local development limitation. The portfolio works perfectly when deployed to production.
              </p>
            </div>
          ) : projects.length > 0 ? (
            <ProjectGallery projects={projects} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No projects yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 px-4 md:px-8 bg-gradient-to-t from-black to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Create Together
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
          <a
            href="mailto:hello@suzypoling.com"
            className="inline-block px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  );
}

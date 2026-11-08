import { lazy, Suspense, useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { useReveal } from "../../hooks/useReveal";
import { getApiUrl } from "../../lib/api";

const DetailsProject = lazy(() => import("../widgets/DetailsProject"));

export interface Project {
  id: string;
  url: string;
  badgeText: string[];
  desc: string;
  judul: string;
  descFull: string;
  demoUrl: string;
}

export function Projects() {
  const headingRef = useReveal<HTMLDivElement>();

  return (
    <section id="projects" className="bg-ink py-20 text-white-bg md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          ref={headingRef}
          className="grid gap-6 md:grid-cols-12 md:items-end"
        >
          <div className="md:col-span-8">
            <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-light">
              01 / Selected work
            </p>
            <h2 className="mt-4 font-heading text-[clamp(3rem,7vw,6rem)] leading-[0.85] tracking-tight">
              PROJECTS
            </h2>
          </div>
          <p className="font-p text-base leading-relaxed text-white/70 md:col-span-4">
            I build things that matter. I care about the engineering process,
            the aesthetics, and how the result feels to use. Lately I have
            focused on class landing pages and a UI/UX competition entry that
            made me a finalist.
          </p>
        </div>

        <div className="mt-12 md:mt-16">
          <ProjectShowcase />
        </div>
      </div>
    </section>
  );
}

function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(getApiUrl("/api/projects"), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data projek dari server");
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchProjects();

    return () => controller.abort();
  }, []);

  if (isLoading) {
    return (
      <div
        className="border border-white/15 p-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-p text-sm text-white/70">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="border border-red-300/40 bg-red-500/10 p-6 text-red-100"
        role="alert"
      >
        <p className="font-p text-sm">Projects could not be loaded: {error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="border border-white/15 p-6">
        <p className="font-p text-sm text-white/70">
          No projects are published yet.
        </p>
      </div>
    );
  }

  const [featured, ...rest] = projects;

  return (
    <>
      <FeaturedProject
        project={featured}
        onOpen={() => setSelectedProject(featured)}
      />

      {rest.length > 0 && (
        <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {rest.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index + 2}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      )}

      {selectedProject && (
        <Suspense fallback={null}>
          <DetailsProject
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </>
  );
}

function FeaturedProject({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="grid border border-white/15 lg:grid-cols-2"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.judul}`}
        className="group relative block aspect-[16/10] overflow-hidden border-b border-white/15 text-left lg:border-r lg:border-b-0"
      >
        <img
          src={project.url}
          alt={project.judul}
          width={1200}
          height={750}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex flex-col gap-5 p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <span className="font-heading text-5xl text-blue-main">01</span>
          <Badge
            content={project.badgeText}
            className="border-white/25 text-white/70"
          />
        </div>

        <h3 className="font-heading text-3xl tracking-tight md:text-4xl">
          {project.judul}
        </h3>
        <p className="font-p text-base leading-relaxed text-white/70">
          {project.desc}
        </p>

        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <button
            type="button"
            onClick={onOpen}
            className="border border-white-bg bg-white-bg px-4 py-2.5 font-p text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-blue-deep hover:bg-blue-deep hover:text-white"
          >
            View details
          </button>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/25 px-4 py-2.5 font-p text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white hover:text-white"
          >
            Visit live site
          </a>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useReveal<HTMLElement>();

  return (
    <article
      ref={ref}
      className="grid gap-4 py-6 md:grid-cols-[64px_160px_1fr_auto] md:items-center"
    >
      <span className="font-heading text-3xl text-blue-main">
        0{index}
      </span>

      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open details for ${project.judul}`}
        className="group block aspect-[16/9] w-full overflow-hidden border border-white/15 text-left md:w-40"
      >
        <img
          src={project.url}
          alt={project.judul}
          width={480}
          height={270}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-2xl tracking-tight">
          {project.judul}
        </h3>
        <p className="font-p text-sm leading-relaxed text-white/65">
          {project.desc}
        </p>
        <Badge
          content={project.badgeText}
          className="border-white/25 text-white/70"
        />
      </div>

      <button
        type="button"
        onClick={onOpen}
        className="justify-self-start border border-white/25 px-4 py-2.5 font-p text-[11px] uppercase tracking-[0.16em] text-white/80 transition-colors hover:border-white hover:text-white md:justify-self-end"
      >
        Details
      </button>
    </article>
  );
}

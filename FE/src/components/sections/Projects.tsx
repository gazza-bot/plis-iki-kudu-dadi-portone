import { useState, useEffect, lazy, Suspense } from "react";
import { CardGroup } from "../ui/CardGroup";
import { Card, CardImage, CardTitle, CardButton } from "../ui/Card";
import { Badge } from "../ui/Badge";

const DetailsProject = lazy(() => import("../widgets/DetailsProject"));

export interface Project {
  id: number;
  url: string;
  badgeText: string[];
  desc: string;
  judul: string;
  descFull : string;
  demoUrl : string;
}

export function Projects() {
  return (
    <div id="projects" className="min-h-screen flex flex-col gap-16 justify-center items-center bg-blue-main p-4 lg:p-8">
      <div className="size-full md:size-1/2">
        <ContentProject />
      </div>
      <ProjectShowcase />
    </div>
  );
}

function ContentProject() {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <h1 className="font-heading text-white text-xl md:text-5xl">
        Here's My Projects
      </h1>
      <p className="font-p text-white text-[16px] md:text-2xl text-justify">
        I build things that matter. I love the entire engineering process and
        embrace the pressure—because <i>stress is a privilege</i>. I don't just
        make things work; I care deeply about aesthetics and user experience.
        Lately, I've channeled this energy into building a class landing page
        and designing a UI/UX competition entry that recently led me to become a
        finalist.
      </p>
    </div>
  );
}

// Project Showcase terhubung ke API Express
function ProjectShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null >(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_BASE_URL;
        const response = await fetch(`${API_URL}/api/projects`);

        if (!response.ok) {
          throw new Error("Gagal mengambil data projek dari server");
        }

        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <p className="text-white font-p animate-pulse">Memuat daftar proyek...</p>
    );
  }

  if (error) {
    return <p className="text-red-300 font-p">Gagal memuat proyek: {error}</p>;
  }

  return (
    <>
      <div className="flex justify-center h-full w-full items-center">
        <CardGroup>
          {projects.map((project) => (
            <Card key={project.id}>
              <CardImage source={project.url} alt={project.judul} />
              <Badge content={project.badgeText} variant="badgeText" />
              <CardTitle title={project.judul} desc={project.desc} />
              <CardButton onClick={() => setSelectedProject(project)} />
            </Card>
          ))}
        </CardGroup>
      </div>

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
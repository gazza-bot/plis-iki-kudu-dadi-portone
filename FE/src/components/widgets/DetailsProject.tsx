import type { Project } from "../sections/Projects";

interface DetailsProp {
  project: Project;
  onClose: () => void;
}

export default function DetailsProject({ project, onClose }: DetailsProp) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative m-4 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl flex flex-col"
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam card putih ikut menutup modal
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
        >
          ✕
        </button>

        <div className="relative h-64 w-full sm:h-80">
          <img
            className="h-full w-full object-cover"
            src={project.url}
            alt={project.judul}
          />
        </div>

        <div className="p-6 text-left flex flex-col gap-3">
          <h2 className="font-heading text-blue-main text-2xl tracking-wide font-bold">
            {project.judul}
          </h2>
          <p className="font-p text-gray-700 text-lg tracking-wide leading-relaxed">
            {project.descFull}
          </p>
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-main transition-all duration-400 ease-in-out hover:bg-blue-dark rounded-2xl text-white font-heading py-4 text-center text-2xl">
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}

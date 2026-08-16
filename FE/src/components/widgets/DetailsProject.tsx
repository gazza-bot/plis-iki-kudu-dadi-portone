import { useEffect, useState } from "react";
import type { Project } from "../sections/Projects";

interface DetailsProp {
  project: Project;
  onClose: () => void;
}

export default function DetailsProject({ project, onClose }: DetailsProp) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // trigger animasi masuk setelah mount
    const raf = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // tunggu animasi keluar selesai baru beneran unmount
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl flex flex-col transition-all duration-200 ease-out ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam card putih ikut menutup modal
      >
        {/* Tombol Tutup (X) */}
        <button
          onClick={handleClose}
          className="fixed sm:absolute top-6 sm:top-4 right-6 sm:right-4 z-10 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition"
        >
          ✕
        </button>

        <div className="relative h-48 sm:h-64 md:h-80 w-full shrink-0">
          <img
            className="h-full w-full object-cover"
            src={project.url}
            alt={project.judul}
          />
        </div>

        <div className="p-4 sm:p-6 text-left flex flex-col gap-2 sm:gap-3">
          <h2 className="font-heading text-blue-main text-xl sm:text-2xl tracking-wide font-bold">
            {project.judul}
          </h2>
          <p className="font-p text-gray-700 text-base sm:text-lg tracking-wide leading-relaxed">
            {project.descFull}
          </p>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-main transition-all duration-400 ease-in-out hover:bg-blue-dark rounded-2xl text-white font-heading py-3 sm:py-4 text-center text-lg sm:text-2xl"
          >
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
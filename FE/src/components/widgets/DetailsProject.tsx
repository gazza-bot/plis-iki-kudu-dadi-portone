import { useEffect, useId, useState } from "react";
import type { Project } from "../sections/Projects";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useDialog } from "../../hooks/useDialog";

interface DetailsProp {
  project: Project;
  onClose: () => void;
}

export default function DetailsProject({ project, onClose }: DetailsProp) {
  const [isVisible, setIsVisible] = useState(false);
  const titleId = useId();

  useBodyScrollLock(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 180);
  };

  const dialogRef = useDialog<HTMLDivElement>(handleClose);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-4"
      onClick={handleClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className={`relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto overscroll-contain border border-ink bg-paper transition-all duration-200 ease-out ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-[0.98] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          data-autofocus
          aria-label="Close project details"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center border border-ink bg-white-bg text-ink transition-colors hover:bg-ink hover:text-white-bg"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="aspect-[16/9] w-full shrink-0 border-b border-ink/15 bg-white-bg">
          <img
            className="h-full w-full object-cover"
            src={project.url}
            alt={project.judul}
            width={1200}
            height={675}
            decoding="async"
          />
        </div>

        <div className="flex flex-col gap-4 p-5 md:p-8">
          <p className="font-p text-[11px] uppercase tracking-[0.2em] text-blue-deep">
            Case study
          </p>
          <h2
            id={titleId}
            className="font-heading text-3xl tracking-tight text-ink"
          >
            {project.judul}
          </h2>
          <p className="font-p text-base leading-relaxed text-ink/75">
            {project.descFull}
          </p>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center justify-center border border-blue-deep bg-blue-deep px-5 py-3 font-p text-xs uppercase tracking-[0.18em] text-white transition-colors hover:border-ink hover:bg-ink"
          >
            Visit live site
          </a>
        </div>
      </div>
    </div>
  );
}

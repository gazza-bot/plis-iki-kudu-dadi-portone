import { Link } from "react-router-dom";

export function PageBackLink() {
  return (
    <div className="fixed left-5 top-5 z-50 md:left-8">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center gap-3 border border-white/25 bg-ink/80 px-5 py-3 font-p text-xs text-white backdrop-blur-md transition-colors hover:border-white hover:bg-white hover:text-ink"
      >
        Back to home
        <kbd className="hidden border border-current/30 px-1.5 py-0.5 text-[10px] sm:inline-flex">
          Esc
        </kbd>
      </Link>
    </div>
  );
}

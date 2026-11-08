import { Projects } from "../components/sections/Projects";
import { PageBackLink } from "../components/ui/PageBackLink";
import { useEscapeToHome } from "../hooks/useEscapeToHome";

export default function ProjectsPage() {
  useEscapeToHome();

  return (
    <div className="min-h-screen bg-ink">
      <PageBackLink />
      <Projects />
    </div>
  );
}

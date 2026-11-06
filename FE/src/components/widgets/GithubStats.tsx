import { lazy, Suspense, useEffect, useState } from "react";

const GitHubCalendar = lazy(() =>
  import("react-github-calendar").then((m) => ({ default: m.GitHubCalendar })),
);

const customTheme = {
  light: ["#ebedf0", "#bce0fd", "#89c6fa", "#56a9f6", "#2185d5"],
  dark: ["#161b22", "#0d3555", "#144f80", "#1a6aab", "#2185d5"],
};

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
}

interface GithubStatsProps {
  username: string;
}

export function GithubStats({ username }: GithubStatsProps) {
  const [profile, setProfile] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchGithubData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari GitHub");
        }

        const data: GitHubData = await response.json();
        setProfile(data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchGithubData();

    return () => controller.abort();
  }, [username]);

  if (loading) {
    return <SkeletonStats />;
  }

  if (error) {
    return (
      <div
        className="border border-red-300 bg-red-50 p-5 text-red-700"
        role="alert"
      >
        <p className="font-p text-sm">GitHub activity is unavailable right now.</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="border border-ink/15 bg-paper p-5">
        <p className="font-p text-sm text-ink/70">
          No GitHub activity to show yet.
        </p>
      </div>
    );
  }

  return (
    <section className="border border-ink/15 bg-paper" aria-labelledby="github-title">
      <div className="grid gap-6 p-5 md:grid-cols-[auto_1fr_auto] md:items-center md:p-6">
        <h2 id="github-title" className="sr-only">
          GitHub activity
        </h2>

        <div className="flex items-center gap-4">
          <img
            src={profile.avatar_url}
            alt={`Avatar GitHub ${username}`}
            width={80}
            height={80}
            loading="lazy"
            className="size-16 rounded-full border border-ink/15 object-cover"
          />
          <div>
            <h3 className="font-heading text-2xl uppercase tracking-tight text-ink">
              @{username}
            </h3>
            <p className="font-p text-sm text-ink/70">{profile.name}</p>
          </div>
        </div>

        <dl className="flex gap-6 md:justify-self-center">
          <div className="border-l border-ink/15 pl-4">
            <dt className="font-p text-[10px] uppercase tracking-[0.16em] text-ink/70">
              Repositories
            </dt>
            <dd className="font-heading text-3xl text-blue-deep">
              {profile.public_repos}
            </dd>
          </div>
          <div className="border-l border-ink/15 pl-4">
            <dt className="font-p text-[10px] uppercase tracking-[0.16em] text-ink/70">
              Followers
            </dt>
            <dd className="font-heading text-3xl text-blue-deep">
              {profile.followers}
            </dd>
          </div>
        </dl>

        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center border border-ink/25 px-4 py-2.5 font-p text-[11px] uppercase tracking-[0.16em] text-ink transition-colors hover:border-ink hover:bg-white"
        >
          Open GitHub
        </a>
      </div>

      <div className="border-t border-ink/10 p-5 md:p-6">
        <div className="flex items-center justify-between gap-4">
          <p className="font-p text-[11px] uppercase tracking-[0.18em] text-ink/70">
            Contribution activity
          </p>
          <p className="font-p text-[11px] text-ink/70">Public profile</p>
        </div>
        <div className="mt-4 overflow-x-auto pb-2">
          <Suspense
            fallback={<div className="h-28 w-full animate-pulse bg-white-bg" />}
          >
            <GitHubCalendar
              username={username}
              colorScheme="light"
              blockSize={12}
              blockMargin={4}
              fontSize={12}
              theme={customTheme}
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

function SkeletonStats() {
  return (
    <div
      className="animate-pulse border border-ink/15 bg-paper p-5 md:p-6"
      aria-hidden="true"
    >
      <div className="flex items-center gap-4">
        <div className="size-16 rounded-full bg-white-bg" />
        <div className="flex flex-col gap-3">
          <div className="h-5 w-40 bg-white-bg" />
          <div className="h-4 w-24 bg-white-bg" />
        </div>
      </div>
      <div className="mt-6 h-4 w-32 bg-white-bg" />
      <div className="mt-4 h-28 w-full bg-white-bg" />
    </div>
  );
}

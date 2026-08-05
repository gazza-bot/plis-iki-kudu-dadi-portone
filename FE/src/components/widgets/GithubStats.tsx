import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
// Mendefinisikan tipe data yang akan kita ambil dari API

const customTheme = {
  // Mode Terang: dari abu-abu muda ke biru terang (#2185D5)
  light: [
    "#ebedf0", // Level 0: Kosong (bawaan GitHub)
    "#bce0fd", // Level 1: Sedikit aktif (Biru sangat pudar)
    "#89c6fa", // Level 2: Lumayan aktif (Biru muda)
    "#56a9f6", // Level 3: Aktif (Biru sedang)
    "#2185D5", // Level 4: Sangat aktif (Warna utamamu)
  ],

  // Mode Gelap: dari abu-abu gelap ke biru terang (#2185D5)
  dark: [
    "#161b22", // Level 0: Kosong (bawaan GitHub dark mode)
    "#0d3555", // Level 1: Sedikit aktif (Biru sangat gelap)
    "#144f80", // Level 2: Lumayan aktif (Biru gelap)
    "#1a6aab", // Level 3: Aktif (Biru sedang gelap)
    "#2185D5", // Level 4: Sangat aktif (Warna utamamu)
  ],
};

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  name: string;
}

interface GithubStatsProps {
  username: string; // Username GitHub kamu
}

export function GithubStats({ username }: GithubStatsProps) {
  const [profile, setProfile] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`,
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data dari GitHub");
        }

        const data: GitHubData = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, [username]);

  if (loading) {
    return <SkeletonStats />;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      {/* Bagian Header: Info Repositori */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
        {profile?.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={`Avatar ${username}`}
            className="size-10 md:size-20 rounded-full border-4 border-blue-main"
          />
        )}
        <div>
          <h3 className="text-xs md:text-2xl font-bold text-gray-800">
            @{username} | {profile?.name}
          </h3>
          <div className="flex gap-4 mt-2 text-sm text-gray-600">
            <div className="flex flex-col items-center p-2 bg-blue-main rounded-lg min-w-10 md:min-w-20">
              <span className="font-bold text-white text-[12px] md:text-[16px]">
                {profile?.public_repos}
              </span>
              <span className="text-white-bg text-[12px] md:text-[16px]">
                Repositori
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-blue-main rounded-lg min-w-10 md:min-w-20">
              <span className="font-bold text-white text-[12px] md:text-[16px]">
                {profile?.followers}
              </span>
              <span className="text-white-bg text-[12px] md:text-[16px]">
                Followers
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Kalender Kontribusi */}
      <div className="overflow-x-auto pb-4">
        <h4 className="text-sm font-semibold text-blue-main mb-4">
          Grafik Kontribusi
        </h4>
        <div className="min-w-full flex justify-center">
          <GitHubCalendar
            username={username}
            colorScheme="light"
            blockSize={12}
            blockMargin={4}
            fontSize={12}
            theme={customTheme}
          />
        </div>
      </div>
    </div>
  );
};

function SkeletonStats() {
  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-2xl shadow-sm border border-gray-100 animate-pulse">
      <div className="flex items-center gap-6 mb-8 pb-6 border-b border-gray-100">
        <div className="w-20 h-20 rounded-full bg-gray-200 border-4 border-gray-50 shrink-0"></div>

        <div className="flex flex-col gap-3">
          <div className="h-7 w-40 bg-gray-200 rounded-md"></div>

          <div className="flex gap-4">
            <div className="h-14 w-20 bg-gray-200 rounded-lg"></div>
            <div className="h-14 w-20 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden pb-4">
        <div className="h-4 w-32 bg-gray-200 rounded-md mb-6"></div>

        <div className="w-full h-35 bg-gray-100 rounded-xl"></div>
      </div>
    </div>
  );
}

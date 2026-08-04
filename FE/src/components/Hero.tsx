import GithubStats from "./GithubStats.tsx";
import { Card, CardImage, CardTitle } from "./Card.tsx";
import CardGroup from "./CardGroup.tsx";

export default function Hero() {
  return (
    // 1. Kurangi padding di mobile (p-8), p-16 hanya di desktop
    <div className="flex flex-col bg-white-bg py-8">
      <div className="box-content p-8 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-24 justify-center items-center mb-16">
        {/* 2. Ubah w-3xl (fixed) jadi w-full max-w-3xl (fleksibel). Teks di-center di mobile */}
        <MyPhoto />

        <div className="w-full max-w-3xl flex flex-col gap-6 md:gap-8 text-center md:text-left items-center md:items-start">
          {/* 3. Kecilkan ukuran font di mobile */}
          <h1 className="font-heading text-3xl md:text-5xl">
            Hello, My Name is
            <strong className="text-blue-main"> Adil Nibras Gazza</strong>
          </h1>
          <p className="font-p text-lg md:text-2xl">
            I'm an Information Technology student at Universitas Brawijaya with
            a strong enthusiasm for technology, currently focusing on Web
            Development and grinding with joining some competition in the
            campus. I enjoy building things that are both functional and
            meaningful.
          </p>
          <GithubStats username={"gazza-bot"} />
        </div>
      </div>
    </div>
  );
}

function MyPhoto() {
  return (
    // 4. Hapus 'hidden' agar tampil di mobile, sesuaikan ukuran container (w-56 h-80 di mobile)
    <div className="relative flex justify-center items-center w-56 h-80 md:w-64 md:h-144 mt-8 md:mt-0">
      {/* 5. Sesuaikan ukuran icon dan padding di mobile agar proporsional */}
      <div className="absolute -top-4 -left-4 md:-left-8 z-0 bg-white p-3 md:p-4 border-2 border-blue-main rounded-full shadow-lg transform -rotate-6 animate-bounce-kalem">
        <img
          src="/src/assets/ts_logo.svg"
          alt="TS Logo"
          className="size-8 md:size-12"
        />
      </div>

      <div className="absolute z-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 382 556"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.1982 312.895C106.198 65.8949 103.198 11.8947 157.198 126.895C211.198 241.895 214.698 296.395 319.698 160.895C424.698 25.3946 197.699 -160.605 319.698 258.895C441.698 678.395 367.198 62.3951 221.698 370.395C76.198 678.395 -55.8018 559.895 25.1982 312.895Z"
            fill="#2185D5"
            stroke=""
          />
        </svg>
      </div>

      <div className="relative z-10 w-full h-full border-white overflow-hidden rounded-2xl md:rounded-none">
        <div className="backdrop-blur-2xl inset-0 bg-black/10"></div>
        <img
          src="/src/assets/PhotoAing.png"
          alt="Foto Profil"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute -bottom-4 -right-2 md:-right-4 z-20 bg-white p-3 md:p-4 border-2 border-blue-main rounded-full shadow-xl transform animate-bounce-kalem rotate-12">
        <img
          src="/src/assets/React-icon.svg"
          alt="React Logo"
          className="size-10 md:size-16"
        />
      </div>

      <div className="absolute top-10 -right-6 md:-right-12 z-20 border-2 border-blue-main rounded-full bg-white p-3 md:p-4 shadow-md animate-bounce-kalem rotate-8">
        <img
          src="/src/assets/pngegg.png"
          alt="Icon"
          className="size-6 md:size-8"
        />
      </div>

      <div className="absolute bottom-6 -left-6 md:-left-12 z-20 border-2 border-blue-main rounded-full bg-white p-3 md:p-4 shadow-md animate-bounce-kalem rotate-8">
        <img
          src="/src/assets/tailwindlogo.svg"
          alt="Icon"
          className="size-6 md:size-8"
        />
      </div>
    </div>
  );
}

function BGHero() {
  return (
    <svg
      viewBox="0 0 145 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-main"
      width="120"
      height="120"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M144.8 12.5C136 19.6 127.6 18.6 121.4 17.9C115.9 17.3 113.3 17.1 109.8 19.9C106.3 22.7 105.9 25.3 105.3 30.8C104.6 36.9 103.7 45.3 94.9 52.4C86.1 59.5 77.7 58.5 71.5 57.8C66 57.2 63.4 57 59.9 59.8C56.4 62.6 56 65.2 55.4 70.7C54.7 76.8 53.8 85.2 45 92.3C36.2 99.4 27.8 98.4 21.6 97.7C16.1 97.1 13.5 96.9 10 99.7L0 87.2C8.8 80.1 17.2 81.1 23.4 81.8C28.9 82.4 31.5 82.6 35 79.8C38.5 77 38.9 74.4 39.5 68.9C40.2 62.8 41.1 54.4 49.9 47.3C58.7 40.2 67.1 41.2 73.3 41.9C78.8 42.5 81.4 42.7 84.9 39.9C88.4 37.1 88.8 34.5 89.4 29C90.1 22.9 91 14.5 99.8 7.39999C108.6 0.299994 117 1.3 123.2 2C128.7 2.6 131.3 2.8 134.8 0L144.8 12.5Z"
        fill="#000000"
        stroke="#000000"
      />
    </svg>
  );
}

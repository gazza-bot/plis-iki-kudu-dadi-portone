import GithubStats from "./GithubStats.tsx";
import { Card, CardImage, CardTitle } from "./Card.tsx";
import CardGroup from "./CardGroup.tsx";
import Badge from "./Badge.tsx";
import TSLogo from '/src/assets/ts_logo.svg'

const content = {
  img: TSLogo,
  text: "Lorem"
}

export default function Hero() {
  return (
    // 1. Kurangi padding di mobile (p-8), p-16 hanya di desktop
    <div className="flex flex-col bg-white-bg">
      <div className="box-content p-8 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-24 justify-center items-center">
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
      <h2 className="flex justify-center font-heading text-xl lg:text-4xl my-8 ">
        My Targets
      </h2>
      <CardGroup>
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <Badge content={content} variant="badgeBoth"/>
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
      </CardGroup>
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

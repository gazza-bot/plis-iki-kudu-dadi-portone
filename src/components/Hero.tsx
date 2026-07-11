import GithubStats from "./GithubStats.tsx";

export default function Hero() {
  return (
    <div className="box-content p-16 bg-white-bg flex flex-col md:flex-row gap-8 md:gap-32 justify-center items-center">
      <div className="w-3xl flex flex-col gap-8">
        <h1 className="font-heading text-5xl">
          Hello, My Name is 
          <strong className="text-blue-main"> Adil Nibras Gazza</strong>
        </h1>
        <p className="font-p text-2xl">
          I'm an Information Technology student at Universitas Brawijaya with a
          strong enthusiasm for technology, currently focusing on Web
          Development and grinding with joining some competition in the campus.
          I enjoy building things that are both functional and meaningful.
        </p>
        <GithubStats username={"gazza-bot"} />
      </div>
      <MyPhoto />
    </div>
  );
}

function MyPhoto() {
  return (
    <div className="relative flex justify-center items-center w-64 h-144 mt-20">
      
      {/* 1. IKON DI BELAKANG (Kiri Atas) */}
      {/* z-0 membuatnya berada di belakang foto utama */}
      <div className="absolute -top-4 -left-8 z-0 bg-white p-4 border-2 border-blue-main rounded-full shadow-lg transform -rotate-6 animate-bounce">
        {/* Kamu bisa ganti emoji ini dengan SVG atau react-icons */}
        <img src="/src/assets/ts_logo.svg" alt="" className="size-12" /> 
      </div>

      {/* 2. FOTO UTAMA DI TENGAH */}
      {/* z-10 membuatnya berada di atas ikon belakang, tapi di bawah ikon depan */}
      <div className="relative z-10 w-full h-full border-white overflow-hidden">
        <img 
          src="/src/assets/PhotoAing.png"
          alt="Foto Profil" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* 3. IKON DI DEPAN (Kanan Bawah) */}
      {/* z-20 membuatnya berada paling depan, menutupi sebagian foto */}
      <div className="absolute -bottom-4 -right-4 z-20 bg-white p-4 border-2 border-blue-main rounded-full shadow-xl transform rotate-12">
        <img src="/src/assets/React-icon.svg" alt="" className="size-16" />
      </div>

      {/* 4. IKON DI SAMPING (Kanan Atas) */}
      <div className="absolute top-10 -right-12 z-20 border-2 border-blue-main rounded-full bg-white p-4 shadow-md animate-bounce rotate-8">
        <img src="/src/assets/pngegg.png" alt="" className="size-8" />
      </div>

    </div>
  );
}

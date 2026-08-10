import { useState } from "react";

export function Navbar() {
  const [isMenuOpened, setMenuOpen] = useState(false);

  return (
    <div className="bg-white-bg">
      <header className="h-24">
        {/* Desktop Nav */}
        <nav className="fixed items-center px-12 py-3 md:px-24 md:py-6 w-full bg-white-bg z-50 shadow-sm hidden md:flex md:flex-row">
          <ul className="flex flex-row justify-between gap-10 items-center w-full ">
            <li className="relative font-p text-2xl text-blue-main transition-all duration-300 ease-in-out after:absolute hover:after:bg-blue-main after:bottom-0 after:left-0 after:w-0 after:content-[''] after:h-0.5 hover:after:w-full after:transition-all after:duration-500">
              <a href="#projects">Projects</a>
            </li>
            <li className="relative font-p text-2xl text-blue-main transition-all duration-300 ease-in-out after:absolute hover:after:bg-blue-main after:bottom-0 after:left-0 after:w-0 after:content-[''] after:h-0.5 hover:after:w-full after:transition-all after:duration-500">
              <a href="#about">About</a>
            </li>
            <li className="relative bg-blue-main px-4 py-2 text-white-bg font-p text-2xl transition-all duration-300 after:absolute hover:after:bg-white-bg after:bottom-2 after:left-2 after:w-0 after:content-[''] after:h-0.5 hover:after:w-9/10 after:transition-all after:duration-500">
              <a href="#contact">Let's Connect</a>
            </li>
          </ul>
        </nav>

        {/* Mobile Nav */}
        <div className="flex fixed bg-white-bg shadow-sm flex-row justify-between w-full md:hidden items-center h-24 px-4">
          <p className="font-heading text-blue-main font-bold tracking-tighter">
            ADIL NIBRAS GAZZA
          </p>
          <button onClick={() => setMenuOpen(!isMenuOpened)}>
            <svg
              className="text-blue-main"
              width="32px"
              height="32px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
            >
              <path d="M3 5h18v1H3zm0 8h18v-1H3zm0 7h18v-1H3z" />
              <path fill="none" d="M0 0h24v24H0z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-blue-main flex flex-col justify-center items-center overflow-auto transition-all duration-500 ease-in-out z-50 ${
            isMenuOpened ? "max-h-full" : "max-h-0"
          }`}
        >
          <div className="absolute top-5 left-0 right-0 flex flex-row justify-between items-center px-12 py-2 h-24 z-50">
            <span className="z-50 font-heading font-bold text-white-bg tracking-tighter text-2xl">
              ADILDEV
            </span>
            <button
              onClick={() => setMenuOpen(!isMenuOpened)}
              className="text-2xl font-bold text-white-bg"
            >
              X
            </button>
          </div>
          <ul className="flex flex-col gap-16 items-center z-50">
            <li className="font-p text-white-bg text-3xl">
              <a href="#projects">Projects</a>
            </li>
            <li className="font-p text-white-bg text-3xl">
              <a href="#about">About</a>
            </li>
            <li className="relative z-50 bg-white-bg px-4 py-2 text-blue-main font-p text-2xl transition-all duration-300 after:absolute hover:after:bg-white-bg after:bottom-2 after:left-2 after:w-0 after:content-[''] after:h-0.5 hover:after:w-9/10 after:transition-all after:duration-500">
              <a href="#contact">Let's Connect</a>
            </li>
            <hr className="border-0 bg-white-bg h-px w-full z-50" />
            <li className="font-p text-white-bg text-3xl">
              <a href="https://instagram.com/nibrasgazza" target="_blank" rel="noopener noreferrer">Instagram</a>
            </li>
            <li className="font-p text-white-bg text-3xl">
              <a href="https://linkedin.com/adil-nibras-gazza" target="_blank" rel="noopener noreferrer">Linkedin</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

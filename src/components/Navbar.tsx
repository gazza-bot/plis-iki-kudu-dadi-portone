import { useState } from "react";

export default function Navbar() {
  const [isMenuOpened, setMenuOpen] = useState(false);
  
  return (
    <div className="bg-white-bg">
      <header className="h-24">
        <nav className="navbar">
          <ul className="ul-nav">
            <li className="li-nav">
              <a>Projects</a>
            </li>
            <li className="li-nav">
              <a>About</a>
            </li>
            <li className="nav-connect">
              <a>Let's Connect</a>
            </li>
          </ul>

          <div className="mobile-nav">
            <p className="font-heading text-blue-main font-bold tracking-tighter">
              ADIL NIBRAS GAZZA
            </p>
            <button onClick={() => setMenuOpen(!isMenuOpened)}>
              <svg
                id="btnMobile"
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
        </nav>

        <div
          id="mobileMenu"
          className={`menu-mobile ${isMenuOpened ? "active" : ""}`}
        >
          <div className="mobile-top">
            <span className="ang-mobile">ANG</span>
            <button
              id="closeBtn"
              onClick={() => setMenuOpen(!isMenuOpened)}
              className="close-menu"
            >
              X
            </button>
          </div>
          <ul className="ul-mobile">
            <li className="li-mobile">
              <a href="">Projects</a>
            </li>
            <li className="li-mobile">
              <a href="">About</a>
            </li>
            <li className="connect-mobile">
              <a href="">Let's Connect</a>
            </li>
            <hr />
            <li className="li-mobile">
              <a href="">Instagram</a>
            </li>
            <li className="li-mobile">
              <a href="">Linkedin</a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
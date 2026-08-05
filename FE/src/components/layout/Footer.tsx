import { Logo } from "../ui/Logo";

export function Footer() {
  const navigateMenu = ["About", "Projects", "Contacts"];

  return (
    <div className="bg-blue-main h-max w-full justify-center items-center flex flex-col lg:flex-row px-4 py-16 gap-8">
      <div className="p-8 flex flex-col gap-6 md:gap-8 w-full lg:w-1/2">
        <h1 className="font-bold font-mono text-4xl text-white">
          Ready to Build With Me?
        </h1>
        
        {/* Navigation Menu */}
        <ul className="flex flex-col gap-4 md:gap-8 text-white items-start">
          {navigateMenu.map((menu) => (
            <li key={menu} className="font-p text-2xl md:text-4xl">
              <a className="decoration-none hover:text-white/70 transition-all" href={`#${menu}`}>
                {menu}
              </a>
            </li>
          ))}
        </ul>

        {/* Component Contacts */}
        <Contacts />
      </div>

      <LogoFooter />
    </div>
  );
}

function LogoFooter() {
  return (
    <div className="flex justify-center w-full lg:w-1/2 h-max">
      <Logo
        variant="LogoText"
        classLogo="text-white-bg size-24 md:size-48 lg:size-72"
        classText="text-white-bg text-8xl md:text-[192px] lg:text-[248px]"
      />
    </div>
  );
}

interface ContactItem {
  id: string;
  value: string;
  href: string;
  icon: React.ReactNode;
}

function Contacts() {
  const contactList: ContactItem[] = [
    {
      id: "email",
      value: "nibrasgazza@gmail.com",
      href: "mailto:nibrasgazza@gmail.com",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      id: "github",
      value: "github.com/gazza-bot",
      href: "https://github.com/gazza-bot",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      value: "linkedin.com/in/adil-nibras-gazza",
      href: "https://linkedin.com/in/adil-nibras-gazza",
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full h-max flex flex-wrap gap-3 items-center justify-start mt-4">
      {contactList.map((item) => (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center h-12 p-3.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white transition-all duration-500 ease-in-out cursor-pointer overflow-hidden shadow-lg backdrop-blur-sm"
        >
          {/* Logo / Icon berputar 360deg saat hover */}
          <span className="shrink-0 transition-transform duration-500 group-hover:rotate-360">
            {item.icon}
          </span>

          {/* Teks memanjang & fade-in saat hover */}
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-3 transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap text-sm font-medium">
            {item.value}
          </span>
        </a>
      ))}
    </div>
  );
}
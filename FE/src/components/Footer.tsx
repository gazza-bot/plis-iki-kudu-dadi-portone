import Logo from "./Logo";

export default function Footer() {
    const navigateMenu = ["About", "Projects", "Contacts"]
  
    return (
    <div className="bg-blue-main min-h-screen h-max w-full justify-center items-center flex flex-col lg:flex-row p-4">
      <div className="p-8 flex flex-col gap-4 md:gap-8 w-1/2">
        <h1 className="font-bold font-mono text-4xl text-white ">Ready to Build With Me?</h1>
        <ul className="flex flex-col gap-4 md:gap-8 text-white items-start">
            {navigateMenu.map((menu) => {
                return <li key={menu} className="font-p text-2xl md:text-4xl"><a className="decoration-none" href={`#${menu}`}>{menu}</a></li>
            })}
        </ul>
      </div>
      <LogoFooter/>
    </div>
  );
}

function LogoFooter() {
    return (
        <div className="flex justify-center w-1/2 h-max">
            <Logo variant="LogoText" classLogo="sm:size-24 md:size-48 lg:size-72 text-white!" classText="sm:text-8xl! md:text-[192px]! lg:text-[288px]!" />
        </div>

    )
} 

import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="bg-blue-main min-h-screen h-max w-full justify-center flex flex-col">
      <div className="p-8">
        <h1 className="font-bold font-mono text-4xl text-white ">Ready to Build With Me?</h1>
      </div>
      <LogoFooter/>
    </div>
  );
}

function LogoFooter() {
    return (
        <div className="flex justify-center w-full">
            <Logo variant="LogoText" className="sm:size-24 md:size-48 lg:size-72 text-white! sm:text-8xl md:text-[192px] lg:text-[288px]" />
        </div>

    )  
} 

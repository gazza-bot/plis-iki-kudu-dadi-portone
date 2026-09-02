import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { Logo } from "../ui/Logo";

export function Intro() {
  const containerRef = useRef(null);
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);
  const screen3Ref = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(screen2Ref.current, { xPercent: 100, force3D: true });
      gsap.set(screen3Ref.current, { yPercent: 100, force3D: true });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.addLabel("toScreen2", "+=1.5")
        .to(screen1Ref.current, { xPercent: -100, duration: 1, force3D: true }, "toScreen2")
        .to(screen2Ref.current, { xPercent: 0, duration: 2, force3D: true }, "toScreen2")
        .to(
          screen2Ref.current,
          { yPercent: -100, duration: 2, force3D: true },
          "toScreen3+=0.6",
        )
        .to(screen3Ref.current, { yPercent: 0, duration: 1, force3D: true }, "toScreen3+=0.6")
        .to(containerRef.current, {
          height: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.8,
          onComplete: () => setShowIntro(false),
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden bg-white-bg z-50"
      style={{ willChange: "transform" }}
    >
      {/* Screen 1 - Nama */}
      <div
        ref={screen1Ref}
        className="bg-blue-main absolute top-0 left-0 w-full h-dvh flex justify-center items-center"
        style={{ willChange: "transform" }}
      >
        <h1 className="text-4xl md:text-9xl font-heading tracking-wide text-white font-bold">
          Adil Nibras Gazza
        </h1>
      </div>

      {/* Screen 2 - Role */}
      <div
        ref={screen2Ref}
        className="bg-white-bg absolute top-0 left-0 w-full h-dvh flex flex-col justify-center items-center gap-4"
        style={{ willChange: "transform" }}
      >
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          Tech Enthusiast
        </h1>
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          Frontend Developer
        </h1>
        <h1 className="text-3xl md:text-9xl font-heading tracking-wide text-blue-main font-bold">
          UI/UX Designer
        </h1>
      </div>

      {/* Screen 3 - Logo */}
      <div
        ref={screen3Ref}
        className="bg-white-bg absolute top-0 left-0 w-full h-dvh flex justify-center items-center"
        style={{ willChange: "transform" }}
      >
        <Logo
          variant="LogoText"
          classLogo="size-24 md:size-48 lg:size-72 text-blue-main"
          classText="text-blue-main text-8xl md:text-[192px] lg:text-[248px]"
        />
      </div>
    </div>
  );
}

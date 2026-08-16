"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { Logo } from "../ui/Logo";

export default function Intro() {
  const containerRef = useRef(null);
  const screen1Ref = useRef(null);
  const screen2Ref = useRef(null);
  const screen3Ref = useRef(null);
  const [showIntro, setShowIntro] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(screen2Ref.current, { xPercent: 100 });
      gsap.set(screen3Ref.current, { yPercent: 100 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.addLabel("toScreen2", "+=1.5") // <- Screen 1 diam dulu 1.5 detik
        .to(screen1Ref.current, { xPercent: -100, duration: 1 }, "toScreen2")
        .to(screen2Ref.current, { xPercent: 0, duration: 2 }, "toScreen2")
        .to(
          screen2Ref.current,
          { yPercent: -100, duration: 2 },
          "toScreen3+=0.6",
        )
        .to(screen3Ref.current, { yPercent: 0, duration: 1 }, "toScreen3+=0.6")
        // jeda sebentar logo "diam" sebelum collapse
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

  // lock scroll selama intro tampil, otomatis unlock pas selesai
  useLayoutEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  if (!showIntro) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-white-bg z-50"
    >
      {/* Screen 1 - Nama */}
      <div
        ref={screen1Ref}
        className="bg-blue-main absolute top-0 left-0 w-full h-screen flex justify-center items-center"
      >
        <h1 className="text-4xl md:text-9xl font-heading tracking-wide text-white font-bold">
          Adil Nibras Gazza
        </h1>
      </div>

      {/* Screen 2 - Role */}
      <div
        ref={screen2Ref}
        className="bg-white-bg absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center gap-4"
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
        className="bg-white-bg absolute top-0 left-0 w-full h-screen flex justify-center items-center"
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
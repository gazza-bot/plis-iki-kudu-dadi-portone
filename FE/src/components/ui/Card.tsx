import { type PropsWithChildren } from "react";

interface PropsCard {
  source: string;
  alt: string;
}

interface PropsCardImage {
  title: string;
  desc: string;
}

interface PropsCardAction {
  onClick?: () => void;
}

export const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-white flex flex-col justify-center h-max w-full max-w-[400px] max-h-[500px] overflow-hidden border border-gray-400 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:shadow-blue-main rounded-xl">
      {children}
    </div>
  );
};

export function CardImage({ source, alt }: PropsCard) {
  return (
    <div className="border-t-0 h-full w-full">
      <img
        src={source}
        alt={alt}
        className="object-cover  aspect-video"
      />
    </div>
  );
}

export function CardTitle({ title, desc }: PropsCardImage) {
  return (
    <div className="p-2 flex flex-col gap-4 border-gray-400 ">
      <p className="font-bold font-heading text-xl">{title}</p>
      <p className="font-p text-gray-700 text-[18px]">{desc}</p>
    </div>
  );
}

export function CardButton({ onClick }: PropsCardAction) {
  return (
    <div className="p-2">
      <button className="border-0 rounded-xl py-2 px-6 bg-blue-main w-full h-max text-xl font-heading text-white hover:bg-blue-dark transition-all duration-400 ease-in-out" onClick={onClick}>
        See Details
      </button>
    </div>
  );
}

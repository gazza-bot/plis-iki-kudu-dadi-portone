type BadgeVariant = "logos" | "badgeText" | "badgeBoth";

interface BadgeBothContent {
  img: string;
  text: string;
}

interface BadgeProps {
  content: string | string[] | BadgeBothContent;
  variant: BadgeVariant;
  className?: string;
}

export function Badge({ content, variant, className }: BadgeProps) {
  if (variant === "logos") {
    return (
      <div className={`${className} size-24 box-content border p-2 rounded-full bg-white`}>
        <img src={content as string} alt="" className="size-full" />
      </div>
    );
  } else if (variant === "badgeText") {
    const iterateArr = [...(content as string[])];
    return (
      <div className="flex gap-2 p-2 bg-white">
        {iterateArr.map((item, i) => {
          return (
            <p key={i} className={`font-heading text-[12px] md:text-[18px] h-max w-max box-content px-6 py-1 rounded-full flex justify-center items-center text-blue-main bg-blue-100 ${className}`}>{item}</p>
          )
        })}
      </div>
    )
  } else if (variant === "badgeBoth") {
    const badgeContent = content as BadgeBothContent;
    return (
      <div className="flex flex-row gap-2 px-2 pt-2 items-center">
        <img className="size-max rounded-full bg-blue-main p-0.5 box-content" src={badgeContent.img} alt="" />
        <p className="font-heading text-[24px]">{badgeContent.text}</p>        
      </div>
    )
  }
}

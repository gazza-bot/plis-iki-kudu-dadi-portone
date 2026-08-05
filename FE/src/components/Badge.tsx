type BadgeVariant = "logos" | "badgeText" | "badgeBoth";

interface BadgeProps {
  content: any;
  variant: BadgeVariant;
  className?:string
}

export default function Badge({ content, variant, className }: BadgeProps) {
  if (variant === "logos") {
    return (
      <div className={`${className} size-24 box-content border p-2 rounded-full bg-white`}>
        <img src={content} alt="" className="size-full" />
      </div>
    );
  } else if (variant === "badgeText") {
    const iterateArr = [...content]
    return (
        <div className="flex justify-between p-2 bg-white">
          {iterateArr.map((item, i) => {
            return (
              <p key={i} className={`font-heading text-[18px] h-max w-max box-content px-6 py-2 rounded-full items-center text-blue-main bg-blue-100 ${className} `}>{item}</p>
            )
          })}
        </div>
    )
  } else if(variant === "badgeBoth"){
    return (
      <div className="flex flex-row gap-2 px-2 pt-2 items-center">
        <img className="size-max rounded-full bg-blue-main p-0.5 box-content" src={content.img} alt="" />
        <p className="font-heading text-[24px]">{content.text}</p>        
      </div>
    )
  }
}

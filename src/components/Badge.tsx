type BadgeVariant = "logos" | "badgeText" | "badgeBoth";

interface BadgeProps {
  content: any;
  variant: BadgeVariant;
}

export default function Badge({ content, variant }: BadgeProps) {
  if (variant === "logos") {
    return (
      <div className="size-24 box-content border p-2 rounded-full bg-white">
        <img src={content} alt="" className="size-full" />
      </div>
    );
  } else if (variant === "badgeText") {
    const iterateArr = [...content]
    return (
        <div className="flex justify-between p-2 bg-white">
          {iterateArr.map((item) => {
            return (
              <p className="font-heading text-[18px] h-max w-max box-content px-6 py-2 rounded-full items-center text-white bg-blue-main">{item}</p>
            )
          })}
        </div>
    )
  } else if(variant === "badgeBoth"){
    return (
      <div className="flex flex-row gap-2 px-2 bg-white pt-2 items-center">
        <img className="size-6 rounded-full bg-blue-main overflow-hidden p-0.5 box-content" src={content.img} alt="" />
        <p className="font-heading text-[24px]">{content.text}</p>        
      </div>
    )
  }
}

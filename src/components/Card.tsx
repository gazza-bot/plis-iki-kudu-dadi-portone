import { type PropsWithChildren } from "react"

interface PropsCard {
    source:string
    alt:string
}

interface PropsCardImage {
    title:string
    desc:string
}

export const Card = ({children}:PropsWithChildren ) => {
    return(
        <div className="flex flex-col h-max w-max max-w-2xl bg-yellow-300 border border-gray-100 hover:shadow-md hover:shadow-blue-main rounded-xl">
        {children}
        </div>
    )
}

export function CardImage({source, alt}:PropsCard) {
    return (
        <div className="border-t-0 rounded-xl h-full w-full">
            <img src={source} alt={alt} className="object-cover border-0 rounded-t-xl aspect-video"/>
        </div>
    )
}

export function CardTitle({title, desc}:PropsCardImage) {
    return (
        <div className="flex flex-col gap-4">
            <p className="font-bold font-heading text-xl">{title}</p>
            <p className="font-heading font-medium text-[18px]">{desc}</p>
        </div>
    )
}
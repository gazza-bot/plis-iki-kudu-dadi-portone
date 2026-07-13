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
        <div className="flex flex-col h-max w-100 max-w-2xl overflow-hidden border border-gray-400 shadow-sm hover:shadow-md hover:shadow-blue-main rounded-xl">
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
        <div className="p-2 flex flex-col gap-4 border-gray-400 bg-white">
            <p className="font-bold font-heading text-xl">{title}</p>
            <p className="font-p text-gray-700 text-[18px]">{desc}</p>
        </div>
    )
}
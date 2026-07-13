import { type PropsWithChildren } from "react"

export default function CardGroup ({ children }:PropsWithChildren) {
    return (
        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center  w-full px-0 lg:px-8 py-4 lg:py-0" >
            {children}
        </div>
    )
}
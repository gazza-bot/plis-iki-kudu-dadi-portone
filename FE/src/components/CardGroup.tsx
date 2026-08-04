import { type ReactNode } from "react"

interface PropsGroup {
    children:ReactNode
    className?:string
}

export default function CardGroup ({ children, className }:PropsGroup) {
    return (
        <div className={`flex flex-col lg:flex-row gap-8 justify-center items-center  w-max px-0 lg:px-8 py-4 lg:py-0 ${className}`} >
            {children}
        </div>
    )
}
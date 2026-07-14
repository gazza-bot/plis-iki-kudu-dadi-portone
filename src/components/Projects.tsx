export default function Projects() {
    return (
        <div className="m-16 flex flex-col md:flex-row justify-center items-center bg-blue-main p-4">
            <div>
                <ContentProject/>
            </div>
            <div>

            </div>
        </div>        
    )
}

function ContentProject() {
    return(
        <div className="flex flex-col gap-2">
            <h1 className="font-heading text-blue-main text-2xl md:text-4xl">Here's What I Have Made as A College Student</h1>
            <p className="font-heading text-blue-main text-[12px] md:text-xl">I build things that matter. I love the entire engineering process and embrace the pressure—because <i>stress is a privilege</i>. I don't just make things work; I care deeply about aesthetics and user experience. Lately, I've channeled this energy into building a class landing page and designing a UI/UX competition entry that recently led me to become a finalist.</p>
        </div>
    )
}

// todo: Project Showcase berbasis karousel yang bagus, dan agak menantang
function ProjectShowcase() {
    return (
        <></>
    )
}
import CardGroup from "./CardGroup";
import { Card, CardImage, CardTitle, CardButton } from "./Card";
import Badge from "./Badge";

export default function Projects() {
  return (
    <div className="min-h-screen h-max flex flex-col gap-16 justify-center items-center bg-blue-main p-4 md:p-16">
      <div className="size-full md:size-1/2">
        <ContentProject />
      </div>
      <ProjectShowcase />
    </div>
  );
}

function ContentProject() {
  return (
    <div className="flex flex-col gap-2 h-full w-full px-2 md:px-8">
      <h1 className="font-heading text-white text-xl md:text-5xl">
        Here's My Projects
      </h1>
      <p className="font-p text-white text-[16px] md:text-2xl text-justify">
        I build things that matter. I love the entire engineering process and
        embrace the pressure—because <i>stress is a privilege</i>. I don't just
        make things work; I care deeply about aesthetics and user experience.
        Lately, I've channeled this energy into building a class landing page
        and designing a UI/UX competition entry that recently led me to become a
        finalist.
      </p>
    </div>
  );
}

// todo: Project Showcase berbasis karousel yang bagus, dan agak menantang
function ProjectShowcase() {
  const projectData = [
    {
      url: "/src/assets/dummy.png",
      badgeText: ["Web Development", "React"],
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amey",
      judul: "Projek Web Portofolio",
    },
    {
      url: "/src/assets/dummy.png",
      badgeText: ["Web Development", "React"],
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amey",
      judul: "Projek Web Portofolio",
    },
    {
      url: "/src/assets/dummy.png",
      badgeText: ["Web Development", "React"],
      desc: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amey",
      judul: "Projek Web Portofolio",
    },
  ];

  return (
    <div className="flex justify-center h-full w-full items-center">
      <CardGroup>
        {projectData.map((projectData) => {
          return (
            <Card>
              <CardImage source={projectData.url} alt={projectData.judul} />
              <Badge content={projectData.badgeText} variant="badgeText" />
              <CardTitle title={projectData.judul} desc={projectData.desc} />
              <CardButton />
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
}

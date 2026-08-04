import { Card, CardImage, CardTitle } from "./Card";
import CardGroup from "./CardGroup";

export default function MyTargets() {
  return (
    <div className="flex flex-col min-h-screen h-max gap-8 items-center justify-center">
      <h2 className="flex justify-center font-heading text-2xl lg:text-8xl">
        My Targets
      </h2>
      <CardGroup className="justify-center! w-full!">
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
        <Card>
          <CardImage source="/src/assets/dummy.png" alt="gwgantenk" />
          <CardTitle
            title="Lorem Ipsum"
            desc="Lorem Ipsum dolor sit amet Lorem Ipsum dolor sit amet met met kuvuvweve ries Reog Ponorogo Tuladha Budaya engkang Oke plun Lorem Lorem suka nyiram air keras"
          />
        </Card>
      </CardGroup>
    </div>
  );
}

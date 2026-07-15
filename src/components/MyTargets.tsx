import { Card, CardImage, CardTitle } from "./Card";
import CardGroup from "./CardGroup";

export default function MyTargets() {
  return (
    <>
      <h2 className="flex justify-center font-heading text-xl lg:text-4xl my-8 ">
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
    </>
  );
}

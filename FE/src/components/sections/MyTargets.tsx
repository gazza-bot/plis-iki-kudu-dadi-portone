import { Card } from "../ui/Card";
import { CardGroup } from "../ui/CardGroup";
import roket from "/src/assets/roket.svg";
import target from '/src/assets/target.svg';
import lamp from '/src/assets/lamp.svg'

export function MyTargets() {
  const targetsData = [
    {
      img: roket,
      text: "Kerja Efisien",
      desc: "Sebagai Developer, Saya memastikan produk yang saya buat dirancang dengan sebaik baiknya. Meriset segala hal agar tidak terjadi kesalahan dalam produk.",
    },
    {
      img: target,
      text: "Target Jelas",
      desc: "Target yang jelas membawakan pada perencanaan yang mudah dan Pelaksaann yang rapi. Membuat Semua tugas terselesaikan dengan baik dan outputnya maksimal."
    },
    {
      img: lamp,
      text: "Terus Berkembang",
      desc: "Selalu mengikuti perkembangan teknologi. Saya berkomitmen untuk terus belajar agar dapat memberikan solusi yang modern, relevan, dan efisien pada setiap proyek."
    }

  ];

  return (
    <div className="bg-white-bg flex flex-col min-h-screen gap-8 items-center justify-center py-16 px-4">
      <h2 className="flex justify-center font-heading text-4xl md:text-6xl lg:text-8xl">
        My Targets
      </h2>
      <CardGroup className="justify-center! w-full!">
        {targetsData.map((target) => {
          return (
            <Card key={target.text}>
              <div className="flex flex-col px-4 py-8 gap-4">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={target.img}
                    alt={target.text}
                    className="size-8"
                  />
                  <p className="font-heading text-2xl md:text-3xl w-full">
                    {target.text}
                  </p>
                </div>
                <p className="font-p text-base md:text-xl">{target.desc}</p>
              </div>
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
}

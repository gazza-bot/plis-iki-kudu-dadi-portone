import { Card } from "./Card";
import CardGroup from "./CardGroup";
import roket from "/src/assets/roket.svg";
import target from '/src/assets/target.svg';
import lamp from '/src/assets/lamp.svg'

export default function MyTargets() {
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
      desc: "Selalu memperbarui pengetahuan dengan teknologi terbaru. Saya berkomitmen untuk terus belajar agar dapat memberikan solusi yang modern, relevan, dan efisien pada setiap proyek."
    }

  ];

  return (
    <div className="bg-white-bg flex flex-col min-h-screen h-max gap-8 items-center justify-center">
      <h2 className="flex justify-center font-heading text-2xl lg:text-8xl">
        My Targets
      </h2>
      <CardGroup className="justify-center! w-full!">
        {targetsData.map((targetsData) => {
          return (
            <Card>
              <div className="flex flex-col px-4 py-8 gap-4">
                <div className="flex flex-row items-center gap-4">
                  <img
                    src={targetsData.img}
                    alt={targetsData.text}
                    className="size-8"
                  />
                  <p className="font-heading text-4xl w-full">
                    {targetsData.text}
                  </p>
                </div>
                <p className="font-p text-xl">{targetsData.desc}</p>
              </div>
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
}

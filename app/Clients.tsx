"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const clients = [
  {
    id: 1,
    placeholder: "Punjab National Bank",
    img: "/pnb.webp",
  },
  {
    id: 2,
    placeholder: "ABInBev",
    img: "/ABInBev.webp",
  },
  {
    id: 3,
    placeholder: "Canara Bank",
    img: "/CanaraBank.webp",
  },
  {
    id: 4,
    placeholder: "PoscoPosco India Processing Private Limited",
    img: "/Posco.webp",
  },
  {
    id: 5,
    placeholder: "Punjab & Sind Bank",
    img: "/PNSBank.webp",
  },
  {
    id: 6,
    placeholder: "Jamia Millia Islamia",
    img: "/JamiaIslamia.webp",
  },
  {
    id: 7,
    placeholder: "Sharda University",
    img: "/ShardaUniversity.webp",
  },
  {
    id: 8,
    placeholder:
      "National Institute of Science Communication and Information Resources",
    img: "/NISCAIR.webp",
  },
  {
    id: 9,
    placeholder: "National Science Foundation",
    img: "/NationalScienceFoundation.webp",
  },
  {
    id: 10,
    placeholder: "Central Bank Of India",
    img: "/CentralBankOfIndia.webp",
  },
  {
    id: 11,
    placeholder: "UCO Bank",
    img: "/UCOBank.webp",
  },
  {
    id: 12,
    placeholder: "Salwan Education Trust",
    img: "/SalwanPublicSchool.webp",
  },
  {
    id: 13,
    placeholder: "Mahagun India Pvt. Ltd.",
    img: "/Mahagun.webp",
  },
  {
    id: 14,
    placeholder: "Mahagun India Pvt. Ltd.",
    img: "/DhampurBioOrganics.webp",
  },
  {
    id: 15,
    placeholder: "Bhagwan Parshuram Institute of Technology",
    img: "/BPIT.webp",
  },
  {
    id: 16,
    placeholder: "Deepalaya",
    img: "/Deepalya.webp",
  },
];

const firstRow = clients.slice(0, clients.length / 2);
const secondRow = clients.slice(clients.length / 2);

const ReviewCard = ({
  img,
  placeholder,
  id,
}: {
  img: string;
  placeholder: string;
  id: number;
}) => {
  return (
    <figure
      className={cn(
        "relative w-[70px] h-[70px] md:w-full md:h-full cursor-pointer overflow-hidden rounded-xl border p flex justify-center items-center",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <img src={img} alt={""} className="w-20 h-20" />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[40vh] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-inherit md:shadow-xl">
      <div className=" text-blue-700 text-2xl md:text-4xl mb-4 capitalize font-bold text-center">
        Trusted by over 1000+ clients
      </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((icon) => (
          <ReviewCard key={icon.id} {...icon} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((icon) => (
          <ReviewCard key={icon.id} {...icon} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[10vw] lg:w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-[10vw] lg:w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

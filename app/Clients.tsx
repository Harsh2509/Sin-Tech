"use client";
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
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

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

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
        "relative w-full h-full cursor-pointer overflow-hidden rounded-xl border p",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <img src={img} alt={placeholder} className="w-20 h-20" />
    </figure>
  );
};

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <div className=" text-blue-700 text-4xl mb-4 capitalize font-bold">
        OUR CLIENTS
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
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import { TextEffect } from "../components/TextEffect";
import Image from "next/image";
import { Cursor1 } from "./testing";

export default function TextEffectWithPreset() {
  return (
    <div>

      <Navbar />


      <Image src="/s-1.png" alt="Tag Line Banner" width={100} height={100} layout="responsive" className="translate-x-[-0.1%]" />

      <div className="w-screen h-screen flex justify-center items-center">
        <TextEffect
          per="word"
          as="h1"
          preset="slide"
          className=" text-4xl text-center"
        >
          Sin-Tech Electronics website is coming soon!! Stay tuned!
        </TextEffect>
        <Cursor1 />
      </div>
    </div>
  );
}

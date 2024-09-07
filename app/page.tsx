import Navbar from "@/components/Navbar";
import { TextEffect } from "../components/TextEffect";
import { Cursor1 } from "./Cursor1";
import { InView } from "@/components/Inview";
import { Carousel } from "@/components/Carousel";
import { MarqueeDemo } from "./Clients";

export default function TextEffectWithPreset() {
  return (
    <div>
      <Navbar />

      <InView
        variants={{
          hidden: {
            opacity: 0,
            y: 30,
            scale: 0.95,
            filter: "blur(4px)",
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
          },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        viewOptions={{ margin: "0px 0px -350px 0px" }}
      >
        <Carousel />
      </InView>

      <MarqueeDemo />
      <div className="w-screen h-screen flex justify-center items-center">
        <TextEffect
          per="word"
          as="h1"
          preset="slide"
          className=" text-4xl text-center"
        >
          Sin-Tech Electronics website is coming soon!! Stay tuned!
        </TextEffect>
      </div>
      <Cursor1 />
    </div>
  );
}

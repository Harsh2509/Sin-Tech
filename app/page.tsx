import Navbar from "@/components/Navbar";
import { InView } from "@/components/Inview";
import { Carousel } from "@/components/Carousel";
import { MarqueeDemo } from "./Clients";

export const runtime = "edge";

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
    </div>
  );
}

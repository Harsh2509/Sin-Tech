import Link from "next/link";
import WordRotate from "./magicui/word-rotate";
import { RelationTableAliasProxyHandler } from "drizzle-orm";
import { RainbowButton } from "./ui/rainbow-button";
import Image from "next/image";

const products = ["UPS", "Inverters", "Batteries", "Stabilizers"];

export default function TagLine() {
  let seoText = "";
  products.forEach((product) => {
    seoText += product + ", ";
  });
  seoText += "and more power solutions at affordable prices.";

  return (
    <section
      className="relative mt-10 lg:mt-20 mb-10 md:mt-28 px-4 md:px-8 lg:px-16"
      aria-label="Power Solutions Tagline"
    >
      <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
        <div className="flex flex-col justify-center items-center md:items-baseline gap-4">
          <header>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight text-center md:text-left">
              Explore affordable <br className="hidden md:block" />& reliable
              power solutions including{" "}
              <WordRotate
                words={products}
                className="text-2xl sm:text-4xl md:text-5xl font-semibold text-indigo-600 animate-bounce inline-block"
              />
            </h1>
          </header>
          <AnimatedButton />
        </div>
        <img
          src="/heroImage.webp"
          alt="UPS, Batteries and Inverters"
          className=" h-48 w-48 hidden md:block md:h-96 md:w-96 mix-blend-darken"
        />
      </div>
    </section>
  );
}

function AnimatedButton() {
  return (
    <RainbowButton>
      <Link href="/products" aria-label="Shop Power Solutions">
        Shop Power Solutions Now
      </Link>
    </RainbowButton>
  );
}

import Link from "next/link";
import WordRotate from "./magicui/word-rotate";

const products = ["UPS", "Inverters", "Batteries", "Stabilizers"];

export default function TagLine() {
  let seoText = "";
  products.forEach((product) => {
    seoText += product + ", ";
  });
  seoText += "and more power solutions at affordable prices.";

  return (
    <section
      className="relative mt-10 lg:mt-20 mb-10 md:mt-40 px-4 md:px-8 lg:px-16"
      aria-label="Power Solutions Tagline"
    >
      <div className="flex flex-col md:flex-row items-center md:items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
        <header>
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight">
            Explore affordable <br className="hidden md:block" />& reliable
            power solutions including{" "}
            <WordRotate
              words={products}
              className="text-2xl sm:text-4xl md:text-6xl font-semibold text-indigo-600 animate-bounce inline-block"
            />
          </h1>
        </header>
        <AnimatedButton />
      </div>
    </section>
  );
}

function AnimatedButton() {
  return (
    <Link
      href="/products"
      aria-label="Shop Power Solutions"
      className="relative inline-block px-5 py-[0.7rem] lg:px-8 lg:py-4 mt-6 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl text-xs sm:text-lg md:text-lg"
    >
      Shop Power Solutions Now
    </Link>
  );
}

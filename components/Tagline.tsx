import Link from "next/link";
import WordRotate from "./magicui/word-rotate";

const products = ["UPS", "Inverters", "Batteries", "Stabilizers"];

export default function TagLine() {
  return (
    <div className="relative mt-20 mb-10 md:mt-40 px-4 md:px-8 lg:px-16">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 justify-between">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Explore affordable <br className="hidden md:block" />& reliable power
          solutions including{" "}
          <WordRotate
            words={products}
            className="text-4xl md:text-6xl font-semibold text-indigo-600 animate-bounce inline-block"
          />
        </h1>
        <AnimatedButton />
      </div>
    </div>
  );
}

function AnimatedButton() {
  return (
    <Link
      href="/products"
      className="relative inline-block px-6 py-3 lg:px-8 lg:py-4 mt-6 font-semibold text-white bg-indigo-600 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl text-sm md:text-lg"
    >
      Shop Now
    </Link>
  );
}

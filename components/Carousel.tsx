"use client";
import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export function Carousel() {
  const slides = [
    {
      url: "/s-1.webp",
    },
    {
      url: "/s-2.webp",
    },
    {
      url: "/s-3.webp",
    },

    {
      url: "/s-4.webp",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageNumber, setImageNumber] = useState(4);

  useEffect(() => {
    let time = 5000;

    // for loading images in the carousel in the first time
    if (imageNumber > 0) {
      time = 800;
      setImageNumber(imageNumber - 1);
    }
    const interval = setInterval(() => {
      nextSlide();
    }, time);
    return () => clearInterval(interval);
  }, [currentIndex, imageNumber]);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="h-[20vh] md:h-[40vh] lg:h-[65vh] w-full m-auto py-3 px-2 md:px-4 relative group">
      <div
        style={{
          backgroundImage: `url(${
            slides[currentIndex] != undefined && slides[currentIndex].url
          })`,
        }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          ></div>
        ))}
      </div>
    </div>
  );
}

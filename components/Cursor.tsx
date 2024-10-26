"use client";
import React, { useEffect, useRef } from "react";
import "./CustomCursor.css";

export const Cursor = () => {
  const circleElement = useRef<HTMLDivElement | null>(null); // Specify type as HTMLDivElement or null
  const mouseRef = useRef({ x: 0, y: 0 }); // Mouse position reference
  const previousMouseRef = useRef({ x: 0, y: 0 }); // Previous mouse position reference
  const circleRef = useRef({ x: 0, y: 0 }); // Circle position reference
  const scaleRef = useRef(0); // Scale reference
  const speed = 0.17;
  const currentAngleRef = useRef(0);

  // Update mouse position on mouse move
  const handleMouseMove = (e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const tick = () => {
    const { x: mouseX, y: mouseY } = mouseRef.current;
    const { x: previousX, y: previousY } = previousMouseRef.current;

    // Calculate circle movement based on mouse position and smoothing
    circleRef.current.x += (mouseX - circleRef.current.x) * speed;
    circleRef.current.y += (mouseY - circleRef.current.y) * speed;

    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circleRef.current.x}px, ${circleRef.current.y}px)`;

    // SQUEEZE
    const deltaMouseX = mouseX - previousX;
    const deltaMouseY = mouseY - previousY;

    previousMouseRef.current.x = mouseX;
    previousMouseRef.current.y = mouseY;

    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      150
    );

    const scaleValue = (mouseVelocity / 150) * 0.5;

    scaleRef.current += (scaleValue - scaleRef.current) * speed;

    const scaleTransform = `scale(${1 + scaleRef.current}, ${
      1 - scaleRef.current
    })`;

    // ROTATE
    const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

    if (mouseVelocity > 20) {
      currentAngleRef.current = angle;
    }
    const rotateTransform = `rotate(${currentAngleRef.current}deg)`;

    if (circleElement.current) {
      circleElement.current.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    }

    window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="circle invisible md:visible" ref={circleElement}></div>
  );
};

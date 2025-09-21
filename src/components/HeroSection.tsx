// src/components/HeroSection.tsx
import React from "react";
import BlurText from "./BlurText";
import Particles from "./Particles";

const HeroSection: React.FC = () => {
  const title = "Space Safety AI";
  const subtitle = "Real-time Safety Object Detection";
  const description =
    "Upload an image. Detect helmets, tools, and hazards in seconds.";

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Background Particles */}
      <Particles />

      {/* Centered Animated Text */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center space-y-6">
        <BlurText
          text={title}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-6xl md:text-8xl font-bold text-blue-400 leading-snug whitespace-pre-line text-center"
        />

        <BlurText
          text={subtitle}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-xl md:text-2xl text-blue-400 leading-snug whitespace-pre-line text-center"
        />

        <BlurText
          text={description}
          delay={100}
          animateBy="words"
          direction="top"
          className="text-lg md:text-xl text-blue-400 leading-snug whitespace-pre-line text-center"
        />
      </div>
    </section>
  );
};

export default HeroSection;

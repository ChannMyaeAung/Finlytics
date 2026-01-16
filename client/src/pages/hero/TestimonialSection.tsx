import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";
import React from "react";
import { testimonials, testimonialsTwo } from "./data/testimonials";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TestimonialSection = () => {
  return (
    <section className="bg-[#e5f7ff] overflow-hidden relative">
      <img
        src="/world.png"
        alt="world background image"
        className="h-[90%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
      <h1 className="ml-20 z-50 absolute top-10">
        <em className="leading-[1em] text-6xl font-black text-center not-italic">
          Trusted by <br />
          millions.
        </em>
      </h1>

      <div className="relative flex w-full flex-col items-center  justify-center overflow-hidden py-8 my-40">
        <ScrollVelocityContainer className="w-full">
          {/* 1st Testimonials Row */}
          <ScrollVelocityRow baseVelocity={1} direction={1} className="py-4">
            {testimonials.map((t, index) => (
              <div
                className="flex flex-col bg-white border border-lg mx-4 min-h-80 h-80 space-y-6 w-120 rounded-lg shadow-md overflow-hidden py-6 px-8 relative"
                key={index}
              >
                {/* Avatar, Name, Date, and Source */}
                <div className="flex items-center gap-3 justify-start self-start">
                  <Avatar className="size-15">
                    <AvatarImage
                      src={t.avatar}
                      alt={t.name}
                      className=""
                      sizes="lg"
                    />
                    <AvatarFallback>{t.name}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
                      {t.name}
                    </h2>
                    <div className="flex gap-1 items-center">
                      <span className="text-gray-500 text-[15px]">
                        {t.date}
                      </span>
                      <span className="text-[#f73a7e] text-[15px]">
                        {t.source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Text and Rating stars */}
                <div className="text-wrap flex-1 h-full">
                  <p className="leading-5 text-sm [&:not(:first-child)]:mt-6 line-clamp-10 text-gray-500">
                    {t.text}
                  </p>
                </div>

                {/* Rating Stars */}
                <div className="flex self-center items-center justify-center w-full absolute right-0 bottom-3">
                  {testimonials.map((t, idx) => (
                    <div key={idx}>
                      <StarIcon />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </ScrollVelocityRow>

          {/* 2nd Testimonials Row */}
          <ScrollVelocityRow baseVelocity={1} direction={-1} className="py-4">
            {testimonialsTwo.map((t, idx) => (
              <div
                className="flex flex-col bg-white border border-lg mx-4 min-h-80 h-80 space-y-6 w-120 rounded-lg shadow-md overflow-hidden py-6 px-8 relative"
                key={idx}
              >
                {/* Avatar, Name, Date, and Source */}
                <div className="flex items-center gap-3 justify-start self-start">
                  <Avatar className="size-15">
                    <AvatarImage src={t.avatar} alt={t.name} />
                    <AvatarFallback className="bg-blue-500"></AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <h2 className="scroll-m-20 text-lg font-semibold tracking-tight">
                      {t.name}
                    </h2>
                    <div className="flex gap-1 items-center">
                      <span className="text-gray-500 text-[15px]">
                        {t.date}
                      </span>
                      <span className="text-[#f73a7e] text-[15px]">
                        {t.source}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <div className="text-wrap flex-1 h-full">
                  <p className="leading-5 text-sm [&:not(:first-child)]:mt-6 line-clamp-10 text-gray-500">
                    {t.text}
                  </p>
                </div>

                {/* Rating Stars */}
                <div className="flex self-center items-center justify-center w-full absolute right-0 bottom-3"></div>
              </div>
            ))}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </div>
    </section>
  );
};

// Simple SVG Star Component to match the Green Toshl Stars
const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5 text-[#22c55e]" // Tailwind green-500 matches the screenshot nicely
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);

export default TestimonialSection;

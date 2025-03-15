"use client";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlide2 from "./HeroSlide2";
import universityImage1 from "@/assets/images/herobanner/university_1.jpg";
import universityImage2 from "@/assets/images/herobanner/university_2.jpg";
import universityImage3 from "@/assets/images/herobanner/university_3.jpg";
import Image from "next/image";
const HeroSlider2 = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const slides = [
    {
      title: (
        <>
          World <span className="text-secondaryColor">Ranking</span> best{" "}
          <br className="hidden 2xl:block" />
          University place.
        </>
      ),
      tag: "EDUCATION SOLUTION",
    },
    {
      title: (
        <>
          Degree that’s right for your <br />
          Bright future
        </>
      ),
      tag: "Career Solution",
    },
    {
      title: (
        <>
          Let’s build your awesome <br />
          Degree with Edurock
        </>
      ),
      tag: "Certificate Solution",
    },
  ];

  const thumbsImages = [universityImage1, universityImage2, universityImage3];
  return (
    <>
      <Swiper
        navigation={true}
        grabCursor={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs]}
        className="ecommerce-slider2 w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <HeroSlide2 slide={slide} idx={idx} />
          </SwiperSlide>
        ))}
      </Swiper>
      
    </>
  );
};

export default HeroSlider2;

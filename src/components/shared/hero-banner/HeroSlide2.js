import React, { useEffect, useState } from "react";
import HreoName from "../section-names/HreoName";
import Link from "next/link";
const HeroSlide2 = ({ slide, idx }) => {
  const { title, tag } = slide;
  const [imageUrls, setImageUrls] = useState(null); // Initialize as null

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/getwebsite_hero");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setImageUrls(
              data.map((item) => ({
                image1: item.image1
                  ? `http://localhost:5000/uploads/${item.image1}`
                  : null,
                image2: item.image2
                  ? `http://localhost:5000/uploads/${item.image2}`
                  : null,
                image3: item.image3
                  ? `http://localhost:5000/uploads/${item.image3}`
                  : null,
              }))
            );
          } else {
            setImageUrls([]); // Set to empty array if no data
          }
        } else {
          console.error("Failed to fetch images:", response.status);
          setImageUrls([]); // Set to empty array on error
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setImageUrls([]); // Set to empty array on error
      }
    };

    fetchImages();
  }, []);

  const getBackgroundImage = () => {
    if (imageUrls && imageUrls.length > 0) {
      if (idx === 0) {
        if (imageUrls[0].image1) {
          return `url('${imageUrls[0].image1}')`;
        }
      } else if (idx === 1) {
        if (imageUrls[0].image2) {
          return `url('${imageUrls[0].image2}')`;
        }
      } else if (idx === 2) {
        if (imageUrls[0].image3) {
          return `url('${imageUrls[0].image3}')`;
        }
      }
    }

    // Default background if images are not available or are null
    return idx === 0
      ? "url('../assets/images/herobanner/university_1.jpg')"
      : idx === 1
      ? "url('../assets/images//herobanner/university_2.jpg')"
      : "url('../assets/images/herobanner/university_3.jpg')";
  };

  return (
    <div
      className={`hero relative z-0`}
      style={{ backgroundImage: getBackgroundImage() }}
    >
      <div className="bg-black bg-opacity-70 overflow-hidden pt-50px pb-100px md:pt-35 md:pb-170px lg:pt-100px lg:pb-150px 2xl:pt-35 2xl:pb-170px">
        <div className="container 2xl:container-secondary-md relative overflow-hidden text-center">
          <div data-aos="fade-up">
            <div>
              <HreoName>{tag}</HreoName>

              <h1 className="text-size-35 md:text-size-50 lg:text-5xl 2xl:text-size-75 leading-42px md:leading-15 lg:leading-14 2xl:leading-90px text-whiteColor md:tracking-half lg:tracking-normal 2xl:tracking-half font-bold mb-5 md:mb-50px">
                {title}
              </h1>

              <div>
                <Link
                  href="/about"
                  className="text-whiteColor bg-primaryColor border border-primaryColor px-10 py-15px hover:text-primaryColor hover:bg-whiteColor rounded-full inline-block dark:hover:bg-whiteColor-dark dark:hover:text-whiteColor"
                >
                  More about ReadGro
                </Link>
              </div>
              <div className="mt-20 md:mt-50px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide2;

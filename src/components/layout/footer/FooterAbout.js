import useIsSecondary from "@/hooks/useIsSecondary";

const FooterAbout = () => {
  const { isSecondary } = useIsSecondary();
  return (
    <div
      className="sm:col-start-1 sm:col-span-12 md:col-span-6  lg:col-span-4 mr-30px"
      data-aos="fade-up"
    >
      <h4 className="text-size-22 font-bold text-whiteColor mb-3">About us</h4>
      <p className="text-base lg:text-sm 2xl:text-base text-darkgray mb-30px leading-1.8 2xl:leading-1.8">
        We are an innovative e-learning and e-earning platform designed to
        empower individuals with knowledge and financial growth. At ReadGro, we
        believe that education should not only enhance your skills but also open
        doors to real-world opportunities.
      </p>

      <ul className="flex gap-3 lg:gap-2 2xl:gap-3" data-aos="fade-up">
        <li>
          <a
            href="https://www.facebook.com/"
            className="w-11 md:w-10 2xl:w-11 h-11 md:h-10 2xl:h-11 leading-11 md:leading-10 2xl:leading-11 text-whitegrey bg-darkgray bg-opacity-10 hover:text-whiteColor dark:text-whiteColor-dark dark:bg-whiteColor dark:hover:bg-secondaryColor dark:hover:text-whiteColor rounded-full text-center"
          >
            <i className="icofont-facebook"></i>
          </a>
        </li>
        <li>
          <a
            href="https://x.com/"
            className="w-11 md:w-10 2xl:w-11 h-11 md:h-10 2xl:h-11 leading-11 md:leading-10 2xl:leading-11 text-whitegrey bg-darkgray bg-opacity-10 hover:text-whiteColor dark:text-whiteColor-dark dark:bg-whiteColor dark:hover:bg-secondaryColor dark:hover:text-whiteColor rounded-full text-center"
          >
            <i className="icofont-twitter"></i>
          </a>
        </li>
        <li>
          <a
            href="https://vimeo.com/"
            className="w-11 md:w-10 2xl:w-11 h-11 md:h-10 2xl:h-11 leading-11 md:leading-10 2xl:leading-11 text-whitegrey bg-darkgray bg-opacity-10 hover:text-whiteColor dark:text-whiteColor-dark dark:bg-whiteColor dark:hover:bg-secondaryColor dark:hover:text-whiteColor rounded-full text-center"
          >
            <i className="icofont-vimeo"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/"
            className="w-11 md:w-10 2xl:w-11 h-11 md:h-10 2xl:h-11 leading-11 md:leading-10 2xl:leading-11 text-whitegrey bg-darkgray bg-opacity-10 hover:text-whiteColor dark:text-whiteColor-dark dark:bg-whiteColor dark:hover:bg-secondaryColor dark:hover:text-whiteColor rounded-full text-center"
          >
            <i className="icofont-linkedin"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.skype.com/"
            className="w-11 md:w-10 2xl:w-11 h-11 md:h-10 2xl:h-11 leading-11 md:leading-10 2xl:leading-11 text-whitegrey bg-darkgray bg-opacity-10 hover:text-whiteColor dark:text-whiteColor-dark dark:bg-whiteColor dark:hover:bg-secondaryColor dark:hover:text-whiteColor rounded-full text-center"
          >
            <i className="icofont-skype"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default FooterAbout;

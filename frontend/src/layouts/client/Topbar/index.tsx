import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import LanguageMenu from "../../../components/LanguageMenu";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
const Topbar = () => {
  return (
    <>
      <section className="flex items-center justify-between bg-[#1F1F1F] lg:px-10 px-2">
        <div>
            <LanguageMenu />
         </div>
        <div className="lg:w-[40%] w-full h-16 mx-auto flex items-center justify-center relative">
          <div className="absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-prev bg-transparent">
          <GoArrowRight className="text-white font-extrabold text-xl bg-[#1F1F1F]" />
          </div>
          <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-next bg-transparent">
            <GoArrowLeft className="text-white font-extrabold text-xl bg-[#1F1F1F]" />
          </div>

          <Swiper
            pagination={{
              type: "fraction",
            }}
            fadeEffect={{ crossFade: true }}
            speed={1500} 
            navigation={{
              nextEl: ".custom-next",
              prevEl: ".custom-prev",
            }}
            loop={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className="h-16 w-full flex relative overflow-hidden items-center justify-center bg-transparent">
              <span className="w-full m-0 p-0 uppercase text-white lg:text-[18px] text-[12px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                free delivery for orders over 1000 tl
              </span>
            </SwiperSlide>
            <SwiperSlide className="h-16 w-full flex relative items-center justify-center bg-transparent">
              <span className="w-full m-0 p-0 uppercase text-white lg:text-[18px] text-[12px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
               3-INSTALLMENT OPPORTUNITY WITHOUT INTEREST
              </span>
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="lg:flex hidden items-center gap-4 text-xl  py-5">
          <a href="#">
            <FaFacebookF className="text-lg text-white" />
          </a>
          <a href="#">
            <FaXTwitter className="text-lg text-white" />
          </a>
          <a href="#">
            <FaInstagram className="text-lg text-white" />
          </a>
          <a href="#">
            <FaYoutube className="text-lg text-white" />
          </a>
        </div>
      </section>
    </>
  );
};

export default Topbar;

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
// Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import LanguageMenu from "../../../components/LanguageMenu";

// import required modules
const Topbar = () => {
  return (
    <>
      <section className="flex items-center justify-between bg-[#1F1F1F] py-3 px-5">
        <div>
          <h1 className="text-3xl font-bold text-shadow-amber-950"><LanguageMenu /></h1>
        </div>
        <div className="w-[70%] h-15 mx-auto flex items-center justify-center">
          {/* <Swiper direction={"vertical"} loop={true} className="mySwiper h-full flex items-center justify-center">
            <SwiperSlide className="flex items-center justify-center h-full border text-center">
              <span className="text-white text-sm text-center">FREE DELIVERY FOR ORDERS OVER 1000 TL</span>
            </SwiperSlide>
             <SwiperSlide className="flex items-center justify-center h-full border text-center">
              <span className="text-white text-sm text-center">FREE DELIVERY FOR ORDERS OVER 1000 TL</span>
            </SwiperSlide>
          </Swiper> */}
        </div>
        <div className="flex items-center gap-4 text-xl px-6 py-5">
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

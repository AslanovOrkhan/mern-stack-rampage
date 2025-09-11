import swiperImageOne from "../../../assets/images/Sogutucu_Web.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaArrowRightLong } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import ProductItem from "../../../components/productItem";
const Home = () => {
  return (
    <div>
      <section className="w-full h-[100vh] p-10">
        {" "}
        <Swiper
          pagination={{
            type: "fraction",
          }}
          fadeEffect={{ crossFade: true }}
          speed={1500}
          spaceBetween={50}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={true}
          modules={[Navigation]}
          className="mySwiper rounded-xl"
        >
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-start gap-5 absolute bottom-[4%] left-0  w-full py-16 px-12">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-5xl w-[40%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">
                    examine{" "}
                  </span>
                  <FaArrowRightLong className="text-white mt-1" />{" "}
                </button>
              </div>
              <div className="border-t border-t-gray-500 p-3 w-full relative">
                <div className="absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-next bg-transparent">
                  <GoArrowRight className="text-white font-extrabold text-xl" />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-prev bg-transparent">
                  <GoArrowLeft className="text-white font-extrabold text-xl" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-start gap-5 absolute bottom-[4%] left-0  w-full py-16 px-12">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-5xl w-[40%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">
                    examine{" "}
                  </span>
                  <FaArrowRightLong className="text-white mt-1" />{" "}
                </button>
              </div>
              <div className="border-t border-t-gray-500 p-3 w-full relative">
                <div className="absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-next bg-transparent">
                  <GoArrowRight className="text-white font-extrabold text-xl" />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-prev bg-transparent">
                  <GoArrowLeft className="text-white font-extrabold text-xl" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-start gap-5 absolute bottom-[4%] left-0  w-full py-16 px-12">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-5xl w-[40%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">
                    examine{" "}
                  </span>
                  <FaArrowRightLong className="text-white mt-1" />{" "}
                </button>
              </div>
              <div className="border-t border-t-gray-500 p-3 w-full relative">
                <div className="absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-next bg-transparent">
                  <GoArrowRight className="text-white font-extrabold text-xl" />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-prev bg-transparent">
                  <GoArrowLeft className="text-white font-extrabold text-xl" />
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-start gap-5 absolute bottom-[4%] left-0  w-full py-16 px-12">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-white text-5xl w-[40%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">
                    examine{" "}
                  </span>
                  <FaArrowRightLong className="text-white mt-1" />{" "}
                </button>
              </div>
              <div className="border-t border-t-gray-500 p-3 w-full relative">
                <div className="absolute top-1/2 right-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-next bg-transparent">
                  <GoArrowRight className="text-white font-extrabold text-xl" />
                </div>
                <div className="absolute top-1/2 left-0 transform -translate-x-0 -translate-y-1/2 z-10 cursor-pointer custom-prev bg-transparent">
                  <GoArrowLeft className="text-white font-extrabold text-xl" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="best-seller-product-container p-10">
        <h2 className="text-5xl font-semibold text-start capitalize">
          best seller
        </h2>
        <ul className="flex items-center justify-start gap-6 mt-6">
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">earphones</span>
          </li>
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">gaming keyboard</span>
          </li>
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">mouse</span>
          </li>
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">gaming chair</span>
          </li>
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">monitor</span>
          </li>
          <li className="active border border-black bg-black py-3 px-5 rounded-4xl">
            <span className="text-[18px] font-semibold text-white capitalize">gaming wheel</span>
          </li>
           
        </ul>
        <div className="product-box grid grid-cols-4  gap-6 mt-6">
         <ProductItem />
         <ProductItem />
         <ProductItem />
         <ProductItem />
        </div>
      </section>
    </div>
  );
};

export default Home;

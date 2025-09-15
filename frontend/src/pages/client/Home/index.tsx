import swiperImageOne from "../../../assets/images/Sogutucu_Web.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { FaAngleLeft, FaAngleRight, FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import ProductItem from "../../../components/productItem";
import { FreeMode, Pagination, A11y } from "swiper/modules";

const items = [
  "earphones",
  "gaming keyboard",
  "mouse",
  "gaming chair",
  "monitor",
  "gaming wheel",
];

const Chip = ({ label }: { label: string }) => (
  <li className="cursor-pointer py-3 px-4 rounded-4xl overflow-hidden relative z-[1] bg-[#F8F8F8] transition-all duration-300 flex items-center justify-center group">
    <span className="lg:text-[16px] font-semibold capitalize text-black transition-all duration-300 relative z-10 group-hover:text-white">
      {label}
    </span>
    <span className="absolute left-0 bottom-0 w-full h-0 bg-black rounded-4xl -z-[1] transition-all duration-300 group-hover:h-full" />
  </li>
);
const Home = () => {
  return (
    <>
      <section className="w-full lg:h-[100vh] h-[85vh] lg:py-10 py-5 lg:px-10 px-2">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          fadeEffect={{ crossFade: true }}
          speed={1000}
          spaceBetween={50}
          navigation={{
            nextEl: ".custom-prev-btn",
            prevEl: ".custom-next-btn",
          }}
          loop={true}
          modules={[Navigation]}
          className="mySwiper rounded-xl relative"
        >
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-center gap-5 absolute bottom-[8%] left-0  w-full py-6 lg:px-12 px-2">
              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-3 justify-between w-full border-b border-gray-500 py-6">
                <h3 className="text-white lg:text-5xl text-4xl lg:w-[40%] w-[100%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="lg:w-auto w-full flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">examine</span>
                  <FaArrowRightLong className="text-white text-base mt-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-center gap-5 absolute bottom-[8%] left-0  w-full py-6 lg:px-12 px-2">
              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-3 justify-between w-full border-b border-gray-500 py-6">
                <h3 className="text-white lg:text-5xl text-4xl lg:w-[40%] w-[100%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="lg:w-auto w-full flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">examine</span>
                  <FaArrowRightLong className="text-white text-base mt-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-center gap-5 absolute bottom-[8%] left-0  w-full py-6 lg:px-12 px-2">
              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-3 justify-between w-full border-b border-gray-500 py-6">
                <h3 className="text-white lg:text-5xl text-4xl lg:w-[40%] w-[100%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="lg:w-auto w-full flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">examine</span>
                  <FaArrowRightLong className="text-white text-base mt-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="w-full h-full rounded-xl overflow-hidden relative">
            <img
              src={swiperImageOne}
              className="w-full h-full object-cover relative"
              alt=""
            />
            <div className="flex flex-col items-center gap-5 absolute bottom-[8%] left-0  w-full py-6 lg:px-12 px-2">
              <div className="flex lg:flex-row flex-col lg:items-center items-start lg:gap-0 gap-3 justify-between w-full border-b border-gray-500 py-6">
                <h3 className="text-white lg:text-5xl text-4xl lg:w-[40%] w-[100%] capitalize font-semibold">
                  create a storm effect against summer heat
                </h3>
                <button className="lg:w-auto w-full flex items-center justify-center gap-3 outline-none border-white border bg-black py-3 px-10 rounded-full cursor-pointer">
                  <span className="text-white capitalize text-xl">examine</span>
                  <FaArrowRightLong className="text-white text-base mt-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
          <div className="px-12  w-full py-6 absolute bottom-0 z-50 flex items-center justify-between mt-6">
            <div className="z-10 cursor-pointer custom-next-btn bg-transparent">
              <FaArrowLeftLong className="text-white font-extrabold text-xl" />
            </div>
            <div className="z-10 cursor-pointer custom-prev-btn bg-transparent">
              <FaArrowRightLong className="text-white font-extrabold text-xl" />
            </div>
          </div>
        </Swiper>
      </section>
      <section className="best-seller-product-container lg:py-10 lg:px-10 px-2">
        <h2 className="text-5xl font-semibold text-start capitalize">
          best seller
        </h2>
        <div className="mt-6">
          <div className="lg:hidden rounded-3xl py-2 flex items-center justify-between">
            <Swiper
              modules={[FreeMode, Pagination]}
              freeMode
              spaceBetween={12}
              slidesPerView={"auto"}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                360: { slidesPerView: 2.2, spaceBetween: 12 },
                480: { slidesPerView: 2.8, spaceBetween: 12 },
                640: { slidesPerView: 3.2, spaceBetween: 12 },
                768: { slidesPerView: 4, spaceBetween: 12 },
              }}
              className="!px-2"
            >
              {items.map((label) => (
                <SwiperSlide key={label} className="!w-auto">
                  <Chip label={label} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="justify-between items-center hidden lg:flex">
          <ul className="hidden lg:flex items-center justify-start gap-6 mt-6 rounded-3xl p-2">
            {items.map((label) => (
              <Chip key={label} label={label} />
            ))}
          </ul>
          <div className="flex items-center gap-2 p-4">
            <button
              className="prod-prev cursor-pointer z-10 rounded-full bg-[#F4F4F4] w-12 h-12 grid place-items-center shadow hover:bg-white"
              aria-label="Previous"
            ><FaAngleLeft className="text-xl" /></button>
            <button
              className="prod-next cursor-pointer z-10 rounded-full bg-[#F4F4F4] w-12 h-12 grid place-items-center shadow hover:bg-white"
              aria-label="Next"
            >
              <FaAngleRight className="text-xl" />
            </button>
          </div>
          </div>
        </div>
        <div className="mt-6 relative">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1.1}
            navigation={{ nextEl: ".prod-next", prevEl: ".prod-prev" }}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="!px-2"
          >
            {items.map((_, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <ProductItem />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Home;

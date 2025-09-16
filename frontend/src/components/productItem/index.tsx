import { AiFillStar } from "react-icons/ai";
import itemface from "../../assets/images/9756.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FiEye } from "react-icons/fi";
import { useRef } from "react";
// import ProductModal from "../ProductModal";
// import { useState } from "react";

const ProductItem = () => {
  const swiperRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);
  // const [showModal, setShowModal] = useState(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const container = e.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));

    const swiper = swiperRef.current;
    if (!swiper) return;

    const maxIndex = swiper.slides.length - 1;
    const nextIndex = Math.round(ratio * maxIndex);

    if (swiper.activeIndex === nextIndex) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      swiper.slideTo(nextIndex);
    });
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  return (
    <>
      <div className="bg-[#F8F8F8] rounded-2xl flex flex-col gap-4 group">
        <div
          className="relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Swiper
            loop={true}
            pagination={true}
            className="mySwiper"
            onSwiper={(s) => (swiperRef.current = s)}
          >
            <SwiperSlide>
              <img
                src={itemface}
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={itemface}
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={itemface}
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src={itemface}
                className="w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
          </Swiper>
          <button
            className="absolute cursor-pointer top-[5%] right-[5%] border border-gray-300 outline-none w-11 h-11 bg-white rounded-full flex items-center justify-center opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-all duration-500 z-50"
            // onClick={() => setShowModal(true)}
          >
            <FiEye className="text-[17px]" />
          </button>
          <button className="cursor-pointer add-to-basket absolute bottom-[5%] left-1/2 -translate-x-1/2 py-2 px-3.5 border border-white outline-none  bg-black rounded-full flex items-center justify-center opacity-0 visibility-hidden group-hover:opacity-100 group-hover:visibility-visible transition-all duration-500 z-50">
            <span className="text-white font-semibold">Sepete Ekle</span>
          </button>
        </div>
        <div className="product-content flex flex-col items-start gap-1 py-3 pl-3 pr-5">
          <div className="rating flex items-center justify-start gap-2">
            <div className="flex items-center justify-start">
              <AiFillStar className="text-red-700 text-xl" />
              <AiFillStar className="text-red-700 text-xl" />
              <AiFillStar className="text-red-700 text-xl" />
              <AiFillStar className="text-red-700 text-xl" />
              <AiFillStar className="text-red-700 text-xl" />
            </div>
            <span className="text-black text-[18px]">(5)</span>
          </div>
          <h3 className="text-black text-[20px] font-bold">SN-R10 ALQUIST</h3>
          <h4 className="text-black font-semibold">
            Sn-R10 Alquist 3.5mm RGB Gaming Headset
          </h4>
          <div className="flex items-center justify-start gap-3">
            <span className="cost-price text-red-700 font-semibold">
              999.00TL
            </span>
            <span className="sale-price text-gray-500 mb-2">1,239.00TL</span>
          </div>
        </div>
      </div>
      {/* <ProductModal open={showModal} onClose={() => setShowModal(false)} /> */}
    </>
  );
};

export default ProductItem;

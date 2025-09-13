import modalSwiperImage from "../../assets/images/9757.webp"
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

 interface ProductModalProps {
  open: boolean;
  onClose: () => void;
}

import { useEffect, useState } from "react";
import LightGallery from "../LightGallery";

const ProductModal = ({ open, onClose }: ProductModalProps) => {
  const [showGallery, setShowGallery] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative w-[85%] h-[90vh] rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300 grid grid-cols-2 ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-28 scale-90 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="detail-slider bg-[#F8F8F8]">
          <div onClick={() => setShowGallery(true)}>
            <Swiper loop={true} slidesPerView={1} slidesPerGroup={1} className="mySwiper w-full h-full">
              <SwiperSlide className="max-w-[100%] max-h-[80%] m-auto">
                  <img src={modalSwiperImage} className="w-[80%] h-full object-cover" alt="" />
              </SwiperSlide>
               <SwiperSlide className="max-w-[100%] max-h-[80%] m-auto">
                  <img src={modalSwiperImage} className="w-[80%] h-full object-cover" alt="" />
              </SwiperSlide>
               <SwiperSlide className="max-w-[100%] max-h-[80%] m-auto">
                  <img src={modalSwiperImage} className="w-[80%] h-full object-cover" alt="" />
              </SwiperSlide>
            </Swiper>
          </div>
          {showGallery && <LightGallery />}
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default ProductModal;

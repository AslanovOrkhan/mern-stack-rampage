import { useEffect } from "react";
import itemface from "../../assets/images/9756.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRef } from "react";
const ProductModal = () => {
  const swiperRef = useRef<any>(null);
  const rafRef = useRef<number | null>(null);

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

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  return (
    <div className="absolute top-0 left-0 w-full h-full z-[999] flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
      <div className="w-[80%] h-[85%] m-auto bg-white z-10 relative grid grid-cols-2 rounded-2xl overflow-hidden">
        <div className="overflow-hidden bg-[#F8F8F8]">
          <div className="flex flex-col gap-4 group">
            <div
              className="relative"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <Swiper
                loop={true}
                pagination={true}
                className="mySwiper bg-[F8F8F8] cursor-pointer"
                onSwiper={(s) => (swiperRef.current = s)}
              >
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center p-6">
                  <img
                    src={itemface}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ProductModal;

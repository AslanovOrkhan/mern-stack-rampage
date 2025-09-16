import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import FooterServiceCard from "../FooterServiceCard";

const services = [
  {
    name: "Fast and Free Delivery",
    description: "Free shipping on all orders over 1000 TL",
  },
  {
    name: "Related Customer Services",
    description: "Get help quickly and easily by contacting us on any issue.",
  },
  {
    name: "Special Offers",
    description:
      "Join us with your email for our offers tailored to your needs",
  },
  {
    name: "Safe Payment",
    description:
      "All your information is safe with iyzico payment infrastructure",
  },
];

const FooterService = () => {
  return (
    <div className="py-4 px-4 md:px-10">
       <div className="md:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={12}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.3 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2.2 },
          }}
        >
          {services.map((item) => (
            <SwiperSlide key={item.name}>
              <FooterServiceCard
                name={item.name}
                description={item.description}
                className="h-full rounded-2xl border border-gray-200 p-4 bg-white shadow-sm"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

       <div className="hidden md:grid grid-cols-4">
        {services.map((item, idx) => (
          <FooterServiceCard
            key={item.name}
            name={item.name}
            description={item.description}
            className={`pl-4 ${
              idx !== services.length - 1 ? "border-r border-gray-400" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterService;

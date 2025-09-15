import { FaStar } from "react-icons/fa6";

const BannerCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:w-[70%] w-[100%] m-auto">
      <div className="flex items-center justify-center">
        <FaStar className="text-yellow-500 text-2xl" />
        <FaStar className="text-yellow-500 text-2xl" />
        <FaStar className="text-yellow-500 text-2xl" />
        <FaStar className="text-yellow-500 text-2xl" />
        <FaStar className="text-yellow-500 text-2xl" />
      </div>
      <p className="text-center text-white text-3xl">The packaging was sturdy and arrived quickly. I really liked the lights.</p>
      <span className="text-gray-300 capitalize text-2xl">wish</span>
    </div>
  );
};

export default BannerCard;

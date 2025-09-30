import { FaRegCreditCard } from "react-icons/fa6";

const SaleCard = () => {
  return (
    <div className="py-6 px-3 bg-[#3B82F6] rounded-lg flex flex-col items-center justify-between gap-3">
      <FaRegCreditCard className="text-white text-2xl"/>
      <span className="text-white text-lg">Today Orders</span>
      <span className="text-xl font-bold text-white">$0.00</span>
      <div className="flex items-start justify-center gap-6 mt-3">
        <div className="flex flex-col items-center justify-start gap-1">
          <span  className="text-white text-lg">cash</span>
          <p className="text-lg text-white">$0.00</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-1">
          <span className="text-white text-lg">credit</span>
          <p className="text-lg text-white">$0.00</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-1">
          <span className="text-white text-lg">credit</span>
          <p className="text-lg text-white">$0.00</p>
        </div>
      </div>
    </div>
  );
};

export default SaleCard;

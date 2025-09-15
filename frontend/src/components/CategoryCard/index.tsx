import CategoryImage from "../../assets/images/Untitled-2copy_d864f013-e9eb-4701-95d4-7be94ddb16c1.webp";
const CategoryCard = () => {
  return (
    <div className="bg-[#F8F8F8] rounded-2xl flex flex-col items-center justify-start gap-6 py-9">
      <img
        src={CategoryImage}
        alt="category"
        className="w-80 h-80 object-cover"
      />
      <span className="relative text-3xl text-black capitalize font-semibold before:absolute before:bottom-0 before:left-0 before:block before:w-0 before:h-[1px] before:bg-black hover:before:w-full before:transition-all before:duration-[600ms] cursor-pointer">
        keyboard
      </span>
    </div>
  );
};

export default CategoryCard;

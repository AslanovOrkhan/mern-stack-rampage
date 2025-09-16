import { FaRegHandPointRight } from "react-icons/fa6";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router";
const Register = () => {
  return (
    <>
      <form
        action=""
        className="lg:w-[55%] w-[95%] mx-auto my-16 flex flex-col items-center gap-12"
      >
        <span className="text-black lg:text-7xl text-4xl capitalize font-bold">
          create account
        </span>
        <div className="w-full flex flex-col items-start gap-9">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="text"
                placeholder="First Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="text"
                placeholder="Last Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="text"
                placeholder="User Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="password"
                placeholder="Password"
                className="bg-transparent border-none outline-none w-full"
              />
              <IoEyeOff className="text-2xl cursor-pointer" />
            </div>
            <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                type="confirm-password"
                placeholder="Confirm Password"
                className="bg-transparent border-none outline-none w-full"
              />
              <IoEyeOff className="text-2xl cursor-pointer" />
            </div>
          </div>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-9 gap-3 mt-6">
            <button className="border bg-black text-white py-5 rounded-4xl cursor-pointer">
              Create
            </button>
            <Link
              to="/login"
              className="w-full border bg-black text-white py-5 rounded-4xl cursor-pointer flex items-center justify-center"
            >
              Sign in
            </Link>
          </div>
        </div>
        <Link to="/" className="flex items-center justify-center gap-3">
          <FaRegHandPointRight className="text-xl mt-1" />
          <span className="text-2xl">Return to Store</span>
        </Link>
      </form>
    </>
  );
};

export default Register;

import { FaRegHandPointRight } from "react-icons/fa6";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { Link } from "react-router";
import { useState } from "react";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
            {/* First Name */}
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="First Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* Last Name */}
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* User Name */}
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="username"
                type="text"
                name="username"
                placeholder="User Name"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* Email */}
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* Phone Number */}
            <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* Password */}
            <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="bg-transparent border-none outline-none w-full"
              />
              {showPassword ? (
                <IoEye
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOff
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            {/* Confirm Password */}
            <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="bg-transparent border-none outline-none w-full"
              />
              {showConfirmPassword ? (
                <IoEye
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <IoEyeOff
                  className="text-2xl cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )}
            </div>
          </div>
          {/* Buttons */}
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 lg:gap-9 gap-3 mt-6">
            <button
              type="submit"
              className="border bg-black text-white py-5 rounded-4xl cursor-pointer"
            >
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
        {/* Return to Store */}
        <Link to="/" className="flex items-center justify-center gap-3">
          <FaRegHandPointRight className="text-xl mt-1" />
          <span className="text-2xl">Return to Store</span>
        </Link>
      </form>
    </>
  );
};

export default Register;

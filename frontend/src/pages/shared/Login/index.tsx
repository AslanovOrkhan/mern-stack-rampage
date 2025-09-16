import { FaRegHandPointRight } from "react-icons/fa6"
import { IoEyeOff } from "react-icons/io5"
import { Link } from "react-router"
 
const Login = () => {
  return (
    <>
      <form action="" className="lg:w-[45%] w-[95%] mx-auto my-16 flex flex-col items-center gap-12">
        <span className="text-black lg:text-7xl text-5xl capitalize font-bold">
          login
        </span>
        <div className="w-full flex flex-col items-start gap-6">
          <div className="bg-[#FAFAFA] py-5 px-3 w-full rounded-xl"><input type="email" placeholder="Email" className="bg-transparent border-none outline-none w-full"/></div>
          <div className="flex items-center justify-between gap-3 bg-[#FAFAFA] py-5 px-3 w-full rounded-xl"><input type="password" placeholder="Password" className="bg-transparent border-none outline-none w-full"/><IoEyeOff  className="text-2xl cursor-pointer"/></div>
          <a href="#" className="text-xl text-black relative group">
            Forgot password?
            <span className="absolute left-0 bottom-0 h-[1px] w-full bg-black transition-all duration-400 group-hover:w-0"></span>
          </a>
          <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
            <button className="border bg-black text-white py-5 rounded-4xl cursor-pointer">Sign in</button>
            <Link to="/register" className="w-full border bg-black text-white py-5 rounded-4xl cursor-pointer flex items-center justify-center">
              Create account
            </Link>
          </div>
        </div>
         <Link to="/" className="flex items-center justify-center gap-3"><FaRegHandPointRight className="text-xl mt-1" /><span className="text-2xl">Return to Store</span></Link>
      </form>
    </>
  )
}

export default Login

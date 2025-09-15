import { FaRegUser } from "react-icons/fa"
import logo from "../../../assets/icons/rampage.svg"
import Navbar from "../../../components/Navbar"
import { SlBasket } from "react-icons/sl"
import { IoSearchOutline } from "react-icons/io5"
import { Link } from "react-router"
import { RiMenu2Line, RiMenu3Line } from "react-icons/ri"
const Header = () => {
  return (
    <header className='w-full bg-white px-2 lg:px-10 lg:py-0 py-6 flex items-center justify-between lg:gap-0 gap-3'>
      <RiMenu2Line className="lg:hidden flex text-2xl"/>
      <Link to="/" className='main-logo'>
        <img src={logo} alt="Logo"  className='lg:w-36 w-32'/>
      </Link>
      <Navbar />
      <div className="user-menu flex items-center lg:gap-6 gap-2">
        <IoSearchOutline className="lg:text-3xl text-2xl"/>
        <Link to="/login">
        <FaRegUser className="lg:text-3xl lg:flex hidden text-2xl"/>
        </Link>
        <SlBasket className="lg:text-3xl text-2xl"/>
      </div>
    </header>
  )
}

export default Header

import { FaRegUser } from "react-icons/fa"
import logo from "../../../assets/icons/rampage.svg"
import Navbar from "../../../components/Navbar"
import { SlBasket } from "react-icons/sl"
import { IoSearchOutline } from "react-icons/io5"
const Header = () => {
  return (
    <header className='w-full bg-white px-10 flex items-center justify-between'>
      <div className='main-logo'>
        <img src={logo} alt="Logo"  className='w-36'/>
      </div>
      <Navbar />
      <div className="user-menu flex items-center gap-6">
        <IoSearchOutline className="text-3xl"/>
        <FaRegUser className="text-3xl"/>
        <SlBasket className="text-3xl"/>
      </div>
    </header>
  )
}

export default Header

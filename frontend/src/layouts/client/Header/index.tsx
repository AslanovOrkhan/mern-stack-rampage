import logo from "../../../assets/icons/rampage.svg"
const Header = () => {
  return (
    <header className='w-full bg-white py-6 px-8'>
      <div className='main-logo'>
        <img src={logo} alt="Logo"  className='w-48'/>
      </div>
      <div></div>
      <div></div>
    </header>
  )
}

export default Header

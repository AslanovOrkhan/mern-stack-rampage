 
const Navbar = () => {
  return (
    <ul className="flex items-center gap-10">
      <li className="relative py-7">
        <a href="#" className="nav-item capitalize text-xl font-semibold  rounded-4xl py-3 px-4 overflow-hidden">discover</a>
        <ul className="flex-col items-start gap-3 rounded-b-3xl absolute top-[100%] bg-white min-w-64 py-2 px-3 border border-black hidden">
            <li><a href="#" className="text-black">Monitor</a></li>
            <li><a href="#" className="text-black">Steering wheel</a></li>
            <li><a href="#" className="text-black">Gaming Chair</a></li>
            <li><a href="#" className="text-black">Other Products</a></li>
            <li><a href="#" className="text-black">Headphones and Microphone</a></li>
        </ul>
      </li>  
     </ul>
  )
}

export default Navbar

import { FaArrowRight, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import { useEffect } from "react";
// ...existing code...
import Aos from "aos";
import "aos/dist/aos.css";
const Footer = () => {
   useEffect(function () {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <footer className="bg-black">
      <div
        className="py-6 px-10 grid grid-cols-2"
        style={{
          background:
            "linear-gradient(331deg, rgba(0,0,0,0.95) 71%, rgba(255,0,0,0.95) 100%)",
        }}
      >
        <div className="grid grid-cols-2 border-r border-[#525252]">
          <div className="flex flex-col items-start justify-start gap-32">
            <div className="flex flex-col items-start justify-start gap-5 overflow-hidden">
              <h3  data-aos="fade-right" className="text-white text-2xl font-bold">Rampage</h3>
              <ul className="flex flex-col items-start justify-start gap-2">
                <li className="relative group" data-aos="fade-right">
                  <a href="#" className="text-white text-[18px] capitalize">
                    about us
                  </a>
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
                </li>
                <li className="relative group" data-aos="fade-right">
                  <a href="#" className="text-white text-[18px] capitalize">
                    support
                  </a>
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
                </li>
                <li className="relative group" data-aos="fade-right">
                  <a href="#" className="text-white text-[18px] capitalize">
                    contact us
                  </a>
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-start justify-start gap-5 overflow-hidden">
              <h3 className="text-white text-2xl font-bold" data-aos="fade-right">Contact us</h3>
              <ul data-aos="fade-right" className="flex flex-col items-start justify-start gap-2">
                <li className="relative group">
                  <a href="#" className="text-white text-2xl capitalize">
                    444 7 899
                  </a>
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
                </li>
                <li className="relative group">
                  <a href="#" className="text-white text-2xl">
                    destek@segment.com.tr
                  </a>
                  <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-5 overflow-hidden">
            <h3 data-aos="fade-right" className="text-white text-2xl font-bold">To inform</h3>
            <ul className="flex flex-col items-start justify-start gap-2">
              <li data-aos="fade-right" className="relative group">
                <a href="#" className="text-white text-[18px]">
                  Privacy and Cookies Policy
                </a>
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
              </li>
              <li data-aos="fade-right" className="relative group">
                <a href="#" className="text-white text-[18px]">
                  KVKK and Information Text
                </a>
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
              </li>
              <li data-aos="fade-right" className="relative group">
                <a href="#" className="text-white text-[18px] capitalize">
                  Distance Sales Agreement
                </a>
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
              </li>
              <li data-aos="fade-right" className="relative group">
                <a href="#" className="text-white text-[18px] capitalize">
                  Return policy
                </a>
                <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-white transition-all duration-600 group-hover:w-full"></span>
              </li>
            </ul>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="w-[60%] h-full m-auto flex flex-col justify-between">
            <div className="flex flex-col items-start justify-start gap-6 w-full">
              <h1 data-aos="fade-left" className="text-white text-4xl font-bold">
                Be the first to be informed about innovations and opportunities.
              </h1>
              <div data-aos="fade-left" className="mt-8 bg-[#0D0D0D] py-4 px-4 flex  items-center justify-between gap-3 rounded-xl w-full">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="text-white border-none outline-none w-full"
                />
                <button
                  type="submit"
                  className="border border-white bg-white p-2 rounded-full cursor-pointer"
                >
                  <FaArrowRight className="text-[14px]" />
                </button>
              </div>
            </div>
            <div data-aos="fade-left" className="flex items-center justify-start gap-6">
              <FaFacebookF className="text-white text-2xl"/>
              <RiTwitterXFill className="text-white text-2xl"/>
              <FaInstagram className="text-white text-2xl"/>
              <FaYoutube className="text-white text-2xl"/>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#171717] py-10 px-10 flex items-center justify-between">
          <span className="text-white text-xl">© 2025 Rampage. Powered by Shopify</span>
          <ul className="flex items-center justify-start gap-6">
            <li>  
              <a href="#" className="text-white">Terms of service</a>
            </li>
            <li>  
              <a href="#" className="text-white">Contact information</a>
            </li>
            <li>  
              <a href="#" className="text-white">Privacy policy</a>
            </li>
            <li>  
              <a href="#" className="text-white">Refund policy</a>
            </li>
          </ul>        
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import { BiWorld } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";

const LanguageMenu = () => {
  const [selectedLang, setSelectedLang] = useState("English");
  const [options, setOptions] = useState(["Azerbaijani", "Turkish", "Russian"]);

  const handleChange = (lang: string) => {
    setOptions((prev) => {
      const newOptions = prev.filter((o) => o !== lang);
      return [...newOptions, selectedLang];
    });
    setSelectedLang(lang);
  };

  return (
    <div className="lg:flex hidden items-center gap-2 text-white cursor-pointer relative group select-none z-[99999]">
      <BiWorld className="text-xl" />
      <div className="flex items-center gap-2">
        <span className="text-[15px]">{selectedLang}</span>
        <FaAngleDown className="text-base transform transition-transform duration-300 group-hover:rotate-180" />
      </div>
      <ul
        className="
          absolute left-0 top-[100%] w-full rounded-md bg-[#1F1F1F] shadow-xl shadow-black/40 overflow-hidden
          transform origin-top transition-all duration-300
          scale-y-0 opacity-0 pointer-events-none
          group-hover:scale-y-100 group-hover:opacity-100 group-hover:pointer-events-auto
        "
      >
        {options.map((lang) => (
          <li
            key={lang}
            onClick={() => handleChange(lang)}
            className="px-2 pt-1 pb-2 hover:bg-gray-900 transition-colors duration-300 cursor-pointer"
          >
            <span className="text-[14px]">{lang}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageMenu;

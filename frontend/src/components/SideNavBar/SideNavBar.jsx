import React, { useState } from "react";
import { AiFillLeftCircle, AiFillHome } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";

function SideNavBar() {
  const menus = [
    { name: "Home", link: "/home", icon: AiFillHome, },
    // { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Messages", link: "/messages", icon: FiMessageSquare },
    { name: "Projects", link: "/projects", icon: TbReportAnalytics, margin: true },
    { name: "Workspace", link: "/workspace", icon: FiFolder },
    { name: "User", link: "/user", icon: AiOutlineUser , margin: true},

  ];
  const [open, setOpen] = useState(true);
  return (
    <section className=" sm:flex gap-6 hidden  ">
      <div
        className={` ${open ? "w-60 " : "w-20 "
          } bg-gradient-to-b from-purple-900  to-pink-500 min-h-screen p-5   relative duration-500`}
      >
        <AiFillLeftCircle
          className={`absolute text-white bg-purple-900 rounded-full cursor-pointer -right-4 top-20 w-10 h-10  
             ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-2 items-center">
          <img
            src="./LOGO.png"
            className={`cursor-pointer w-14 duration-500 ${open && "rotate-[360deg]"
              }`}
          />

          <div className={`text-white origin-left mt-4  duration-200  ${!open && "scale-0"
            }`}>
            <h1 className='font-extrabold leading-5 font-logo text-transparent tracking-wide 
                 text-l bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500'>Phoenix  </h1>
            <h1 className='text-white font-logo text-sm2'>Trek</h1>
          </div>
        </div>
        <div className=" flex justify-center items-center ">
        <ul className="mt-24">
          {menus.map((menu, index) => (
            <li  key={index} >
              <hr className={`${menu.margin ? "my-5 " : "hidden"} `}></hr>
            <NavLink to={menu.link}
             
              className={ ({ isActive }) =>
              isActive ? `flex mt-1 px-4 p-2 cursor-pointer  text-white font-semibold rounded-md  text-sm2 items-center gap-x-4 border-2  border-white
              ` : `flex mt-1 px-4 p-2 cursor-pointer hover:bg-gradient-to-b hover:from-purple-600 hover:to-pink-500 hover:text-white rounded-md hover:border-white hover:border  text-gray-300 text-sm2 items-center gap-x-4 
              ` }
            >
{React.createElement(menu?.icon, { size: "24" })}
              <span className={`${!open && "hidden"} origin-left duration-500 text`}>
                {menu.name}
              </span>
            </NavLink>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>

  );

}

export default SideNavBar
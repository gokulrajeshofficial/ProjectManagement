import React from 'react'
import { AiFillLeftCircle, AiFillHome } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";

import { AiOutlineUser,  } from "react-icons/ai";
import { FiMessageSquare, FiFolder,  } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
function MobNav() {
    const menus = [
        { name: "Home", link: "/home", icon: AiFillHome, },
        { name: "Messages", link: "/messages", icon: FiMessageSquare },
        { name: "Projects", link: "/projects", icon: TbReportAnalytics, margin: true },
        { name: "Workspace", link: "/workspace", icon: FiFolder },
        { name: "User", link: "/", icon: AiOutlineUser , margin: true},
      ];
      menus
  return (
    <div>
        
<div className="fixed  block sm:hidden bottom-0 z-50 w-full -translate-x-1/2 bg-white border-t border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600">
    {/* <div className="w-full">
        <div className="grid max-w-xs grid-cols-3 gap-1 p-1 mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
            <button type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700 rounded-lg">
                New
            </button>
            <button type="button" className="px-5 py-1.5 text-xs font-medium text-black bg-gray-900 dark:bg-gray-300 dark:text-gray-900 rounded-lg">
                Popular
            </button>
            <button type="button" className="px-5 py-1.5 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-black dark:hover:bg-gray-700 rounded-lg">
                Following
            </button>
        </div>
    </div> */}
    <div className="grid h-full  grid-cols-5 mx-auto  border-t-2 border-purple-300">
    {  menus.map((menu, index) => (
        <React.Fragment key={index}>
            <NavLink to={menu.link}
             
             className={({ isActive }) =>
             isActive ?  `flex items-center justify-center text-white bg-gradient-to-b from-purple-600 to-pink-500  p-1 dark:hover:bg-gray-800 `   
             : `flex items-center justify-center text-purple-400 hover:bg-purple-100  dark:hover:bg-gray-800 ` }
           >
                <button data-tooltip-target="tooltip-home" type="button" className="inline-flex flex-col items-center justify-center p-4 group">
                {React.createElement(menu?.icon, { size: "24" })}
                <span className="sr-only">Home</span>
            </button>
            <div id="tooltip-home" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-black transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                Home
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
            </NavLink>
        </React.Fragment>
        
    ))}

       
    </div>
</div>

    </div>
  )
}

export default MobNav
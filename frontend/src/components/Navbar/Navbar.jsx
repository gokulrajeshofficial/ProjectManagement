import React, { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {GrMenu} from 'react-icons/gr'
import {BsBell} from 'react-icons/bs'
import {  AiFillHome , AiOutlineClose } from "react-icons/ai";

import {  NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import {FaUserCircle} from "react-icons/fa"
import { AiOutlineUser } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { unSetDetails } from '../../store/Slice/userDetails.slice';
import { useDispatch } from 'react-redux';


const navigation = [
  { name: 'Dashboard', href: '#', current: false },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]
const menus = [
  { name: "Home", link: "/home", icon: <AiFillHome className='w-'/>, },
  { name: "Dashboard", link: "/", icon: <MdOutlineDashboard/> },
  { name: "Messages", link: "/messages", icon: <FiMessageSquare/> },
  { name: "Projects", link: "/projects", icon: <TbReportAnalytics/>, margin: true },
  { name: "Workspace", link: "/workspace", icon: <FiFolder/> },
  { name: "User", link: "/user", icon: <AiOutlineUser/>, margin: true },
  { name: "Setting", link: "/settings", icon: <RiSettings4Line/>, },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation();
  const dispatch  = useDispatch()
  const [menu, setMenu] = useState({})

  useEffect(() => {
    menus.forEach((obj, index) => {
      obj.link === location.pathname ? setMenu( obj ) : ""
    })

    console.log(menu);
  }, [])






  // The current location.



  return (
    <Disclosure as="nav" className="bg-[#bd83d7] py-1 w-full ">
      {({ open }) => (
        <>

          <div className="mx-auto px-2 sm:px-6 lg:px-10  ">
            <div className=" flex  relative h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <AiOutlineClose className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    < GrMenu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <NavLink to={menu?.link}
                  className={`flex   cursor-pointer hover:bg-gradient-to-b  text-white text-base items-center gap-x-2`}>
                  {menu?.icon}
                  <span className={`origin-left duration-500 text`}>
                    {menu?.name}
                  </span>
                </NavLink>
                <div className="hidden sm:ml-6 sm:block">

                  <div className="flex space-x-4">

                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-purple-900 text-white' : 'text-white hover:bg-purple-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-purple-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="sr-only">View notifications</span>

                  <BsBell className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-purple-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>

                      <FaUserCircle  className="h-8 w-8 rounded-full bg-white"/>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a  href='/user'
                            className={classNames(active ? 'bg-purple-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a  onClick={()=>{dispatch(unSetDetails()); navigate('/login')}}
                            className={classNames(active ? 'bg-purple-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-purple-900 text-white' : 'text-gray-300 hover:bg-purple-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
import React, { useContext, useState } from 'react'
import { FaBars } from "react-icons/fa";
import userImg from "../img/userExample.jpg"
import { AuthContext } from '../context/authContext';
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp, MdExitToApp } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

const NavigationTop = ({ setVisibleMenu }) => {

    const { currentUser, logout } = useContext(AuthContext)
    const [userOption, setUserOption] = useState(false)

    return (
        <div className='flex items-center'>
            {/*---- APLICATION ICON ----*/}
            <a href='/' className="flex items-end cursor-pointer text-slate-100 scale-in-center p-6">
                <h1 className="text-2xl font-bold fontLogo">soccer</h1>
                <div className="w-4 h-4 bg-blue-500 rounded-full mb-1 ml-1"></div>
            </a>

            {/*---- USER PROFILE  ----*/}
            <div onClick={() => setUserOption(prev => !prev)} className='py-2 flex items-center gap-2 ml-auto cursor-pointer relative md:mr-10'>
                <div className='w-10 h-10 rounded-full overflow-hidden'>
                    <img className='w-full' src={userImg}/>
                </div>
                <div className='text-md'>
                    <p className='font-bold text-white'>{currentUser.username}</p>
                </div>
                <div className='text-2xl'>
                    {userOption 
                        ? <MdOutlineArrowDropUp />
                        : <MdOutlineArrowDropDown />}
                </div>
                {/*---- USER PROFILE / LIST SETTINGS  ----*/}
                {userOption && (
                    <div className='absolute top-16 right-0 w-[200px]'>
                        <ul className='border border-[#3b3e4e] divide-[#3b3e4e] divide-y bg-[#191c24] rounded-md text-sm overflow-hidden'>
                            <Link to='/settings'>
                                <li className='flex items-center gap-4 py-2 px-4 hover:bg-[#0e1014]'>
                                    <div className='bg-black w-10 h-10 flex justify-center items-center rounded-full text-blue-400'>
                                        <IoMdSettings/>
                                    </div>
                                    <p>Ustawienia</p>
                                </li>
                            </Link>
                            <li onClick={logout} className='flex items-center gap-4 py-2 px-4 hover:bg-[#0e1014]'>
                                <div className='bg-black w-10 h-10 flex justify-center items-center rounded-full text-red-400'>
                                    <MdExitToApp/>
                                </div>
                                <p>Wyloguj</p>
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/*---- BURGER ICON ----*/}
            <div className='px-4 md:hidden cursor-pointer'>
                <FaBars onClick={() => setVisibleMenu(prev => !prev)}/>
            </div>
        </div>
    )
}

export default NavigationTop
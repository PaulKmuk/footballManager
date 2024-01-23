import React, { useState, useContext } from 'react'
import NavLinks from '../data/NavLinks'
import { NavLink } from 'react-router-dom'
import { FaBars, FaEllipsisV, FaTimes } from "react-icons/fa";
import { AuthContext } from '../context/authContext';
import userImg from "../img/userExample.jpg"

const Navigation = ({visibleMenu, setVisibleMenu}) => {

    const [fullMenu, setFullMenu] = useState(true)
    const { currentUser } = useContext(AuthContext)
    

    return (
        <div className={visibleMenu 
            ? 'text-[#6c7293] h-full overflow-auto' 
            : 'text-[#6c7293] h-full overflow-auto'}
        >



            {/*---- MENU TO SMALL DEVICES ----*/}

            <div className={visibleMenu 
                ? 'fixed w-[200px] max-w-[300px] h-full top-0 right-0 z-10 bg-[#191c24] flex flex-col border-l border-black'
                : 'fixed hidden w-[200px] max-w-[300px] h-full top-0 right-0 z-10 bg-[#191c24] flex-col border-l border-black'}>

                <div onClick={() => setVisibleMenu(false)} className='ml-auto p-6 text-2xl cursor-pointer'>
                    <FaTimes />
                </div>

                <div 
                    className='min-w-[220px] flex flex-col pr-4'
                >
                    {NavLinks.map(link => (
                        <NavLink
                            onClick={() => setVisibleMenu(false)}
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) => (
                                isActive 
                                    ? "pl-4 border-l-[3px] border-blue-400 py-2 bg-black rounded-e-full"
                                    : "pl-4 border-l-[3px] border-transparent py-2 rounded-e-full"
                            )}
                        >
                            {({isActive}) => (
                                <div className='flex items-center text-sm gap-4 font-[700] pr-4'>
                                    <div 
                                        className={isActive 
                                            ? "bg-[#191c24] w-10 h-10 flex justify-center items-center rounded-full"
                                            : "bg-black w-10 h-10 flex justify-center items-center rounded-full"}
                                    >
                                        <link.icon className='text-xl text-blue-400'/>
                                    </div>
                                    {link.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>



            {/*---- MENU TO DESKTOP ----*/}
            <div className='max-md:hidden'>

                {/*---- ICON BARS MENU ----*/}
                <div className={fullMenu 
                        ? 'px-6 flex justify-between items-center py-2'
                        : 'flex justify-center items-center py-2'}>
                    {fullMenu && <p className='leading-3 text-xl font-bold'>Menu</p>}
                    <FaBars className='leading-3 cursor-pointer' onClick={() => setFullMenu((prev) => !prev)}/>
                </div>

                {/*---- USER PROFILE  ----*/}
                <div className='px-5 py-2 flex items-center gap-4'>
                    <div className={fullMenu 
                            ? 'w-10 h-10 rounded-full overflow-hidden'
                            : 'w-10 h-10 rounded-full overflow-hidden'}>
                        <img className='w-full' src={userImg}/>
                    </div>
                    {fullMenu && (
                        <div className='text-sm'>
                            <p className='font-bold text-white'>{currentUser.username}</p>
                            {currentUser.admin === 0 && <p>Trener</p>}
                        </div>
                    )}
                    {fullMenu && (
                        <div className='ml-auto pr-1 cursor-pointer'>
                            <FaEllipsisV />
                        </div>
                    )}
                </div>


                {/*---- LINKS  ----*/}
                <div 
                    className={fullMenu 
                        ? 'min-w-[220px] flex flex-col py-2 pr-4'
                        : 'flex flex-col py-2 pr-4'}
                >
                    {NavLinks.map(link => (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) => (
                                isActive 
                                    ? "pl-4 border-l-[3px] border-blue-400 py-2 bg-black rounded-e-full"
                                    : "pl-4 border-l-[3px] border-transparent py-2 rounded-e-full"
                            )}
                        >
                            {({isActive}) => (
                                <div className='flex items-center text-sm gap-4 font-[700] pr-4'>
                                    <div 
                                        className={isActive 
                                            ? "bg-[#191c24] w-10 h-10 flex justify-center items-center rounded-full"
                                            : "bg-black w-10 h-10 flex justify-center items-center rounded-full"}
                                    >
                                        <link.icon className='text-xl text-blue-400'/>
                                    </div>
                                    {fullMenu && link.label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default Navigation
import React, { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import { Dashboard, Players, Statistics, Calendar, Player, AddPlayer, Settings, EditPlayer, Trainings } from "./index"
import { Navigation, NavigationTop } from "../components"

const Home = () => {

    const [visibleMenu, setVisibleMenu] = useState(false)


    return (
        <div className='relative h-screen flex flex-col bg-[#191c24] text-white'>

            <div className='sticky w-full top-0 left-0'>
                <NavigationTop 
                    setVisibleMenu={setVisibleMenu}
                />
            </div>

            <div className='flex flex-1 overflow-auto'>

                <div>
                    <Navigation 
                        visibleMenu={visibleMenu}
                        setVisibleMenu={setVisibleMenu}
                    />
                </div>
                
                <div className='bg-black flex-1 h-full overflow-auto'>
                    <Routes>
                        <Route path='/' element={<Dashboard />}/>
                            <Route path='/calendar' element={<Calendar />}/>

                            {/* --- PLAYERS ---  */}
                            <Route path='/players' element={<Players />}/>
                            <Route path='/player/:id' element={<Player />}/>
                            <Route path='/edit-player/:id' element={<EditPlayer />}/>
                            <Route path='/add-player' element={<AddPlayer />}/>

                            {/* --- TRAINING ---  */}
                            <Route path='/training' element={<Trainings />}/>

                            {/* --- STATISTICS ---  */}
                            <Route path='/statistics' element={<Statistics />}/>

                            {/* --- SETTING ---  */}
                            <Route path='/settings' element={<Settings />}/>
                    </Routes>
                </div>

            </div>


        </div>
    )
}

export default Home
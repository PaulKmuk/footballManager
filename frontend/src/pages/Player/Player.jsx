import React from 'react'
import PlayerProfile from './PlayerProfile'
import { Oval } from "react-loader-spinner"

const Player = () => {

    const carts = ["Treningi", "Mecze", "Statystyki"]

    return (
        <div className='p-4'>
            <h1 className='text-xl font-bold py-4'>Zawodnik</h1>

            <div className='flex max-sm:flex-col gap-4'>

                <div className='flex-[1]'>
                    <PlayerProfile />
                </div>

                <div className='flex-[2] flex flex-col gap-4'>
                    <div className='flex gap-4'>
                        {carts.map(cart => (
                            <p key={cart} className='text-lg px-4 py-2 border rounded-lg cursor-pointer'>
                                {cart}
                            </p>
                        ))}
                    </div>
                    <div className='w-full bg-[#191c24] card p-2 h-[500px]'>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Player
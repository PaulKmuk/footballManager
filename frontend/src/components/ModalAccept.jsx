import React from 'react'
import { Button } from "./index"

const ModalAccept = ({ title, description, labelButton, icon, onClickAccept, onClickCancel, color }) => {

    const setColor = () => {
        let bgColor = '#94a3b8'
        color === 'red' && (bgColor = '#f87171')
        color === 'orange' && (bgColor = '#fb923c')
        color === 'yellow' && (bgColor = '#facc15')
        color === 'green' && (bgColor = '#4ade80')
        color === 'blue' && (bgColor = '#818cf8')
        return bgColor
    }

    return (
        <div className='absolute top-0 left-0 w-full h-screen bg-black/80 flex justify-center items-center overflow-auto'>
            <div className='w-[500px] bg-[#191c24] card md:text-lg'>
                <div className='border-b border-[#3b3e4e] py-4 px-6 flex items-center'>
                    <h1 className='text-lg font-bold mr-auto'>{title}</h1>
                </div>
                <div className='p-6'>
                    <div style={{ backgroundColor: setColor() }} className='flex items-center gap-6 p-4 rounded-lg text-black font-semibold'>
                        <div className='text-4xl md:text-6xl'>
                            {icon}
                        </div>
                        <p>{description}</p>
                    </div>
                </div>
                <div className='border-t border-[#3b3e4e] px-6 py-4 flex justify-end gap-4'>
                    <Button 
                        onClick={onClickCancel}
                        color='blue'
                        label='Anuluj'/>
                    <Button 
                        onClick={onClickAccept}
                        color={color}
                        label={labelButton}/>
                </div>
            </div>
        </div>
    )
}

export default ModalAccept
import React from 'react'

const Button = ({ icon, label, color, size, onClick }) => {

    let bgColor = color
    let textSize

    if(size === "s"){
        textSize = 'xs'
    }
    if(size === "m" || size === undefined || size === null){
        textSize = 'sm'
    }
    if(size === "l"){
        textSize = 'md'
    }
    if(size === "xl"){
        textSize = 'xl'
    }

    const setColor = () => {
        let buttonColor = '#3b82f6'
        color === 'red' && (buttonColor = '#ef4444')
        color === 'orange' && (buttonColor = '#f97316')
        color === 'yellow' && (buttonColor = '#eab308')
        color === 'green' && (buttonColor = '#22c55e')
        color === 'blue' && (buttonColor = '#3b82f6')
        return buttonColor
    }

    return (
        <button 
            onClick={onClick}
        >
            <div
                style={{ backgroundColor: setColor() }}
                className={`flex text-white rounded-md tracking-wider overflow-hidden font-bold text-${textSize} group`}
            >
                {icon && <div className={`${!label && 'px-2 sm:px-3'} pl-2 sm:pl-3 py-2 sm:py-3 h-auto flex justify-center items-center ${icon && label && 'max-sm:hidden'}`}>
                    {icon}
                </div>}
                {label && <p className={`px-2 sm:px-3 py-1 sm:py-2 h-auto group-hover:bg-${bgColor}-600 flex justify-center items-center`}>
                    {label}
                </p>}
            </div>


        </button>
    )
}

export default Button
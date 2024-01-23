import React from 'react'

const Input = ({type, placeholder, onChange, name, value, required}) => {
    return (
        <input 
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            type={type}
            placeholder={placeholder}
            className='md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400'
        />
    )
}

export default Input
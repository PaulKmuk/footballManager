import React from 'react'

const TextArea = ({type, placeholder, onChange, name, value, minHeight, required}) => {


    return (
        <textarea 
            value={value}
            onChange={onChange}
            name={name}
            required={required}
            type={type}
            placeholder={placeholder}
            className={`md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400 min-h-[${minHeight}]`}
        />
    )
}

export default TextArea
import React from 'react'

const Select = ({options, onChange, name, placeholder, value, disabled}) => {



    return (
        <select
            disabled={disabled}
            required
            name={name}
            value={value}
            onChange={onChange}
            className='md:text-xl p-2 px-4 bg-gray-800 rounded-md focus:outline-none border border-transparent focus:border-red-400 cursor-pointer'
        >
            <option disabled value='' >
                --- {placeholder} ---
            </option>
            {options.map(option => (
                <option
                    value={option}
                    key={option}
                >
                    {option}
                </option>
            ))}
        </select>
    )
}

export default Select
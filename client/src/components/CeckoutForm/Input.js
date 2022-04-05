import React from 'react'

const Input = ({ label, type, name, handleChange }) => {


    return (
        <div>
            <label> {label} </label>
            {
                type === 'text' ? (
                    <input
                        autoFocus
                        type={type}
                        required
                        name={name}
                        onChange={handleChange}
                    />
                ) : (
                    <input
                        type={type}
                        required
                        name={name}
                        onChange={handleChange}
                    />
                )
            }
        </div>
    )
}

export default Input
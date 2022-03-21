import React from 'react'
import '../../css/CeckoutForm/Checkout.css'
import Input from '../Input/Input'
import Fade from 'react-reveal/Fade'

const Checkout = ({ showForm, setShowForm, handleChange, handleSubmit }) => {
    return (
        <>
            {
                showForm ? (
                    <Fade bottom cascade>
                        <div className='checkout-form'>
                            <span className='close-icon' onClick={() => setShowForm(false)}> &times; </span>
                            <form onSubmit={handleSubmit}>
                                <Input
                                    name='name'
                                    handleChange={handleChange}
                                    type='text'
                                    label='Name'
                                />
                                <Input
                                    name='email'
                                    handleChange={handleChange}
                                    type='email'
                                    label='Email'
                                />

                                <div>
                                    <button> Checkout </button>
                                </div>
                            </form>
                        </div>
                    </Fade>
                ) : false
            }
        </>
    )
}

export default Checkout
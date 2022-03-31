import React from 'react'
import '../../css/SignUp/SginUp.css'
import Bounce from 'react-reveal/Bounce'

const SignUp = () => {
    return (
        <Bounce left>
            <div className='sign'>
                <form
                    className='sign-content'
                    onSubmit={(e) => e.preventDefault()}
                >

                    <div className='sign-box'>

                        <label htmlFor='first-name'>Full Name:</label>
                        <div className='personal-info'>
                            <input
                                type='text'
                                placeholder='First Name'
                                id='first-name'
                            />

                            <input
                                type='text'
                                placeholder='Last Name'
                                id='last-name'
                            />
                        </div>

                        <label htmlFor='email'>E-mail:</label>
                        <input
                            type='email'
                            placeholder='E-mail'
                            id='email'
                        />
                        <label htmlFor='location'>Location: </label>
                        <input
                            type='text'
                            placeholder='Country - City'
                            id='location'
                        />

                        <label htmlFor='phone'>Phone Number:</label>
                        <input
                            type='number'
                            placeholder='Phone Number'
                            id='phone'
                        />

                        <button>Signup</button>

                    </div>

                    <p className='or-option'>
                        <span>or</span>
                    </p>

                    <div className='social'>
                        <div>signup with: </div>
                        <ul>

                            <li>
                                <a href='#facebook'>
                                    <i className="fab fa-facebook-f"></i> Facebook
                                </a>
                            </li>
                            <li>
                                <a href='#gmail'>
                                    <i className="fab fa-google"></i> Gmail
                                </a>
                            </li>
                        </ul>
                    </div>

                </form>
            </div>
        </Bounce>
    )
}

export default SignUp
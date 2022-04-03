import React, { useRef, useState } from 'react'
import '../../css/Login/Login.css'
import { NavLink } from 'react-router-dom'
import Bounce from 'react-reveal/Bounce'
import { AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Login = () => {

    let [isChecked, setIsChecked] = useState(false);
    let [showEye, setShowEye] = useState(false)

    let handleChange = () => {
        setIsChecked(!isChecked)
    }

    let passInput = useRef()
    let handleShowEye = () => {
        setShowEye(!showEye)
        passInput.current.type = 'text'
    }
    let handleHideEye = () => {
        setShowEye(!showEye)
        passInput.current.type = 'password'
    }

    return (

        <Bounce top>
            <div className='login'>
                <form
                    className='login-content'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h1>
                        <i className="fas fa-users"></i>
                    </h1>

                    <NavLink className='go-sign-up' to='/signup'>have an account? signup</NavLink>

                    <div className='login-box'>

                        <div className='input-feild'>
                            <span className='icon'>
                                <AiOutlineUser />
                            </span>
                            <input
                                type='text'
                                placeholder='Username or Email'
                                className='name-input'
                            />
                        </div>

                        <div className='input-feild'>
                            <span className='icon'>
                                <AiOutlineLock />
                            </span>
                            <input
                                type='password'
                                placeholder='Password'
                                className='pass-input'
                                ref={passInput}
                            />
                            <span className='eye'>
                                <AiFillEyeInvisible
                                    display={showEye ? 'none' : 'block'}
                                    onClick={() => handleShowEye()}
                                />

                                <AiFillEye
                                    display={showEye ? 'block' : 'none'}
                                    onClick={() => handleHideEye()}
                                />
                            </span>
                        </div>

                        <button>Login</button>

                        <div className='check-forget'>

                            <div className='remember-me'>
                                <input
                                    type='checkbox'
                                    id='remember'
                                    name='remember'
                                    value='Remember Me'
                                    checked={isChecked}
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor='remember Me'
                                    onClick={handleChange}
                                >
                                    Remember Me
                                </label>
                            </div>

                            <a href='#Forget'>Forget Password?</a>

                        </div>

                        <p className='or-option'>or</p>

                        <ul>
                            <li>
                                <a href='#facebook'>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href='#gmail'>
                                    <i className="fab fa-google"></i>
                                </a>
                            </li>
                        </ul>

                    </div>
                </form>
            </div>
        </Bounce>
    )
}

export default Login
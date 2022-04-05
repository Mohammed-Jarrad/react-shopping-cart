import React, { useRef, useState } from 'react'
import '../../css/Login/Login.css'
import { NavLink } from 'react-router-dom'
import Bounce from 'react-reveal/Bounce'
import { AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Login = () => {

    const [isChecked, setIsChecked] = useState(false);
    const [showEye, setShowEye] = useState(false)
    const [inputValues, setInputValues] = useState('')
    const [loginInfo, setLoginInfo] = useState('')

    const handleChangeRemember = _ => setIsChecked(!isChecked);

    const passInput = useRef()
    const handleShowEye = () => {
        setShowEye(!showEye);
        passInput.current.type = 'text';
    }
    const handleHideEye = () => {
        setShowEye(!showEye)
        passInput.current.type = 'password'
    }

    const handelChangeInput = (e) => setInputValues(prevValue => ({ ...prevValue, [e.target.name]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        const sendUser = {
            email: inputValues["email"],
            password: inputValues["password"],
        }
        try {
            const response = await fetch('/login', {
                method: "POST",
                body: JSON.stringify(sendUser),
                headers: { "content-type": "application/json" }
            });
            const data = await response.json();
            console.log(data);
            setLoginInfo(data);
            if (data.user) {
                window.location.assign('/');
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (

        <Bounce top>
            <div className='login'>
                <form
                    className='login-content'
                    onSubmit={handleSubmit}
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
                                type='email'
                                name='email'
                                placeholder='E-mail'
                                className='name-input'
                                onChange={handelChangeInput}
                            />
                        </div>
                        <div className='error'>
                            {loginInfo.errors && loginInfo.errors["email"]}
                        </div>

                        <div className='input-feild'>
                            <span className='icon'>
                                <AiOutlineLock />
                            </span>
                            <input
                                type='password'
                                name='password'
                                placeholder='Password'
                                className='pass-input'
                                ref={passInput}
                                onChange={handelChangeInput}
                            />
                            <span className='eye'>
                                <AiFillEyeInvisible display={showEye ? 'none' : 'block'} onClick={() => handleShowEye()} />
                                <AiFillEye display={showEye ? 'block' : 'none'} onClick={() => handleHideEye()} />
                            </span>
                        </div>
                        <div className='error'>
                            {loginInfo.errors && loginInfo.errors["password"]}
                        </div>

                        <button>log in</button>

                        <div className='check-forget'>

                            <div className='remember-me'>
                                <input
                                    type='checkbox'
                                    id='remember'
                                    name='remember'
                                    value='Remember Me'
                                    checked={isChecked}
                                    onChange={handleChangeRemember}
                                />
                                <label
                                    htmlFor='remember Me'
                                    onClick={handleChangeRemember}
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
import React, { createContext, useEffect, useRef, useState } from 'react';
import '../../css/Login/Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import { AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { GetRequest, PostRequest } from '../../utils/requests';
import { Alert } from '@mui/material';

const Login = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [showEye, setShowEye] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const [loginError, setLoginError] = useState('');

	const passInput = useRef();
	const handleShowEye = () => {
		setShowEye(!showEye);
		passInput.current.type = 'text';
	};
	const handleHideEye = () => {
		setShowEye(!showEye);
		passInput.current.type = 'password';
	};

	const handleChangeInput = e => {
		setInputValues(prevValue => ({ ...prevValue, [e.target.name]: e.target.value }));
		setLoginError('');
	};
	// login
	async function login(e) {
		e.preventDefault();
		const sendUser = {
			email: inputValues['email'],
			password: inputValues['password'],
		};
		try {
			let res = await PostRequest('/login', JSON.stringify(sendUser));
			let data = await res.json();
			console.log('LoginResponse', res);
			console.log('LoginData', data);
			if (data.isUser) {
				localStorage.token = await data.token;
				localStorage.user = JSON.stringify(await data.isUser);
				window.location.assign('/');
			} else {
				setLoginError(data.errors);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Bounce top>
			<div className='login'>
				<form className='login-content' onSubmit={login}>
					<NavLink className='go-sign-up' to='/signup'>
						have an account? signup
					</NavLink>

					<div className='login-box'>
						<div className='input-and-error'>
							<div className='input-feild'>
								<span className='icon'>
									<AiOutlineUser />
								</span>
								<input
									type='email'
									name='email'
									placeholder='E-mail'
									className='name-input'
									onChange={handleChangeInput}
								/>
							</div>
							{loginError.email && <Alert severity='error'>{loginError.email}</Alert>}
						</div>

						<div className='input-and-error'>
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
									onChange={handleChangeInput}
								/>
								<span className='eye'>
									<AiFillEyeInvisible
										display={showEye ? 'none' : 'block'}
										onClick={() => handleShowEye()}
									/>
									<AiFillEye display={showEye ? 'block' : 'none'} onClick={() => handleHideEye()} />
								</span>
							</div>
							{loginError.password && <Alert severity='error'>{loginError.password}</Alert>}
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
									onChange={() => setIsChecked(!isChecked)}
								/>
								<label htmlFor='remember Me' onClick={() => setIsChecked(!isChecked)}>
									Remember Me
								</label>
							</div>

							<a href='#Forget'>Forget Password?</a>
						</div>

						<p className='or-option'>or</p>

						<ul>
							<li>
								<a href='#facebook'>
									<i className='fab fa-facebook-f'></i>
								</a>
							</li>
							<li>
								<a href='#gmail'>
									<i className='fab fa-google'></i>
								</a>
							</li>
						</ul>
					</div>
				</form>
			</div>
		</Bounce>
	);
};

export default Login;

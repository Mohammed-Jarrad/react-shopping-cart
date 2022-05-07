import React, {useRef, useState} from 'react';
import '../../css/Login/Login.css';
import {Link, NavLink} from 'react-router-dom';
import Bounce from 'react-reveal/Bounce';
import {AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import {Alert} from '@mui/material';
import mainMethods from '../../utils/mainMethods';

const Login = () => {
	//states
	// const [isChecked, setIsChecked] = useState(false);
	const [showEye, setShowEye] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const [loginError, setLoginError] = useState('');
	// hide || show Eye
	const passInput = useRef();
	const handleHideEye = () => {
		setShowEye(!showEye);
		passInput.current.type = showEye ? 'password' : 'text';
	};
	//handleChangeInput
	const handleChangeInput = e => {
		setInputValues(prevValue => ({...prevValue, [e.target.name]: e.target.value}));
		setLoginError(prev => ({...prev, [e.target.name]: ''}));
	};
	// login
	async function login(e) {
		e.preventDefault();
		const sendUser = {
			email: inputValues['email'],
			password: inputValues['password'],
		};
		try {
			const data = await mainMethods.login(sendUser);
			if (data.isUser) {
				localStorage.user = JSON.stringify({...(await data.isUser), password: ''});
				localStorage.token = data.token;
				window.location.assign('/');
			} else {
				setLoginError(data.errors);
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<React.Fragment>
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
									<span className='eye' onClick={() => handleHideEye()}>
										{showEye ? <AiFillEye /> : <AiFillEyeInvisible />}
									</span>
								</div>
								{loginError.password && <Alert severity='error'>{loginError.password}</Alert>}
							</div>

							<button>log in</button>

							{/* <div className='check-forget'>
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

								<Link to='#Forget'>Forget Password?</Link>
							</div> */}

							<p className='or-option'>or</p>

							<ul>
								<li>
									<Link to='#facebook'>
										<i className='fab fa-facebook-f'></i>
									</Link>
								</li>
								<li>
									<Link to='#gmail'>
										<i className='fab fa-google'></i>
									</Link>
								</li>
							</ul>
						</div>
					</form>
				</div>
			</Bounce>
		</React.Fragment>
	);
};

export default Login;
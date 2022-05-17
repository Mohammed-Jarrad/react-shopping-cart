import React, { useContext, useRef, useState } from 'react';
import '../../css/Login/Login.css';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLock, AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Alert } from '@mui/material';
import mainMethods from '../../utils/mainMethods';
import { Bounce } from 'react-reveal';
import { UserContext } from '../../Context/UserProvider';
import { HomeContext } from '../../Context/HomeProvider';
import Loading from '../../components/Loading/Loading';

const Login = () => {
	//context
	const { setUser } = useContext(UserContext);
	//states
	// const [isChecked, setIsChecked] = useState(false);
	const [showEye, setShowEye] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const [loginError, setLoginError] = useState('');
	const [loading, setLoading] = useState(false);
	//
	const navigate = useNavigate();
	// hide || show Eye
	const passInput = useRef();
	const handleHideEye = () => {
		setShowEye(!showEye);
		passInput.current.type = showEye ? 'password' : 'text';
	};
	//handleChangeInput
	const handleChangeInput = e => {
		setInputValues(prevValue => ({ ...prevValue, [e.target.name]: e.target.value }));
		setLoginError(prev => ({ ...prev, [e.target.name]: '' }));
	};
	// login
	async function login(e) {
		e.preventDefault();
		setLoading(true);
		const sendUser = {
			email: inputValues['email'],
			password: inputValues['password'],
		};
		try {
			const data = await mainMethods.login(sendUser);
			if (data.isUser) {
				localStorage.token = await data.token;
				setUser(data.isUser);
				setLoading(false);
				navigate('/');
			} else {
				setLoginError(data.errors);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	return (
		<>
			<Loading setOpen={setLoading} open={loading} />

			<Bounce>
				<div className="login">
					<div className="container">
						<form className="login-content" onSubmit={login}>
							<NavLink className="go-sign-up" to="/signup">
								have an account? signup
							</NavLink>

							<div className="login-box">
								<div className="input-and-error">
									<div className="input-feild">
										<span className="icon">
											<AiOutlineUser />
										</span>
										<input
											type="email"
											name="email"
											placeholder="E-mail"
											className="name-input"
											onChange={handleChangeInput}
										/>
									</div>
									{loginError.email && <Alert severity="error">{loginError.email}</Alert>}
								</div>

								<div className="input-and-error">
									<div className="input-feild">
										<span className="icon">
											<AiOutlineLock />
										</span>
										<input
											type="password"
											name="password"
											placeholder="Password"
											className="pass-input"
											ref={passInput}
											onChange={handleChangeInput}
										/>
										<span className="eye" onClick={() => handleHideEye()}>
											{showEye ? <AiFillEye /> : <AiFillEyeInvisible />}
										</span>
									</div>
									{loginError.password && <Alert severity="error">{loginError.password}</Alert>}
								</div>

								<button>log in</button>

								<p className="or-option">or</p>

								<ul>
									<li>
										<Link to="#facebook">
											<i className="fab fa-facebook-f"></i>
										</Link>
									</li>
									<li>
										<Link to="#gmail">
											<i className="fab fa-google"></i>
										</Link>
									</li>
								</ul>
							</div>
						</form>
					</div>
				</div>
			</Bounce>
		</>
	);
};

export default Login;

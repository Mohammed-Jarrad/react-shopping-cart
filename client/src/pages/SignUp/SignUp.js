import React, { useContext, useRef, useState } from 'react';
import '../../css/SignUp/SginUp.css';
import Bounce from 'react-reveal/Bounce';
import { AiFillEyeInvisible, AiFillEye, AiFillCamera } from 'react-icons/ai';
import Loading from '../../components/Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';
import mainMethods from '../../utils/mainMethods';
import { UserContext } from '../../Context/UserProvider';

const SignUp = () => {
	//context
	const { setUser } = useContext(UserContext);
	// nav
	const navigate = useNavigate();
	//states
	const [inputValue, setInputValue] = useState('');
	const [showEye, setShowEye] = useState(false);
	const [userError, setUserError] = useState({});
	const [userImage, setUserImage] = useState('/images/profile-image-default.webp');
	const inputRef = useRef();
	const [loading, setLoading] = useState(false);

	// ! handle input changes + ? change the error values in change;
	function handleChange(e) {
		setInputValue(prevValue => ({ ...prevValue, [e.target.id]: e.target.value.trim() }));
		setUserError(prev => ({ ...prev, [e.target.id]: '' }));
	}
	//!get Path of image
	function getPathOfImg(e) {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				setUserImage(fileReader.result);
			};
			fileReader.onerror = e => console.log(e);
		} else {
			setUserImage('/images/profile-image-default.webp');
		}
	}
	// ! signup
	async function signup(e) {
		e.preventDefault();
		setLoading(true);
		const user_created = {
			name: {
				first_name: inputValue['name.first_name'],
				last_name: inputValue['name.last_name'],
			},
			email: inputValue['email'],
			password: inputValue['password'],
			location: {
				country: inputValue['location.country'],
				city: inputValue['location.city'],
			},
			phone: inputValue['phone'],
			user_image: userImage,
		};
		try {
			const data = await mainMethods.signup(user_created);
			console.log(data);
			if (data.user) {
				localStorage.token = data.token;
				setUser(data.user);
				setLoading(false);
				navigate('/');
			} else {
				setUserError(data.errors);
				setLoading(false);
			}
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}
	// ! the eye icon (show & hide)
	let passInput = useRef();
	let handleShowEye = () => {
		setShowEye(true);
		passInput.current.type = 'text';
	};
	let handleHideEye = () => {
		setShowEye(false);
		passInput.current.type = 'password';
	};

	return (
		<React.Fragment>
			<Loading open={loading} />

			<Bounce left>
				<form className="sign-content" onSubmit={signup}>
					<div className="sign-box">
						<div className="add-photo">
							<input
								type="file"
								accept="image/*"
								onChange={getPathOfImg}
								ref={inputRef}
								style={{ display: 'none' }}
							/>
							<div className="btn-and-img">
								<img alt="" src={userImage} />
								<AiFillCamera className="camera" onClick={() => inputRef.current.click()} />
								{userError['user_image'] && (
									<Alert severity="error" className="error">
										{userError['user_image']}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="name.first_name">First Name: </label>
								<input type="text" id="name.first_name" placeholder="First Name" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError['name.first_name'] && (
									<Alert className="error" severity="error">
										{userError['name.first_name']}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="name.last_name">Last Name: </label>
								<input type="text" id="name.last_name" placeholder="Last Name" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError['name.last_name'] && (
									<Alert className="error" severity="error">
										{userError['name.last_name']}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="email">Email: </label>
								<input type="text" id="email" placeholder="Email" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError.email && (
									<Alert className="error" severity="error">
										{userError.email}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box password">
							<div className="input">
								<label htmlFor="password">Password: </label>
								<input
									type="password"
									id="password"
									placeholder="Password"
									onChange={handleChange}
									ref={passInput}
								/>
								{showEye ? (
									<AiFillEye onClick={handleHideEye} className="fill-eye" />
								) : (
									<AiFillEyeInvisible onClick={handleShowEye} />
								)}
							</div>
							<div className="error-alert">
								{userError.password && (
									<Alert className="error" severity="error">
										{userError.password}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="location.country">Country: </label>
								<input type="text" id="location.country" placeholder="Country" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError['location.country'] && (
									<Alert className="error" severity="error">
										{userError['location.country']}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="location.city">City: </label>
								<input type="text" id="location.city" placeholder="City" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError['location.city'] && (
									<Alert className="error" severity="error">
										{userError['location.city']}
									</Alert>
								)}
							</div>
						</div>

						<div className="input-box">
							<div className="input">
								<label htmlFor="phone">Phone: </label>
								<input type="text" id="phone" placeholder="Phone" onChange={handleChange} />
							</div>
							<div className="error-alert">
								{userError.phone && (
									<Alert className="error" severity="error">
										{userError.phone}
									</Alert>
								)}
							</div>
						</div>

						<button>sign up</button>
					</div>
				</form>
			</Bounce>
		</React.Fragment>
	);
};

export default SignUp;

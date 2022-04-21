import React, { useRef, useState } from 'react';
import '../../css/Profile/Profile.css';
import { Bounce, Fade } from 'react-reveal';
import { PutRequest } from '../../utils/requests';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import ChangePassword from './ChangePassword';
import DeleteAccountModal from './DeleteAccountModal';

const Profile = () => {
	// state
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const [userImage, setUserImage] = useState(user.user_image);
	const [showChangeInformation, setShowChangeInformation] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const inputRef = useRef();
	const [loading, setLoading] = useState(false);
	const [alertSuccessUploaded, setAlertSuccessUploaded] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
	// handleInputChange
	const handleInputChange = e => {
		setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};
	// getPathNewImage
	async function getPathNewImage(e) {
		if (e.target.files.length) {
			let file = e.target.files[0];
			let fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.onload = () => {
				setUserImage(fileReader.result);
			};
			fileReader.onerror = e => console.log(e);
		} else {
			setUserImage('/mages/profile-image-default.webp');
		}
	}
	// handleChangeInformation
	async function handleChangeInformation(e) {
		e.preventDefault();
		const userUpdated = {
			name: {
				first_name: inputValues.first_name ? inputValues.first_name : user.name.first_name,
				last_name: inputValues.last_name ? inputValues.last_name : user.name.last_name,
			},
			location: {
				country: inputValues.country ? inputValues.country : user.location.country,
				city: inputValues.city ? inputValues.city : user.location.city,
			},
			email: inputValues.email ? inputValues.email : user.email,
			phone: inputValues.phone ? inputValues.phone : user.phone,
			user_image: userImage,
		};
		console.log(userUpdated);
		setLoading(true);
		try {
			const res = await PutRequest('/user', JSON.stringify(userUpdated));
			const data = await res.json();
			console.log('res for update', res);
			console.log('data for update', data);
			if (data.user) {
				localStorage.user = JSON.stringify(await data.user);
				localStorage.token = await data.token;
				setShowChangeInformation(false);
				setLoading(false);
				setAlertSuccessUploaded(true);
				window.location.assign('/profile');
			} else {
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	// delete account

	return (
		<React.Fragment>
			<Loading open={loading} setOpen={setLoading} />
			<SuccessMsg
				msg={'Updated Done !'}
				open={alertSuccessUploaded}
				setOpen={setAlertSuccessUploaded}
			/>

			<div className='profile'>
				<div className='user-image'>
					<div className='user-image-content'>
						<img src={userImage} alt={`${user.name.first_name} figure`} />
						{showChangeInformation ? (
							<>
								<input
									type='file'
									accept='images/*'
									onChange={getPathNewImage}
									ref={inputRef}
									style={{ display: 'none' }}
								/>
								<button onClick={() => inputRef.current.click()}>Change Photo</button>
							</>
						) : null}
					</div>
					<div className='user-configuration'>
						{showChangeInformation ? (
							<>
								<button onClick={handleChangeInformation}>Save</button>
								<button onClick={() => setShowChangeInformation(false)}>Cancel</button>
							</>
						) : (
							<button
								onClick={() => {
									setShowChangeInformation(true);
									setShowChangePassword(false);
								}}
							>
								Change Information
							</button>
						)}
						<button onClick={() => setShowChangePassword(true)}>Change Password</button>
						<button onClick={() => setOpenDeleteAccountModal(true)}>Delete Account</button>
					</div>
				</div>
				{showChangePassword === false ? (
					<div className='user-info'>
						<h2>Information </h2>
						<div className='user-info-box'>
							<div className='box'>
								<h3>First Name</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.name.first_name}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='text'
											onChange={handleInputChange}
											defaultValue={user.name.first_name}
											name='first_name'
										/>
									</Bounce>
								)}
							</div>
							<div className='box'>
								<h3>Last Name</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.name.last_name}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='text'
											onChange={handleInputChange}
											defaultValue={user.name.last_name}
											name='last_name'
										/>
									</Bounce>
								)}
							</div>
							<div className='box'>
								<h3>Email</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.email}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='email'
											onChange={handleInputChange}
											defaultValue={user.email}
											name='email'
										/>
									</Bounce>
								)}
							</div>
							<div className='box'>
								<h3>Phone</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.phone}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='text'
											onChange={handleInputChange}
											defaultValue={user.phone}
											name='phone'
										/>
									</Bounce>
								)}
							</div>
						</div>
						<h2>Location</h2>
						<div className='user-info-box'>
							<div className='box'>
								<h3>Country</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.location.country}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='text'
											onChange={handleInputChange}
											defaultValue={user.location.country}
											name='country'
										/>
									</Bounce>
								)}
							</div>
							<div className='box'>
								<h3>City</h3>
								{showChangeInformation === false ? (
									<Fade>
										<p>{user.location.city}</p>
									</Fade>
								) : (
									<Bounce>
										<input
											type='text'
											onChange={handleInputChange}
											defaultValue={user.location.city}
											name='city'
										/>
									</Bounce>
								)}
							</div>
						</div>
					</div>
				) : (
					<ChangePassword setShowChangePassword={setShowChangePassword} />
				)}
			</div>
			<DeleteAccountModal
				openDeleteAccountModal={openDeleteAccountModal}
				setOpenDeleteAccountModal={setOpenDeleteAccountModal}
			/>
		</React.Fragment>
	);
};

export default Profile;

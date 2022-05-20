import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mainMethods from '../utils/mainMethods';
import { GetRequest } from '../utils/requests';
import { CartContext } from './CartProvider';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	//context
	const { setCart } = useContext(CartContext);
	// variables
	const [user, setUser] = useState('');
	let fullName = user ? `${user['name']['first_name']} ${user['name']['last_name']}` : '';
	let admin = user && user.email === 'abura3ed.mohammed@gmail.com' ? true : false;
	const token = localStorage.token ? localStorage.token : '';
	// nav
	const navigate = useNavigate();
	//states
	const [users, setUsers] = useState([]);
	const [userImage, setUserImage] = useState('');
	const [showChangeInformation, setShowChangeInformation] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const [loading, setLoading] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);

	// ! Effects
	useEffect(() => {
		setUserImage(user.user_image);
	}, [user]);

	useLayoutEffect(() => {
		token && getUser();
		console.log('from User Provider ....');
	}, [token]);
	// ! end Effects

	// Get CURRENT USER
	async function getUser() {
		setLoading(true);
		try {
			const res = await GetRequest('/user');
			const data = await res.json();
			if (data.user) {
				setUser(data.user);
				setLoading(false);
			} else {
				console.log(data.errors);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

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
		} else return;
	}
	// handleChangeInformation
	async function handleChangeInformation(e) {
		e.preventDefault();
		setLoading(true);
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

		try {
			const data = await mainMethods.updateUser(userUpdated);
			console.log(data);
			if (data.user) {
				localStorage.token = await data.token;
				setShowChangeInformation(false);
				setLoading(false);
			} else {
				setLoading(false);
				console.log(data.errors);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	// ! for Change Pass && Compare
	//states
	const [compareInputValue, setCompareInputValue] = useState('');
	const [compareError, setCompareError] = useState('');
	const [showInputChangeForm, setShowInputChangeForm] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [loadingChange, setLoadingChange] = useState(false);
	const [changeError, setChangeError] = useState(false);
	const [alertChangeSuccess, setAlertChangeSuccess] = useState(false);

	// handleChangeCompareInput
	const handleChangeCompareInput = e => {
		setCompareInputValue(e.target.value);
		setCompareError('');
	};

	// handleComparePassword
	async function handleComparePassword() {
		const enterPassword = compareInputValue;
		try {
			const data = await mainMethods.comparePassword({ enterPassword });
			if (data.compare) {
				setShowInputChangeForm(true);
			} else if (data.errors) {
				setCompareError(data.errors);
			}
		} catch (error) {
			console.log(error);
		}
	}

	//handle cahnge new password
	function handleChangeNewPassword(e) {
		setNewPassword(e.target.value);
		setChangeError(false);
	}

	// change password
	async function changePassword() {
		setLoadingChange(true);
		if (newPassword.length <= 5) {
			setChangeError(true);
			setLoadingChange(false);
		} else {
			try {
				const res = await mainMethods.changePassword({ newPassword });
				const data = await res.json();
				console.log(data);
				if (res.status === 200) {
					setLoadingChange(false);
					setAlertChangeSuccess(true);
					setShowChangePassword(false);
				}
			} catch (error) {
				console.log(error);
				setLoadingChange(false);
			}
		}
	}

	// delete Account
	async function deleteAccount() {
		try {
			const res = await mainMethods.deleteUser();
			if (res.status !== 400) {
				localStorage.clear();
				setCart([]);
				setUser('');
				setOpenDeleteAccountModal(false);
				navigate('/login');
			} else {
				console.log(await res.json());
			}
		} catch (err) {
			console.log(err);
		}
	}

	// !! all users

	// get all users =>
	const getAllUsers = async _ => {
		setLoading(true);
		try {
			const data = await mainMethods.getUsers();
			if (data.users) {
				setUsers(data.users);
				setLoading(false);
			} else {
				setLoading(false);
				console.log(data.errors);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	// remove user =>
	const removeUser = async id => {
		setLoading(true);
		try {
			const res = await mainMethods.removeUser(id);
			if (res.status !== 400) {
				getAllUsers();
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser,
				token,
				admin,
				fullName,
				users,
				getAllUsers,
				setInputValues,
				getPathNewImage,
				handleChangeInformation,
				loading,
				setLoading,
				userImage,
				setUserImage,
				handleInputChange,
				showChangeInformation,
				setShowChangeInformation,
				setShowChangePassword,
				openDeleteAccountModal,
				setOpenDeleteAccountModal,
				showChangePassword,
				alertChangeSuccess,
				setAlertChangeSuccess,
				showInputChangeForm,
				handleChangeCompareInput,
				compareError,
				handleComparePassword,
				handleChangeNewPassword,
				loadingChange,
				changeError,
				changePassword,
				deleteAccount,
				removeUser,
				getUser,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;

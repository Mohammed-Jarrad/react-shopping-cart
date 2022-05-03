import React, {createContext, useState} from 'react';
import mainMethods from '../utils/mainMethods';

export const UserContext = createContext();

const UserProvider = ({children}) => {
	// variables
	const user = localStorage.user ? JSON.parse(localStorage.user) : '';
	const token = localStorage.token ? localStorage.token : '';
	const fullName = user ? `${user['name']['first_name']} ${user['name']['last_name']}` : '';
	const admin = user && user.email === 'abura3ed.mohammed@gmail.com' ? true : false;
	const [users, setUsers] = useState([]);
	//states
	const [userImage, setUserImage] = useState(user.user_image);
	const [showChangeInformation, setShowChangeInformation] = useState(false);
	const [inputValues, setInputValues] = useState('');
	const [loading, setLoading] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [openDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
	// handleInputChange
	const handleInputChange = e => {
		setInputValues(prev => ({...prev, [e.target.name]: e.target.value}));
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
		console.log(userUpdated);

		try {
			const data = await mainMethods.updateUser(userUpdated);
			console.log(data);
			if (data.user) {
				localStorage.user = JSON.stringify({...(await data.user), password: ''});
				localStorage.token = await data.token;
				setShowChangeInformation(false);
				setLoading(false);
				window.location.assign('/profile');
			} else {
				setLoading(false);
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
			const data = await mainMethods.comparePassword({enterPassword});
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
				const res = await mainMethods.changePassword({newPassword});
				console.log(await res.json());
				if (res.status === 200) {
					setLoadingChange(false);
					setAlertChangeSuccess(true);
					window.location.assign('/profile');
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
			console.log(res);
			console.log(await res.json());
			if (res.status !== 400) {
				localStorage.clear();
				window.location.assign('/login');
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
			console.log(res);
			console.log(await res.json());
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
				admin,
				token,
				fullName,
				users,
				getAllUsers,
				setInputValues,
				getPathNewImage,
				handleChangeInformation,
				loading,
				setLoading,
				userImage,
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
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;

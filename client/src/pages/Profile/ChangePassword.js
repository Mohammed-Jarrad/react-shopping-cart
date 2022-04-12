import { Alert, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import { PostRequest, PutRequest } from '../../utils/requests';
import { Bounce } from 'react-reveal';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';

const ChangePassword = ({ setShowChangePassword }) => {
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
			const res = await PostRequest(
				'/user/compare/password',
				JSON.stringify({ enterPassword }),
			);
			const data = await res.json();
			console.log(res);
			console.log(data);
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
		} else {
			try {
				const res = await PutRequest(
					'/user/reset/password',
					JSON.stringify({ newPassword }),
				);
				const data = await res.json();
				console.log('res change', res);
				console.log('data change', data);
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

	return (
		<React.Fragment>
			<SuccessMsg
				msg={'Password Changed Done !'}
				open={alertChangeSuccess}
				setOpen={setAlertChangeSuccess}
			/>

			<div className='change-password'>
				{showInputChangeForm === false ? (
					<div className='compare-password'>
						<div className='input-compare'>
							<h3>Enter Your Current Password</h3>
							<input
								type={'password'}
								onChange={handleChangeCompareInput}
								placeholder={'Enter Your Password'}
							/>
							{compareError ? (
								<Alert severity='error'>{compareError.compare}</Alert>
							) : null}
						</div>
						<div className='submit-password'>
							<button autoFocus onClick={handleComparePassword}>
								Submit
							</button>
							<button onClick={() => setShowChangePassword(false)}>Cancel</button>
						</div>
					</div>
				) : (
					<Bounce>
						<div className='change-form'>
							<div className='input-change'>
								<h3>Enter Your New Password</h3>
								<div className='enter-new-password'>
									<input
										placeholder='Enter New Password'
										type={'password'}
										onChange={handleChangeNewPassword}
									/>
									{loadingChange && <CircularProgress />}
								</div>
								{changeError && (
									<Alert severity='error'>
										the password length 6 charachters or more
									</Alert>
								)}
								<div className='submit-password'>
									<button onClick={changePassword}>Submit</button>
									<button onClick={() => setShowChangePassword(false)}>
										Cancel
									</button>
								</div>
							</div>
						</div>
					</Bounce>
				)}
			</div>
		</React.Fragment>
	);
};

export default ChangePassword;

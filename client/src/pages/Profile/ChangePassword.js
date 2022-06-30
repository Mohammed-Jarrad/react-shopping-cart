import {Alert, CircularProgress} from '@mui/material';
import React, {useContext} from 'react';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';
import {UserContext} from '../../Context/UserProvider';

const ChangePassword = () => {
	//context
	const {
		setShowChangePassword,
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
	} = useContext(UserContext);

	return (
		<React.Fragment>
			<SuccessMsg msg={'Password Changed Done !'} open={alertChangeSuccess} setOpen={setAlertChangeSuccess} />

			<div className='change-password'>
				{showInputChangeForm === false ? (
					<div className='compare-password'>
						<h3>Enter Your Current Password</h3>
						<div className='input-compare'>
							<input
								type={'password'}
								onChange={handleChangeCompareInput}
								placeholder={'Enter Your Password'}
							/>
							{compareError ? (
								<Alert severity='error' className='error'>
									{compareError.compare}
								</Alert>
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
					<div className='change-form'>
						<h3>Enter Your New Password</h3>
						<div className='input-change'>
							<div className='enter-new-password'>
								<input
									placeholder='Enter New Password'
									type={'password'}
									onChange={handleChangeNewPassword}
								/>
								{loadingChange && <CircularProgress />}
							</div>
							{changeError && (
								<Alert severity='error' className='error'>
									the password length 6 charachters or more
								</Alert>
							)}
						</div>
						<div className='submit-password'>
							<button onClick={changePassword}>Submit</button>
							<button onClick={() => setShowChangePassword(false)}>Cancel</button>
						</div>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export default ChangePassword;

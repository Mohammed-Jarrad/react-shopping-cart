import React, {useContext} from 'react';
import {UserContext} from '../../Context/UserProvider';
import ProfileBox from './ProfileBox';

const UserInfo = () => {
	// context
	const {user} = useContext(UserContext);
	return (
		<div className='user-info'>
			<h2>Information </h2>
			<div className='user-info-box'>
				<ProfileBox defaultValue={user['name']['first_name']} name='first_name' title='First Name' />
				<ProfileBox title='Last Name' name='last_name' defaultValue={user['name']['last_name']} />
				<ProfileBox title='Email' name='emial' defaultValue={user['email']} />
				<ProfileBox title='Phone' name='phone' defaultValue={user['phone']} />
			</div>
			<h2>Location</h2>
			<div className='user-info-box'>
				<ProfileBox title='Country' name='country' defaultValue={user['location']['country']} />
				<ProfileBox title='City' name='city' defaultValue={user['location']['city']} />
			</div>
		</div>
	);
};

export default UserInfo;

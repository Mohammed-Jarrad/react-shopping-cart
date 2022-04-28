import React, {useContext} from 'react';
import {Bounce, Fade} from 'react-reveal';
import {UserContext} from '../../Context/UserProvider';

const ProfileBox = ({title, defaultValue, name}) => {
	const {showChangeInformation, handleInputChange} = useContext(UserContext);

	return (
		<div className='box'>
			<h3>{title}</h3>
			{showChangeInformation === false ? (
				<Fade>
					<p>{defaultValue}</p>
				</Fade>
			) : (
				<Bounce>
					<input type='text' onChange={handleInputChange} defaultValue={defaultValue} name={name} />
				</Bounce>
			)}
		</div>
	);
};

export default ProfileBox;

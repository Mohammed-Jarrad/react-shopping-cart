import { Alert } from '@mui/material';
import React from 'react';

const CreateInput = ({ productError, labelFor, label, type, placeholder, name, handleChangeInput }) => {
	return (
		<div className={'input-box'}>
			<label htmlFor={labelFor}>
				<span>{label}</span>
				{name === 'desc' ? (
					<textarea placeholder={placeholder} name={name} onChange={handleChangeInput} />
				) : (
					<input type={type} placeholder={placeholder} name={name} onChange={handleChangeInput} />
				)}
			</label>
			{productError[`${name}`] && (
				<Alert className="error" severity="error">
					{productError[`${name}`]}
				</Alert>
			)}
		</div>
	);
};

export default CreateInput;

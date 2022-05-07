import React from 'react';

const UpdateInput = ({labelFor, label, name, placeholder, handleChangeInput, type, value}) => {
	return (
		<div className={'input-box'}>
			<label htmlFor={labelFor}>
				<span>{label}</span>
				{name === 'desc' ? (
					<textarea placeholder={placeholder} name={name} onChange={handleChangeInput} defaultValue={value} />
				) : (
					<input
						defaultValue={value}
						type={type}
						placeholder={placeholder}
						name={name}
						onChange={handleChangeInput}
					/>
				)}
			</label>
		</div>
	);
};

export default UpdateInput;

import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import '../../css/Loading/Loading.css';

const Loading = ({ open, setOpen }) => {
	const handleClose = () => setOpen(false);

	return (
		<Backdrop open={open} onClick={handleClose} style={{ zIndex: '11111', backgroundColor: '#00000047' }}>
			<CircularProgress color='error' />
		</Backdrop>
	);
};

export default Loading;

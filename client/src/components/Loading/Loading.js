import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import '../../css/Loading/Loading.css';

const Loading = ({ open }) => {
	return (
		<Backdrop open={open} style={{ zIndex: '111111111111', backgroundColor: '#00000047' }}>
			<CircularProgress color="error" />
		</Backdrop>
	);
};

export default Loading;

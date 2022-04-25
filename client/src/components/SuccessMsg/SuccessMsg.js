import React from 'react';
import { Alert, Snackbar } from '@mui/material';

const SuccessMsg = ({ open, setOpen, msg }) => {
	const handleClose = () => setOpen(false);

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
			<Alert
				style={{
					border: '1px solid #c0c0c0',
					fontWeight: 'bold',
					width: '400px',
				}}
				onClose={handleClose}
				severity='success'
				sx={{ width: '100%' }}
			>
				{msg}
			</Alert>
		</Snackbar>
	);
};

export default SuccessMsg;

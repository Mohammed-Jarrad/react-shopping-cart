import React from 'react';
import { Link } from 'react-router-dom';

const NoOrders = () => {
	return (
		<div
			style={{
				textAlign: 'center',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '10px',
			}}
		>
			<h2
				style={{
					color: 'var(--second-color)',
					textAlign: 'center',
					margin: '10px auto',
				}}
			>
				No Orders Found !
			</h2>

			<Link
				to="/all-products"
				style={{
					border: '1px solid var(--second-color)',
					padding: '10px',
					borderRadius: '10px',
					color: 'var(--second-text-color)',
					textDecoration: 'none',
					fontWeight: 'bold',
				}}
			>
				Go Shop
			</Link>

			<img
				src={'/images/no-orders.png'}
				alt=""
				style={{
					width: '90%',
					maxWidth: '100%',
					borderRadius: '20px',
					boxShadow: 'var(--boxShadow)',
				}}
			/>
		</div>
	);
};

export default NoOrders;

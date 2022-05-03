import React from 'react';
import {Link} from 'react-router-dom';
import '../../css/ErrorPage/ErrorPage.css';

const ErrorPage = () => {
	return (
		<div className='error-page'>
			<img src={'/images/404.svg'} alt='' />
			<Link to={'/'} className='go-home'>
				Home Page
			</Link>
		</div>
	);
};

export default ErrorPage;

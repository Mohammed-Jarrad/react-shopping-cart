import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/ErrorPage/ErrorPage.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// import '/images/404.svg';

const ErrorPage = () => {
	return (
		<React.Fragment>
			<Header />
			<div className='error-page'>
				<img src={'/images/404.svg'} alt='' />
				<Link to={'/'} className='go-home'>
					Home Page
				</Link>
			</div>
			<Footer />
		</React.Fragment>
	);
};

export default ErrorPage;

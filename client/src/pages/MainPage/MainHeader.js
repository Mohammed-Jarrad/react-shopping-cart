import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserProvider';

const MainHeader = () => {
	//context
	const { user, fullName, token } = useContext(UserContext);
	//
	const navigate = useNavigate();
	//
	const handleClickButton = () => {
		if (token) {
			window.scrollTo({
				top: document.documentElement.clientHeight - 55,
				left: 0,
				behavior: 'smooth',
			});
		} else navigate('/login');
	};

	return (
		<div className="main-header">
			<div className="container">
				<div className="intro">
					<div className="welcome">
						<h1>Welcome</h1>
						{token ? (
							<>
								<Link to={'/profile'}>{`${fullName}`}</Link>
							</>
						) : (
							<></>
						)}
					</div>

					<div className="about">
						<p>For everything you need to buy, in the simplest and fastest way !</p>
					</div>

					<button onClick={handleClickButton}>{token ? 'Get Started' : 'Login'}</button>
				</div>

				<div className="image">
					<img src="/images/main1.png" alt="" />
				</div>
			</div>
		</div>
	);
};

export default MainHeader;

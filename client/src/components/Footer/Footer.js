import React from 'react';
import '../../css/Footer/Footer.css';
import { AiFillLinkedin, AiFillInstagram, AiFillHome, AiFillPhone, AiFillMail } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer>
			<div className="info">
				<div className="logo">
					<img src="/images/logo/N3.png" alt="" width={200} />
				</div>
				<div className="about">
					<h3 className="title">About</h3>

					<div className="desc">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nam ratione amet ducimus
					</div>
				</div>

				<div className="contact">
					<h3 className="title">Contact</h3>
					<div className="content">
						<div>
							<AiFillHome />
							<p>Palestine, Tulkarem</p>
						</div>
						<div>
							<AiFillPhone />
							<p>+ 970 568558874</p>
						</div>
						<div>
							<AiFillMail />
							<p>support@shoperly.com</p>
						</div>
					</div>
				</div>
			</div>

			<hr />

			<div className="social">
				<div className="copy">&copy; 2022 Copyright: Shoperly.com</div>
				<div className="icons">
					<BsFacebook />
					<AiFillInstagram />
					<AiFillLinkedin />
				</div>
			</div>
		</footer>
	);
};

export default Footer;

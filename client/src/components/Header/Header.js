import React, { useContext, useEffect, useState } from "react";
import "../../css/Header/Header.css";
import { Link } from "react-router-dom";
import { GetRequest } from "../../utils/requests";
import ResponsiveList from "./ResponsiveList";
import MainList from "./MainList";
import { UserContext } from "../../Context/UserProvider";
import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
	//context
	const { admin } = useContext(UserContext);
	//states
	const [showAdmin, setShowAdmin] = useState(false);
	// ! logout
	async function logout() {
		try {
			const res = await GetRequest("/logout");
			if (res.status === 200) {
				localStorage.clear();
				sessionStorage.removeItem("cart");
				window.location.assign("/login");
			}
		} catch (err) {
			console.log(err);
		}
	}
	//
	useEffect(() => {
		const adminLinks = document.querySelectorAll(".admin-dashboard-btn");
		Object.values(adminLinks).forEach(link =>
			link.addEventListener("click", e => {
				setShowAdmin(false);
			}),
		);
	}, []);

	return (
		<header>
			<div className="container">
				<div className="logo">
					<Link to="/" className="logo">
						{/* <img className="cart-logo" src={"/images/logo/N3-cart.png"} alt="" /> */}
						<img src={"/images/logo/5.png"} alt="" />
					</Link>
					{admin && (
						<div className="admin">
							<span onClick={_ => setShowAdmin(!showAdmin)}>
								<AiOutlineMenu />
							</span>
							<div className={`admin-dashboard ${showAdmin && "show"}`}>
								<Link className="admin-dashboard-btn" to={`/create-product`}>
									Create New Product
								</Link>
								<Link className="admin-dashboard-btn" to={`/users`}>
									All Users
								</Link>
								<Link className="admin-dashboard-btn" to={`/all-orders`}>
									All Orders
								</Link>
								<Link className="admin-dashboard-btn" to={`/update-product`}>
									Update Products
								</Link>
							</div>
						</div>
					)}
				</div>

				<nav>
					<ResponsiveList logout={logout} />
					<MainList logout={logout} />
				</nav>
			</div>
		</header>
	);
};

export default Header;

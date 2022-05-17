/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../Context/UserProvider';
import '../../css/Users/Users.css';
import Loading from '../Loading/Loading';

const Users = () => {
	//context
	const { users, getAllUsers, loading, setLoading, removeUser } = useContext(UserContext);

	useEffect(_ => getAllUsers(), []);

	return (
		<div className="all-users container">
			<h1 className="title">Users For Shoperly</h1>
			<div className="users">
				{users.length
					? users.map((user, index) => (
							<div className="user" key={index}>
								<img src={user.user_image} alt="" />
								<div className="name">{`${user.name.first_name} ${user.name.last_name}`}</div>

								<div className="email">{user.email}</div>
								<div className="phone">{user.phone}</div>
								<button className="remove" onClick={_ => removeUser(user._id)}>
									REMOVE
								</button>
							</div>
					  ))
					: null}
			</div>

			<Loading open={loading} setOpen={setLoading} />
		</div>
	);
};

export default Users;

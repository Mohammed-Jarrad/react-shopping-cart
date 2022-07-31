import React, { useContext, useRef } from "react";
import "../../css/Profile/Profile.css";
import Loading from "../../components/Loading/Loading";
import ChangePassword from "./ChangePassword";
import DeleteAccountModal from "./DeleteAccountModal";
import { UserContext } from "../../Context/UserProvider";
import UserInfo from "./UserInfo";

const Profile = () => {
	//context
	const {
		fullName,
		getPathNewImage,
		handleChangeInformation,
		loading,
		userImage,
		showChangeInformation,
		setShowChangeInformation,
		setShowChangePassword,
		setOpenDeleteAccountModal,
		showChangePassword,
		setUserImage,
		user,
	} = useContext(UserContext);

	// ref
	const inputRef = useRef();

	return (
		<React.Fragment>
			<Loading open={loading} />

			{Object.keys(user).length > 0 && (
				<div className="profile">
					<div className="profile-wrapper">
						<div className="user-image">
							<div className="user-image-content">
								<img src={userImage} alt={`${fullName} figure`} />

								{showChangeInformation ? (
									<>
										<input
											type="file"
											accept="images/*"
											onChange={getPathNewImage}
											ref={inputRef}
											style={{ display: "none" }}
										/>
										<button onClick={() => inputRef.current.click()}>
											Change Photo
										</button>
									</>
								) : null}
							</div>
							<div className="user-configuration">
								{showChangeInformation ? (
									<>
										<button onClick={handleChangeInformation}>Save</button>
										<button
											onClick={() => {
												setShowChangeInformation(false);
												setUserImage(user.user_image);
											}}
										>
											Cancel
										</button>
									</>
								) : (
									<button
										onClick={() => {
											setShowChangeInformation(true);
											setShowChangePassword(false);
										}}
									>
										Change Information
									</button>
								)}
								<button onClick={() => setShowChangePassword(true)}>
									Change Password
								</button>
								<button onClick={() => setOpenDeleteAccountModal(true)}>
									Delete Account
								</button>
							</div>
						</div>
						{showChangePassword === false ? <UserInfo /> : <ChangePassword />}
					</div>
				</div>
			)}

			<DeleteAccountModal />
		</React.Fragment>
	);
};

export default Profile;

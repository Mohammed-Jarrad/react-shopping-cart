import { Image } from 'cloudinary-react';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Profile/Profile.css';
import { Bounce, Fade } from 'react-reveal';
import { PutRequest } from '../../utils/requests';
import Loading from '../../components/Loading/Loading';
import SuccessMsg from '../../components/SuccessMsg/SuccessMsg';

const Profile = () => {
    //! state
    const user = localStorage.user ? JSON.parse(localStorage.user) : "";
    const full_name = user ? `${user.name.first_name} ${user.name.last_name}` : "";
    const [userImage, setUserImage] = useState('');
    const [showChangeInformation, setShowChangeInformation] = useState(false);
    const [inputValues, setInputValues] = useState("");
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [alertSuccessUploaded, setAlertSuccessUploaded] = useState(false);
    //! handleInputChange
    const handleInputChange = (e) => {
        setInputValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    //! getPathNewImage
    async function getPathNewImage(e) {
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setUserImage(fileReader.result);
            console.log(fileReader.result);
        }
        fileReader.onerror = (e) => console.log(e);
    }
    //! handleChangeInformation
    async function handleChangeInformation(e) {
        e.preventDefault();
        const userUpdated = {
            name: {
                first_name: inputValues.first_name ? inputValues.first_name : user.name.first_name,
                last_name: inputValues.last_name ? inputValues.last_name : user.name.last_name,
            },
            location: {
                country: inputValues.country ? inputValues.country : user.location.country,
                city: inputValues.city ? inputValues.city : user.location.city,
            },
            email: inputValues.email ? inputValues.email : user.email,
            phone: inputValues.phone ? inputValues.phone : user.phone,
            user_image: userImage ? userImage : user.user_image,
        }
        setLoading(true);
        try {
            const res = await PutRequest('/user', JSON.stringify(userUpdated));
            const data = await res.json();
            console.log("res for update", res);
            console.log("data for update", data);
            if (data.user) {
                localStorage.user = JSON.stringify(data.user);
                localStorage.token = data.token;
                setShowChangeInformation(false);
                setLoading(false);
                setAlertSuccessUploaded(true);
            } else {
                setLoading(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }


    return (
        <React.Fragment>

            <Loading open={loading} setOpen={setLoading} />
            <SuccessMsg
                msg={"Uploaded Done !"}
                open={alertSuccessUploaded}
                setOpen={setAlertSuccessUploaded}
            />

            <div className='profile'>

                <div className='user-image'>
                    <div className='user-image-content'>
                        {/* <Image
                            publicId={user.user_image}
                            cloudName="dipbhxayl"
                        /> */}
                        <img
                            src={userImage ? userImage : user.user_image}
                            alt='user figure'
                        />
                        {
                            showChangeInformation
                                ? (
                                    <>
                                        <input
                                            type='file'
                                            accept='images/*'
                                            onChange={getPathNewImage}
                                            ref={inputRef}
                                            style={{ display: "none" }}
                                        />
                                        <button onClick={() => inputRef.current.click()}>
                                            Change Photo
                                        </button>
                                    </>
                                )
                                : null
                        }
                    </div>
                    <div className='user-configuration'>
                        {
                            showChangeInformation
                                ? (
                                    <>
                                        <button onClick={handleChangeInformation}>
                                            Save
                                        </button>
                                        <button onClick={() => setShowChangeInformation(false)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => setShowChangeInformation(true)}>
                                        Change Information
                                    </button>
                                )
                        }
                        <button>Change Password</button>
                        <button>Delete Account</button>
                    </div>
                </div>

                <div className='user-info'>
                    <h2>Information</h2>
                    <div className='user-info-box'>
                        <div className='box'>
                            <h4>First Name</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.name.first_name}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="text" onChange={handleInputChange}
                                                defaultValue={user.name.first_name} name="first_name"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                        <div className='box'>
                            <h4>Last Name</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.name.last_name}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="text" onChange={handleInputChange}
                                                defaultValue={user.name.last_name} name="last_name"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                        <div className='box'>
                            <h4>Email</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.email}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="email" onChange={handleInputChange}
                                                defaultValue={user.email} name="email"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                        <div className='box'>
                            <h4>Phone</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.phone}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="text" onChange={handleInputChange}
                                                defaultValue={user.phone} name="phone"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                    </div>
                    <h2>Location</h2>
                    <div className='user-info-box'>
                        <div className='box'>
                            <h4>Country</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.location.country}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="text" onChange={handleInputChange}
                                                defaultValue={user.location.country} name="country"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                        <div className='box'>
                            <h4>City</h4>
                            {
                                showChangeInformation === false
                                    ? (
                                        <Fade>
                                            <p>
                                                {user.location.city}
                                            </p>

                                        </Fade>
                                    )
                                    : (
                                        <Bounce>
                                            <input
                                                type="text" onChange={handleInputChange}
                                                defaultValue={user.location.city} name="city"
                                            />
                                        </Bounce>
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Profile
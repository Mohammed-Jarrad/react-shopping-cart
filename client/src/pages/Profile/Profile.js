import { Image } from 'cloudinary-react';
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../css/Profile/Profile.css';
import { BiEdit } from 'react-icons/bi'
import { Bounce, Fade } from 'react-reveal';

const Profile = () => {
    //! state
    const user = localStorage.user ? JSON.parse(localStorage.user) : "";
    const full_name = user ? `${user.name.first_name} ${user.name.last_name}` : "";
    const [userImage, setUserImage] = useState('');
    const [showChangeInformation, setShowChangeInformation] = useState(false);
    const [inputValues, setInputValues] = useState("");
    const inputRef = useRef();
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
    }

    console.log(inputValues)

    return (
        <div className='profile'>

            <div className='user-image'>
                <div className='user-image-content'>
                    {/* <Image
                        publicId={user.user_image}
                        cloudName="dipbhxayl"
                    /> */}
                    <img
                        src={`https://res.cloudinary.com/dipbhxayl/image/upload/image_user/${user.user_image}.jpg`}
                        // cloudName="dipbhxayl"
                        alt=''
                    />
                    {
                        showChangeInformation
                            ? (
                                <>
                                    <input type='file' onChange={getPathNewImage}
                                        ref={inputRef} style={{ display: "none" }}
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
                                            <BiEdit onClick={() => setShowChangeInformation(true)} />
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
    )
}

export default Profile
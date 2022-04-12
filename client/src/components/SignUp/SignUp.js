import React, { useRef, useState } from "react";
import "../../css/SignUp/SginUp.css";
import Bounce from "react-reveal/Bounce";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
// import Requests from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { PostRequest } from "../../utils/requests";
import Loading from "../Loading/Loading";
import SuccessMsg from "../SuccessMsg/SuccessMsg";

const SignUp = () => {
    const [inputValue, setInputValue] = useState("");
    const [showEye, setShowEye] = useState(false);
    const [userError, setUserError] = useState("");
    const [userImage, setUserImage] = useState('/images/profile-image-default.webp');
    const inputRef = useRef();
    const [loading, setLoading] = useState(false);
    const [alertSignedDone, setAlertSingedDone] = useState(false);

    // ! handle input changes + ? change the error values in change;
    function handleChange(e) {
        setInputValue(prevValue => ({ ...prevValue, [e.target.id]: e.target.value }));
        setUserError('');
    }
    //!get Path of image
    function getPathOfImg(e) {
        if (e.target.files.length) {
            let file = e.target.files[0];
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setUserImage(fileReader.result);
                console.log(fileReader.result);
            }
            fileReader.onerror = (e) => console.log(e);
        } else {
            setUserImage('/images/profile-image-default.webp');
        }
    }
    // ! signup
    async function signup(e) {
        e.preventDefault();
        setLoading(true);
        const user = {
            name: {
                first_name: inputValue["first_name"],
                last_name: inputValue["last_name"],
            },
            email: inputValue["email"],
            password: inputValue["password"],
            location: {
                country: inputValue["country"],
                city: inputValue["city"],
            },
            phone: inputValue["phone"],
            user_image: userImage,
        };
        try {
            const res = await PostRequest('/signup', JSON.stringify(user));
            const data = await res.json();
            console.log('signup res', res);
            console.log('signup data', data);
            if (data.user) {
                localStorage.token = await data.token;
                localStorage.user = JSON.stringify(await data.user);
                setLoading(false);
                setAlertSingedDone(true);
                window.location.assign('/');
            } else {
                setUserError(data.errors);
                setLoading(false);
            }
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };
    // ! the eye icon (show & hide)
    let passInput = useRef();
    let handleShowEye = () => {
        setShowEye(!showEye);
        passInput.current.type = "text";
    };
    let handleHideEye = () => {
        setShowEye(!showEye);
        passInput.current.type = "password";
    };

    return (
        <React.Fragment>

            <Loading open={loading} setOpen={setLoading} />
            <SuccessMsg msg={"Sign Up Done !"} open={alertSignedDone} setOpen={setAlertSingedDone} />

            <Bounce left>

                <div className="sign">

                    <form className="sign-content" onSubmit={signup}>

                        <div className="sign-box">

                            <div className="add-photo">
                                <input
                                    type='file'
                                    accept="image/*"
                                    onChange={getPathOfImg}
                                    ref={inputRef}
                                    style={{ display: 'none' }}
                                />
                                <div className="btn-and-img">
                                    <img
                                        alt=''
                                        src={userImage}
                                        onClick={userImage ? () => inputRef.current.click() : null}
                                    />
                                    <div className="error">
                                        {userError && userError["user_image"]}
                                    </div>
                                </div>

                            </div>

                            <div className="personal-info">
                                <span>
                                    <label htmlFor="first_name">First Name:</label>
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        id="first_name"
                                        onChange={handleChange}
                                    />
                                    <div className="error first_name">
                                        {userError && userError["name.first_name"]}
                                    </div>
                                </span>
                                <span>
                                    <label htmlFor="last_name">Last Name:</label>
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        id="last_name"
                                        onChange={handleChange}
                                    />
                                    <div className="error last_name">
                                        {userError && userError["name.last_name"]}
                                    </div>
                                </span>
                            </div>

                            <div className="input-box">
                                <label htmlFor="email">E-mail:</label>
                                <input
                                    type="text"
                                    placeholder="E-mail"
                                    id="email"
                                    onChange={handleChange}
                                />
                                <div className="error email">
                                    {userError && userError["email"]}
                                </div>
                            </div>

                            <div className="input-box">
                                <label htmlFor="password">Password:</label>
                                <div className="password-input">
                                    <input
                                        ref={passInput}
                                        type="password"
                                        placeholder="password"
                                        id="password"
                                        onChange={handleChange}
                                    />
                                    <span className='eye'>
                                        <AiFillEyeInvisible display={showEye ? 'none' : 'block'} onClick={() => handleShowEye()} />
                                        <AiFillEye display={showEye ? 'block' : 'none'} onClick={() => handleHideEye()} />
                                    </span>
                                </div>
                                <div className="error password">
                                    {userError && userError["password"]}
                                </div>
                            </div>

                            <div className="personal-info">
                                <span>
                                    <label htmlFor="country">Country:</label>
                                    <input
                                        type="text"
                                        placeholder="country"
                                        id="country"
                                        onChange={handleChange}
                                    />
                                    <div className="error country">
                                        {userError && userError["location.country"]}
                                    </div>
                                </span>
                                <span>
                                    <label htmlFor="city">City:</label>
                                    <input
                                        type="text"
                                        placeholder="city"
                                        id="city"
                                        onChange={handleChange}
                                    />
                                    <div className="error city">
                                        {userError && userError["location.city"]}
                                    </div>
                                </span>
                            </div>

                            <div className="input-box">
                                <label htmlFor="phone">Phone Number:</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    id="phone"
                                    onChange={handleChange}
                                />
                                <div className="error phone">
                                    {userError && userError["phone"]}
                                </div>
                            </div>

                            <button>sign up</button>
                        </div>

                        <p className="or-option">
                            <span>or</span>
                        </p>

                        <div className="social">
                            <div>signup with: </div>
                            <ul>
                                <li>
                                    <a href="#facebook">
                                        <i className="fab fa-facebook-f"></i> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="#gmail">
                                        <i className="fab fa-google"></i> Gmail
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </form>
                </div>
            </Bounce>
        </React.Fragment>

    );
};

export default SignUp;

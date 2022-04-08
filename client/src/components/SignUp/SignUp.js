import React, { useRef, useState } from "react";
import "../../css/SignUp/SginUp.css";
import Bounce from "react-reveal/Bounce";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
// import Requests from "../../utils/requests";
import { useNavigate } from "react-router-dom";
import { PostRequest } from "../../utils/requests";

const SignUp = () => {
    const [inputValue, setInputValue] = useState("");
    const [showEye, setShowEye] = useState(false);
    const [userError, setUserError] = useState("");

    // ! handle input changes + ? change the error values in change;
    function handleChange(e) {
        setInputValue(prevValue => ({ ...prevValue, [e.target.id]: e.target.value }));
        setUserError('');
    }
    // ! signup
    async function signup(e) {
        e.preventDefault();
        const user = {
            name: {
                first_name: inputValue["first_name"] || null,
                last_name: inputValue["last_name"] || null,
            },
            email: inputValue["email"] || null,
            password: inputValue["password"] || null,
            location: {
                country: inputValue["country"] || null,
                city: inputValue["city"] || null,
            },
            phone: inputValue["phone"] || null,
        };

        try {
            const res = await PostRequest('/signup', JSON.stringify(user));
            const data = await res.json();
            console.log('signup res', res);
            console.log('signup data', data);
            if (data.user) {
                localStorage.token = await data.token;
                localStorage.user = JSON.stringify(data.user);
                window.location.assign('/');
            } else {
                setUserError(data.errors);
            }
        } catch (e) {
            console.log(e);
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
        <Bounce left>
            <div className="sign">
                <form className="sign-content" onSubmit={signup}>
                    <div className="sign-box">

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

                        <label htmlFor="password">Password:</label>
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
                        <div className="error password">
                            {userError && userError["password"]}
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
    );
};

export default SignUp;

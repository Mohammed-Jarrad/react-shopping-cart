import React, { useRef, useState } from "react";
import "../../css/SignUp/SginUp.css";
import Bounce from "react-reveal/Bounce";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const SignUp = () => {
    const [inputValue, setInputValue] = useState("");
    const [showEye, setShowEye] = useState(false);
    const [userInfo, setUserInfo] = useState("");

    const handleChange = (e) => setInputValue(prevValue => ({ ...prevValue, [e.target.id]: e.target.value }));

    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: {
                first_name: inputValue["first-name"] || null,
                last_name: inputValue["last-name"] || null,
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
            const reponse = await fetch("/signup", {
                method: "POST",
                body: JSON.stringify(user),
                headers: { "content-type": "application/json" },
            });
            const data = await reponse.json();
            // console.log(data);
            setUserInfo(data);
            if (data.user) {
                window.location.assign("/");
            }
        } catch (e) {
            console.log("Something Error");
        }
    };

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
                <form className="sign-content" onSubmit={handleSubmit}>
                    <div className="sign-box">

                        <div className="personal-info">
                            <span>
                                <label htmlFor="first-name">First Name:</label>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    id="first-name"
                                    onChange={handleChange}
                                />
                                <div className="error first-name">
                                    {userInfo.errors && userInfo.errors["name.first_name"]}
                                </div>
                            </span>
                            <span>
                                <label htmlFor="last-name">Last Name:</label>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    id="last-name"
                                    onChange={handleChange}
                                />
                                <div className="error last-name">
                                    {userInfo.errors && userInfo.errors["name.last_name"]}
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
                            {userInfo.errors && userInfo.errors["email"]}
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
                            {userInfo.errors && userInfo.errors["password"]}
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
                                    {userInfo.errors && userInfo.errors["location.country"]}
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
                                    {userInfo.errors && userInfo.errors["location.city"]}
                                </div>
                            </span>
                        </div>

                        <label htmlFor="phone">Phone Number:</label>
                        <input
                            type="number"
                            placeholder="Phone Number"
                            id="phone"
                            onChange={handleChange}
                        />
                        <div className="error phone">
                            {userInfo.errors && userInfo.errors["phone"]}
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

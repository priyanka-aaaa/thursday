import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Button } from 'react-bootstrap';

import GoogleLogin from 'react-google-login';
export const StudentloginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mounted, setMounted] = useState();
    const [redirectToReferrer, setredirectToReferrer] = useState(false);
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState();
    const [loader, setmyloader] = useState("false");
    const [wrongPassword, setwrongPassword] = useState("");
    const [wrongUsername, setwrongUsername] = useState("")
    const [resetEmail, setresetEmail] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [showModal, setshowModal] = useState(false);
    const [EmailExistError, setEmailExistError] = useState(false);
    useEffect(() => {
        const { pathname } = Router;
        // if (pathname === "/") {
        //     Router.push("/student/dashboard");
        //   }
        if (localStorage.getItem('studentId')) {
            setredirectToReferrer(true)
            Router.push("/student/dashboard");
        }
    }, [])
    function open() {
        setshowModal(true)
    }
    function close() {
        setshowModal(false)
    }
    function handleSubmit(event) {
        setemailError("");
        setpasswordError("");
        setwrongUsername("")
        setwrongPassword("")
        setEmailExistError("")
        event.preventDefault();
        if (email === "") {
            setemailError("Please enter email");
        }
        if (password === "") {
            setpasswordError("Please enter password");
        }
        else {
            setmyloader("true")

            const obj = {
                email: email,
                password: password
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'student/login', obj)
                .then(result => {
                    setmyloader("false")

                    let responseJson = result;

                    if (responseJson.data.success === true) {
                        localStorage.setItem('studentId', responseJson.data.student._id);
                        localStorage.setItem('studentToken', responseJson.data.token);
                        localStorage.setItem('studentName', responseJson.data.student.name);
                        localStorage.setItem('studentEmail', responseJson.data.student.email);
                        localStorage.setItem('studentPhone', responseJson.data.student.phone);
                        setredirectToReferrer(true)
                        Router.push("/student/dashboard");

                    }
                    else {
                        if (responseJson.data.message === "Password not matched") {
                            setwrongPassword(" Please enter a correct password")

                        }
                        else {

                            setwrongUsername("Please enter a correct email")
                        }

                    }
                }
                )
                .catch(error => {
                });
        }
    }

    // if (localStorage.getItem('studentId') || redirectToReferrer === true) {
    //     return (<Redirect to={'/student/dashboard'} />)
    // }
    function onChangeresetEmail(e) {
        setresetEmail(e)
    }
    function handleforgotPasswordSubmit(event) {
        event.preventDefault();
        const obj1 = new FormData();
        obj1.append("email", resetEmail);
        const url4 = process.env.REACT_APP_SERVER_URL + 'student/forgotPassword';
        fetch(url4, {
            method: 'POST',
            body: obj1
        })
            .then(response => response.json())
            .then(data => {

                if (data.success === true) {
                    setshowSweetAlert("1")
                    setshowModal(false)
                }
                if (data.success === false) {
                    setEmailExistError(data.messages)
                }
            })
    }
    const handleLogin = async (googleData) => {
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'student/loginGoogle', {
            method: 'POST',
            body: JSON.stringify({
                token: googleData.tokenId,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await res.json();
        if (data.success === true) {
            localStorage.setItem('studentId', data.student._id);
            localStorage.setItem('studentToken', data.token);
            localStorage.setItem('studentName', data.student.name);
            localStorage.setItem('studentEmail', data.student.email);
            localStorage.setItem('studentPhone', data.student.phone);
            setredirectToReferrer(true)


        }

        localStorage.setItem('loginData', JSON.stringify(data));
    };
    const handleFailure = (result) => {
    };

    return (
        <div className="form-centerblock">

            {showSweetAlert === "1" ?

                <SweetAlert
                    success
                    title="Send Link For Reset Password!"
                    onConfirm={(value) => {
                        setshowSweetAlert("0")
                    }}
                >
                    New password has been sent to your email. Please do not share this password with anyone.
                </SweetAlert>
                : null
            }

            <h2>Student Login</h2>

            <div className="from-start">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Email<span className="req-star">*</span></label>
                        <input type="email" className="form-control" id="email"
                            placeholder="Enter email" name="email"
                            value={email} required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="error-msg"> {wrongUsername}</div>
                    </div>
                    <span className="error-msg">{emailError}</span>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Password<span className="req-star">*</span></label>
                        <input type="password" className="form-control " id="uname"
                            placeholder="Password" name="name"
                            value={password || ""} required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="error-msg"> {wrongPassword}</div>
                    </div>
                    <span className="error-msg"> {passwordError}</span>
                    <button type="submit" className="btn btn-website" title="Login">Login</button>
                </form>
                <div className="spacer"><span>OR</span></div>
                <div className="google-signin">
                    <GoogleLogin

                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Log in with Google"
                        plugin_name='abc'
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                    {/* end google login */}
                </div>

                <div className="footer-login">
                    <a title="Forgot Password" onClick={() => open()} >     Forgot your Password?</a>

                    <p>Don't have an account? Click here to
                        <Link to={'/Studentregister'} className="" href="#" title="Register">
                            Register</Link></p>
                </div>
                {/* start google login */}



            </div>
            <Modal className="modal-container"
                show={showModal}
                onHide={() => close()}

                animation={true}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>


                <div className="modal-body">
                    <form onSubmit={handleforgotPasswordSubmit}>

                        <div className="mb-3 mt-3">
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                                value={resetEmail}
                                onChange={(e) => onChangeresetEmail(e.target.value)}
                                required
                            />

                            <div className="error-msg"> {EmailExistError}</div>

                        </div>


                        <button type="submit" className="btn btn-primary" >Send Password </button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

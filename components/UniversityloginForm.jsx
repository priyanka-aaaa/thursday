import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Button } from 'react-bootstrap';
import Loader from './Loader';
import GoogleLogin from 'react-google-login';
export const UniversityloginForm  = () => {
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
      
        if (localStorage.getItem('universityId')) {
            setredirectToReferrer(true)
            Router.push("/recruitment/dashboard");
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
            axios.post(process.env.REACT_APP_SERVER_URL + 'university/login', obj)
                .then(result => {
                    setmyloader("false")

                    let responseJson = result;

                    if (responseJson.data.success === true) {
                        localStorage.setItem('universityId', responseJson.data.university._id);
                        localStorage.setItem('universityToken', responseJson.data.token);
                        localStorage.setItem('universityName', responseJson.data.university.name);
                        localStorage.setItem('universityEmail', responseJson.data.university.email);
                        localStorage.setItem('universityPhone', responseJson.data.university.phone);
                        setredirectToReferrer(true)
                        Router.push("/recruitment/dashboard");

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

    function onChangeresetEmail(e) {
        setresetEmail(e)
    }
    function handleforgotPasswordSubmit(event) {
        event.preventDefault();
        const obj1 = new FormData();
        obj1.append("email", resetEmail);
        const url4 = process.env.REACT_APP_SERVER_URL + 'university/forgotPassword';
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
        const res = await fetch(process.env.REACT_APP_SERVER_URL + 'university/loginGoogle', {
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
            localStorage.setItem('universityId', data.university._id);
            localStorage.setItem('universityToken', data.token);
            localStorage.setItem('universityName', data.university.name);
            localStorage.setItem('universityEmail', data.university.email);
            localStorage.setItem('universityPhone', data.university.phone);
            setredirectToReferrer(true)


        }

        localStorage.setItem('loginData', JSON.stringify(data));
    };
    const handleFailure = (result) => {
    };

    return (
        <div className="form-centerblock">
            {loader === "true" ?
                <Loader />
                : null}
            {showSweetAlert === "1" ?

                <SweetAlert
                    success
                    title="Password sent to your registered email."
                    onConfirm={(value) => {
                        setshowSweetAlert("0")
                    }}
                >
                    We have sent a new password to your email. Please check and login with the new password. Thank you
                </SweetAlert>
                : null
            }

            <h2>Schools Login</h2>

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

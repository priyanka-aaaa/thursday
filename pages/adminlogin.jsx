import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Footer } from '../components/Footer';
import Header from '../components/Header';

import LoaderFrontend from '../components/Loader';
import SweetAlert from 'react-bootstrap-sweetalert';


export default function AdminLogin() {
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
    const [state, setState] = useState({
    name: '-500px',
 });
    useEffect(() => {
        if (localStorage.getItem('adminId')) {
            setredirectToReferrer(true)
        }
    }, [])
    function handleSubmit(event) {
        setemailError("");
        setpasswordError("");
        setwrongUsername("")
        setwrongPassword("")
        event.preventDefault();
        if (email === "") {
            setemailError("Please enter email");
        }
        if (password === "") {
            setwrongPassword("Please enter password");
        }
        else {
            setmyloader("true")
            const obj = {
                email: email,
                password: password
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/login', obj)
                .then(result => {
                    setmyloader("false")
                    let responseJson = result;
                    if (responseJson.data.success === true) {
                        localStorage.setItem('adminId', responseJson.data.admin._id);
                        localStorage.setItem('adminToken', responseJson.data.token);
                        localStorage.setItem('adminName', responseJson.data.admin.name);
                        localStorage.setItem('adminEmail', responseJson.data.admin.email);
                        setredirectToReferrer(true)
                        Router.push("/admin/dashboard");
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
  
    function handleClick() {
        setState({ name: "-500px" })
        }
    return (
        <div>
            {loader === "true" ?
                <LoaderFrontend />
                : null}
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
            <div className="main-content">
                <div className="full-width-header">
                    <Header {...state} />
                    <section className="Form-block" onClick={() => handleClick()}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <img src="/images/studentlogin.svg" alt="login" loading="lazy"/>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-centerblock">
                                        <h2>Admin Login</h2>
                                        <div className="from-start">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3 mt-3">
                                                    <label className="form-label">Email </label>
                                                    <input type="email" className="form-control" id="email"
                                                        placeholder="Enter email" name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                    />
                                                    <div className="error-msg"> {wrongUsername}</div>
                                                </div>
                                                <span className="error-msg">{emailError}</span>
                                                <div className="mb-3 mt-3">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" className="form-control " id="uname"
                                                        placeholder="Password" name="name"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                    />
                                                    <div className="error-msg"> {wrongPassword}</div>
                                                </div>
                                                <span className="error-msg"> {passwordError}</span>
                                                <button type="submit" className="btn btn-website">Login</button>
                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer />
                </div>
            </div>
        </div>
    );
}
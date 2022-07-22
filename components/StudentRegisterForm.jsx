import React, { useState } from "react";
import 'react-phone-number-input/style.css'
import GoogleLogin from 'react-google-login';
import Link from 'next/link'
import axios from 'axios';
import { isValidPhoneNumber } from 'react-phone-number-input'
import PhoneInput from 'react-phone-number-input'
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from './Loader';

export default function StudentRegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nameError, setnameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [redirectToReferrer, setredirectToReferrer] = useState(false);
   
    function handleSubmit(event) {
        setnameError("");
        setemailError("");
        setphoneError("");
        event.preventDefault();
        if (name === "") {
            setnameError("Please enter name");
        }
        if (email === "") {
            setemailError("Please enter email");
        }
        if (phone === "") {
            setphoneError("Please enter phone number");
        }
        if (isValidPhoneNumber(phone) === false) {
            setphoneError("Please enter correct phone number");
        }
        else {
            setmyloader("true")

            const obj = {
                name: name,
                email: email,
                phone: phone

            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'student/register', obj)
                .then(function (res) {
                    setmyloader("false")

                    if (res.data.success === true) {
                        setshowSweetAlert("1")
                        setName("");
                        setEmail("");
                        setPhone("");

                    }
                    else if (res.data.message === "Student already exist") {
                        setemailError("Email already exist");
                    }
                    else {

                    }
                })
                .catch(error => {

                });
        }

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
            {loader === "true" ?
                <Loader />
                : null}
            {showSweetAlert === "1" ?
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={(value) => {
                        setshowSweetAlert("0")
                    }}
                >
                    You are registered successfully. Please check your email for password.
                </SweetAlert>
                : null
            }
            <h2>Student Register</h2>

            <div className="from-start">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Name<span className="req-star">*</span></label>
                        <input required type="text" className="form-control " id="uname"
                            placeholder="Full Name" name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <span className="error-msg"> {nameError}</span>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Email<span className="req-star">*</span></label>
                        <input required type="email" className="form-control " id="email"
                            placeholder="Enter email" name="email"

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>
                    <span className="error-msg">{emailError}</span>
                    <div className="mb-3 mt-3">
                        <label className="form-label">Phone<span className="req-star">*</span></label>

                        <PhoneInput     
                          defaultCountry={"IN"}
                            placeholder="Enter phone number"
                            required
                            value={phone}
                            onChange={setPhone} />

                        <span className="error-msg"> {phoneError}</span>
                    </div>
                    <button type="submit" className="btn btn-website">Register</button>
                </form>

                <div className="spacer"><span>OR</span></div>
                <div className="google-signin">
                    <GoogleLogin

                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                        buttonText="Signup with Google"
                        plugin_name='abc'
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                    {/* end google login */}
                </div>
                <p> Already have an account? Click here to
                    <Link href={'/students'} className="" >


                        Login</Link></p>
            </div>

        </div>
    );
}
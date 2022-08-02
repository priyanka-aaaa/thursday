import React, { useState, useEffect } from "react";


import axios from 'axios';
import { Footer } from '../components/Footer';
import Header from '../components/Header';

import Loader from '../components/Loader';
import SweetAlert from 'react-bootstrap-sweetalert';
import { StudentloginForm } from '../components/StudentloginForm';



export default function Studentlogin() {
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
    useEffect(() => {
        if (localStorage.getItem('studentId')) {
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
            setPassword("Please enter password");
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
                        setredirectToReferrer(true)
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

    // if (redirectToReferrer === true || localStorage.getItem('studentId')) {
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

                }

            })
    }
    return (
        <div>


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
            <div className="main-content">
                {/*Full width header Start*/}
                <div className="full-width-header">
                    <Header />
                    <section className="Form-block" >


                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">


                                    <img src="images/studentlogin.svg" alt="login" loading="lazy" />

                                </div>
                                <div className="col-lg-6">
                                    <StudentloginForm />
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
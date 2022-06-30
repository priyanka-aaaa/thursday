import React, { useState, useEffect } from "react";
import Link from "next/Link"
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Button } from 'react-bootstrap';
// import LoaderFrontend from './components/LoaderFrontend';
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
  
        if (localStorage.getItem('studentId')) {
            setredirectToReferrer(true)
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
       <>dfsdfdsf</>
    )
}

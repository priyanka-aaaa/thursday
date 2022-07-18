import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentTopbar from '../../components/StudentTopbar';
import StudentSidebar from '../../components/StudentSidebar';



// import Loader from '../Home/Loader';
export default function Setting() {
    const [mounted, setMounted] = useState();
    const [studentEmail, setstudentEmail] = useState();
    const [password, setpassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");
    const [confirmpasswordError, setconfirmpasswordError] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [cpasswordError, setcpasswordError] = useState("");
    const [loader, setmyloader] = useState("false");
    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem('studentToken');
        var studentEmail = localStorage.getItem('studentEmail');
        setMounted(mounted)
        setstudentEmail(studentEmail)
    }, [])
    function setting(event) {
        setcpasswordError("");
        setconfirmpasswordError("");
        event.preventDefault();
        if (password.length < 6) {
            setcpasswordError("Enter password with atleast 6 digit");
        }
        else if (password !== conformPassword) {
            setconfirmpasswordError("confirm password is not match");
        }
        else {
            setmyloader("true")
            const obj = {
                password: password,
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'student/changePassword', obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Password Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const obj2 = new FormData();
                        obj2.append("email", studentEmail);
                        obj2.append("password", password);
                        const url = process.env.REACT_APP_SERVER_URL + 'student/login';
                        fetch(url, {
                            method: 'POST',
                            body: obj2
                        })
                            .then(response => response.json())
                            .then(data => {
                                localStorage.setItem('studentId', data.student._id);
                                localStorage.setItem('studentToken', data.token);
                                localStorage.setItem('studentName', data.student.name);
                                localStorage.setItem('studentEmail', data.student.email);
                            })
                    }
                })
                .catch(error => {
                });
        }
    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <StudentSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                       <StudentTopbar/> 
                        <div className="container">
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Settings</h1>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 col-lg-7">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            {/* {loader === "true" ?
                                <Loader />
                                : null} */}
                                            <div className="form-block">
                                                <div className="card-body">
                                                    <h3>Change Password</h3>
                                                    <div className="col-sm-12">
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <form onSubmit={setting}>
                                                                    <div className="form-group">
                                                                        <label htmlFor="password">Enter New Password<span className="req-star">*</span></label>
                                                                        <input required="" name="password" type="password" id="password" className="form-control"
                                                                            value={password || ""}
                                                                            onChange={(e) => setpassword(e.target.value)}
                                                                            placeholder="Password"
                                                                        />
                                                                        <div className="error-msg"> {cpasswordError}</div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label htmlFor="c_password">Confirm Password<span className="req-star">*</span></label>
                                                                        <input required="" name="c_password" type="password" id="c_password" className="form-control"
                                                                            value={conformPassword || ""}
                                                                            onChange={(e) => setconformPassword(e.target.value)}
                                                                            placeholder="Confirm Password"
                                                                        />
                                                                    </div>
                                                                    <div className="error-msg"> {confirmpasswordError}</div>
                                                                    <div className="col-sm-12 text-danger"></div>
                                                                    <button type="submit" className="btn btn-success"
                                                                        title="Save" data-toggle="tooltip" data-placement="right"
                                                                    >Save</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
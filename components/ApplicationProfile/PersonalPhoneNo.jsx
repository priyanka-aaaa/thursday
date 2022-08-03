import React, { useState, useEffect } from "react";
// import Loader from '../../Home/Loader';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
export default function PersonalPhoneNo() {
    const [phone, setPhone] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [mounted, setMounted] = useState();
    // start for passport


    //end for passport

    const [salutation, setsalutation] = useState("");
    const [firstName, setfirstName] = useState("");
    const [middleName, setmiddleName] = useState("");
    const [lastName, setlastName] = useState("");
    const [otherName, setotherName] = useState("no");
    const [gender, setgender] = useState("");

    const [loader, setmyloader] = useState("false");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'student/personalPhone', { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setPhone(res.data.studentPersonalInformation.phone)
                    }
                })
                .catch(error => {
                });
        }
    }, [])
    function handlemaritalStatus(value) {
        setmaritalStatus(value)
    }
    function Personal_Information(event) {
        event.preventDefault();
        setphoneError("")
        if (phone === "") {
            setphoneError("Please enter phone number");
        }
        if (isValidPhoneNumber(phone) === false) {
            setphoneError("Please enter correct phone number");
        }
        else {
            setmyloader("true")
            const obj = {
                phone: phone
            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'student/personalPhone', obj,{ headers: { 'Authorization': mounted } })
            .then(function (res) {
            
                setmyloader("false")
                if (res.data.success === true) {
                    alert("sucesws")
                }
            })
            .catch(error => {
            });
        }

    }
    function handlecountryOfBirth(e) {
        setcountryOfBirth(e)
    }
    function handlenationality(e) {
        setnationality(e)
    }
    function handleClick() {
        if (down === "1") {
            setdown("0");
            setup("1")
        }
        else {
            setdown("1");
            setup("0")
        }
    }
    function changepassport(value) {
        setpassport(value)
        if (value === "yes") {
            setpassportDetail("inline")
        }
        else {
            setpassportDetail("none")
        }
    }
    function changeaadharCard(value) {
        setaadharCard(value)
        if (value === "yes") {
            setaadharDetail("inline")
        }
        else {
            setaadharDetail("none")
        }
    }
    return (
        <div id="accordion">
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse8" onClick={() => handleClick()} >
                    <strong>8</strong>  Personal Phone No.
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon className="sidebar-faicon" icon={faAngleDown} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                    {up === "0" ?
                        null
                        :
                        <FontAwesomeIcon className="sidebar-faicon" icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapse8" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <div className="from-block">
                            <form onSubmit={Personal_Information}>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="fname" className="form-label">Phone<span className="req-star">*</span></label>
                                                <PhoneInput
                                                    defaultCountry={"IN"}
                                                    placeholder="Enter phone number"
                                                    required
                                                    value={phone}
                                                    onChange={setPhone} />

                                                <span className="error-msg"> {phoneError}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-md-6"></div>
                                        <div className="col-md-6 text-right">
                                            {salutation !== "" && firstName !== "" && lastName !== ""
                                                ?
                                                <button type="submit" className="btn btn-success mr-2" title="Save" data-bs-toggle="collapse" href="#collapseTwo">Save
                                                </button> :
                                                <button type="submit" className="btn btn-success mr-2" title="Save">Save
                                                </button>
                                            }
                                            <button type="button" data-bs-toggle="collapse" className="btn btn-secondary" href="#collapseTwo" title="Skip & Next">Skip & Next</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
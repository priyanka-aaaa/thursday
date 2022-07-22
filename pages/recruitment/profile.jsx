import React, { useState, useEffect } from "react";
import Loader from '../../components/Loader';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import axios from 'axios';
import RecruitmentTopbar from '../../components/RecruitmentTopbar';
import RecruitmentSidebar from '../../components/RecruitmentSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
export default function PersonalInfoProfile() {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");

    const [submitSuccess, setsubmitSuccess] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [mounted, setmounted] = useState("");
    const [agentId, setagentId] = useState("");



    const [nameError, setnameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [loader, setmyloader] = useState("false");
    //start extra
    const [companyName, setcompanyName] = useState("")
    const [companyNameError, setcompanyNameError] = useState("")
    const [code, setcode] = useState("")
    const [codeError, setcodeError] = useState("")
    const [address, setaddress] = useState("")
    const [addressError, setaddressError] = useState("")

    const [Checkmycountry, setCheckmycountry] = useState("0")
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [CheckState, setCheckState] = useState("0");
    const [CheckCity, setCheckCity] = useState("0");
    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");
    const [countryError, setcountryError] = useState("");
    const [countries, setcountries] = useState([{
        country_name: ""
    }]);
    const [states, setstates] = useState([{
        state_name: ""
    }])
    const [cities, setcities] = useState([{
        city_name: ""
    }])
    useEffect(() => {
        var agentId = localStorage.getItem('agentId');
        var mounted = localStorage.getItem("agentToken")
        setmounted(mounted)
        setagentId(agentId)
        if (agentId !== null) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'agent/profile', { headers: { 'Authorization': mounted } })
                .then(function (res) {

                    var myresult = res.data.agentProfile[0]
                    setname(myresult.name)
                    setemail(myresult.email)
                    setphone(myresult.phone)
                    setcountry(myresult.country)
                    setstate(myresult.state)
                    setcity(myresult.city)
                    setcompanyName(myresult.companyName)
                    setcode(myresult.code)
                    setaddress(myresult.address)
                })
                .catch(error => {
                });
            axios.get(process.env.REACT_APP_SERVER_URL + 'countries/')
                .then(function (res) {
                    if (res.data.success === true) {
                        setcountries(res.data.result);
                    }
                })
                .catch(error => {
                });
        }
    }, [])
    function handleSubmit(event) {

        setnameError("");
        setemailError("");
        setphoneError("");
        setcountryError("");
        setstateError("");
        setcityError("");
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
        if (country === "Select Country") {
            setcountryError("Please Select Country")
        }
        if (state === "Select State") {
            setstateError("Please Select State")
        }
        if (city === "Select City") {
            setcityError("Please Select City")
        }
        else {
            setmyloader("true")

            const obj = {

                phone: phone,
                country: country,
                state: state,
                city: city,
                companyName: companyName,
                code: code,
                address: address

            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'agent/profile/' + agentId, obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Profile Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        axios.get(process.env.REACT_APP_SERVER_URL + 'agent/profile', { headers: { 'Authorization': mounted } })
                            .then(function (res) {

                                var myresult = res.data.agentProfile[0]
                                setname(myresult.name)
                                setemail(myresult.email)
                                setphone(myresult.phone)
                                setcountry(myresult.country)
                                setstate(myresult.state)
                                setcity(myresult.city)
                                setcompanyName(myresult.companyName)
                                setcode(myresult.code)
                                setaddress(myresult.address)
                            })
                            .catch(error => {
                            });
                    }
                    else {
                    }
                })
                .catch(error => {
                });


        }

    }
    function handlecountry(e) {
        setcountryError("")
        setcountry(e)
        setCheckState("1")
        axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setstates(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handlestate(e) {
        setstateError("")
        setstate(e)
        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handleCity(value) {
        setcity(value)
        setcityError("")

    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <RecruitmentSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <RecruitmentTopbar />
                        <div id="accordion">
                            {loader === "true" ?
                                <Loader />
                                : null}
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}



                            <div className="container-fluid">
                                <div class="d-sm-flex align-items-center justify-content-between mb-4"><h1 class="h3 mb-0 text-gray-800">Profile</h1></div>
                                <div className="card">
                                    <div className="card-header"></div>
                                    <div className="card-body">
                                        <div className="from-block">
                                            <form onSubmit={handleSubmit}>
                                                <div className="row mb-3">
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Name <span className="req-star">*</span></label>
                                                            <input required type="text" className="form-control " id="uname"
                                                                placeholder="Full Name" name="name" readOnly={true}
                                                                value={name}
                                                            />
                                                        </div>
                                                        <span className="error-msg"> {nameError}</span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Email <span className="req-star">*</span></label>
                                                            <input required type="email" className="form-control " id="email" readOnly={true}
                                                                placeholder="Enter email" name="email"
                                                                value={email}
                                                            />
                                                        </div>
                                                        <span className="error-msg">{emailError}</span>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Phone <span className="req-star">*</span></label>
                                                            <PhoneInput defaultCountry={"IN"}
                                                                placeholder="Enter phone number"
                                                                required
                                                                value={phone}
                                                                onChange={setphone} />
                                                        </div>
                                                        <span className="error-msg"> {phoneError}</span>
                                                    </div>

                                                </div>

                                                <div className="row mb-3 ">
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label htmlFor="Country">Country<span className="text-danger">
                                                                *</span>
                                                            </label>
                                                            <select
                                                                value={country}
                                                                onChange={(e) => handlecountry(e.target.value)}
                                                                className="form-control" name="country" required>
                                                                {Checkmycountry === "0" ? <option value={country}>{country}</option> : <option value="">Please select Country</option>}
                                                                {countries.map((element, index) => {
                                                                    return (
                                                                        <option
                                                                            value={element.country_name} key={index}>{element.country_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                            <span className="error-msg"> {countryError}</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label htmlFor="State/Province">State/Province<span className="text-danger"> *</span>
                                                            </label>
                                                            <select className="form-control" name="state"
                                                                onChange={(e) => handlestate(e.target.value)}
                                                                required
                                                                value={state}>
                                                                {CheckState === "0" ? <option value={state}>{state}</option> : <option value="">Please select state</option>}
                                                                {states.map((element, index) => {
                                                                    return (
                                                                        <option
                                                                            value={element.state_name} key={index}>{element.state_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <span className="error-msg"> {stateError}</span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label htmlFor="City/Town">City/Town<span className="text-danger"> *</span></label>
                                                            <select className="form-control" name="city" required
                                                                value={city}
                                                                onChange={(e) => handleCity(e.target.value)
                                                                }
                                                            >
                                                                {CheckCity === "0" ? <option value={city}>{city}</option> : <option value="">Please select City</option>}
                                                                {cities.map((element, index) => {
                                                                    return (
                                                                        <option
                                                                            value={element.city_name} key={index}>{element.city_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <span className="error-msg"> {cityError}</span>
                                                    </div>

                                                </div>


                                                {/* start extra */}
                                                <div className="row mb-3">
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Company Name <span className="req-star">*</span></label>
                                                            <input required type="text" className="form-control " id="uname"
                                                                placeholder="Company Name" name="companyName"
                                                                value={companyName}
                                                                onChange={(e) => setcompanyName(e.target.value)}
                                                            />
                                                        </div>
                                                        <span className="error-msg"> {companyNameError}</span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Postal Code <span className="req-star">*</span></label>
                                                            <input required type="number" className="form-control " id="uname"
                                                                placeholder="Postal Code" name="code"
                                                                value={code}
                                                                onChange={(e) => setcode(e.target.value)}
                                                            />
                                                        </div>
                                                        <span className="error-msg"> {codeError}</span>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="from-group">
                                                            <label className="form-label">Address <span className="req-star">*</span></label>
                                                            <input required type="text" className="form-control " id="uname"
                                                                placeholder="Full Name" name="address"
                                                                value={address}
                                                                onChange={(e) => setaddress(e.target.value)}
                                                            />
                                                        </div>
                                                        <span className="error-msg"> {addressError}</span>
                                                    </div>
                                                </div>
                                                {/* end extra */}
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <button type="submit" className="btn btn-website">Submit</button>
                                                    </div>
                                                </div>


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
    );
}
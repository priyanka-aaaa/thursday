import React, { useState, useEffect } from "react";
// import Loader from '../../Home/Loader';
import axios from 'axios';
import { FontAwesomeIcon   } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
export default function AddressProfile() {
    const [nextMenu, setnextMenu] = useState("Select Country");

    //start address two
    const [address2Error, setaddress2Error] = useState("");
    const [zipcode2Error, setzipcode2Error] = useState("");

    const [country2, setcountry2] = useState("Select Country");
    const [state2, setstate2] = useState("Select State");
    const [city2, setcity2] = useState("Select City");
    const [CheckState2, setCheckState2] = useState("0");
    const [CheckCity2, setCheckCity2] = useState("0");
    const [state2Error, setstate2Error] = useState("");
    const [city2Error, setcity2Error] = useState("");
    const [country2Error, setcountry2Error] = useState("");
    const [countries2, setcountries2] = useState([{
        country_name2: ""
    }]);
    const [states2, setstates2] = useState([{
        state_name2: ""
    }])
    const [cities2, setcities2] = useState([{
        city_name: ""
    }])
    const [Checkmycountry2, setCheckmycountry2] = useState("0")
    const [address2, setaddress2] = useState();
    const [zipcode2, setzipcode2] = useState()
    //end address two
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [mounted, setMounted] = useState();
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");

    const [address, setaddress] = useState();
    const [zipcode, setzipcode] = useState()
    const [Checkmycountry, setCheckmycountry] = useState("0")
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [communication_address, setcommunication_address] = useState("yes");
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
    const [loader, setmyloader] = useState("false");
    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'student/address', { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    if (res.data.success === true) {
                        var studentAddress = res.data.studentAddress;
                      

                        if (studentAddress.country !== "") {
                            setCheckmycountry("1")
                        }
                        setcountry(studentAddress.country);
                        setstate(studentAddress.state);
                        setcity(studentAddress.city);
                        setaddress(studentAddress.address);
                        setzipcode(studentAddress.zipcode);
                        setcommunication_address(studentAddress.communication_address);
                        if (studentAddress.country2 !== "") {
                            setCheckmycountry2("1")
                            setcountry2(studentAddress.country2);
                            setstate2(studentAddress.state2);
                            setcity2(studentAddress.city2);
                            setaddress2(studentAddress.address2);
                            setzipcode2(studentAddress.zipcode2);
                        }
                    }
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
            axios.get(process.env.REACT_APP_SERVER_URL + 'states/india')
                .then(function (res) {
                    if (res.data.success === true) {
                    }
                })
                .catch(error => {
                });
        }
    }, [])
    function application_address(event) {

        event.preventDefault();

        setcountryError("")
        setstateError("")
        setcityError("")
        if (country === "Select Country") {
            setcountryError("Please select country")
        }
        else if (state === "Select State") {
            setstateError("Please select state")
        }
        else if (city === "Select City") {
            setcityError("Please select city")

        }
        else {
            if (communication_address !== "yes") {
                if (country2 === "Select Country") {

                    setcountry2Error("Please select country")
                    return
                }
                if (state2 === "Select State") {

                    setstate2Error("Please select state")
                    return
                }
                if (city2 === "Select City") {
                    setcity2Error("Please select city")
                    return
                }
                if(address2===""){
                    setaddress2Error("Please Enter Address")
                    return
                }
                if(zipcode2===""){
                    setzipcode2Error("Please Enter Zipcode")
                    return
                }
            }
            setnextMenu("true")
            setmyloader("true")
            const obj = {
                country: country,
                state: state,
                city: city,
                address: address,
                zipcode: zipcode,
                communication_address: communication_address,
                country2: country2,
                state2: state2,
                city2: city2,
                address2: address2,
                zipcode2: zipcode2

            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'student/address', obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Address Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        axios.get(process.env.REACT_APP_SERVER_URL + 'student/address', { headers: { 'Authorization': mounted } })
                            .then(function (res) {
                                if (res.data.success === true) {
                                    var studentAddress = res.data.studentAddress;
                                    if (studentAddress.country !== "") {
                                        setCheckmycountry("1")
                                    }
                                    setcountry(studentAddress.country);
                                    setstate(studentAddress.state);
                                    setcity(studentAddress.city);
                                    setaddress(studentAddress.address);
                                    setzipcode(studentAddress.zipcode);
                                    setcommunication_address(studentAddress.communication_address);
                                }
                            })
                            .catch(error => {
                            });
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
    function handlecountry2(e) {
        setcountry2Error("")
        setcountry2(e)
        setCheckState2("1")
        axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setstates2(res.data.result);
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
    function handlestate2(e) {
        setstate2Error("")
        setstate2(e)

        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities2(res.data.result);
               

                }
            })
            .catch(error => {
            });
    }
    function handleCity(value) {
        setcity(value)
        setcityError("")

    }
    function handleCity2(value) {
        setcity2(value)
        setcity2Error("")

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
    function HomeAddressClick(value) {

        setcommunication_address(value)
        setnextMenu("false")
        if (value === "no") {

        }
    }
    return (
        <div>
            <div className="card">
                {/* {loader === "true" ?
                    <Loader />
                    : null} */}
                {submitSuccess === 1 ? <div className="Show_success_message">
                    <strong>Success!</strong> {successMessage}
                </div> : null}

                <a className="card-header" data-bs-toggle="collapse" href="#collapseTwo" onClick={() => handleClick()}>
                    <strong>2</strong>   Address & Contact
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon  className="sidebar-faicon" icon={faAngleDown} style={{
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
                        <FontAwesomeIcon  className="sidebar-faicon" icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <form onSubmit={application_address}>
                            <div className="d-flex flex-wrap" id="Address">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
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
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
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
                                        <span className="error-msg"> {stateError}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group"><label htmlFor="City/Town">City/Town<span className="text-danger"> *</span></label>
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
                                        <span className="error-msg"> {cityError}</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="addressLine2">Address<span className="text-danger">
                                            *</span></label>
                                        <input
                                            value={address || ""}
                                            onChange={(e) => setaddress(e.target.value)}
                                            type="text" className="form-control" placeholder="Address" name="address_text" required />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="Zipcode">Zipcode<span className="text-danger">
                                            *</span></label>
                                        <input
                                            value={zipcode || ""}
                                            onChange={(e) => setzipcode(e.target.value)}
                                            type="number" className="form-control" placeholder="Zipcode" name="zip_code" required />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-12">
                                    <div className="form-group"><label htmlFor="addressLine2">Is your Home
                                        Address same as Communication Address?</label>
                                        <div className="checkgrp">
                                            <label htmlFor="1" className="m-3">
                                                <input
                                                    onClick={() => HomeAddressClick("yes")}
                                                    checked={communication_address === "yes"}
                                                    type="radio" name="address_check" /> Yes</label>
                                            <label htmlFor="0" className="m-3"><input type="radio" name="address_check"
                                                onClick={() => HomeAddressClick("no")}

                                                checked={communication_address === "no"} /> No</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            {/* start dummy */}
                            {communication_address === "no" ?
                                <div className="d-flex flex-wrap" id="Address">
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="Country">Country<span className="text-danger">
                                                *</span>
                                            </label>
                                            <select
                                                value={country2}
                                                onChange={(e) => handlecountry2(e.target.value)}
                                                className="form-control" name="country" required>
                                                {Checkmycountry2 === "0" ? <option value={country2}>{country2}</option> : <option value="">Please select Country</option>}
                                                {countries.map((element, index) => {
                                                    return (
                                                        <option
                                                            value={element.country_name} key={index}>{element.country_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <span className="error-msg"> {country2Error}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="State/Province">State/Province<span className="text-danger"> *</span>
                                            </label>
                                            <select className="form-control" name="state"
                                                onChange={(e) => handlestate2(e.target.value)}
                                                required
                                                value={state2}>
                                                {CheckState2 === "0" ? <option value={state2}>{state2}</option> : <option value="">Please select state</option>}
                                                {states2.map((element, index) => {
                                                    return (
                                                        <option
                                                            value={element.state_name} key={index}>{element.state_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <span className="error-msg"> {state2Error}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className="form-group"><label htmlFor="City/Town">City/Town<span className="text-danger"> *</span></label>
                                            <select className="form-control" name="city" required
                                                value={city2}
                                                onChange={(e) => handleCity2(e.target.value)
                                                }
                                            >
                                                {CheckCity2 === "0" ? <option value={city2}>{city2}</option> : <option value="">Please select City</option>}
                                                {cities2.map((element, index) => {
                                                    return (
                                                        <option
                                                            value={element.city_name} key={index}>{element.city_name}</option>
                                                    )
                                                })}
                                            </select>
                                            <span className="error-msg"> {city2Error}</span>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="addressLine2">Address<span className="text-danger">
                                                *</span></label>
                                            <input
                                                value={address2 || ""}
                                                onChange={(e) => setaddress2(e.target.value)}
                                                type="text" className="form-control" placeholder="Address" name="address_text" required />
                                        </div>
                                        <span className="error-msg"> {address2Error}</span>
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                        <div className="form-group">
                                            <label htmlFor="Zipcode">Zipcode<span className="text-danger">
                                                *</span></label>
                                            <input
                                                value={zipcode2 || ""}
                                                onChange={(e) => setzipcode2(e.target.value)}
                                                type="number" className="form-control" placeholder="Zipcode" name="zip_code" required />
                                        </div>
                                        <span className="error-msg"> {zipcode2Error}</span>
                                    </div>

                                    <div className="clearfix"></div>
                                </div>
                                : null}
                            {/* end dummy */}
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6 text-right">
                                        {nextMenu === "true"
                                            ?

                                            <button type="submit" className="btn btn-success  mr-2" title="Save"
                                                data-bs-toggle="collapse" href="#collapse3"
                                            >Save
                                            </button>
                                            : <button type="submit" className="btn btn-success  mr-2" title="Save" >Save
                                            </button>}

                                        <button type="button" data-bs-toggle="collapse" className="btn btn-secondary " href="#collapse3" title="Skip & Next">
                                            Skip & Next</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
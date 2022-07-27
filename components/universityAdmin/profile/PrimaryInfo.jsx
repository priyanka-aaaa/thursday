import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loader from '../../Loader';
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp

} from '@fortawesome/free-solid-svg-icons';
export default function PrimaryInfo() {
    const [mounted, setMounted] = useState();
    const [universityId, setuniversityId] = useState();
    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [pincode, setpincode] = useState("");
    const [type, settype] = useState("");
    const [description, setdescription] = useState("");
    const [website, setwebsite] = useState("");
    const [phone, setphone] = useState("no");
    const [organization, setorganization] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [CheckState, setCheckState] = useState("0");
    const [CheckCity, setCheckCity] = useState("0");
    const [phoneError, setphoneError] = useState("");
    const [typeError, settypeError] = useState("");
    const [descriptionError, setdescriptionError] = useState("");
    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");
    const [DescriptionLengthError, setDescriptionLengthError] = useState("");
    const [websiteStartError, setwebsiteStartError] = useState("");
    const [websiteEndError, setwebsiteEndError] = useState("");
    const [pincodeError, setpincodeError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [fixedName, setfixedName] = useState("0");

    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    const [universityAlearyError, setuniversityAlearyError] = useState("");



    const [loader, setmyloader] = useState("false");
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
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)



        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId);
        if (adminUniversityId !== null) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/primaryInformation')
                .then(function (res) {
                    var student_universityPrimaryInformation = res.data.universityPrimaryInformation;
                    setname(student_universityPrimaryInformation.name);
                    if (student_universityPrimaryInformation.name !== "") {
                        setfixedName("1")
                    }
                    setaddress(student_universityPrimaryInformation.address);
                    setcountry(student_universityPrimaryInformation.country);
                    setstate(student_universityPrimaryInformation.state);
                    setcity(student_universityPrimaryInformation.city);
                    setpincode(student_universityPrimaryInformation.pincode);
                    settype(student_universityPrimaryInformation.type);
                    setdescription(student_universityPrimaryInformation.description);
                    setwebsite(student_universityPrimaryInformation.website);
                    setphone(student_universityPrimaryInformation.phone);
                    setorganization(student_universityPrimaryInformation.organization);
                    axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + res.data.universityPrimaryInformation.country + '/')
                        .then(function (res) {
                            if (res.data.success === true) {
                                setstates(res.data.result);
                            }
                        })
                        .catch(error => {
                        })
                    axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + res.data.universityPrimaryInformation.state + '/')
                        .then(function (res) {
                            if (res.data.success === true) {
                                setcities(res.data.result);
                            }
                        })
                        .catch(error => {

                        });


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
    function onChangeName(e) {
        const arr = e.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        const str2 = arr.join(" ");
        setname(str2)
    }
    function handlecountry(e) {
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
        setstate(e)
        setCheckCity("1")
        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities(res.data.result);
                }
            })
            .catch(error => {

            });
    }
    function nameMethod(e) {
        const re = "^[a-zA-Z ]+$";

        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }
    function streetAddressMethod(e) {
        const re = /[!@$%^*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (re.test(e.key)) {
            e.preventDefault();
        }
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
    function handleFormSubmit(event) {
        event.preventDefault();
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setuniversityAlearyError("");
        setdescriptionError("");
        settypeError("");
        setphoneError("");
        setstateError("");
        setcityError("")
        setDescriptionLengthError("");
        setwebsiteStartError("");
        setwebsiteEndError("");
        setpincodeError("");
        var descriptionLength = description.split(' ').length;
        var myPattern = /^[0-9_.]*$/;
        if (type === "") {
            settypeError("Please Select University Type");
        }
        else if (phone === "") {
            setphoneError("Please enter phone number");
        }
        else if (isValidPhoneNumber(phone) === false) {
            setphoneError("Please enter correct phone number");
        }
        else if (description === "") {
            setdescriptionError("Please Enter Description")
        }
        else if (state === "Select State") {
            setstateError("Please Enter State")
        }
        else if (city === "Select City") {
            setcityError("Please Enter City")
        }
        else if (descriptionLength < 49) {
            setDescriptionLengthError("Please Enter Aleast 50-60 words")
        }
        else {
            setmyloader("true")
            const obj6 = new FormData();
            obj6.append("name", name);
            //START FOR REGISTER NEW UNIVERISTY
            const url = process.env.REACT_APP_SERVER_URL + 'admin/universitys/register';
            fetch(url, {
                body: obj6,
                method: 'POST',
                headers: { 'Authorization': adminmounted },

            })
                .then(response => response.json())
                .then(data => {
                   
                    if (data.success === true ) {
                        setmyloader("false")
                        localStorage.setItem('adminUniversityId', data.id);
                        var newUniversityId = data.id
                        const obj = {
                            name: name,

                            address: address,
                            country: country,
                            state: state,
                            city: city,
                            pincode: pincode,
                            type: type,
                            description: description,
                            website: website,
                            phone: phone,
                            organization: organization
                        };
                        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + newUniversityId + '/primaryInformation', obj, {
                            headers: { 'Authorization': adminmounted }
                        }

                        )
                            .then(function (res) {
                                setmyloader("false")
                                if (res.data.message === "university name already exist") {
                                    setuniversityAlearyError(res.data.message)
                                }
                                if (res.data.success === true) {
                                    localStorage.setItem('adminUniversityId', data.id);
                                    setsuccessMessage("Primary Information Updated")
                                    setTimeout(() => setsubmitSuccess(""), 3000);
                                    setsubmitSuccess(1)
                                    axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + newUniversityId + '/primaryInformation')
                                        .then(function (res) {
                                            var student_universityPrimaryInformation = res.data.universityPrimaryInformation;
                                            setname(student_universityPrimaryInformation.name);
                                            if (student_universityPrimaryInformation.name !== "") {
                                                setfixedName("1")
                                            }
                                            setaddress(student_universityPrimaryInformation.address);
                                            setcountry(student_universityPrimaryInformation.country);
                                            setstate(student_universityPrimaryInformation.state);
                                            setcity(student_universityPrimaryInformation.city);
                                            setpincode(student_universityPrimaryInformation.pincode);
                                            settype(student_universityPrimaryInformation.type);
                                            setdescription(student_universityPrimaryInformation.description);
                                            setwebsite(student_universityPrimaryInformation.website);
                                            setphone(student_universityPrimaryInformation.phone);
                                            setorganization(student_universityPrimaryInformation.organization);
                                        })
                                }
                            })
                            .catch(error => {

                            });
                    }
                    if (data.message === "university name already exist") {
                       setmyloader("false")
                        var newUniversityId =  localStorage.getItem('adminUniversityId');
                        const obj = {
                            name: name,

                            address: address,
                            country: country,
                            state: state,
                            city: city,
                            pincode: pincode,
                            type: type,
                            description: description,
                            website: website,
                            phone: phone,
                            organization: organization
                        };
                        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + newUniversityId + '/primaryInformation', obj, {
                            headers: { 'Authorization': adminmounted }
                        }

                        )
                            .then(function (res) {
                                setmyloader("false")
                                if (res.data.message === "university name already exist") {
                                    setuniversityAlearyError(res.data.message)
                                }
                                if (res.data.success === true) {
                                    setsuccessMessage("Primary Information Updated")
                                    setTimeout(() => setsubmitSuccess(""), 3000);
                                    setsubmitSuccess(1)
                                    axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + newUniversityId + '/primaryInformation')
                                        .then(function (res) {
                                            var student_universityPrimaryInformation = res.data.universityPrimaryInformation;
                                            setname(student_universityPrimaryInformation.name);
                                            if (student_universityPrimaryInformation.name !== "") {
                                                setfixedName("1")
                                            }
                                            setaddress(student_universityPrimaryInformation.address);
                                            setcountry(student_universityPrimaryInformation.country);
                                            setstate(student_universityPrimaryInformation.state);
                                            setcity(student_universityPrimaryInformation.city);
                                            setpincode(student_universityPrimaryInformation.pincode);
                                            settype(student_universityPrimaryInformation.type);
                                            setdescription(student_universityPrimaryInformation.description);
                                            setwebsite(student_universityPrimaryInformation.website);
                                            setphone(student_universityPrimaryInformation.phone);
                                            setorganization(student_universityPrimaryInformation.organization);
                                        })
                                }
                            })
                            .catch(error => {

                            });
                    }

                })
        }
    }
    return (
        <div>
            {loader === "true" ?
                <Loader />
                : null}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapseOne" onClick={() => handleClick()}  ><strong>1</strong>
                    Primary Info
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon icon={faAngleDown}  className="sidebar-faicon"style={{
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
                        <FontAwesomeIcon icon={faAngleUp} className="sidebar-faicon"   style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapseOne" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="from-block">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">University Name<span className="req-star">*</span></label>

                                            {fixedName === "1" ?
                                                <input type="text" className="form-control"
                                                    placeholder="University Name" name="uname"
                                                    readOnly={true}
                                                    value={name}
                                                    required />

                                                :
                                                <input type="text" className="form-control"
                                                    placeholder="University Name" name="uname"
                                                    onKeyPress={(e) => nameMethod(e)}
                                                    value={name}
                                                    onChange={(e) => onChangeName(e.target.value)}
                                                    required />

                                            }



                                            <div className="error-msg"> {universityAlearyError}</div>

                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <h6>Location</h6>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="form-label">Address<span className="req-star">*</span></label>
                                            <input type="text" className="form-control"
                                                placeholder="Address" name="Address"
                                                onKeyPress={(e) => streetAddressMethod(e)}
                                                value={address}
                                                onChange={(e) => setaddress(e.target.value)}
                                                required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Country<span className="req-star">*</span></label>
                                            <select className="form-control" name="country" required
                                                value={country}
                                                onChange={(e) => handlecountry(e.target.value)}

                                            >
                                                <option value="">Select Country</option>
                                                <option value="United States">USA</option>
                                                <option value="United Kingdom">UK</option>
                                                <option value="Australia">Australia</option>
                                                <option value="New Zealand" >New Zealand</option>
                                                <option value="Germany" >Germany</option>
                                                <option value="Canada" >Canada</option>
                                                <option value="Cyprus" >Cyprus</option>


                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>State<span className="req-star">*</span>
                                            </label>
                                            <select className="form-control" name="state"
                                                onChange={(e) => handlestate(e.target.value)}
                                                required
                                                value={state}
                                            >
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
                                    <div className="col-md-4">
                                        <div className="form-group"><label>City<span className="req-star">*</span></label>
                                            <select className="form-control" name="city" required
                                                value={city}
                                                onChange={(e) => setcity(e.target.value)}
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
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Zipcode<span className="req-star">*</span></label>
                                            <input type="text" className="form-control" placeholder="1234" name="pin_code" required
                                                value={pincode}
                                                onChange={(e) => setpincode(e.target.value)}
                                            />

                                            <div className="error-msg"> {pincodeError}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>University Type<span className="req-star">*</span></label>
                                            <select className="form-control" name="city" required
                                                value={type}
                                                onChange={(e) => settype(e.target.value)}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                                <option value="Govt">Govt</option>
                                            </select>
                                            <span className="error-msg"> {typeError}</span>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Description<span className="req-star">*</span></label>
                                            <textarea
                                                value={description}
                                                onChange={(e) => setdescription(e.target.value)}
                                                className="form-control" row="2" col="3"></textarea>
                                            <span className="error-msg"> {descriptionError}</span>
                                            <span className="error-msg"> {DescriptionLengthError}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Website<span className="req-star">*</span></label>
                                            <input type="text" className="form-control" placeholder="https://www.sunderland.ac.uk/" name="website" required

                                                value={website}
                                                onChange={(e) => setwebsite(e.target.value)}
                                            />
                                            <span className="error-msg"> {websiteStartError}</span>
                                            <span className="error-msg"> {websiteEndError}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Phone Number<span className="req-star">*</span></label>
                                            <PhoneInput     defaultCountry={"IN"}
                                                placeholder="Enter Phone Number"
                                                required
                                                value={phone}
                                                onChange={setphone} />
                                            <span className="error-msg"> {phoneError}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label>Parent organization</label>
                                            <input type="text" className="form-control" placeholder="Parent organization" name="pr-org"

                                                value={organization || ""}
                                                onChange={(e) => setorganization(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-md-6"></div>
                                        <div className="col-md-6 text-right">
                                            <button type="submit" className="btn btn-secondary" title="Save"

                                                data-toggle="tooltip" data-placement="right" >Save
                                            </button>
                                            <button data-bs-toggle="collapse" href="#collapseTwo" type="submit"
                                                className="btn btn-success" title="Save &
                                                Next"  data-toggle="tooltip" data-placement="right" >Save &
                                                Next</button>
                                        </div>
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


import React, { useState, useEffect } from "react";
import axios from 'axios';
import PhoneInput from 'react-phone-number-input'
import Loader from '../../components/Loader';
import 'react-phone-number-input/style.css'
import RecruitmentTopbar from '../../components/RecruitmentTopbar';
import RecruitmentSidebar from '../../components/RecruitmentSidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash, faPen, faEye, faUserSlash, faCloudDownload, faCheckCircle, faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Dropzone from "react-dropzone";
function AddStudent(props) {
    const [show10, setshow10] = useState("");
    //start showing error
    const [addresscountryError, setaddresscountryError] = useState("");
    const [countryOfBirthError, setcountryOfBirthError] = useState("");
    const [maritalStatusError, setmaritalStatusError] = useState("");
    const [firstNameError, setfirstNameError] = useState("");
    const [emailError, setemailError] = useState("");
    const [dateOfBirthError, setdateOfBirthError] = useState("");
    const [passportNoError, setpassportNoError] = useState("");
    const [refusedVisaError, setrefusedVisaError] = useState("");
    const [addressError, setaddressError] = useState("");
    const [zipcodeError, setzipcodeError] = useState("");
    const [highestEducationError, sethighestEducationError] = useState("");
    const [passingYearError, setpassingYearError] = useState("");
    const [gradePercentageError, setgradePercentageError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [Checkmycountrybirth, setCheckmycountrybirth] = useState("0");
    const [genderError, setgenderError] = useState("");
    //end showing error

    const [show12, setshow12] = useState("");
    const [showugDegree, setshowugDegree] = useState("");
    const [showother, setshowother] = useState("");
    const [showRecommendation, setshowRecommendation] = useState("");
    const [showEnglish, setshowEnglish] = useState("");
    const [showExperience, setshowExperience] = useState("");
    const [showPgDegree, setshowPgDegree] = useState("");





    const [showPassport, setshowPassport] = useState("");

    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [StudentId, setStudentId] = useState();
    const [loader, setmyloader] = useState("false");
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [mounted, setMounted] = useState();
    const [firstName, setfirstName] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [countryOfBirth, setcountryOfBirth] = useState("Select Birth Country");
    const [passportNo, setpassportNo] = useState("");
    const [gender, setgender] = useState("");
    const [maritalStatus, setmaritalStatus] = useState("");
    const [refusedVisa, setrefusedVisa] = useState("");
    const [refusedVisaReason, setrefusedVisaReason] = useState("");
    const [Checkmycountry, setCheckmycountry] = useState("0")
    const [tenacceptedFiles, settenacceptedFiles] = useState("0")
    const [universityName, setuniversityName] = useState("")
    const [universityID, setuniversityID] = useState("")
    const [countryName, setcountryName] = useState("")
    const [courseID, setcourseID] = useState("")
    const [intakeMonth, setintakeMonth] = useState("")
    const [intakeValues, setintakeValues] = useState([])
    const [universityImageValues, setuniversityImageValues] = useState([{
        logo: "", coverPic: ""
    }])
    const [courseFull, setcourseFull] = useState("")
    const [completeuniValue, setcompleteuniValue] = useState("")
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [zipcode, setzipcode] = useState("");
    //start for validation

    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");

    //end for validation
    const [UniveristyValues, setUniveristyValues] = useState([{
        universityPrimaryInformation: "", universityOverview: "", universityImage: "", _id: "",
    }])
    const [coursevalues, setcoursevalues] = useState([{
        courseName: "", _id: "", month: [{}]
    }])
    const [phone, setphone] = useState("");
    const [email, setemail] = useState("");
    const [highestEducation, sethighestEducation] = useState("");
    const [gradePercentage, setgradePercentage] = useState("");
    const [passingYear, setpassingYear] = useState("");
    const [examType, setexamType] = useState("");
    const [examinationDate, setexaminationDate] = useState("");
    const [overall, setoverall] = useState("");
    const [listening, setlistening] = useState("");
    const [reading, setreading] = useState("");
    const [writing, setwriting] = useState("");
    const [speaking, setspeaking] = useState("");
    const [CheckState, setCheckState] = useState("0");
    const [CheckCity, setCheckCity] = useState("0");

    const [countries, setcountries] = useState([{
        country_name: ""
    }]);
    const [states, setstates] = useState([{
        state_name: ""
    }])
    const [cities, setcities] = useState([{
        city_name: ""
    }])
    const [passportacceptedFiles, setpassportacceptedFiles] = useState("");
    const [twelveacceptedFiles, settwelveacceptedFiles] = useState("");
    const [otheracceptedFiles, setotheracceptedFiles] = useState("");
    const [recommendationacceptedFiles, setrecommendationacceptedFiles] = useState("");
    const [experienceacceptedFiles, setexperienceacceptedFiles] = useState("");
    const [englishacceptedFiles, setenglishacceptedFiles] = useState("");
    const [ugDegreeacceptedFiles, setugDegreeacceptedFiles] = useState("");
    const [pgDegreeacceptedFiles, setpgDegreeacceptedFiles] = useState("");
    useEffect(() => {
        var agentId = localStorage.getItem('agentId');
        var mounted = localStorage.getItem('agentToken');
        setMounted(mounted)
        if (agentId !== null) {
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
    function handlegender(value) {
        setgenderError("")
        setgender(value)
    }
    function handlemaritalStatus(value) {
        setmaritalStatusError("")
        setmaritalStatus(value)
    }
    function handlecountryOfBirth(e) {
        setcountryOfBirthError("")
        setcountryOfBirth(e)


    }
    function setapplicationCountry(value) {
        setcountryName(value)
        const url1 = process.env.REACT_APP_SERVER_URL + 'universityCountry/' + value;
        fetch(url1, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data1 => {
                var myresultsUniversity = data1.universities;
                setUniveristyValues(data1.universities)
                if (Object.keys(myresultsUniversity).length > 3) {
                    var universityLength = 3
                }
                else {
                    var universityLength = Object.keys(myresultsUniversity).length
                }
            })
    }
    function handleUniversityName(value) {
        setcompleteuniValue(value)
        var splitValue = value.split("$$")
        var universityID = splitValue[0]
        setuniversityID(universityID)
        setuniversityName(splitValue[1])
        const url1 = process.env.REACT_APP_SERVER_URL + 'universityCourse/' + universityID
        fetch(url1, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setcoursevalues(data.universities.universityCourses)
            })
    }
    function handleIntake(value) {
        setintakeMonth(value)
    }
    function agentAddStudent(event) {


        event.preventDefault();



        setcountryOfBirthError("")
        setphoneError("");
        setgenderError("")
        setaddresscountryError("")
        setstateError("")
        setcityError("")
        setgenderError("")
        setmaritalStatusError("")
        if (firstName === "") {
            setfirstNameError("Please Enter Name")
        }
        if (email === "") {
            setemailError("Please Enter Email")
        }
        if (phone === "") {

            setphoneError("Please enter phone number");
        }
        if (isValidPhoneNumber(phone) === false) {

            setphoneError("Please enter correct phone number");
        }
        if (dateOfBirth === "") {
            setdateOfBirthError("Please Enter Date Of Birth")
        }
        if (countryOfBirth === "" || countryOfBirth === "Select Birth Country") {
            setcountryOfBirthError("Please select Birth country")
        }

        if (gender === "") {
            setgenderError("Please choose gender")

        }
        if (maritalStatus === "") {
            setmaritalStatusError("Please choose marital Status")

        }
        if (country === "" || country === "Select Country") {
            setaddresscountryError("Please select country")
        }
        if (state === "" || state === "Select State") {
            setstateError("Please select state")
        }
        if (city === "" || city === "Select City") {
            setcityError("Please select city")
        }
        if (address === "") {
            setaddressError("Please Enter Address")
        }
        if (zipcode === "") {
            setzipcodeError("Please Enter Zip Code")
        }
        if (highestEducation === "") {
            sethighestEducationError("Please Enter Highest Education")
        }
        if (passingYear === "") {
            setpassingYearError("Please Enter Passing Year")
        }
        if (gradePercentage === "") {
            setgradePercentageError("Please Enter Percentage")
        }
        if (firstName !== ""
            && email !== "" && phone !== "" && isValidPhoneNumber(phone) === true &&
            dateOfBirthError !== "" && countryOfBirth !== "" && gender !== "" && maritalStatus !== "" && country !== "" &&
            country !== "Select Country" && state !== "" && state !== "Select State" && city !== "" && city !== "Select City"
            && address !== "" && zipcode !== "" && highestEducation !== "" && passingYear !== "" && gradePercentage !== ""
        ) {


            setmyloader("true")
            const obj1 = new FormData();
            obj1.append("name", firstName);
            obj1.append("phone", phone);
            obj1.append("email", email);
            const obj2 = new FormData();
            obj2.append("firstName", firstName);
            obj2.append("dateOfBirth", dateOfBirth);
            obj2.append("countryOfBirth", countryOfBirth);
            obj2.append("passportNo", passportNo);
            obj2.append("gender", gender);
            obj2.append("maritalStatus", maritalStatus);
            obj2.append("refusedVisa", refusedVisa);
            obj2.append("refusedVisaReason", refusedVisaReason);
            const obj3 = new FormData();
            obj3.append("address", address);
            obj3.append("country", country);
            obj3.append("state", state);
            obj3.append("city", city);
            obj3.append("zipcode", zipcode);
            const obj4 = new FormData();
            obj4.append("highestEducation", highestEducation);
            obj4.append("gradePercentage", gradePercentage);
            obj4.append("passingYear", passingYear);
            const obj5 = new FormData();
            obj5.append("examType", examType);
            obj5.append("examinationDate", examinationDate);
            obj5.append("overall", overall);
            obj5.append("listening", listening);
            obj5.append("reading", reading);
            obj5.append("writing", writing);
            obj5.append("speaking", speaking);

            const url = process.env.REACT_APP_SERVER_URL + 'agent/students/register';
            fetch(url, {
                method: 'post',
                headers: { 'Authorization': mounted },
                body: obj1
            })
                .then(response => response.json())
                .then(data => {

                    setStudentId(data.id)
                    var student_id = data.id;
                    if (student_id !== undefined) {
                        const url2 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/personalInformation';
                        fetch(url2, {
                            method: 'put',
                            headers: { 'Authorization': mounted },
                            body: obj2
                        })
                            .then(response => response.json())
                            .then(data => {
                            })
                        const url3 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/address';
                        fetch(url3, {
                            method: 'put',
                            headers: { 'Authorization': mounted },
                            body: obj3
                        })
                            .then(response => response.json())
                            .then(data => {
                            })
                        const url4 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educations';
                        fetch(url4, {
                            method: 'post',
                            headers: { 'Authorization': mounted },
                            body: obj4
                        })
                            .then(response => response.json())
                            .then(data => {
                            })
                        const url5 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/score';
                        fetch(url5, {
                            method: 'put',
                            headers: { 'Authorization': mounted },
                            body: obj5
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                                setsuccessMessage("Student Add Successfully")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                            })
                        if (countryName !== "" && universityID !== "" && universityName !== "" && courseID !== "" && intakeMonth !== "") {
                            const obj50 = new FormData();
                            obj50.append("country", countryName);
                            obj50.append("universityID", universityID);
                            obj50.append("universityName", universityName);
                            obj50.append("courseID", courseID);
                            obj50.append("session", intakeMonth);
                            obj50.append("applicationProgress", "first");
                            const url50 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/orders';
                            fetch(url50, {
                                method: 'post',
                                headers: { 'Authorization': mounted },
                                body: obj50
                            })
                                .then(response => response.json())
                                .then(data => {
                                })
                        }
                        const obj6 = new FormData();
                        obj6.append("passport", passportacceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/identityDocument', {
                            method: 'put',
                            body: obj6,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                        const obj7 = new FormData();
                        obj7.append("marksheet10", tenacceptedFiles);
                        obj7.append("marksheet12", twelveacceptedFiles);
                        obj7.append("ugDegree", ugDegreeacceptedFiles);
                        obj7.append("pgDegree", pgDegreeacceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
                            method: 'put',
                            body: obj7,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                        const obj10 = new FormData();
                        obj10.append("document", experienceacceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/experienceDocument', {
                            method: 'put',
                            body: obj10,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                        const obj11 = new FormData();
                        obj11.append("file", englishacceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/englishProficiencyDocument', {
                            method: 'put',
                            body: obj11,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                        const obj9 = new FormData();
                        obj9.append("document", recommendationacceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/recommendationDocument', {
                            method: 'put',
                            body: obj9,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                        const obj8 = new FormData();
                        obj8.append("file", otheracceptedFiles);
                        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/otherDocument', {
                            method: 'put',
                            body: obj8,
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                            })
                    }
                })


        }
    }
    function handlecountry(e) {
        setcountry(e)
        setaddresscountryError("")
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
        setstateError("")
        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    //start for add edit student
    function handlecity(e) {
        setcity(e)
        setcityError("")
    }
    //start for add edit student
    function handleuniversityCourse(value) {
        var splitValue = value.split("$$")
        var courseIntake = splitValue[0]
        setcourseID(splitValue[2])
        var splitIntake = courseIntake.split(",")
        setintakeValues(splitIntake)
        setcourseFull(value)
    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <RecruitmentSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <RecruitmentTopbar />
                        <div className="container">
                            {loader === "true" ?
                                <Loader />
                                : null}
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Add Student</h1>
                            </div>
                            <form onSubmit={agentAddStudent}>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-7">
                                        <div className="card shadow mb-4">
                                            <div className="top-bar">
                                                <ul>
                                                    <li className="f-done"><a href="#gen-info" className="active" title="General Information"><span><FontAwesomeIcon icon={faCheckCircle} /></span>General Information</a></li>
                                                    <li><a href="#edu" title="Education"><span><FontAwesomeIcon icon={faCheckCircle} /></span>Education</a></li>
                                                    <li><a href="#testscore" title="Test Scores"><span><FontAwesomeIcon icon={faCheckCircle} /></span>Test Scores</a></li>

                                                    <li><a href="#ap-pro" title="Application"><span><FontAwesomeIcon icon={faCheckCircle} /></span>Application</a></li>
                                                    <li><a href="#doc-block" title="Upload Documents"><span><FontAwesomeIcon icon={faCheckCircle} /></span>Upload Documents</a></li>
                                                </ul>
                                            </div>
                                            <div className="card shadow mb-4">
                                                <div id="accordion">
                                                    <div className="add-studdent">
                                                        <div className="card-body">
                                                            <div className="gernal-info" id="gen-info">
                                                                <h4>
                                                                    General Information
                                                                </h4>
                                                                <div className="row mt-5">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Student Name<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={firstName}
                                                                                onChange={(e) => {
                                                                                    setfirstName(e.target.value);
                                                                                    setfirstNameError("")
                                                                                }}
                                                                                placeholder="Enter Name"
                                                                                type="text" name="st-name" className="form-control" />
                                                                        </div>
                                                                        <span className="error-msg">{firstNameError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Email<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={email}
                                                                                onChange={(e) => {
                                                                                    setemail(e.target.value);
                                                                                    setemailError("")
                                                                                }}
                                                                                placeholder="Enter Email"
                                                                                type="email" className="form-control" name="email" />
                                                                        </div>
                                                                        <span className="error-msg">{emailError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Phone No<span className="req-star">*</span></label>

                                                                            <PhoneInput defaultCountry={"IN"}
                                                                                placeholder="Enter Phone Number"

                                                                                value={phone}
                                                                                onChange={(e) => {

                                                                                    setphone(e)
                                                                                    setphoneError("")
                                                                                    // setphone()

                                                                                }}
                                                                            />
                                                                            <span className="error-msg"> {phoneError}</span>

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Date of Birth<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={dateOfBirth}
                                                                                onChange={(e) => {
                                                                                    setdateOfBirth(e.target.value)
                                                                                    setdateOfBirthError("")
                                                                                }}
                                                                                type="date" name="st-name" className="form-control" />
                                                                        </div>
                                                                        <span className="error-msg"> {dateOfBirthError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Country of Birth<span className="req-star">*</span></label>
                                                                            <select
                                                                                value={countryOfBirth}
                                                                                onChange={(e) => handlecountryOfBirth(e.target.value)}
                                                                                className="form-control" name="country" >
                                                                                {Checkmycountrybirth === "0" ? <option value={countryOfBirth}>{countryOfBirth}</option> : <option value="">Please select Country</option>}
                                                                                {countries.map((element, index) => {
                                                                                    return (
                                                                                        <option
                                                                                            value={element.country_name} key={index}>{element.country_name}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                            <span className="error-msg"> {countryOfBirthError}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Passport Number</label>
                                                                            <input
                                                                                value={passportNo}
                                                                                onChange={(e) => {
                                                                                    setpassportNoError("")
                                                                                    setpassportNo(e.target.value)
                                                                                }}
                                                                                placeholder="Enter Passport Number"
                                                                                type="text" className="form-control" name="passport-no" />
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Gender
                                                                                <span className="req-star">*</span></label>
                                                                            <div className="checkgrp">
                                                                                <label className=" ant-radio-wrapper ant-radio-wrapper-checked">
                                                                                    <span className="ant-radio ant-radio-checked">
                                                                                        <input
                                                                                            checked={gender === "male"}
                                                                                            onChange={(e) => handlegender("male")}
                                                                                            type="radio" name="gender" className="ant-radio-input" />
                                                                                        <span className="ant-radio-inner" /></span><span>Male</span></label>
                                                                                <label className="ant-radio-wrapper">
                                                                                    <span className="ant-radio">
                                                                                        <input
                                                                                            checked={gender === "female"}
                                                                                            onChange={(e) => handlegender("female")}
                                                                                            type="radio" name="gender" className="ant-radio-input" />
                                                                                        <span className="ant-radio-inner" /></span><span>Female</span></label>


                                                                            </div>
                                                                            <span className="error-msg"> {genderError}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">

                                                                            <label htmlFor="">Marital
                                                                                Status  <span className="req-star">*</span></label>
                                                                            <div className="checkgrp">
                                                                                <input
                                                                                    checked={maritalStatus === "married"}
                                                                                    onChange={(e) => handlemaritalStatus("married")}
                                                                                    type="radio" id="married" name="marital_status" />
                                                                                <label className="mr-1" htmlFor="married">Married</label>
                                                                                <input type="radio" id="unmarried" name="marital_status"
                                                                                    checked={maritalStatus === "unmarried"}
                                                                                    onChange={(e) => handlemaritalStatus("unmarried")}
                                                                                />
                                                                                <label className="mr-1" htmlFor="unmarried">Unmarried</label>
                                                                                <input type="radio" id="widowed" name="marital_status"
                                                                                    checked={maritalStatus === "widowed"}
                                                                                    onChange={(e) => handlemaritalStatus("widowed")}
                                                                                />
                                                                                <label htmlFor="widowed">Widowed</label>
                                                                            </div>
                                                                            <span className="error-msg"> {maritalStatusError}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4" >
                                                                        <div className="from-group"><label htmlFor="refusedVisa">Have
                                                                            you been refused a visa from Canada, the
                                                                            USA, the United Kingdom, New Zealand or
                                                                            Australia?</label><select
                                                                                value={refusedVisa || ""}
                                                                                onChange={(e) => setrefusedVisa(e.target.value)}
                                                                                className="form-control" id="refusedVisa" name="is_visa_refused">
                                                                                <option value="no">No</option>
                                                                                <option value="yes">Yes</option>
                                                                            </select></div>
                                                                        <span className="error-msg"> {refusedVisaError}</span>
                                                                    </div>
                                                                    <div className="col-md-4" />
                                                                    <div className="row mt-2">
                                                                        <div className="col-md-8">
                                                                            <div className="from-group">
                                                                                <label className="form-label">If you answered "yes" to any of the following question above, please Provide more details below</label>
                                                                                <input
                                                                                    value={refusedVisaReason}
                                                                                    onChange={(e) => setrefusedVisaReason(e.target.value)}
                                                                                    type="text" name="percent" className="form-control" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4" />
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <h4>Address </h4>

                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label htmlFor="Country" className="form-label">Country <span className="req-star">*</span>
                                                                            </label>
                                                                            <select
                                                                                value={country}
                                                                                onChange={(e) => handlecountry(e.target.value)}
                                                                                className="form-control" name="country" >
                                                                                {Checkmycountry === "0" ? <option value={country}>{country}</option> : <option value="">Please select Country</option>}
                                                                                {countries.map((element, index) => {
                                                                                    return (
                                                                                        <option
                                                                                            value={element.country_name} key={index}>{element.country_name}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                            <span className="error-msg"> {addresscountryError}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">State/Province <span className="req-star">*</span></label>
                                                                            <select className="form-control" name="state"
                                                                                onChange={(e) => handlestate(e.target.value)}

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
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">City/Town <span className="req-star">*</span></label>
                                                                            <select className="form-control" name="city"
                                                                                value={city}
                                                                                onChange={(e) => handlecity(e.target.value)}
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
                                                                        <div className="from-group">
                                                                            <label className="form-label">Address<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={address}
                                                                                onChange={(e) => {
                                                                                    setaddress(e.target.value)
                                                                                    setaddressError("")
                                                                                }}
                                                                                placeholder="Enter Address"
                                                                                type="text" className="form-control" name="address" />
                                                                        </div>
                                                                        <span className="error-msg"> {addressError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Postal/Zip Code<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={zipcode}
                                                                                onChange={(e) => {
                                                                                    setzipcode(e.target.value)
                                                                                    setzipcodeError("")
                                                                                }}
                                                                                placeholder="Enter Postal/Zip Code"

                                                                                type="number" className="form-control" name="passing" />
                                                                        </div>
                                                                        <span className="error-msg"> {zipcodeError}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="eduction" id="edu">
                                                                <h4>
                                                                    Education
                                                                </h4>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Qualification<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={highestEducation}
                                                                                onChange={(e) => {

                                                                                    sethighestEducation(e.target.value)
                                                                                    sethighestEducationError("")
                                                                                }}
                                                                                placeholder="Enter Qualification"
                                                                                type="text" name="quali" className="form-control" />
                                                                        </div>
                                                                        <span className="error-msg"> {highestEducationError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Passing Year<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={passingYear}
                                                                                onChange={(e) => {
                                                                                    setpassingYear(e.target.value)
                                                                                    setpassingYearError("")
                                                                                }}
                                                                                placeholder="Enter Passing Year"
                                                                                type="number" name="pas-year" className="form-control" />
                                                                        </div>
                                                                        <span className="error-msg"> {passingYearError}</span>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Percentage<span className="req-star">*</span></label>
                                                                            <input
                                                                                value={gradePercentage}
                                                                                onChange={(e) => {
                                                                                    setgradePercentage(e.target.value)
                                                                                    setgradePercentageError("")
                                                                                }}
                                                                                placeholder="Enter Percentage"
                                                                                type="number" name="percent" className="form-control" />
                                                                        </div>
                                                                        <span className="error-msg"> {gradePercentageError}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="test-score" id="testscore">
                                                                <h4>
                                                                    Test Score
                                                                </h4>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">English Exam Type</label>
                                                                            <select
                                                                                value={examType}
                                                                                onChange={(e) => setexamType(e.target.value)}
                                                                                className="form-select ">
                                                                                <option value="">Select English Exam</option>
                                                                                <option value="IELTS">IELTS</option>
                                                                                <option>PTE</option>
                                                                                <option>ViSA</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Examination Date</label>
                                                                            <input
                                                                                value={examinationDate}
                                                                                onChange={(e) => setexaminationDate(e.target.value)}
                                                                                type="date" name="exam-date" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Overall</label>
                                                                            <input
                                                                                value={overall}
                                                                                onChange={(e) => setoverall(e.target.value)}
                                                                                placeholder="Enter Overall"
                                                                                type="text" name="overall" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-3">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Listening</label>
                                                                            <input
                                                                                value={listening}
                                                                                onChange={(e) => setlistening(e.target.value)}
                                                                                placeholder="Enter Listening"
                                                                                type="text" name="listening" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Reading</label>
                                                                            <input
                                                                                value={reading}
                                                                                onChange={(e) => setreading(e.target.value)}
                                                                                placeholder="Enter Reading"
                                                                                type="text" name="Reading" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Writing</label>
                                                                            <input
                                                                                value={writing}
                                                                                onChange={(e) => setwriting(e.target.value)}
                                                                                placeholder="Enter Writing"
                                                                                type="text" name="Writing" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Speaking</label>
                                                                            <input
                                                                                value={speaking}
                                                                                onChange={(e) => setspeaking(e.target.value)}
                                                                                placeholder="Enter Speaking"

                                                                                type="text" name="Writing" className="form-control" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="application-process" id="ap-pro">
                                                                <h4>
                                                                    Apply For Any Application
                                                                </h4>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="form-group">
                                                                            <label>Country</label>
                                                                            <select
                                                                                value={countryName}
                                                                                onChange={(e) => setapplicationCountry(e.target.value)}
                                                                                className="form-control" name="country" >
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
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Universities</label>
                                                                            <select
                                                                                value={completeuniValue}
                                                                                onChange={(e) => handleUniversityName(e.target.value)}
                                                                                className="form-select ">
                                                                                {UniveristyValues.map((element, index) => (
                                                                                    <>
                                                                                        <option value={element._id + "$$" + element.universityPrimaryInformation.name}>{element.universityPrimaryInformation.name}</option>
                                                                                    </>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Courses</label>

                                                                            <select
                                                                                value={courseFull}
                                                                                onChange={(e) => handleuniversityCourse(e.target.value)}
                                                                                className="form-select ">
                                                                                {coursevalues.map((element, index) => (
                                                                                    <>
                                                                                        <option value={element.month + "$$" + element.courseName + "$$" + element._id}>{element.courseName}</option>
                                                                                    </>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Intake</label>
                                                                            <select
                                                                                value={intakeMonth}
                                                                                onChange={(e) => handleIntake(e.target.value)}
                                                                                className="form-select ">
                                                                                <option value="">Select Intake</option>
                                                                                {intakeValues.map((element, index) => (
                                                                                    <>
                                                                                        <option value={element}>{element}</option>
                                                                                    </>
                                                                                ))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card-body">
                                                            <div className="documents-block" id="doc-block">
                                                                <h4>
                                                                    Documents
                                                                </h4>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Passport Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setpassportacceptedFiles(acceptedFiles[0])
                                                                                setshowPassport(acceptedFiles[0].path)
                                                                                var fileName = acceptedFiles[0].path;
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showPassport}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">10th Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                settenacceptedFiles(acceptedFiles[0])
                                                                                setshow10(acceptedFiles[0].path)
                                                                                var fileName = acceptedFiles[0].path;
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {show10}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">12th Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                settwelveacceptedFiles(acceptedFiles[0])
                                                                                setshow12(acceptedFiles[0].path)
                                                                                var fileName = acceptedFiles[0].path;
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {show12}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">UG Degree Certificate </label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setugDegreeacceptedFiles(acceptedFiles[0])
                                                                                setshowugDegree(acceptedFiles[0].path)
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showugDegree}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">PG Degree Certificate </label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setpgDegreeacceptedFiles(acceptedFiles[0])
                                                                                setshowPgDegree(acceptedFiles[0].path)
                                                                                var fileName = acceptedFiles[0].path;
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showPgDegree}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Experience Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setexperienceacceptedFiles(acceptedFiles[0])
                                                                                setshowExperience(acceptedFiles[0].path)

                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)

                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showExperience}</span>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">IELTS Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setenglishacceptedFiles(acceptedFiles[0])
                                                                                setshowEnglish(acceptedFiles[0].path)

                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showEnglish}</span>
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Letter of recommendation Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {

                                                                                setrecommendationacceptedFiles(acceptedFiles[0])
                                                                                setshowRecommendation(acceptedFiles[0].path)
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showRecommendation}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                        <div className="from-group">
                                                                            <label className="form-label">Other Documents</label>
                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                setshowother(acceptedFiles[0].path)
                                                                                setotheracceptedFiles(acceptedFiles[0])
                                                                                setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                    preview: URL.createObjectURL(file)
                                                                                })));
                                                                            }} name="heroImage" multiple={false}>
                                                                                {({ getRootProps, getInputProps }) => (
                                                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                                                        <input {...getInputProps()} />
                                                                                        <div style={{ fontSize: ".8rem" }}>
                                                                                            Upload/Drag & Drop here
                                                                                        </div>
                                                                                    </div>
                                                                                )}
                                                                            </Dropzone>
                                                                            <span className="selected-certificate"> {showother}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-4">
                                                                    </div>
                                                                </div>
                                                                <div className="row mt-3">
                                                                    <div className="col-md-6">
                                                                    </div>
                                                                    <div className="col-md-6 text-right">
                                                                        <button type="submit" className="btn btn-success" title="Save">Save
                                                                        </button>
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
                            </form >
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AddStudent;
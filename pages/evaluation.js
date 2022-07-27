import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import { Modal, Button } from 'react-bootstrap';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faEye, faUser, faFile, faFileUpload, faUserTie,
    faCheck, faPaperPlane, faGraduationCap, faAngleRight

} from '@fortawesome/free-solid-svg-icons';


export default function About() {
    const [state, setState] = useState({
        name: '-500px',
    });
    const [showLoginSweetAlert, setshowLoginSweetAlert] = useState("0");
    const [showModal, setshowModal] = useState(false);
    const [countryFilter, setcountryFilter] = useState("inline");
    const [levelFilter, setlevelFilter] = useState("none");
    const [interestFilter, setinterestFilter] = useState("none");
    const [intakeFilter, setintakeFilter] = useState("none");
    const [englishFilter, setenglishFilter] = useState("none");
    const [flagAustralia, setflagAustralia] = useState("eval-count-flag");
    const [flagCanada, setflagCanada] = useState("eval-count-flag");
    const [flagCyprus, setflagCyprus] = useState("eval-count-flag");
    const [flagNewZealand, setflagNewZealand] = useState("eval-count-flag");
    const [flagUK, setflagUK] = useState("eval-count-flag");
    const [flagUSA, setflagUSA] = useState("eval-count-flag");
    const [flagGermany, setflagGermany] = useState("eval-count-flag");
    const [arrayCountry, setarrayCountry] = useState([]);
    const [arrayLevel, setarrayLevel] = useState("");
    const [flagManagement, setflagManagement] = useState("");
    const [flagEngineering, setflagEngineering] = useState("");
    const [flagComputers, setflagComputers] = useState("");
    const [flagDesign, setflagDesign] = useState("");
    const [flagFinance, setflagFinance] = useState("");
    const [flagLaw, setflagLaw] = useState("");
    const [flagHumanities, setflagHumanities] = useState("");
    const [flagSciences, setflagSciences] = useState("");
    const [flagMedicine, setflagMedicine] = useState("");
    const [flagPerforming, setflagPerforming] = useState("");
    const [flagMedia, setflagMedia] = useState("");
    const [flagHospitality, setflagHospitality] = useState("");
    const [flagMarketing, setflagMarketing] = useState("");
    const [flagSport, setflagSport] = useState("");
    const [flagArchitecture, setflagArchitecture] = useState("");

    const [flagMay1, setflagMay1] = useState("");
    const [flagSep1, setflagSep1] = useState("");
    const [flagJan2, setflagJan2] = useState("");
    const [flagMay2, setflagMay2] = useState("");
    const [flagSep2, setflagSep2] = useState("");
    const [flagJan3, setflagJan3] = useState("");
    const [flagMay3, setflagMay3] = useState("");
    const [flagSep3, setflagSep3] = useState("");

    const [flagIELTS, setflagIELTS] = useState("");
    const [flagPTE, setflagPTE] = useState("");
    const [flagTOEFL, setflagTOEFL] = useState("");


    const [arrayIntake, setarrayIntake] = useState([]);
    const [arrayEnglish, setarrayEnglish] = useState([]);



    const [levelactivepost, setlevelactivepost] = useState("");
    const [levelactivegraduate, setlevelactivegraduate] = useState("");
    const [arrayInterest, setarrayInterest] = useState([]);
    const [countStep, setcountStep] = useState(1);
    const [loader, setmyloader] = useState("false");

    // start for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState();
    const [wrongPassword, setwrongPassword] = useState("");
    const [wrongUsername, setwrongUsername] = useState("");
    // end for login


    useEffect(() => {

        window.scrollTo(0, 0)
        setcountStep(1)
    }, []);
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
            var myurl = process.env.REACT_APP_SERVER_URL;
            axios.post(myurl + 'student/login', obj)
                .then(result => {
                    let responseJson = result;
                    setmyloader("false")
                    if (responseJson.data.success === true) {

                        setshowModal(false)

                        localStorage.setItem('studentId', responseJson.data.student._id);
                        localStorage.setItem('studentToken', responseJson.data.token);
                        localStorage.setItem('studentName', responseJson.data.student.name);
                        localStorage.setItem('studentEmail', responseJson.data.student.email);
                        window.location.href = "/search-courses"
                        setshowLoginSweetAlert("1")
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
    function handleCountryClick(value) {
        if (value === "Australia") {
            if (flagAustralia === "eval-count-flag") {

                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagAustralia("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagAustralia("eval-count-flag")
            }
        }
        if (value === "Canada") {

            if (flagCanada === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagCanada("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagCanada("eval-count-flag")
            }
        }
        if (value === "Cyprus") {
            if (flagCyprus === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagCyprus("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagCyprus("eval-count-flag")
            }
        }
        if (value === "NewZealand") {
            if (flagNewZealand === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagNewZealand("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagNewZealand("eval-count-flag")
            }
        }
        if (value === "United Kingdom") {
            if (flagUK === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagUK("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagUK("eval-count-flag")
            }
        }
        if (value === "United States") {
            if (flagUSA === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagUSA("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagUSA("eval-count-flag")
            }
        }
        if (value === "Germany") {
            if (flagGermany === "eval-count-flag") {
                setarrayCountry((prevVals) =>
                    [...prevVals, value])
                setflagGermany("eval-count-flag select-count")
            }
            else {
                var filteredExamArray = arrayCountry.filter(e => e !== value)
                setarrayCountry(filteredExamArray)
                setflagGermany("eval-count-flag")
            }
        }


    }
    function handleLevelClick(value) {
        setarrayLevel(value)
        if (value === "Bachelors") {
            setlevelactivepost("")

            setlevelactivegraduate("filterlevelactive")
        }
        else {
            setlevelactivegraduate("")

            setlevelactivepost("filterlevelactive")
        }

    }
    function handleInterestClick(value) {
        if (value === "Management") {
            if (flagManagement === "") {

                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagManagement("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagManagement("")
            }
        }
        if (value === "Engineering") {
            if (flagEngineering === "") {

                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagEngineering("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagEngineering("")
            }
        }
        if (value === "Computers and Data Science") {
            if (flagComputers === "") {

                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagComputers("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagComputers("")
            }
        }
        if (value === "Design") {
            if (flagDesign === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagDesign("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagDesign("")
            }
        }
        if (value === "Finance and Banking") {
            if (flagFinance === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagFinance("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagFinance("")
            }
        }
        if (value === "Law") {
            if (flagLaw === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagLaw("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagLaw("")
            }
        }
        if (value === "Humanities and Social Sciences") {
            if (flagHumanities === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagHumanities("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagHumanities("")
            }
        }
        if (value === "Sciences") {
            if (flagSciences === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagSciences("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagSciences("")
            }
        }
        if (value === "Medicine and Pharma") {
            if (flagMedicine === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagMedicine("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagMedicine("")
            }
        }
        if (value === "Performing and Creative Arts") {
            if (flagPerforming === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagPerforming("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagPerforming("")
            }
        }
        if (value === "Media and Journalism") {
            if (flagMedia === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagMedia("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagMedia("")
            }
        }
        if (value === "Hospitality and Tourism") {
            if (flagHospitality === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagHospitality("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagHospitality("")
            }
        }
        if (value === "Marketing and Advertising") {
            if (flagMarketing === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagMarketing("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagMarketing("")
            }
        }
        if (value === "Sports and Nutrition") {
            if (flagSport === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagSport("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagSport("")
            }
        }
        if (value === "Architecture") {
            if (flagArchitecture === "") {
                setarrayInterest((prevVals) =>
                    [...prevVals, value])
                setflagArchitecture("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayInterest.filter(e => e !== value)
                setarrayInterest(filteredExamArray)
                setflagArchitecture("")
            }
        }
    }
    function handleIntakeClick(value, year) {

        if (value === "May - August" && year === "2022") {
            if (flagMay1 === "") {

                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagMay1("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagMay1("")
            }
        }

        if (value === "Sep - Dec" && year === "2022") {
            if (flagSep1 === "") {
                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagSep1("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagSep1("")
            }
        }
        //start for 2023
        if (value === "Jan - April" && year === "2023") {
            if (flagJan2 === "") {

                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagJan2("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagJan2("")
            }
        }
        if (value === "May - August" && year === "2023") {
            if (flagMay2 === "") {

                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagMay2("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagMay2("")
            }
        }

        if (value === "Sep - Dec" && year === "2023") {
            if (flagSep2 === "") {
                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagSep2("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagSep2("")
            }
        }
        //end for 2023
        //start for 2024
        if (value === "Jan - April" && year === "2024") {
            if (flagJan3 === "") {

                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagJan3("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagJan3("")
            }
        }
        if (value === "May - August" && year === "2024") {
            if (flagMay3 === "") {

                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagMay3("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagMay3("")
            }
        }

        if (value === "Sep - Dec" && year === "2024") {
            if (flagSep3 === "") {
                setarrayIntake((prevVals) =>
                    [...prevVals, value])
                setflagSep3("filterlevelactive")
            }
            else {
                var filteredExamArray = arrayIntake.filter(e => e !== value)
                setarrayIntake(filteredExamArray)
                setflagSep3("")
            }
        }
        //end for 2024
    }
    function handleEnglishClick(value) {
        setarrayEnglish(value)
        if (value === "IELTS") {
            setflagIELTS("filterlevelactive")
            setflagPTE("")
            setflagTOEFL("")
        }
        else if (value === "PTE") {
            setflagIELTS("")
            setflagPTE("filterlevelactive")
            setflagTOEFL("")
        }
        else {
            setflagIELTS("")
            setflagPTE("")
            setflagTOEFL("filterlevelactive")
        }


    }
    function submitCountry() {
        setcountStep(2);
        localStorage.setItem("mycountry", JSON.stringify(arrayCountry));
        setlevelFilter("inline")
        setcountryFilter("none")
    }
    function backLevel() {
        setcountStep(1);
        setlevelFilter("none")
        setcountryFilter("inline")
    }
    function submitLevel() {
        setcountStep(3);
        localStorage.setItem("mycourse", arrayLevel);
        setinterestFilter("inline")
        setlevelFilter("none")
    }
    function backInterest() {
        setcountStep(2);
        setinterestFilter("none")
        setlevelFilter("inline")
    }
    function submitInterest() {
        setcountStep(4);
        localStorage.setItem("myinterest", JSON.stringify(arrayInterest));
        setintakeFilter("inline")
        setinterestFilter("none")
    }
    function backIntake() {
        setcountStep(3);
        setinterestFilter("inline")
        setintakeFilter("none")
    }
    function submitIntake() {
        setcountStep(5);
        setenglishFilter("inline")
        setintakeFilter("none")
        const resultArrIntake = arrayIntake.filter((data, index) => {
            return arrayIntake.indexOf(data) === index;
        })
        localStorage.setItem("myintake", JSON.stringify(arrayIntake));

    }
    function backEnglish() {
        setcountStep(4);
        setintakeFilter("inline")
        setenglishFilter("none")
    }
    function submitEnglish() {

        localStorage.setItem("myenglish", arrayEnglish);
        if (localStorage.getItem("studentId")) {
            window.location.href = "/search-courses"
        }
        else {
            setshowModal(true)
        }
    }
    return (
        <div>
        <Head>
        <title>Free Study Abroad Profile Evaluation by CourseMentor™</title>
        <meta name="description" content="CourseMentor™ - Study Abroad - Best University and colleges Course Finder to study in foreign. Apply for upcoming intakes now!" />
        <meta property="og:title" content="Free Study Abroad Profile Evaluation by CourseMentor™" />
        <meta property="og:description" content="CourseMentor™ - Study Abroad - Best University and colleges Course Finder to study in foreign. Apply for upcoming intakes now!" />
        <meta property="og:image" content="og image" />
       
      </Head>
        <div className="main-content">
            
            <div className="full-width-header">
                <Header  {...state} />

            </div>
            <div onClick={() => handleClick()}>
                <div className="main-title-evaluation evaluation-main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <ul className="breadcrumb">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#"><span><i className="fas fa-chevron-right" aria-hidden="true" /></span>Evaluation</a>
                                    </li>
                                </ul>
                                <h2>Evaluation</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-block1-evaluation">
                    <div className="evaluation-form">
                        <div className="evaluation-form-wrapper container-fluid">
                            <div className="evaluation-progress-steps">
                                <ul id="progressbar">

                                    <li id="step1" className="evaluation-progress active">
                                        <div className="eval-pro-name">
                                            <div className="eval-pro-number">1</div>
                                            <div className="eval-pro-step-name">Country</div>
                                        </div>
                                        <div className="eval-pro-step" />
                                    </li>
                                    {countStep >= 2 ?
                                        <li id="step2" className="evaluation_progress  active">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">2</div>
                                                <div className="eval-pro-step-name">Course Level</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>
                                        :
                                        <li id="step2" className="evaluation_progress  ">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">2</div>
                                                <div className="eval-pro-step-name">Course Level</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>
                                    }
                                    {countStep >= 3 ?
                                        <li id="step3" className="evaluation_progress active">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">3</div>
                                                <div className="eval-pro-step-name">Area of Interest</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>
                                        : <li id="step3" className="evaluation_progress ">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">3</div>
                                                <div className="eval-pro-step-name">Area of Interest</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>}
                                    {countStep >= 4 ?
                                        <li id="step5" className="evaluation_progress active">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">4</div>
                                                <div className="eval-pro-step-name">Intake</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li> :
                                        <li id="step5" className="evaluation_progress ">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">4</div>
                                                <div className="eval-pro-step-name">Intake</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>
                                    }
                                    {countStep >= 5 ?
                                        <li id="step6" className="evaluation_progress active">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">5</div>
                                                <div className="eval-pro-step-name">Exam</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>
                                        : <li id="step6" className="evaluation_progress ">
                                            <div className="eval-pro-name">
                                                <div className="eval-pro-number">5</div>
                                                <div className="eval-pro-step-name">Exam</div>
                                            </div>
                                            <div className="eval-pro-step" />
                                        </li>}


                                </ul>
                            </div>
                            <div className="evaluation-form-content ">
                                {/*first-tab-*/}
                                <fieldset>
                                    <div className="eval-flag-tab" style={{ display: countryFilter }}>
                                        <div className="evaluation-form-container" >
                                            <div className="eval-country-title countryFilter"  >
                                                What is Your Preferred Country for Admission?
                                            </div>
                                            <div className="eval-count-list">
                                                <ul>
                                                    <li>
                                                        <div className={flagUSA} onClick={() => handleCountryClick("United States")}><img className="evaluation-img" src=
                                                            "/images/us-flag.jpg"
                                                        />
                                                            <div className="country-name">United States</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={flagUK} onClick={() => handleCountryClick("United Kingdom")}><img className="evaluation-img" src=
                                                            "/images/uk-flag.jpg"
                                                        />
                                                            <div className="country-name">United Kingdom</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={flagAustralia} onClick={() => handleCountryClick("Australia")}><img className="evaluation-img" src=
                                                            "/images/au-flag.jpg"
                                                        />
                                                            <div className="country-name">Australia</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={flagNewZealand} onClick={() => handleCountryClick("NewZealand")}><img className="evaluation-img" src=
                                                            "/images/new-zea-flag.jpg"
                                                        />
                                                            <div className="country-name">New Zealand</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={flagCanada} onClick={() => handleCountryClick("Canada")}><img className="evaluation-img" src=
                                                            "/images/ca-flag.jpg"
                                                        />
                                                            <div className="country-name">Canada</div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={flagGermany} onClick={() => handleCountryClick("Germany")}><img className="evaluation-img" src=
                                                            "/images/ire-flag.jpg"
                                                        />
                                                            <div className="country-name">Germany</div>
                                                        </div>
                                                    </li>

                                         

                                                </ul>
                                            </div>
                                        </div>
                                        {arrayCountry.length !== 0 ?
                                            <div className="text-center mt-5">
                                                <a className="btn website-btn-evaluation next action-button"
                                                    onClick={() => submitCountry()}
                                                >Next</a>
                                            </div>
                                            : null}

                                    </div>
                                </fieldset>
                                {/*second-tab-*/}
                                <fieldset>
                                    <div className="coures-level-tab levelFilter" style={{ display: levelFilter }}>
                                        <div className="evaluation-form-container">
                                            <div className="eval-country-title">
                                                What Course Level are You Targeting?
                                            </div>
                                            <div className="course-level-evaluation">
                                                <ul>
                                                    <li className={levelactivepost} onClick={() => handleLevelClick("Masters")}><span><i className="fa fa-graduation-cap" /></span>Postgraduate</li>
                                                    <li className={levelactivegraduate} onClick={() => handleLevelClick("Bachelors")}><span><i className="fa fa-graduation-cap" /></span>Undergraduate</li>
                                                </ul>
                                            </div>
                                        </div>
                                        {arrayLevel !== "" ? <div className="text-center mt-5">
                                            <a className="btn btn-back-evaluation" onClick={() => backLevel()}>Back</a>
                                            <a className="btn website-btn-evaluation next action-button"
                                                onClick={() => submitLevel()}
                                            >Next</a>
                                        </div>
                                            :
                                            null}

                                    </div>
                                </fieldset>
                                {/*-3rd-tab-*/}
                                <fieldset>
                                    <div className="coures-level-tab interestFilter" style={{ display: interestFilter }}>
                                        <div className="evaluation-form-container">
                                            <div className="eval-country-title">
                                                Which Field Do You Wish to Study?
                                            </div>
                                            <div className="study-list-evaluation">
                                                <ul>
                                                    <li className={flagManagement} onClick={() => handleInterestClick("Management")}>
                                                        <span><i className="fa fa-desktop" /></span>
                                                        Management
                                                    </li>
                                                    <li className={flagEngineering} onClick={() => handleInterestClick("Engineering")}>
                                                        <span><i className="fa fa-briefcase" /></span>
                                                        Engineering
                                                    </li>
                                                    <li className={flagComputers} onClick={() => handleInterestClick("Computers and Data Science")}>
                                                        <span><i className="fa fa-stethoscope" /></span>
                                                        Computers and Data Science
                                                    </li>
                                                    <li className={flagDesign} onClick={() => handleInterestClick("Design")}>
                                                        <span><i className="fa fa-magnet" /></span>
                                                        Design
                                                    </li>
                                                    <li className={flagFinance} onClick={() => handleInterestClick("Finance and Banking")}>
                                                        <span><i className="fa fa-user" /></span>
                                                        Finance and Banking
                                                    </li>
                                                    <li className={flagLaw} onClick={() => handleInterestClick("Law")}>
                                                        <span><i className="fa fa-paint-brush" /></span>
                                                        Law
                                                    </li>
                                                    <li className={flagHumanities} onClick={() => handleInterestClick("Humanities and Social Sciences")}>
                                                        <span><i className="fa fa-gavel" /></span>
                                                        Humanities and Social Sciences
                                                    </li>
                                                    <li className={flagSciences} onClick={() => handleInterestClick("Sciences")}>
                                                        <span><i className="fa fa-chart-line" /></span>
                                                        Sciences
                                                    </li>
                                                    <li className={flagMedicine} onClick={() => handleInterestClick("Medicine and Pharma")}>
                                                        <span><i className="fa fa-hospital" /></span>
                                                        Medicine and Pharma
                                                    </li>
                                                    <li className={flagPerforming} onClick={() => handleInterestClick("Performing and Creative Arts")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Performing and Creative Arts
                                                    </li>
                                                    <li className={flagMedia} onClick={() => handleInterestClick("Media and Journalism")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Media and Journalism
                                                    </li>
                                                    <li className={flagHospitality} onClick={() => handleInterestClick("Hospitality and Tourism")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Hospitality and Tourism
                                                    </li>
                                                    <li className={flagMarketing} onClick={() => handleInterestClick("Marketing and Advertising")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Marketing and Advertising
                                                    </li>

                                                    <li className={flagSport} onClick={() => handleInterestClick("Sports and Nutrition")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Sports and Nutrition
                                                    </li>
                                                    <li className={flagArchitecture} onClick={() => handleInterestClick("Architecture")}>
                                                        <span><i className="fa fa-sitemap" /></span>
                                                        Architecture
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {arrayInterest.length !== 0 ? <div className="text-center mt-5">
                                            <a className="btn btn-back-evaluation" onClick={() => backInterest()}>Back</a>
                                            <a className="btn website-btn-evaluation next action-button"
                                                onClick={() => submitInterest()}
                                            >Next</a>
                                        </div>
                                            : null}

                                    </div>
                                </fieldset>
                                <fieldset>
                                    {/*-4th-tab-*/}

                                </fieldset>
                                <fieldset>
                                    {/*-5th-tab-*/}
                                    <div className="Intake-tab" style={{ display: intakeFilter }}>
                                        <div className="evaluation-form-container">
                                            <div className="eval-country-title intakeFilter">
                                                When Would You Like to Start Your Program?
                                            </div>
                                            <div className="intake-list-evaluation">
                                                <ul>
                                                    <li>
                                                        <div className="intake-box-evaluation">
                                                            <h5 className="evaluation-h5">2022</h5>
                                                            <div className="intake-timeline">
                                                                <div className={"intake-month-evaluation " + flagMay1} onClick={() => handleIntakeClick("May - August", "2022")}>
                                                                    May-Aug
                                                                </div>
                                                                <div className={"intake-month-evaluation " + flagSep1} onClick={() => handleIntakeClick("Sep - Dec", "2022")}>
                                                                    Sep-Dec
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="intake-box-evaluation">
                                                            <h5 className="evaluation-h5">2023</h5>
                                                            <div className="intake-timeline">
                                                                <div className={"intake-month-evaluation " + flagJan2} onClick={() => handleIntakeClick("Jan - April", "2023")}>
                                                                    Jan-Apr
                                                                </div>
                                                                <div className={"intake-month-evaluation " + flagMay2} onClick={() => handleIntakeClick("May - August", "2023")}>
                                                                    May-Aug
                                                                </div>
                                                            </div>
                                                            <div className="intake-timeline">
                                                                <div className={"intake-month-evaluation " + flagSep2} onClick={() => handleIntakeClick("Sep - Dec", "2023")}>
                                                                    Sep-Dec
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className="intake-box-evaluation">
                                                            <h5 className="evaluation-h5">2024</h5>
                                                            <div className="intake-timeline">
                                                                <div className={"intake-month-evaluation " + flagJan3} onClick={() => handleIntakeClick("Jan - April", "2024")}>
                                                                    Jan-Apr
                                                                </div>
                                                                <div className={"intake-month-evaluation " + flagMay3} onClick={() => handleIntakeClick("May - August", "2024")}>
                                                                    May-Aug
                                                                </div>
                                                            </div>
                                                            <div className="intake-timeline">
                                                                <div className={"intake-month-evaluation " + flagSep3} onClick={() => handleIntakeClick("Sep - Dec", "2024")}>
                                                                    Sep-Dec
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        {arrayIntake.length !== 0 ?
                                            <div className="text-center mt-5">
                                                <a className="btn btn-back-evaluation" onClick={() => backIntake()}>Back</a>
                                                <a className="btn website-btn-evaluation next action-button" onClick={() => submitIntake()}>Next</a>
                                            </div>
                                            : null}
                                    </div>
                                </fieldset>
                                {/*-6th---tab*/}
                                <fieldset>
                                    <div className="coures-level-tab englishFilter" style={{ display: englishFilter }}>
                                        <div className="evaluation-form-container">
                                            <div className="eval-country-title">
                                                Which English Proficiency Exam Have You Taken/Do You Plan to Take?
                                            </div>
                                            <div className="study-list-evaluation">
                                                <ul>
                                                    <li className={flagIELTS} onClick={() => handleEnglishClick("IELTS")}
                                                    >
                                                        IELTS
                                                    </li>
                                                    <li className={flagPTE} onClick={() => handleEnglishClick("PTE")}>
                                                        PTE
                                                    </li>
                                                    <li className={flagTOEFL} onClick={() => handleEnglishClick("TOEFL")}>
                                                        TOEFL
                                                    </li>
                                                </ul>
                                 
                                            </div>
                                        </div>
                                        {arrayEnglish.length !== 0 ?
                                            <div className="text-center mt-5">
                                                <a className="btn btn-back-evaluation" onClick={() => backEnglish()}>Back</a>
                                                <button className="btn website-btn-evaluation next action-button"
                                                    onClick={() => submitEnglish()}
                                                >Next</button>
                                            </div>
                                            : null
                                        }
                                    </div>
                                </fieldset>
                                {/*-7th---tab*/}
                                <fieldset>

                                </fieldset>
                                {/*-8th-*/}
                                <fieldset>

                                </fieldset>
                                {/*9th-*/}
                                <fieldset>

                                </fieldset>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Video Section End */}

            <Footer />
            <Modal className="modal-container"
                show={showModal}
                onHide={() => close()}

                animation={true}
                bsSize="small">

                <Modal.Header closeButton>
                    <Modal.Title>Student Login Form</Modal.Title>
                </Modal.Header>


                <div className="from-start" >
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Email </label>
                            <input type="email" className="form-control-evaluation " id="email"
                                placeholder="Enter email" name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <div className="error-msg"> {wrongUsername}</div>


                        </div>
                        <span className="error-msg">{emailError}</span>
                        <div className="mb-3 mt-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control-evaluation " id="uname"
                                placeholder="Password" name="name"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="error-msg"> {wrongPassword}</div>
                        </div>
                        <span className="error-msg"> {passwordError}</span>
                        <button type="submit" className="btn btn-website">Login</button>
                    </form>

                    <a onClick={() => open()} >     Forgot your Password?</a>

                    <p>Don't have an account? Click here to
                        <Link href={'/studentregister'} className="" >
                            Register</Link></p>

                </div>



            </Modal>
        </div>
        </div>

    );
}


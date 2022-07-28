import React, { useState, useEffect } from "react";
import StudentLayout from '../../components/StudentLayout';
import { isValidPhoneNumber } from 'react-phone-number-input'
import Link from 'next/link'
import { Modal, Button } from 'react-bootstrap';
import StudentTopbar from '../../components/StudentTopbar';
import StudentSidebar from '../../components/StudentSidebar';
import PhoneInput from 'react-phone-number-input'
import Dropzone from "react-dropzone";
import useRazorpay from "react-razorpay";
import axios from 'axios';
import Image from 'next/image'
// import '../../scss/studentDashboard.scss';
import Loader from '../../components/Loader';
// import { BrowserRouter as Router, Switch, Route, Link, useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle, faUniversity, faGraduationCap, faCalendarDay, faAreaChart, faPaperPlane, faRedo, faClose
} from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';

export default function Dashboard(location) {
    const [showModal, setshowModal] = useState("");
    const [msgFile, setmsgFile] = useState([]);
    const [mycourseID, setmycourseID] = useState("");

    const [popupphone, setpopupphone] = useState("");
    const [popupphoneError, setpopupphoneError] = useState("");
    const [data, setdata] = useState([]);
    const [selectedfileName, setselectedfileName] = useState("");
    const [refreshMsg, setrefreshMsg] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [submitError, setsubmitError] = useState("0");
    const [studentId, setstudentId] = useState("0px");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [messageError, setmessageError] = useState("");
    const [message, setmessage] = useState("");
    const [payDisplay, setpayDisplay] = useState("none");
    const [courseID, setcourseID] = useState("none");
    const [totalPrice, settotalPrice] = useState("none");
    const [currency, setcurrency] = useState("none");
    const [paid, setpaid] = useState("");
    const [pendingFee, setpendingFee] = useState("");

    const [filledPayment, setfilledPayment] = useState("");
    const [loader, setmyloader] = useState("false");

    const [mounted, setMounted] = useState();

    const [id, setid] = useState();
    const [studentName, setstudentName] = useState();
    const [studentEmail, setstudentEmail] = useState();
    const [studentPhone, setstudentPhone] = useState();
    const [universityApplication, setuniversityApplication] = useState([])
    const [myapplicationProgress, setmyapplicationProgress] = useState();
    const [myapplicationProgressStep, setmyapplicationProgressStep] = useState();
    const [mybuildApplicationID, setmybuildApplicationID] = useState();
    const [mycountry, setmycountry] = useState();
    const [mycountryID, setmycountryID] = useState();
    const [mycourseName, setmycourseName] = useState();
    const [mysession, setmysession] = useState();
    const [myuniversityName, setmyuniversityName] = useState();
    const [firstviewWidth, setfirstviewWidth] = useState("0px");
    const [FormValues, setFormValues] = useState([{
        message: "", type: "", file: ""
    }])
    const Razorpay = useRazorpay();
    //   const { state } = useLocation();
    const { title = 'defaultValue' } = location.state || {}

    useEffect(() => {


        var studentId = localStorage.getItem('studentId');
        var studentName = localStorage.getItem('studentName');
        var studentEmail = localStorage.getItem('studentEmail');
        var studentPhone = localStorage.getItem('studentPhone');

        // if (studentPhone === "undefined" || studentPhone === "") {
        //   setshowModal(true)
        // }

        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        setstudentEmail(studentEmail)
        setstudentName(studentName)
        setstudentPhone(studentPhone)
        setstudentId(studentId)
        if (mounted !== null) {
            function dashboard() {
                setmyloader("true")
                axios.get(process.env.REACT_APP_SERVER_URL + 'student/orders', { headers: { 'Authorization': mounted } })
                    .then(function (res) {

                        setmyloader("false")
                        if (res.data.success === true) {
                            setdata(res.data.studentOrders)

                        }
                    })
                    .catch(error => {
                        localStorage.removeItem("studentId");
                        localStorage.removeItem("studentToken");
                        localStorage.removeItem("studentName");
                        localStorage.removeItem("studentEmail");
                        localStorage.removeItem("studentPhone");

                    });
            }
            dashboard()
        }
    }, [])

    function handleRefresh() {
        setrefreshMsg(["refresh"]);
    }
    function open() {
        setshowModal(true)
    }
    function close() {
        setshowModal(false)
    }
    useEffect(() => {
        if (id !== undefined) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'student/msg/' + studentId + "/" + id, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    if (res.data.success === true) {
                        var myresults = res.data.notifications;
                        if (Object.keys(myresults).length === 0) {
                        }
                        const newArr = myresults.map(obj => {
                            var myd = obj.messageTime
                            const d = new Date(myd)

                            var date = d.getDate()
                            var month = d.getMonth() + 1;
                            var year = d.getFullYear();
                            var month = d.toLocaleString('default', { month: 'long' })
                            var options = {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true
                            };
                            var timerr = new Intl.DateTimeFormat('en-US', options).format(d)
                            var completeTime = month + " " + date + ",  " + year + ", " + timerr
                            return { ...obj, messageTime: completeTime };
                            return obj;
                        });
                        setFormValues(newArr)
                    }
                })
                .catch(error => {
                });
        }
    }, [refreshMsg]);
    const initPayment = (data) => {
        var options = {
            "key": process.env.REACT_APP_KEY_ID, // Enter the Key ID generated from the Dashboard
            "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "USD",
            "name": "Abroad Coursementor Payment",
            "description": "Custom Tutoring Package",
            // "image": "https://example.com/your_logo",
            "image": "https://abroad.coursementor.com/favicon.png",

            "order_id": data.id, //This is a sample Application ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response) {
                //start call second api
                const obj = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    myid: id,
                    paid: totalPrice,
                    totalPrice: totalPrice,
                    currency: currency,
                    courseName: mycourseName,
                    intake: mysession,
                    universityName: myuniversityName,
                    mybuildApplicationID: mybuildApplicationID,

                    studentEmail: studentEmail,
                    studentName: studentName,
                    //start new this is price pay by student at current time
                    filledPayment: filledPayment,
                    agentName: "",
                    agentEmail: ""

                    //end new
                };
                axios.post(process.env.REACT_APP_SERVER_URL + 'verifyOrder', obj)
                    .then(result => {
                        setpayDisplay("none")
                        axios.get(process.env.REACT_APP_SERVER_URL + 'student/orders/' + id, { headers: { 'Authorization': mounted } })
                            .then(function (res) {
                                if (res.data.success === true) {

                                    var myresult = res.data.studentOrder
                                    // setcourseID(myresult.courseID)
                                    setfirstviewWidth("90%");
                                    setid(myresult._id)
                                    setmyapplicationProgress(myresult.applicationProgress)
                                    setmyapplicationProgressStep(myresult.applicationProgressStep)
                                    setmybuildApplicationID(myresult.buildApplicationID)
                                    setmycountry(myresult.country)
                                    setmycountryID(myresult.countryID)
                                    setmycourseName(myresult.courseName)
                                    setmysession(myresult.session)
                                    setmyuniversityName(myresult.universityName)
                                    setpaid(myresult.paid)
                                    // settotalPrice(myresult.totalPrice)
                                    // setcurrency(myresult.currency)
                                    var pendingFee = Number(myresult.totalPrice) - Number(myresult.paid);

                                    setpendingFee(pendingFee)



                                }
                            })
                            .catch(error => {
                            });



                    }
                    )
                    .catch(error => {

                    });
                //end call second api

            },
            "prefill": {
                "name": studentName,
                "email": studentEmail,
                "contact": studentPhone
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }
    const handlePayment = async () => {
        try {
            const orderUrl = process.env.REACT_APP_SERVER_URL + "pay";

            const { data } = await axios.post(orderUrl, { amount: totalPrice, currency: currency });

            initPayment(data.data);
        } catch (error) {

        }
    }
    function handleCloseView() {
        setfirstviewWidth("0px");

    }
    function handleMsgSubmit(event) {
        event.preventDefault();
        setmessageError("")
        if (message === "") {
            setmessageError("Please Enter Message")
        }
        else {



            setmyloader("true")
            const obj = new FormData();
            obj.append("message", message);
            obj.append("studentID", studentId);
            obj.append("type", 0);
            obj.append("file", msgFile);
            obj.append("msgfileName", selectedfileName);
            obj.append("mybuildApplicationID", mybuildApplicationID);




            axios.post(process.env.REACT_APP_SERVER_URL + 'student/msg/' + id, obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false");
                    setselectedfileName("")
                    if (res.data.success === true) {
                        setsuccessMessage("Message Sent")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        setmessage("")
                        axios.get(process.env.REACT_APP_SERVER_URL + 'student/msg/' + studentId + "/" + id, { headers: { 'Authorization': mounted } })
                            .then(function (res) {
                                if (res.data.success === true) {
                                    var myresults = res.data.notifications;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    const newArr = myresults.map(obj => {
                                        var myd = obj.messageTime
                                        const d = new Date(myd)

                                        var date = d.getDate()
                                        var month = d.getMonth() + 1;
                                        var year = d.getFullYear();
                                        var month = d.toLocaleString('default', { month: 'long' })
                                        var options = {
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true
                                        };
                                        var timerr = new Intl.DateTimeFormat('en-US', options).format(d)
                                        var completeTime = month + " " + date + ",  " + year + ", " + timerr
                                        return { ...obj, messageTime: completeTime };
                                        return obj;
                                    });
                                    setFormValues(newArr)
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
    function handlepayView() {
        setfilledPayment(pendingFee)
        setpayDisplay("inline");
    }
    function handleView(id) {

        setfirstviewWidth("90%");
        axios.get(process.env.REACT_APP_SERVER_URL + 'student/orders/' + id, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {

                    var myresult = res.data.studentOrder

                    setmycourseID(myresult.courseID)
                    // setcourseID(myresult.courseID)

                    // start for application fee

                    if (myresult.courseID !== undefined) {
                        var studentCourseId = myresult.courseID
                        const url70 = process.env.REACT_APP_SERVER_URL + 'courseOrderFee/' + studentCourseId;
                        fetch(url70, {
                            method: 'GET',

                        })
                            .then(response => response.json())
                            .then(data => {
                                var myapplicationFee = data.courses.applicationFee

                                settotalPrice(data.courses.applicationFee)
                                setcurrency(data.courses.applicationcurrency)
                                // setcourseApplicationFee(data.courses.applicationFee)
                                // setpendingFee(myapplicationFee - paid)
                            })
                    }
                    else {
                        settotalPrice(myresult.appPrice)
                        setcurrency(myresult.appCurrency)

                    }
                    //end for application fee

                    //start for set msg read
                    const obj1 = new FormData();
                    obj1.append("status", "1");
                    axios.put(process.env.REACT_APP_SERVER_URL + 'student/messagesUnread/' + id, obj1, { headers: { 'Authorization': mounted } })
                        .then(function (res) {

                        })
                        .catch(error => {
                        });

                    //end for set msg read


                    setid(myresult._id)
                    setmyapplicationProgress(myresult.applicationProgress)
                    setmyapplicationProgressStep(myresult.applicationProgressStep)
                    setmybuildApplicationID(myresult.buildApplicationID)
                    setmycountry(myresult.country)
                    setmycountryID(myresult.countryID)
                    setmycourseName(myresult.courseName)


                    setmysession(myresult.session)
                    setmyuniversityName(myresult.universityName)
                    setpaid(myresult.paid)
                    // settotalPrice(myresult.totalPrice)
                    // setcurrency(myresult.currency)

                    var pendingFee = Number(myresult.totalPrice) - Number(myresult.paid);
                    setpendingFee(pendingFee)



                    const url60 = process.env.REACT_APP_SERVER_URL + 'countryStepName/' + myresult.country;
                    fetch(url60, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setuniversityApplication(data.adminCountry.countrySteps)
                        })


                }
            })
            .catch(error => {
            });


        axios.get(process.env.REACT_APP_SERVER_URL + 'student/msg/' + studentId + "/" + id, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {
                    setmyloader("false")
                    var myresults = res.data.notifications;

                    if (Object.keys(myresults).length === 0) {
                    }
                    const newArr = myresults.map(obj => {
                        var myd = obj.messageTime
                        const d = new Date(myd)
                        var date = d.getDate()
                        var month = d.getMonth() + 1;
                        var year = d.getFullYear();
                        var month = d.toLocaleString('default', { month: 'long' })
                        var options = {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                        };
                        var timerr = new Intl.DateTimeFormat('en-US', options).format(d)
                        var completeTime = month + " " + date + ",  " + year + ", " + timerr
                        return { ...obj, messageTime: completeTime };
                        return obj;
                    });
                    setFormValues(newArr)
                }
            })
            .catch(error => {
            })


    }
    function handlePhone(event) {

        event.preventDefault();
        if (popupphone === "") {
            setpopupphoneError("Please enter phone number");
        }
        if (isValidPhoneNumber(popupphone) === false) {
            setpopupphoneError("Please enter correct phone number");
        }

        else {

            setmyloader("true")
            const obj = {
                popupphone: popupphone
            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'student/updatePhone', obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {

                    if (res.data.success === true) {
                        setmyloader("false")
                        setshowModal(false)
                        setsuccessMessage("Phone Number Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        localStorage.setItem('studentPhone', popupphone);
                    }

                })
                .catch(error => {
                });

        }
    }
    return (
        <>
            <StudentLayout />
            <div className="mainmain">
                <div className="container">
                    {submitSuccess === 1 ? <div className="Show_success_message">
                        <strong>Success!</strong> {successMessage}
                    </div> : null}
                    {showSweetAlert === "1" ?

                        <SweetAlert
                            success
                            title="ThankYou!"
                            onConfirm={(value) => {
                                setshowSweetAlert("0")
                            }}
                        >
                            You Pay Successfully.
                        </SweetAlert>
                        : null
                    }
                    {
                        loader === "true" ?
                            <Loader />
                            : null
                    }
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">My Application</h1>
                    </div>
                    <div className="row">
                        <div className="col-xl-12 col-lg-7">
                            {data.map((object, i) => {
                                return (
                                    <div className="card shadow mb-4 appblock" key={i}>
                                        <div className="row">
                                            <div className="col-md-10">

                                                <div className="unv-name">
                                                    <span><FontAwesomeIcon className="sidebar-faicon" icon={faUniversity} /></span>
                                                    <h5>App ID</h5>
                                                    <p>{object.buildApplicationID}</p>
                                                </div>
                                                <div className="unv-name">
                                                    <span><FontAwesomeIcon className="sidebar-faicon" icon={faUniversity} /></span>
                                                    <h5>University</h5>
                                                    <p>{object.universityName}</p>
                                                </div>
                                                <div className="course-name">
                                                    <span><FontAwesomeIcon className="sidebar-faicon" icon={faGraduationCap} /></span>
                                                    <h5>Course</h5>
                                                    <p>{object.courseName}</p>
                                                </div>

                                                <div className="apply-process">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="unv-name">
                                                                <span><FontAwesomeIcon className="sidebar-faicon" icon={faAreaChart} /></span>

                                                                <h5>Session</h5>
                                                                {object.session}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="unv-name">
                                                                <span><FontAwesomeIcon className="sidebar-faicon" icon={faAreaChart} /></span>

                                                                <h5>Current Application Process</h5>
                                                                {object.applicationProgress}
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="btn-groups admin-btn">
                                                    <button title="View Student Application" className="btn btn-success"
                                                        onClick={() => handleView(object._id, object.courseID)}>View Application  </button>
                                                    <Link href={'/student/document'}  ><button type="button" className="btn btn-primary" title="Upload Document">Upload Doc</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {/* start for sidebar */}
                    <div id="mySidenav" className="sidenav" style={{ width: firstviewWidth }}>

                        {submitError === 1 ? <div className="Show_error_message">
                            <strong></strong> File extension not supported
                        </div> : null}
                        <section className="pcoded-main-containerx container-fluid">
                            <a onClick={() => handleCloseView()} className="closebtn" >×</a>
                            <div className="pcoded-content">
                                <div className="pcoded-content">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="card">
                                                <h5>Application Information</h5><hr />
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h5>Application ID </h5>
                                                        <p>{mybuildApplicationID}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h5>Course Name</h5>
                                                        <p>{mycourseName}</p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h5> Session</h5>
                                                        <p>{mysession} </p>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <h5>University Name</h5>
                                                        <p>{myuniversityName}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-3">
                                                        <h5> University Country</h5>
                                                        <p>{mycountry}</p>
                                                    </div>
                                                    <div className="col-md-9">

                                                        {myapplicationProgressStep >= 2 && totalPrice !== undefined && totalPrice !== "none"
                                                            ?
                                                            <>
                                                                <div className="row">
                                                                    <div className="col-md-3">
                                                                        <h5>Total Price</h5>
                                                                        <p>{totalPrice + " " + currency}</p>

                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <h5>Paid</h5>
                                                                        <p>{paid + " " + currency}</p>

                                                                    </div>

                                                                    {pendingFee !== 0 ?
                                                                        <div className="col-md-2">
                                                                            <button className="btn btn-success" onClick={() => handlePayment()}>Pay</button>
                                                                        </div>
                                                                        : null}
                                                                </div>
                                                            </>
                                                            : null}
                                                        {/* start payment */}

                                                        {/* <div style={{ display: payDisplay }}>
                          <div className="pcoded-content">

                            Amount  To Pay
                            <input type="text" value={filledPayment} onChange={(e) => setfilledPayment(e.target.value)} />

                            <button onClick={handlePayment} className="buy_btn">
                              Pay Securely
                            </button>
                          </div>
                        </div> */}
                                                        {/* end payment */}
                                                    </div>

                                                </div>
                                                {/* start for dummy */}
                                                <span className="msgRefresh" onClick={() => handleRefresh()}>
                                                    <FontAwesomeIcon className="sidebar-faicon" icon={faRedo} />
                                                    Refresh
                                                </span>

                                                <div className="activite">
                                                    <div className="row">
                                                        <div className="cardx mb-4">
                                                            <div className="act-note">
                                                                <ul className="nav nav-tabs" role="tablist">
                                                                    <li className="nav-item">
                                                                        <a className="nav-link active" data-bs-toggle="tab" href="#message1">Messages</a>
                                                                    </li>


                                                                </ul>
                                                                {/* Tab panes */}



                                                                <div id="message1" className=" tab-pane active"><br />
                                                                    <div className="applic-document">
                                                                        <div className="row">
                                                                            <div className="col-xl-12 col-lg-7">
                                                                                <div className="card shadow mb-4">
                                                                                    <div className="row">
                                                                                        <div className="col-md-12">
                                                                                            <div className="chat-message msg_list">
                                                                                                <div className="row">
                                                                                                    <div className="col-md-12">
                                                                                                        {FormValues.map((element, index) => {
                                                                                                            return (
                                                                                                                <div className="anw-block" key={index}>
                                                                                                                    {element.type === 0 ?
                                                                                                                        <div className="anw-block">
                                                                                                                            <div className="row">
                                                                                                                                <div className="col-md-1">
                                                                                                                                    <div className="us-img us-letter">
                                                                                                                                        <h6>S</h6>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                                <div className="col-md-11">
                                                                                                                                    <div
                                                                                                                                        className="anw-content-rightblock  light-greenish">
                                                                                                                                        <div className="des-title">
                                                                                                                                            <h6><strong>Student:</strong>
                                                                                                                                                ({studentName}) Sent a Message</h6>
                                                                                                                                            <span
                                                                                                                                                className="date-block">{element.messageTime}</span>
                                                                                                                                        </div>
                                                                                                                                        <div className="reply-content ">
                                                                                                                                            <p>{element.message}</p>
                                                                                                                                            {element.file !== "" ? <a className="appAttachment" href={"https://coursementor.com/uploadApi/download.php?file=" + element.file} >{element.msgfileName}</a>
                                                                                                                                                : null}

                                                                                                                                        </div>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        :
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-1">
                                                                                                                                <div className="us-img us-letter">
                                                                                                                                    <h6>A</h6>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                            <div className="col-md-11">
                                                                                                                                <div
                                                                                                                                    className="anw-content-rightblock  drak-blue">
                                                                                                                                    <div className="des-title">
                                                                                                                                        <h6><strong>Visa Team:</strong>(admin)
                                                                                                                                            Sent a Message </h6><span
                                                                                                                                                className="date-block">{element.messageTime}</span>
                                                                                                                                    </div>
                                                                                                                                    <div className="reply-content ">
                                                                                                                                        <p>{element.message}</p>
                                                                                                                                        {element.file !== "" ? <a className="appAttachment" href={"https://coursementor.com/uploadApi/download.php?file=" + element.file} >{element.msgfileName}</a>
                                                                                                                                            : null}
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    }
                                                                                                                </div>
                                                                                                            )
                                                                                                        })}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col-md-12">
                                                                                            <div className="msg-form">
                                                                                                <form onSubmit={handleMsgSubmit}>
                                                                                                    <div className="row">
                                                                                                        <div className="col-md-12">
                                                                                                            <span className="msgRefreshRight" onClick={() => handleRefresh()}>
                                                                                                                <FontAwesomeIcon className="sidebar-faicon" icon={faRedo} />
                                                                                                                Refresh
                                                                                                            </span>
                                                                                                            <div className="form-group">
                                                                                                                <label className="form-label">Message
                                                                                                                    <span className="req-star">*</span></label>
                                                                                                                <textarea rows={5} cols={7} className="form-control" required
                                                                                                                    value={message} onChange={(e) => setmessage(e.target.value)} />
                                                                                                                <label className="form-label">Upload file
                                                                                                                </label>
                                                                                                                <Dropzone onDrop={(acceptedFiles) => {
                                                                                                                    var fileName = acceptedFiles[0].path;
                                                                                                                    var fileExtension = fileName.split('.').pop();
                                                                                                                    if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                                        || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                                                    ) {

                                                                                                                        setmsgFile(acceptedFiles[0])

                                                                                                                        setselectedfileName(acceptedFiles[0].name)

                                                                                                                    }
                                                                                                                    else {

                                                                                                                        setTimeout(() => setsubmitError(""), 3000);
                                                                                                                        setsubmitError(1)
                                                                                                                    }
                                                                                                                    setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                                                        preview: URL.createObjectURL(file)

                                                                                                                    })));
                                                                                                                }} name="heroImage" multiple={false}>
                                                                                                                    {({ getRootProps, getInputProps }) => (
                                                                                                                        <div {...getRootProps({ className: 'dropzoneMsg' })}>
                                                                                                                            <input {...getInputProps()} />
                                                                                                                            <div style={{ fontSize: ".8rem" }}>
                                                                                                                                Upload/Drag & Drop here
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    )}
                                                                                                                </Dropzone>
                                                                                                            </div>
                                                                                                            <span > {selectedfileName}</span>
                                                                                                            <span className="error-msg"> {messageError}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                    <button title="Send Message" type="submit" className="btn-send-msg">
                                                                                                        <FontAwesomeIcon className="sidebar-faicon" icon={faPaperPlane} /> Send</button>
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
                                                {/* end for dummy */}
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card">
                                                <h5>Application Current Status</h5>
                                                <hr />
                                                <div className="profile-main">
                                                    <div className="application-current-status">
                                                        <ul>
                                                            {universityApplication.map((object, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        {i <= myapplicationProgressStep ?
                                                                            <>
                                                                                {object === myapplicationProgress ?
                                                                                    <li className="statusBox current-stat" style={{ 'backgroundColor': '#0982A5' }}>{object}<span>
                                                                                        <FontAwesomeIcon className="sidebar-faicon" icon={faCheckCircle} />
                                                                                    </span></li>
                                                                                    : <li className="statusBox" style={{ 'backgroundColor': "#fff" }}>{object}<span>
                                                                                        <FontAwesomeIcon className="sidebar-faicon" icon={faCheckCircle} />
                                                                                    </span></li>}
                                                                            </>
                                                                            : <li className="statusBox">{object}<span className="status-completed">

                                                                            </span></li>}
                                                                    </div>
                                                                )
                                                            })}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
                    {/* start msg */}

                    {/* end msg */}
                    <div className="row">
                        <div className="col-lg-12 mb-4">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary">List To Follow</h6>
                                </div>
                                <div className="card-body">
                                    <h4 className="small ">1 Visit our Facebook Profile <a href="https://www.facebook.com/coursementors/" target="_blank" rel="noreferrer"
                                        className="float-right">Visit</a></h4>
                                    <h4 className="small">3 Link your Pinterest profile <a href="https://in.pinterest.com/Thecoursementor/_created/" target="_blank" rel="noreferrer"
                                        className="float-right">Visit</a></h4>
                                    <h4 className="small">4 Link your Instagram profile <a href="https://www.instagram.com/course_mentor/" target="_blank" rel="noreferrer"
                                        className="float-right">Visit</a></h4>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* start modal */}
                    {/* <Modal className="modal-container enqblock"
        show={showModal}
        onHide={() => close()}

        animation={true}
        bsSize="small" dialogClassName="modal-lg">

        <Modal.Header closeButton>
          <Modal.Title>Fill Phone Number</Modal.Title>
        </Modal.Header>


        <div className="outside-iwinform">
          <div className="iwinform">
            <form className="iwin-home-form" onSubmit={handlePhone}>
              <div className="row">
                <div className="col-md-6">

                  <div id="iphone" className="form-group">
                    <label>Phone<span className="red">*</span></label>
                    <PhoneInput defaultCountry={"IN"}
                      placeholder="Enter phone number"
                      required
                      value={popupphone}
                      onChange={setpopupphone} />


                    <div className="error-msg"> {popupphoneError}</div>
                  </div>

                  <div className="form-btns">
                    <input type="submit" className="btn btn-enquiry" defaultValue="Send Request" />
                  </div>

                </div>
                <div className="col-md-6">

                </div>
              </div>
            </form>
          </div>

        </div>


      </Modal> */}
                    {/* end modal */}
                </div>
            </div>

        </>
    );
}

import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/recruitment/DataTable";
import axios from 'axios';
import PhoneInput from 'react-phone-number-input'
import Loader from '../../components/Loader';
import RecruitmentTopbar from '../../components/RecruitmentTopbar';
import RecruitmentSidebar from '../../components/RecruitmentSidebar';
import { Modal, Button } from 'react-bootstrap';
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isValidPhoneNumber } from 'react-phone-number-input';
import {
    faTrash, faPen, faEye, faUserSlash, faCloudDownload, faCheckCircle, faPaperPlane, faRedo
} from '@fortawesome/free-solid-svg-icons';
import useRazorpay from "react-razorpay";
export default function AgentStudent() {
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
    const [refreshMsg, setrefreshMsg] = useState([]);
    const [selectedfileName, setselectedfileName] = useState("");
    const [agentName, setagentName] = useState("none");
    const [agentEmail, setagentEmail] = useState("none");
    const [originalApplication, setoriginalApplication] = useState("none");
    const [msgFile, setmsgFile] = useState([]);
    const [payDisplay, setpayDisplay] = useState("none");
    const [filledPayment, setfilledPayment] = useState("");
    const [totalPrice, settotalPrice] = useState("none");
    const [currency, setcurrency] = useState("none");
    const [paid, setpaid] = useState("");
    const [pendingFee, setpendingFee] = useState("");
    const [id, setid] = useState("");
    const [mycountryID, setmycountryID] = useState("");
    const [mycountry, setmycountry] = useState("");


    const [FormMsgValues, setFormMsgValues] = useState([{
        message: "", type: "", file: ""
    }])

    const [messageError, setmessageError] = useState("");
    const [message, setmessage] = useState("");
    const [mybuildStudentID, setmybuildStudentID] = useState("");
    const [mysession, setmysession] = useState();
    const [mybuildApplicationID, setmybuildApplicationID] = useState("");
    const [myapplicationProgressStep, setmyapplicationProgressStep] = useState("");
    const [myapplicationProgress, setmyapplicationProgress] = useState("");
    const [universityApplication, setuniversityApplication] = useState([])
    const [fourthviewWidth, setfourthviewWidth] = useState("")
    const [universityID, setuniversityID] = useState("")
    const [universityName, setuniversityName] = useState("")
    const [courseName, setcourseName] = useState("")
    const [intakeMonth, setintakeMonth] = useState("")
    const [countryName, setcountryName] = useState("")
    const [courseID, setcourseID] = useState("")
    const [intakeValues, setintakeValues] = useState([])
    const [coursevalues, setcoursevalues] = useState([{
        courseName: "", _id: "", month: [{}]
    }])
    const [courseFull, setcourseFull] = useState("")
    const [completeuniValue, setcompleteuniValue] = useState("")
    const [orderdata, setorderdata] = useState([]);
    const [FormStudentApplicationValues, setFormStudentApplicationValues] = useState([]);
    const [secondviewWidth, setsecondviewWidth] = useState("0px");
    const [thirdviewWidth, setthirdviewWidth] = useState("0px");
    const [mounted, setMounted] = useState("");
    const [loader, setmyloader] = useState("false");
    const [editWidth, seteditWidth] = useState("0px");
    const [showModal, setshowModal] = useState(false);
    const [showModalValue, setshowModalValue] = useState("");
    const [allStudentValues, setallStudentValues] = useState([{
        name: "", email: "", phone: "", buildStudentID: "", _id: ""
    }])
    const [showModalExtensionValue, setshowModalExtensionValue] = useState("");
    const [educationId, seteducationId] = useState("");
    const [student_id, setstudent_id] = useState("");
    const [studentName, setstudentName] = useState("");
    const [studentEmail, setstudentEmail] = useState("");
    const [studentPhone, setstudentPhone] = useState("");

    const [ugDegreeExtenstion, setugDegreeExtenstion] = useState("");
    const [pgDegreeExtenstion, setpgDegreeExtenstion] = useState("");
    const [deleteUrl, setdeleteUrl] = useState("");
    const [englishExtenstion, setenglishExtenstion] = useState("");

    const [deleteId, setdeleteId] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [submitError, setsubmitError] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [passportBackExtenstion, setpassportBackExtenstion] = useState(".jpg");
    const [cvExtenstion, setcvExtenstion] = useState(".jpg");
    const [myPassportDocx, setmyPassportDocx] = useState("0");
    const [mypassport, setmypassport] = useState(null);
    const [mymarksheet10, setmymarksheet10] = useState(null);
    const [mymarksheet12, setmymarksheet12] = useState(null);
    const [myother, setmyother] = useState(null);
    const [otherExtenstion, setotherExtenstion] = useState(null);
    const [passportExtenstion, setpassportExtenstion] = useState(null);
    const [marksheet10Extenstion, setmarksheet10Extenstion] = useState(null);
    const [marksheet12Extenstion, setmarksheet12Extenstion] = useState(null);
    const [experienceExtenstion, setexperienceExtenstion] = useState(null);
    const [myexperience, setmyexperience] = useState(null);
    const [myrecommendation, setmyrecommendation] = useState(null);
    const [myugDegree, setmyugDegree] = useState(null);
    const [mypgDegree, setmypgDegree] = useState(null);
    const [myenglish, setmyenglish] = useState(null);
    const [recommendationExtenstion, setrecommendationExtenstion] = useState("");
    const [StudentId, setStudentId] = useState("");
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [firstName, setfirstName] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [countryOfBirth, setcountryOfBirth] = useState("");
    const [passportNo, setpassportNo] = useState("");
    const [gender, setgender] = useState("");
    const [maritalStatus, setmaritalStatus] = useState("");
    const [refusedVisa, setrefusedVisa] = useState("");
    const [refusedVisaReason, setrefusedVisaReason] = useState("");
    const [Checkmycountry, setCheckmycountry] = useState("0")
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [zipcode, setzipcode] = useState("");
    const [UniveristyValues, setUniveristyValues] = useState([{
        universityPrimaryInformation: "", universityOverview: "", universityImage: "", _id: "",
    }])
    const [UniveristyCourseValues, setUniveristyCourseValues] = useState([{
        universityCourses: "", _id: ""
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
    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");
    const [countries, setcountries] = useState([{
        country_name: ""
    }]);
    const [states, setstates] = useState([{
        state_name: ""
    }])
    const [cities, setcities] = useState([{
        city_name: ""
    }])
    const Razorpay = useRazorpay();
    //end for edit student
    // start for pagination
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;
    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },
        { name: "Application ID", field: "buildStudentID", sortable: true },
        { name: "Student ID", field: "name", sortable: true },
        { name: "Student Name", field: "email", sortable: true },
        { name: "Student Email", field: "phone", sortable: false },
        { name: "Action", field: "", sortable: false },
    ];

    // end for pagination
    useEffect(() => {
        var agentId = localStorage.getItem('agentId');
        var mounted = localStorage.getItem("agentToken")
        var agentName = localStorage.getItem('agentName');
        var agentEmail = localStorage.getItem('agentEmail');
        setMounted(mounted)
        setagentName(agentName)
        setagentEmail(agentEmail)

        if (agentId !== null) {
            function myallStudents() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + "agent/students";
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")
                        setComments(data.students)
                        setallStudentValues(data.students)
                    })
            }
            myallStudents()
        }
    }, [])
    //start for add edit student
    function handlecity(e) {
        setcity(e)
        setcityError("")
    }
    //start for add edit student
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
                    paid: pendingFee,
                    totalPrice: totalPrice,
                    currency: currency,
                    intake: mysession,
                    courseName: courseName,
                    universityName: universityName,

                    //end
                    mybuildApplicationID: mybuildApplicationID,

                    studentEmail: studentEmail,
                    studentName: studentName,
                    //start new this is price pay by student at current time
                    filledPayment: totalPrice,
                    agentName: agentName,
                    agentEmail: agentEmail,
                    mybuildStudentID: mybuildStudentID
                    //end new
                };
                axios.post(process.env.REACT_APP_SERVER_URL + 'verifyOrder', obj)
                    .then(result => {
                        setpayDisplay("none")
                        axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/orders/' + id, { headers: { 'Authorization': mounted } })
                            .then(function (res) {
                                if (res.data.success === true) {

                                    var myresult = res.data.studentOrder
                                    setuniversityName(myresult.universityName)
                                    setmybuildApplicationID(myresult.buildApplicationID)
                                    setcourseName(myresult.courseName)

                                    setmyapplicationProgress(myresult.applicationProgress)
                                    setmyapplicationProgressStep(myresult.applicationProgressStep)
                                    setmysession(myresult.session)
                                    setpaid(myresult.paid)
                                    settotalPrice(myresult.totalPrice)
                                    setcurrency(myresult.currency)
                                    var pendingFee = Number(myresult.totalPrice) - Number(myresult.paid);
                                    setpendingFee(pendingFee)
                                    const url60 = process.env.REACT_APP_SERVER_URL + 'countriesStep/' + myresult.countryID;
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
    // start for pagination
    const commentsData = useMemo(() => {
        let computedComments = comments;
        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.buildStudentID.toLowerCase().includes(search.toLowerCase()) ||
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.phone.toLowerCase().includes(search.toLowerCase())

            );
        }
        setTotalItems(computedComments.length);
        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);
    // end for pagination
    function handleMsgSubmit(event) {
        event.preventDefault();
        setmyloader("true")
        const obj = new FormData();
        obj.append("message", message);
        obj.append("studentID", student_id);
        obj.append("type", 0);
        obj.append("file", msgFile);
        obj.append("mybuildApplicationID", mybuildApplicationID);

        // 'student/msg/' + studentId + "/" + id
        axios.post(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/msg/' + id, obj, { headers: { 'Authorization': mounted } })
            // axios.post(process.env.REACT_APP_SERVER_URL + 'student/messages', obj, { headers: { 'Authorization': mounted } })
            // 'agent/students/' + value + '/personalInformation'
            .then(function (res) {
                setmyloader("false");
                setselectedfileName("")
                setmsgFile("")
                if (res.data.success === true) {
                    setsuccessMessage("Message Sent")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    setmessage("")

                    axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/msg/' + student_id + '/' + id, { headers: { 'Authorization': mounted } })

                        // axios.get(process.env.REACT_APP_SERVER_URL + 'student/messages/' + student_id, { headers: { 'Authorization': mounted } })
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
                                setFormMsgValues(newArr)
                            }
                        })
                        .catch(error => {
                        });
                }
            })
            .catch(error => {
            });
    }
    useEffect(() => {
        if (id !== undefined) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/msg/' + student_id + '/' + id, { headers: { 'Authorization': mounted } })

                // axios.get(process.env.REACT_APP_SERVER_URL + 'student/messages/' + student_id, { headers: { 'Authorization': mounted } })
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
                        setFormMsgValues(newArr)
                    }
                })
                .catch(error => {
                });
        }
    }, [refreshMsg]);
    function handlepayView() {
        setfilledPayment(pendingFee)
        setpayDisplay("inline");
    }
    function handleSecondCloseView() {
        setsecondviewWidth("0px")
    }
    function handleThirdCloseView() {
        setthirdviewWidth("0px")
    }
    function handleFourthCloseView() {
        setfourthviewWidth("0px")
    }
    function handleAddorder() {
        setthirdviewWidth("90%")

    }
    function handlestate(e) {
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
    function handlemaritalStatus(value) {
        setmaritalStatus(value)
    }
    function handlegender(value) {
        setgender(value)
    }
    function agentAddOrder(event) {
        event.preventDefault();
        setthirdviewWidth("0px")
        setmyloader("true")
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
                setmyloader("false")
                setsuccessMessage("Apply Successfully")
                setTimeout(() => setsubmitSuccess(""), 3000);
                setsubmitSuccess(1)
                axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/orders', { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        if (res.data.success === true) {
                            setorderdata(res.data.studentOrders)
                            var studentCountryId = res.data.studentOrders.countryID
                        }
                    })
                    .catch(error => {
                    });
            })
    }
    function handleView(id, buildStudentID, name, email, phone) {
        setstudent_id(id)

        setstudentName(name)
        setstudentEmail(email)
        setstudentPhone(phone)
        setmybuildStudentID(buildStudentID)
        axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + id + '/orders', { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {
                    setorderdata(res.data.studentOrders)
                    var studentCountryId = res.data.studentOrders.countryID
                }
            })
            .catch(error => {
            });
        setsecondviewWidth("90%");
    }
    function identityDocumentAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/identityDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    setmypassport(data.studentIdentityDocument.passport)
                    if (data.studentIdentityDocument.passport != null) {
                        var fetchPassport = data.studentIdentityDocument.passport
                        var completePassport = fetchPassport.split(".")
                        setpassportExtenstion(completePassport[2]);
                    }
                }
            })
    }
    function secondaryEducationAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {


                setmymarksheet10(data.studentEducationDocument.marksheet10)
                setmymarksheet12(data.studentEducationDocument.marksheet12)
                setmyugDegree(data.studentEducationDocument.ugDegree)
                setmypgDegree(data.studentEducationDocument.pgDegree)
                if (data.studentEducationDocument.marksheet10 != null) {
                    var fetchPassport = data.studentEducationDocument.marksheet10
                    var completePassport = fetchPassport.split(".")
                    setmarksheet10Extenstion(completePassport[2]);
                }
                if (data.studentEducationDocument.marksheet12 != null) {
                    var fetchcvBack = data.studentEducationDocument.marksheet12
                    var completecv = fetchcvBack.split(".")
                    setmarksheet12Extenstion(completecv[2]);
                }
                if (data.studentEducationDocument.ugDegree != null) {
                    var fetchcvBack = data.studentEducationDocument.ugDegree
                    var completeugDegree = fetchcvBack.split(".")
                    setugDegreeExtenstion(completeugDegree[2]);
                }
                if (data.studentEducationDocument.pgDegree != null) {
                    var fetchcompletepgDegreeBack = data.studentEducationDocument.pgDegree
                    var completepgDegree = fetchcompletepgDegreeBack.split(".")
                    setpgDegreeExtenstion(completepgDegree[2]);
                }
            })
    }
    function workRexperienceAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/experienceDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyexperience(data.studentExperienceDocument.document)
                if (data.studentExperienceDocument.document != null) {
                    var fetchExperience = data.studentExperienceDocument.document
                    var completeExperience = fetchExperience.split(".")
                    setexperienceExtenstion(completeExperience[2]);
                }
            })
    }
    function englishProficiencyAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/englishProficiencyDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyenglish(data.studentEnglishProficiencyDocument.file)
                if (data.studentEnglishProficiencyDocument.file != null) {
                    var fetchEnglish = data.studentEnglishProficiencyDocument.file
                    var completeEnglish = fetchEnglish.split(".")
                    setenglishExtenstion(completeEnglish[2]);
                }
            })
    }
    function recommendationAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/recommendationDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyrecommendation(data.studentRecommendationDocument.document)
                if (data.studentRecommendationDocument.document != null) {
                    var fetchRecom = data.studentRecommendationDocument.document
                    var completeRecom = fetchRecom.split(".")
                    setrecommendationExtenstion(completeRecom[2]);
                }
            })
    }
    function otherAll() {
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/otherDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyother(data.studentOtherDocument.file)
                if (data.studentOtherDocument.file != null) {
                    var fetchOther = data.studentOtherDocument.file
                    var completeOther = fetchOther.split(".")
                    setotherExtenstion(completeOther[2]);
                }
            })
    }
    function onDeletePassportHandle(value, url) {

        setdeleteId(value)
        setdeleteUrl(url)
        setshowSweetAlert("1")
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
    function close() {
        setshowModal(false)
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
    function viewSingleDocument(value, extension) {
        if (extension === "jpeg" || extension === "jpg" || extension === "png" || extension === "pdf") {
            setshowModal(true)
            setshowModalValue(value)
            setshowModalExtensionValue(extension)
        }
        if (extension === "doc" || extension === "docx") {
            window.location.href = value
        }
    }
    function handleEditClick(value, email, phone) {
        setemail(email)
        setphone(phone)
        setstudent_id(value)
        seteditWidth("90%")
        setstudentEmail(email)
        setstudentPhone(phone)
        //start empty
        setfirstName("")
        setdateOfBirth("")
        setcountryOfBirth("")
        setpassportNo("")
        setgender("")
        setmaritalStatus("")
        setrefusedVisa("")
        setrefusedVisaReason("")
        setaddress("")
        setcountry('')
        setstate("")
        setcity("")
        setzipcode("")
        seteducationId("")
        sethighestEducation("")
        setgradePercentage("")
        setpassingYear("")
        setexamType("")
        setexaminationDate("")
        setoverall("")
        setlistening("")
        setreading("")
        setwriting("")
        setspeaking("")
        //end empty
        var url2 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/personalInformation'
        fetch(url2, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var resultPersonal = data.studentPersonalInformation
                    if (resultPersonal.countryOfBirth === "" || resultPersonal.countryOfBirth === undefined) {
                        setCheckmycountry("1")
                    }
                    setfirstName(resultPersonal.firstName)
                    setdateOfBirth(resultPersonal.dateOfBirth)
                    setcountryOfBirth(resultPersonal.countryOfBirth)
                    setpassportNo(resultPersonal.passportNo)
                    setgender(resultPersonal.gender)
                    setmaritalStatus(resultPersonal.maritalStatus)
                    setrefusedVisa(resultPersonal.refusedVisa)
                    setrefusedVisaReason(resultPersonal.refusedVisaReason)
                }
            })
        var url3 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/address'
        fetch(url3, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var resultaddress = data.studentAddress
                    setaddress(resultaddress.address)
                    setcountry(resultaddress.country)
                    setstate(resultaddress.state)
                    setcity(resultaddress.city)
                    setzipcode(resultaddress.zipcode)
                }
            })
        var url4 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/educations'
        fetch(url4, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var educationResult = data.studentEducations[0]
                    seteducationId(educationResult._id)
                    sethighestEducation(educationResult.highestEducation)
                    setgradePercentage(educationResult.gradePercentage)
                    setpassingYear(educationResult.passingYear)
                }
            })
        var url5 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/score'
        fetch(url5, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success === true) {
                    var resultscore = data.studentScore
                    setexamType(resultscore.examType)
                    setexaminationDate(resultscore.examinationDate)
                    setoverall(resultscore.overall)
                    setlistening(resultscore.listening)
                    setreading(resultscore.reading)
                    setwriting(resultscore.writing)
                    setspeaking(resultscore.speaking)
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/identityDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {

                if (data.success === true && data.studentIdentityDocument !== null) {
                    setmypassport(data.studentIdentityDocument.passport)
                    if (data.studentIdentityDocument.passport != null) {
                        var fetchPassport = data.studentIdentityDocument.passport
                        var completePassport = fetchPassport.split(".")
                        setpassportExtenstion(completePassport[2]);
                    }
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/educationDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {

                setmymarksheet10(data.studentEducationDocument.marksheet10)
                setmymarksheet12(data.studentEducationDocument.marksheet12)
                setmyugDegree(data.studentEducationDocument.ugDegree)
                setmypgDegree(data.studentEducationDocument.pgDegree)
                if (data.studentEducationDocument.marksheet10 != null) {
                    var fetchPassport = data.studentEducationDocument.marksheet10
                    var completePassport = fetchPassport.split(".")
                    setmarksheet10Extenstion(completePassport[2]);
                }
                if (data.studentEducationDocument.marksheet12 != null) {
                    var fetchcvBack = data.studentEducationDocument.marksheet12
                    var completecv = fetchcvBack.split(".")
                    setmarksheet12Extenstion(completecv[2]);
                }
                if (data.studentEducationDocument.ugDegree != null) {
                    var fetchcvBack = data.studentEducationDocument.ugDegree
                    var completeugDegree = fetchcvBack.split(".")
                    setugDegreeExtenstion(completeugDegree[2]);
                }
                if (data.studentEducationDocument.pgDegree != null) {
                    var fetchcompletepgDegreeBack = data.studentEducationDocument.pgDegree
                    var completepgDegree = fetchcompletepgDegreeBack.split(".")
                    setpgDegreeExtenstion(completepgDegree[2]);
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/experienceDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyexperience(data.studentExperienceDocument.document)
                if (data.studentExperienceDocument.document != null) {
                    var fetchExperience = data.studentExperienceDocument.document
                    var completeExperience = fetchExperience.split(".")
                    setexperienceExtenstion(completeExperience[2]);
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/englishProficiencyDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {

                setmyenglish(data.studentEnglishProficiencyDocument.file)
                if (data.studentEnglishProficiencyDocument.file != null) {
                    var fetchEnglish = data.studentEnglishProficiencyDocument.file
                    var completeEnglish = fetchEnglish.split(".")
                    setenglishExtenstion(completeEnglish[2]);
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/recommendationDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyrecommendation(data.studentRecommendationDocument.document)
                if (data.studentRecommendationDocument.document != null) {
                    var fetchRecom = data.studentRecommendationDocument.document
                    var completeRecom = fetchRecom.split(".")
                    setrecommendationExtenstion(completeRecom[2]);
                }
            })
        fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + value + '/otherDocument', {
            method: 'get',
            headers: { 'Authorization': mounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyother(data.studentOtherDocument.file)
                if (data.studentOtherDocument.file != null) {
                    var fetchOther = data.studentOtherDocument.file
                    var completeOther = fetchOther.split(".")
                    setotherExtenstion(completeOther[2]);
                }
            })
    }
    function closeeditbox() {
        seteditWidth("0%")
    }
    function handleRefresh() {
        setrefreshMsg(["refresh"]);
    }
    function handleViewApplication(id) {
        setfourthviewWidth("90%")
        setid(id)
        axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/orders/' + id, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {

                    setoriginalApplication(id)
                    var myresult = res.data.studentOrder
                    setuniversityName(myresult.universityName)
                    setmybuildApplicationID(myresult.buildApplicationID)
                    setcourseName(myresult.courseName)

                    setmyapplicationProgress(myresult.applicationProgress)
                    setmyapplicationProgressStep(myresult.applicationProgressStep)
                    setmysession(myresult.session)
                    setpaid(myresult.paid)
                    settotalPrice(myresult.totalPrice)
                    setcurrency(myresult.currency)
                    var pendingFee = Number(myresult.totalPrice) - Number(myresult.paid);
                    setpendingFee(pendingFee)
                    const url60 = process.env.REACT_APP_SERVER_URL + 'countriesStep/' + myresult.countryID;
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
        axios.get(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/msg/' + student_id + '/' + id, { headers: { 'Authorization': mounted } })

            // axios.get(process.env.REACT_APP_SERVER_URL + 'student/messages/' + student_id, { headers: { 'Authorization': mounted } })
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
                    setFormMsgValues(newArr)
                }
            })
            .catch(error => {
            });
    }
    function agentEditStudent(event) {
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
            const url2 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/personalInformation';
            fetch(url2, {
                method: 'put',
                headers: { 'Authorization': mounted },
                body: obj2
            })
                .then(response => response.json())
                .then(data => {
                    setmyloader("false")
                    setsuccessMessage("Stident Info Updated")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
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
            const url4 = process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educations/' + educationId;
            fetch(url4, {
                method: 'put',
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
                })
        }
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

    function handlecountryOfBirth(e) {

        setcountryOfBirth(e)
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
    function viewMyPassportDocument() {
        setmyPassportDocx("1")
    }
    function handleuniversityCourse(value) {
        var splitValue = value.split("$$")
        var courseIntake = splitValue[0]
        setcourseID(splitValue[2])
        var splitIntake = courseIntake.split(",")
        setintakeValues(splitIntake)
        setcourseFull(value)
    }
    function handleIntake(value) {
        setintakeMonth(value)
    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <RecruitmentSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <RecruitmentTopbar />
                        <div className="container-fluid">
                            {
                                loader === "true" ?
                                    <Loader />
                                    : null
                            }
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong></strong> {successMessage}
                            </div> : null}
                            {submitError === 1 ? <div className="Show_error_message">
                                <strong></strong> File extension not supported
                            </div> : null}
                            {showSweetAlert === "1" ? <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, delete it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure?"
                                onConfirm={(value) => {
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    const obj5 = new FormData();
                                    obj5.append("fieldName", deleteId);
                                    fetch(deleteUrl, {
                                        method: 'delete',
                                        body: obj5,
                                        headers: { 'Authorization': mounted },
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            setmyloader("false")
                                            setsuccessMessage("Deleted Successfully")
                                            setTimeout(() => setsubmitSuccess(""), 3000);
                                            setsubmitSuccess(1)
                                            identityDocumentAll()
                                            secondaryEducationAll()
                                            workRexperienceAll()
                                            englishProficiencyAll()
                                            recommendationAll()
                                            otherAll()
                                        })
                                }}
                                onCancel={() =>
                                    setshowSweetAlert("0")
                                }
                                focusCancelBtn>
                            </SweetAlert>
                                : null
                            }
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">All Students</h1>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h5>Student Details</h5>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <div className="search-bar">
                                                <Search
                                                    onSearch={value => {
                                                        var trimValue = value.trim();
                                                        setSearch(trimValue);
                                                        setCurrentPage(1);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <table className="table table-bordered dataTable" id="dataTable" width="100%" cellSpacing="0" role="grid" aria-describedby="dataTable_info" >
                                                        <thead>
                                                            <tr>
                                                                <th rowSpan="1" colSpan="1">No.</th>
                                                                <th rowSpan="1" colSpan="1">Student Id</th>
                                                                <th rowSpan="1" colSpan="1">Name</th>
                                                                <th rowSpan="1" colSpan="1">Email</th>
                                                                <th rowSpan="1" colSpan="1">Phone</th>
                                                                <th rowSpan="1" colSpan="1">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {commentsData.map((object, i) => {
                                                                return (
                                                                    <tr key={i}>
                                                                        <td>{i + 1}</td>
                                                                        <td>{object.buildStudentID}</td>
                                                                        <td> {object.name}</td>
                                                                        <td>{object.email}</td>
                                                                        <td>{object.phone}</td>
                                                                        <td>

                                                                            <button title="View Student detail" className="btn btn-success btn-sm"
                                                                                onClick={() => handleView(object._id, object.buildStudentID, object.name, object.email, object.phone
                                                                                )}>
                                                                                <FontAwesomeIcon icon={faEye} />
                                                                            </button>
                                                                            <button title="Edit" className="btn btn-success btn-sm " onClick={() => handleEditClick(object._id, object.email, object.phone)}>
                                                                                <FontAwesomeIcon icon={faPen} />
                                                                            </button>
                                                                        </td>

                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>


                                                    </table>
                                                </div>
                                                <Pagination
                                                    total={totalItems}
                                                    itemsPerPage={ITEMS_PER_PAGE}
                                                    currentPage={currentPage}
                                                    onPageChange={page => setCurrentPage(page)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body course-sidenav" id="mySideAdd" style={{ width: editWidth }}>
                                <div className="student-view container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                        </div>
                                        <div className="col-md-6">
                                            <a title="Close" data-toggle="tooltip" data-placement="right" className="closebtn" onClick={closeeditbox} >&times;</a>
                                        </div>
                                    </div>
                                    <h2>Edit Student</h2>
                                    {submitSuccess === 1 ? <div className="Show_success_message">
                                        <strong></strong> {successMessage}
                                    </div> : null}
                                    <form onSubmit={agentEditStudent}>
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
                                                                                        value={email} readOnly={true}
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
                                                                <div className="card-body">
                                                                    <div className="documents-block" id="doc-block">
                                                                        <h4>
                                                                            Documents
                                                                        </h4>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Passport Documents</label>
                                                                                    {mypassport === null || mypassport === undefined ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("passport", acceptedFiles[0]);

                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/identityDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        identityDocumentAll()
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        :
                                                                                        <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(mypassport, passportExtenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("passport", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/identityDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">10th Documents </label>
                                                                                    {mymarksheet10 === null || mymarksheet10 === undefined || mymarksheet10 === "0" ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("marksheet10", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        secondaryEducationAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(mymarksheet10, marksheet10Extenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("marksheet10", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">12th Documents</label>
                                                                                    {mymarksheet12 === null || mymarksheet12 === undefined ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("marksheet12", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        secondaryEducationAll()
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(mymarksheet12, marksheet12Extenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("marksheet12", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">UG Degree Certificate</label>
                                                                                    {myugDegree === null || myugDegree === undefined ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("ugDegree", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        secondaryEducationAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(myugDegree, ugDegreeExtenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("ugDegree", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">PG Degree Certificate</label>
                                                                                    {mypgDegree === null || mypgDegree === undefined ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("pgDegree", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        secondaryEducationAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(mypgDegree, pgDegreeExtenstion)} title="view document" className="btn btn-outline-primary" />
                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("pgDegree", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/educationDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>


                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Experience Documents</label>
                                                                                    {myexperience === null || myexperience === undefined ?
                                                                                        <Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("document", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/experienceDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        workRexperienceAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
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
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(myexperience, experienceExtenstion)} title="view document" className="btn btn-outline-primary" />
                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("document", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/experienceDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">IELTS Documents</label>
                                                                                    {myenglish === null || myenglish === undefined || myenglish === "0" || myenglish === "" ?
                                                                                        < Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("file", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/englishProficiencyDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        englishProficiencyAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
                                                                                            setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                                preview: URL.createObjectURL(file)
                                                                                            })));
                                                                                        }} name="heroImage" multiple={false} >
                                                                                            {({ getRootProps, getInputProps }) => (
                                                                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                                                                    <input {...getInputProps()} />
                                                                                                    <div style={{ fontSize: ".8rem" }}>
                                                                                                        Upload/Drag & Drop here
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Dropzone >
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(myenglish, englishExtenstion)} title="view document" className="btn btn-outline-primary" />
                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("file", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/englishProficiencyDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Letter of recommendation Documents</label>
                                                                                    {myrecommendation === null || myrecommendation === undefined ?
                                                                                        < Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("document", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/recommendationDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        recommendationAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
                                                                                            setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                                preview: URL.createObjectURL(file)
                                                                                            })));
                                                                                        }} name="heroImage" multiple={false} >
                                                                                            {({ getRootProps, getInputProps }) => (
                                                                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                                                                    <input {...getInputProps()} />
                                                                                                    <div style={{ fontSize: ".8rem" }}>
                                                                                                        Upload/Drag & Drop here
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Dropzone >
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(myrecommendation, recommendationExtenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("document", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/recommendationDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Other Documents</label>
                                                                                    {myother === null || myother === undefined ?
                                                                                        < Dropzone onDrop={(acceptedFiles) => {
                                                                                            setmyloader("true")
                                                                                            var fileName = acceptedFiles[0].path;
                                                                                            var fileExtension = fileName.split('.').pop();
                                                                                            if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                            ) {
                                                                                                setmyPassportDocx("0")
                                                                                                const obj5 = new FormData();
                                                                                                obj5.append("file", acceptedFiles[0]);
                                                                                                fetch(process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/otherDocument', {
                                                                                                    method: 'put',
                                                                                                    body: obj5,
                                                                                                    headers: { 'Authorization': mounted },
                                                                                                })
                                                                                                    .then(response => response.json())
                                                                                                    .then(data => {
                                                                                                        setmyloader("false")
                                                                                                        otherAll();
                                                                                                    })
                                                                                            }
                                                                                            else {
                                                                                                setmyloader("false")
                                                                                                setTimeout(() => setsubmitError(""), 3000);
                                                                                                setsubmitError(1)
                                                                                            }
                                                                                            setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                                                preview: URL.createObjectURL(file)
                                                                                            })));
                                                                                        }} name="heroImage" multiple={false} >
                                                                                            {({ getRootProps, getInputProps }) => (
                                                                                                <div {...getRootProps({ className: 'dropzone' })}>
                                                                                                    <input {...getInputProps()} />
                                                                                                    <div style={{ fontSize: ".8rem" }}>
                                                                                                        Upload/Drag & Drop here
                                                                                                    </div>
                                                                                                </div>
                                                                                            )}
                                                                                        </Dropzone >
                                                                                        : <div>
                                                                                            <FontAwesomeIcon icon={faEye} onClick={() => viewSingleDocument(myother, otherExtenstion)} title="view document" className="btn btn-outline-primary" />

                                                                                            <button title="Delete" type="button"
                                                                                                onClick={() => onDeletePassportHandle("file", process.env.REACT_APP_SERVER_URL + 'agent/students/' + student_id + '/otherDocument')}
                                                                                                className="btn btn-outline-danger">
                                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                                            </button>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-4">
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
                                </div>
                            </div>
                            <Modal className="modal-container"
                                show={showModal}
                                onHide={() => close()}
                                animation={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Document</Modal.Title>
                                </Modal.Header>
                                <div className="modal-body">
                                    {showModalExtensionValue === "jpeg" || showModalExtensionValue === "jpg" || showModalExtensionValue === "png" ?
                                        <img src={showModalValue} alt="passport" loading="lazy" />
                                        : showModalExtensionValue === "pdf" ?
                                            <div>
                                                <iframe src={showModalValue} width="100%" height="500px"></iframe>
                                            </div>
                                            : null
                                    }
                                </div>
                            </Modal>
                            <div id="mySidenav" className="sidenav allap" style={{ width: secondviewWidth }}>
                                <section className="pcoded-main-containerx ">
                                    <div className="pcoded-content">
                                        <div className="countainer">
                                            <div className="row mt-3" >
                                                <div className="col-md-12">
                                                    <a onClick={() => handleSecondCloseView()} className="closebtn" >×</a>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <div className="row">
                                                                <div className="col-md-4 text-left">

                                                                </div>
                                                                <div className="col-md-4"></div>
                                                                <div className="col-md-4 text-right">
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-5"> <h5>All Application Of {studentName}</h5> </div>

                                                                <div className="col-md-7 text-right">
                                                                    <div className="row">
                                                                        <div className="col-md-5"></div>
                                                                        <div className="col-md-4">
                                                                            {/* <div className="search-barc">
                                                                <input type="text" className="form-control " placeholder="Search hear" />
                                                            </div> */}
                                                                        </div>
                                                                        <div className="col-md-3"> <button title="Applied Application View" className="btn btn-primary" onClick={() => handleAddorder()}>   Add Application </button></div>
                                                                    </div>


                                                                </div>
                                                            </div>
                                                            <div className="row mt-5">

                                                                <div className="col-md-3">
                                                                    <h5>Student ID </h5>
                                                                    <p>{mybuildStudentID} </p>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h5>	Student Name</h5>
                                                                    <p>{studentName} </p>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h5>Student Email </h5>
                                                                    <p>{studentEmail}</p>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h5>Phone Number </h5>
                                                                    <p>{studentPhone}</p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="card-body table-border-style">
                                                            <div className="table-responsive">
                                                                <table className="table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>No.</th>
                                                                            <th>Application ID</th>
                                                                            <th>Country</th>
                                                                            <th>University Name</th>
                                                                            <th>Course Name</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {orderdata.map((object, i) => {
                                                                            return (
                                                                                <tr key={i}>
                                                                                    <td>{i + 1}</td>
                                                                                    <td>{object.buildApplicationID}</td>
                                                                                    <td>{object.country}</td>

                                                                                    <td>{object.universityName}</td>
                                                                                    <td>{object.courseName}</td>
                                                                                    <td>
                                                                                        <button title="View single Application" className="btn btn-success"
                                                                                            onClick={() => handleViewApplication(object._id)}>
                                                                                            <FontAwesomeIcon icon={faEye} />
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            )
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div id="mySidenav" className="sidenav allap" style={{ width: thirdviewWidth }}>
                                <section className="pcoded-main-containerx ">
                                    <div className="pcoded-content">
                                        <div className="countainer">
                                            <div className="row mt-3" >
                                                <div className="col-md-12">
                                                    <a onClick={() => handleThirdCloseView()} className="closebtn" >×</a>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <div className="card">
                                                        {submitSuccess === 1 ? <div className="Show_success_message">
                                                            <strong></strong> {successMessage}
                                                        </div> : null}
                                                        <div className="card-body table-border-style">
                                                            <form onSubmit={agentAddOrder}>
                                                                <div className="card-body">
                                                                    <div className="application-process" id="ap-pro">
                                                                        <h4>
                                                                            Apply For Any Application
                                                                        </h4>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label>Country<span className="req-star">*</span></label>
                                                                                    <select
                                                                                        value={countryName} required
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
                                                                                <label className="form-label">Universities<span className="req-star">*</span></label>
                                                                                <select required
                                                                                    onChange={(e) => handleUniversityName(e.target.value)}
                                                                                    className="form-select ">
                                                                                    <option value="">Select University</option>
                                                                                    {UniveristyValues.map((element, index) => (
                                                                                        <>

                                                                                            <option key={index} value={element._id + "$$" + element.universityPrimaryInformation.name}>{element.universityPrimaryInformation.name}</option>
                                                                                        </>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <label className="form-label">Courses<span className="req-star">*</span></label>
                                                                                <select required
                                                                                    value={courseFull}
                                                                                    onChange={(e) => handleuniversityCourse(e.target.value)}
                                                                                    className="form-select ">
                                                                                    <option value="">Select Course</option>
                                                                                    {coursevalues.map((element, index) => (
                                                                                        <>
                                                                                            <option key={index} value={element.month + "$$" + element.courseName + "$$" + element._id}>{element.courseName}</option>
                                                                                        </>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-4">
                                                                                <label className="form-label">Intake<span className="req-star">*</span></label>
                                                                                <select required
                                                                                    value={intakeMonth}
                                                                                    onChange={(e) => handleIntake(e.target.value)}
                                                                                    className="form-select ">
                                                                                    <option value="">Select Intake</option>
                                                                                    {intakeValues.map((element, index) => (
                                                                                        <>
                                                                                            <option key={index} value={element}>{element}</option>
                                                                                        </>
                                                                                    ))}
                                                                                </select>
                                                                            </div>
                                                                            <div className="col-md-4" />
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
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div id="mySidenav" className="sidenav allap" style={{ width: fourthviewWidth }}>
                                <section className="pcoded-main-containerx ">
                                    <div className="pcoded-content">
                                        <div className="countainer">
                                            <div className="row mt-3" >
                                                <div className="col-md-12">
                                                    <a onClick={() => handleFourthCloseView()} className="closebtn" >×</a>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-8">
                                                    <div className="card">
                                                        <div className="card-body table-border-style">
                                                            <div id="collapseOne" className="collapse show" data-bs-parent="#accordion" style={{}}>
                                                                <div className="card-body">
                                                                    <h5>Application Information</h5>
                                                                    <hr />
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <h5>Application ID </h5>
                                                                            <p>{mybuildApplicationID}</p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <h5>Student ID </h5>
                                                                            <p>{mybuildStudentID} </p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <h5>	Student Name</h5>
                                                                            <p>{studentName} </p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <h5>Student Email </h5>
                                                                            <p>{studentEmail}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-3">
                                                                            <h5>	Student Phone </h5>
                                                                            <p>{studentPhone}</p>
                                                                        </div>

                                                                        <div className="col-md-3">
                                                                            <h5>University Name</h5>
                                                                            <p>{universityName}</p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <h5>	Course Name </h5>
                                                                            <p>{courseName}</p>
                                                                        </div>
                                                                        <div className="col-md-3">
                                                                            <h5> Session</h5>
                                                                            <p>{mysession} </p>
                                                                        </div>
                                                                    </div>

                                                                    <h5>Payment Details</h5>
                                                                    <hr />
                                                                    <div className="row">
                                                                        <div className="col-md-9">
                                                                            {myapplicationProgressStep >= 2 && totalPrice !== undefined
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

                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="refresblock">
                                                                <span title="Refresh" className="msgRefreshRight" onClick={() => handleRefresh()}>
                                                                    <FontAwesomeIcon icon={faRedo} />
                                                                    Refresh
                                                                </span>
                                                            </div>
                                                            <div className="col-xl-12">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="chat-message msg_list">
                                                                            <div className="row">
                                                                                <div className="col-md-12">
                                                                                    {FormMsgValues.map((element, index) => {
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
                                                                                                                <div className="anw-content-rightblock  light-greenish">
                                                                                                                    <div className="des-title">
                                                                                                                        <h6><strong>Student:</strong> ({studentName}) Sent a Message</h6><span className="date-block">{element.messageTime}</span>
                                                                                                                    </div>
                                                                                                                    <div className="reply-content ">
                                                                                                                        <p>{element.message}</p>
                                                                                                                        {element.file !== "" ? <a className="appAttachment" href={element.file} target="_blank">download Attachment</a>
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
                                                                                                            <div className="anw-content-rightblock  drak-blue">
                                                                                                                <div className="des-title">
                                                                                                                    <h6><strong>Visa Team:</strong>(admin) Sent a Message </h6><span className="date-block">{element.messageTime}</span>
                                                                                                                </div>
                                                                                                                <div className="reply-content ">
                                                                                                                    <p>{element.message}</p>
                                                                                                                    {element.file !== "" ? <a className="appAttachment" href={element.file} target="_blank">download Attachment</a>
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
                                                                        <div className="refresblock">
                                                                            <span title="Chat load" className="msgRefreshRight" onClick={() => handleRefresh()}>
                                                                                <FontAwesomeIcon icon={faRedo} />
                                                                                Refresh
                                                                            </span>
                                                                        </div>
                                                                        <div className="msg-form">
                                                                            <form onSubmit={handleMsgSubmit}>
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <div className="form-group">
                                                                                            <label className="form-label">Message
                                                                                                <span className="req-star">*</span></label>
                                                                                            <textarea rows={5} cols={7} className="form-control" value={message}
                                                                                                onChange={(e) => setmessage(e.target.value)} required />
                                                                                            <label className="form-label">Upload file
                                                                                            </label>
                                                                                            <Dropzone onDrop={(acceptedFiles) => {
                                                                                                setmsgFile(acceptedFiles[0])

                                                                                                setselectedfileName(acceptedFiles[0].name)
                                                                                                var fileName = acceptedFiles[0].path;
                                                                                                var fileExtension = fileName.split('.').pop();
                                                                                                if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                                                    || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                                                ) {


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
                                                                                    <FontAwesomeIcon icon={faPaperPlane} /> Send</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card mb-4">
                                                        <div className="profile-main">
                                                            <div className="application-current-status">
                                                                <h5>Application Current Status</h5>
                                                                <ul>
                                                                    {universityApplication.map((object, i) => {
                                                                        return (
                                                                            <div key={i}>
                                                                                {i <= myapplicationProgressStep ?
                                                                                    <>
                                                                                        {object === myapplicationProgress ?
                                                                                            <li className="statusBox current-stat" style={{ 'backgroundColor': '#0982A5' }}>{object}<span>
                                                                                                <FontAwesomeIcon icon={faCheckCircle} />
                                                                                            </span></li>
                                                                                            : <li className="statusBox" style={{ 'backgroundColor': "#fff" }}>{object}<span>
                                                                                                <FontAwesomeIcon icon={faCheckCircle} />
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
                                </section >
                            </div >
                        </div >
                    </div >
                </div >
            </div >
        </div >
    );
}
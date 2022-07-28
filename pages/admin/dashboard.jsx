import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/admin/DataTable";
import SweetAlert from 'react-bootstrap-sweetalert';

// import '../../scss/adminStudentApplication.scss';
import Dropzone from "react-dropzone";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import Loader from '../../components/Loader';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';

import { saveAs } from "file-saver";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye, faCloudDownload, faCheckCircle, faPaperPlane, faRedo, faTrash,faDownload
} from '@fortawesome/free-solid-svg-icons';
export default function AdminStudentApplication() {
    const [resultDocument, setresultDocument] = useState([{
    }])
    // const { state1 } = useLocation();
    //start for set extenstion
    const [myagentName, setmyagentName] = useState("");
    const [myagentEmail, setmyagentEmail] = useState("");
    const [deleteId, setdeleteId] = useState("");

    const [myindexValue, setmyindexValue] = useState();
    const [mypaid, setmypaid] = useState("");
    const [myfamilyResult, setmyfamilyResult] = useState("");
    const [myeducationResult, setmyeducationResult] = useState("");
    const [mytestResult, setmytestResult] = useState("");
    const [mypersonalResult, setmypersonalResult] = useState("");
    const [myaddressResult, setmyaddressResult] = useState("");
    const [myexperienceResult, setmyexperienceResult] = useState("");
    const [myactivityResult, setmyactivityResult] = useState("");
    const [myrecommendationResult, setmyrecommendationResult] = useState("");





    const [selectedfileName, setselectedfileName] = useState("");

    const [id, setid] = useState("");
    const [mycourseID, setmycourseID] = useState("");
    const [msgFile, setmsgFile] = useState([]);
    const [refreshMsg, setrefreshMsg] = useState([]);
    const [myobj, setmyobj] = useState([]);
    const [mydate, setmydate] = useState("");
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [submitError, setsubmitError] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [showSweetAlertDelete, setshowSweetAlertDelete] = useState("0");
    const [applicationFeeStatus, setapplicationFeeStatus] = useState("");
    const [applicationcurrency, setapplicationcurrency] = useState("");
    const [applicationFee, setapplicationFee] = useState("");
    const [splitFirstname, setsplitFirstname] = useState();

    const [showModalExtensionValue, setshowModalExtensionValue] = useState();
    //start passport no
    const [passportNo, setpassportNo] = useState("");
    const [passportIssueDate, setpassportIssueDate] = useState("");
    const [passportexpiryDate, setpassportexpiryDate] = useState("");
    const [passportCountry, setpassportCountry] = useState("");
    const [passportBirthPlace, setpassportBirthPlace] = useState("");
    const [aadharCardNo, setaadharCardNo] = useState("");
    //end passport no
    //end for set extension
    const [mounted, setMounted] = useState();
    const [myviewApplicationId, setmyviewApplicationId] = useState();
    const [data, setdata] = useState([]);
    const [firstviewWidth, setfirstviewWidth] = useState("0px");
    const [loader, setmyloader] = useState("false");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [successMessage, setsuccessMessage] = useState("");
    const [applicationNo, setapplicationNo] = useState("");
    const [mystudentID, setmystudentID] = useState("");
    const [universityApplication, setuniversityApplication] = useState([])
    const [FormStudentApplicationValues, setFormStudentApplicationValues] = useState([]);
    const [salutation, setsalutation] = useState("");
    const [firstName, setfirstName] = useState("");
    const [middleName, setmiddleName] = useState("");
    const [lastName, setlastName] = useState("");
    const [otherName, setotherName] = useState("");
    const [gender, setgender] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [countryOfBirth, setcountryOfBirth] = useState("");
    const [nationality, setnationality] = useState("");
    const [dualNationality, setdualNationality] = useState("");
    const [maritalStatus, setmaritalStatus] = useState("");
    const [differentlyAble, setdifferentlyAble] = useState("");
    const [passport, setpassport] = useState("");
    const [aadharCard, setaadharCard] = useState("");
    const [firstLanguage, setfirstLanguage] = useState("");
    const [visa, setvisa] = useState("");
    const [refusedVisa, setrefusedVisa] = useState("");
    const [country, setcountry] = useState();
    const [state, setstate] = useState();
    const [city, setcity] = useState();
    const [address, setaddress] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [communication_address, setcommunication_address] = useState("no");
    const [secondviewWidth, setsecondviewWidth] = useState("0px");
    const [mybuildApplicationID, setmybuildApplicationID] = useState("");
    const [myname, setmyname] = useState("");
    const [myemail, setmyemail] = useState("");
    const [myphone, setmyphone] = useState("");
    const [myuniversityName, setmyuniversityName] = useState("");
    const [mycourseName, setmycourseName] = useState("");
    const [messageError, setmessageError] = useState("");
    const [mybuildStudentID, setmybuildStudentID] = useState("");
    const [viewDocumentValue, setviewDocumentValue] = useState("");
    const [showModal, setshowModal] = useState(false);
    const [myapplicationProgressStep, setmyapplicationProgressStep] = useState("");
    const [myapplicationProgress, setmyapplicationProgress] = useState("");
    const [FormFamilyValues, setFormFamilyValues] = useState([{
        relationship: "", salutation: "", firstName: "", middleName: "", lastName: "", email: "",
        mobile: "", occupation: "", qualification: "", _id: "null"
    }])
    const [formEducationValues, setformEducationValues] = useState([{
        highestEducation: "", status: "", specialization: "", degree: "", gradePercentage: "", marks: "", attendedForm: "",
        institution: "", affiliationUniversity: "", language: "", country: "", state: "", city: "", address: "", zipcode: "",
        _id: "null"
    }])
    const [scoremarks, setscoremarks] = useState("");
    const [scoreenglishProficiency, setscoreenglishProficiency] = useState("");
    const [scoregre, setscoregre] = useState("");
    const [scoresat, setscoresat] = useState("");
    //START
    const [scoreexamType, setscoreexamType] = useState("");
    const [scoreexaminationDate, setscoreexaminationDate] = useState("");
    const [scoreoverall, setscoreoverall] = useState("");
    const [scorelistening, setscorelistening] = useState("");
    const [scorereading, setscorereading] = useState("");
    const [scorwriting, setscorwriting] = useState("");
    const [scorspeaking, setscorspeaking] = useState("");



    //END
    const [FormExperienceValues, setFormExperienceValues] = useState([{
        status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "",
        _id: "null"
    }])
    const [formActivityValues, setformActivityValues] = useState([{
        activityStatus: "", activity: "", position: "", description: "", started: "", ended: "", apply: "",

        _id: "null"
    }])
    const [FormRecommendationValues, setFormRecommendationValues] = useState([{
        type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "",
        _id: "null"
    }])
    const [FormValues, setFormValues] = useState([{
        message: "", type: "", file: ""
    }])
    const [message, setmessage] = useState("");
    const [mycountryID, setmycountryID] = useState("");
    //start for document show

    const [studentPassportDocument, setstudentPassportDocument] = useState("");
    const [studentPassportBackDocument, setstudentPassportBackDocument] = useState("");
    const [studentCVDocument, setstudentCVDocument] = useState("");

    // start for pagination
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;
    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },
        { name: "Application ID", field: "buildApplicationID", sortable: true },
        // { name: "Student ID", field: "studentDetail[0].buildStudentID", sortable: true },
        { name: "Student Name", field: "studentDetail[0].name", sortable: true },
        { name: "Student Email", field: "studentDetail[0].email", sortable: false },
        { name: "Student Phone", field: "studentDetail[0].phone", sortable: false },
        { name: "Agent Name", field: "studentDetail[0].agentName", sortable: false },
        { name: "Agent Email", field: "studentDetail[0].agentEmail", sortable: false },
        { name: "Country Name", field: "country", sortable: false },
        { name: "University Name", field: "universityName", sortable: false },
        { name: "Course Name", field: "courseName", sortable: false },
        { name: "Date", field: "date", sortable: false },

        { name: "Action", field: "", sortable: false },
    ];
    // end for pagination
    useEffect(() => {
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function mystudentApplications() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + 'admin/OrdersAll';
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {


                        setmyloader("false")
                        if (data.message === "Invalid Token") {
                            localStorage.removeItem("adminId");
                            localStorage.removeItem("adminToken");
                            localStorage.removeItem("adminName");
                            localStorage.removeItem("adminEmail");
                            window.location.href = "/adminlogin";
                        }


                        var orderResult = data.orders
                        orderResult.forEach((item, i) => {
                            item.NO = i + 1;
                        });

                        setComments(orderResult);
                    })
            }
            mystudentApplications()
        }
    }, [])

    useEffect(() => {
        if (id !== undefined && mystudentID !== "") {
            axios.get(process.env.REACT_APP_SERVER_URL + 'admin/msg/' + mystudentID + "/" + id, { headers: { 'Authorization': mounted } })
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
    function clickCheckboxNotHandler() {
        alert("cannot change this step")
    }
    function open() {
    }
    function close() {
        setshowModal(false)
    }
    function handleRefresh() {
        setrefreshMsg(["refresh"]);
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
    // start for pagination
    const commentsData = useMemo(() => {
        let computedComments = comments;
        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.buildApplicationID.toLowerCase().includes(search.toLowerCase()) ||
                    comment.studentID.toLowerCase().includes(search.toLowerCase()) ||
                    comment.studentDetail[0].name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.studentDetail[0].email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.studentDetail[0].phone.toLowerCase().includes(search.toLowerCase()) ||
                    comment._id.toLowerCase().includes(search.toLowerCase()) ||




                    comment.studentDetail[0].agentName.toLowerCase().includes(search.toLowerCase()) ||

                    comment.studentDetail[0].agentEmail.toLowerCase().includes(search.toLowerCase()) ||
                    comment.country.toLowerCase().includes(search.toLowerCase()) ||
                    comment.universityName.toLowerCase().includes(search.toLowerCase()) ||
                    comment.courseName.toLowerCase().includes(search.toLowerCase()) ||
                    comment.date.toLowerCase().includes(search.toLowerCase())


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
    function handleCloseView() {
        setfirstviewWidth("0px");
    }
    function handleSecondCloseView() {
        setsecondviewWidth("0px")
    }
    function handleAppliedView() {
        setsecondviewWidth("90%");
    }
    function handleDelete(id) {
        setshowSweetAlertDelete("1")
        setdeleteId(id)
    }
    function handleView(id) {

        //start all empty
        setmyloader("true")
        setfirstviewWidth("90%");
        setsecondviewWidth("0px")
        setmyfamilyResult("")
        setmyeducationResult("")
        setmytestResult("")
        setmyaddressResult("")
        setmypersonalResult("")
        setmyexperienceResult("")
        setmyactivityResult("")
        setmyrecommendationResult("")


        //start
        setsalutation("");
        setfirstName("");
        setmiddleName("");
        setlastName("");
        setotherName("");
        setgender("");
        setdateOfBirth("");
        setcountryOfBirth("");
        setnationality("");
        setdualNationality("");
        setmaritalStatus("");
        setdifferentlyAble("");
        setpassport("");
        setaadharCard("");
        setfirstLanguage("");
        setvisa("");
        setrefusedVisa("");
        setcountry("");
        setstate("");
        setcity("");
        setaddress("");
        setzipcode("");
        setcommunication_address("");
        setFormFamilyValues([{
            relationship: "", salutation: "", firstName: "", middleName: "", lastName: "", email: "",
            mobile: "", occupation: "", qualification: "", _id: "null"
        }])
        setformEducationValues([{
            highestEducation: "", status: "", specialization: "", degree: "", gradePercentage: "", marks: "", attendedForm: "",
            institution: "", affiliationUniversity: "", language: "", country: "", state: "", city: "", address: "", zipcode: "",
            _id: "null"
        }])
        setscoremarks("");
        setscoreenglishProficiency("");
        setscoregre("");
        setscoresat("");
        setscoreexamType("");
        setscoreexaminationDate("");
        setscoreoverall("");
        setscorelistening("");
        setscorereading("");
        setscorwriting("");
        setscorspeaking("");
        setFormExperienceValues([{
            status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "",
            _id: "null"
        }])
        setformActivityValues([{
            activityStatus: "", activity: "", position: "", description: "", started: "", ended: "", apply: "",

            _id: "null"
        }])
        setFormRecommendationValues([{
            type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "",

            _id: "null"
        }])
        //end 
        setid(id)
        setmyviewApplicationId(id)
        var myviewApplicationId = id
        setsalutation("");
        setfirstName("");
        setmiddleName("");
        setlastName("");
        setotherName("");
        setgender("");
        setdateOfBirth("");
        setcountryOfBirth("");
        setnationality("");
        setdualNationality("");
        setmaritalStatus("");
        setdifferentlyAble("");
        setpassport("");
        setaadharCard("");
        setfirstLanguage("");
        setvisa("");
        setrefusedVisa("");
        setcountry("");
        setstate("");
        setcity("");
        setaddress("");
        setzipcode("");
        setcommunication_address("");

        setscoremarks("");
        setscoreenglishProficiency("");
        setscoregre("");
        setscoresat("");
        //start
        setscoreexamType("");
        setscoreexaminationDate("");
        setscoreoverall("");
        setscorelistening("");
        setscorereading("");
        setscorwriting("");
        setscorspeaking("");



        //end
        setFormExperienceValues([{
            status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "", _id: "null"
        }])
        setformActivityValues([{
            activityStatus: "", activity: "", position: "", description: "", started: "", ended: "", apply: "", _id: "null"
        }])
        setFormRecommendationValues([{
            type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "", _id: "null"
        }])

        //end for all empty
        //start one order of one student
        var url80 = process.env.REACT_APP_SERVER_URL + 'admin/oneOrder/' + id;
        axios.get(url80, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {
                    var myresults = res.data.orders

                    var studentDetails = myresults[0].studentDetail[0]
                    setmyagentName(studentDetails.agentName)
                    setmyagentEmail(studentDetails.agentEmail)
                    setmyname(studentDetails.name)
                    setmybuildStudentID(studentDetails.buildStudentID)
                    var splitname = studentDetails.name.split(" ");
                    setsplitFirstname(splitname[0])
                    setmyemail(studentDetails.email)
                    setmyphone(studentDetails.phone)
                    setmypaid(myresults[0].paid)
                    setmycourseID(myresults[0].courseID)
                    setmycountryID(myresults[0].countryID)
                    setmyapplicationProgressStep(myresults[0].applicationProgressStep)
                    setmyapplicationProgress(myresults[0].applicationProgress)
                    setmycourseName(myresults[0].courseName)

                    setmyuniversityName(myresults[0].universityName)
                    setmybuildApplicationID(myresults[0].buildApplicationID)
                    setmystudentID(myresults[0].studentID)
                    var mystudentID = myresults[0].studentID

                    const url = process.env.REACT_APP_SERVER_URL + "admin/students/" + mystudentID + "/documents/";
                    fetch(url, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            var resultDocument = data.studentDocuments;
                            console.log('resultDocument')
                            console.log(resultDocument)

                            setresultDocument(resultDocument)
                        })


                    const d = new Date(myresults[0].date)
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
                    setmydate(completeTime)
                    //start for course Id


                    if (myresults[0].courseID != undefined) {
                        const url70 = process.env.REACT_APP_SERVER_URL + 'courseOrderFee/' + myresults[0].courseID;
                        fetch(url70, {
                            method: 'GET',
                            headers: { 'Authorization': mounted }
                        })
                            .then(response => response.json())
                            .then(data => {

                                var myapplicationFee = data.courses.applicationFee

                                setapplicationFeeStatus(data.courses.applicationFeeStatus)
                                setapplicationcurrency(data.courses.applicationcurrency)
                                setapplicationFee(data.courses.applicationFee)

                            })
                    }
                    {
                        // settotalPrice(myresults.appPrice)
                        // setcurrency(myresults.appCurrency)

                        setapplicationcurrency(myresults[0].appCurrency)
                        setapplicationFee(myresults[0].appPrice)
                    }

                    //end for course Id
                    //    start for country Id


                    // const url60 = process.env.REACT_APP_SERVER_URL + 'admin/countries/' + myresults[0].countryID;
                    // fetch(url60, {
                    //     method: 'GET',
                    //     headers: { 'Authorization': mounted }
                    // })
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         setuniversityApplication(data.adminCountry.countrySteps)
                    //     })


                    const url60 = process.env.REACT_APP_SERVER_URL + 'countryStepName/' + myresults[0].country;
                    fetch(url60, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setuniversityApplication(data.adminCountry.countrySteps)
                        })

                    //end for country Id
                    //start for student details
                    var url8 = process.env.REACT_APP_SERVER_URL + 'admin/Orders/' + mystudentID;
                    axios.get(url8, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            if (res.data.success === true) {
                                var myresults = res.data.orders


                                setapplicationNo(Object.keys(myresults).length)
                                setFormStudentApplicationValues(res.data.orders)
                            }
                        })
                        .catch(error => {
                        });
                    if (mystudentID !== "") {
                        axios.get(process.env.REACT_APP_SERVER_URL + 'admin/msg/' + mystudentID + "/" + id, { headers: { 'Authorization': mounted } })
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
                    var url2 = process.env.REACT_APP_SERVER_URL + 'admin/allInfo/' + mystudentID;
                    axios.get(url2, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            var personalInfoResult = res.data.allInfo[0].studentPersonalInformation
                            if (personalInfoResult === undefined || personalInfoResult === null) {
                                setmypersonalResult("empty")
                            }
                            else {
                                var myPersonalInfo = res.data.allInfo[0].studentPersonalInformation
                                setsalutation(myPersonalInfo.salutation);
                                setfirstName(myPersonalInfo.firstName);
                                setmiddleName(myPersonalInfo.middleName);
                                setlastName(myPersonalInfo.lastName);
                                setotherName(myPersonalInfo.otherName);
                                setgender(myPersonalInfo.gender);
                                setdateOfBirth(myPersonalInfo.dateOfBirth);
                                setcountryOfBirth(myPersonalInfo.countryOfBirth);
                                setnationality(myPersonalInfo.nationality);
                                setdualNationality(myPersonalInfo.dualNationality);
                                setmaritalStatus(myPersonalInfo.maritalStatus);
                                setdifferentlyAble(myPersonalInfo.differentlyAble);
                                setpassport(myPersonalInfo.passport);
                                setaadharCard(myPersonalInfo.aadharCard);
                                setfirstLanguage(myPersonalInfo.firstLanguage);
                                setvisa(myPersonalInfo.visa);
                                setrefusedVisa(myPersonalInfo.refusedVisa);
                                //start passport no
                                setpassportNo(myPersonalInfo.passportNo);
                                setpassportIssueDate(myPersonalInfo.passportIssueDate)
                                setpassportexpiryDate(myPersonalInfo.passportexpiryDate)
                                setpassportCountry(myPersonalInfo.passportCountry)
                                setpassportBirthPlace(myPersonalInfo.passportBirthPlace)
                                setaadharCardNo(myPersonalInfo.aadharCardNo)
                                //end passport no
                            }
                            var addressResult = res.data.allInfo[0].studentAddress

                            if (addressResult === undefined) {
                                setmyaddressResult("empty")

                            }
                            else {
                                var studentAddress = res.data.allInfo[0].studentAddress;
                                setcountry(studentAddress.country);
                                setstate(studentAddress.state);
                                setcity(studentAddress.city);
                                setaddress(studentAddress.address);
                                setzipcode(studentAddress.zipcode);
                                setcommunication_address(studentAddress.communication_address);
                            }

                            var familyResult = res.data.allInfo[0].studentFamilies

                            if (Object.keys(familyResult).length === 0) {
                                setmyfamilyResult("empty")
                            }
                            else {
                                setFormFamilyValues(familyResult)
                            }
                            var educationResult = res.data.allInfo[0].studentEducations

                            if (Object.keys(educationResult).length === 0) {
                                setmyeducationResult("empty")
                            }
                            else {
                                setformEducationValues(educationResult)
                            }
                            var testResult = res.data.allInfo[0].studentScore
                            if (testResult === undefined) {
                                setmytestResult("empty")
                            }
                            else {
                                setscoremarks(testResult.marks)
                                setscoreenglishProficiency(testResult.englishProficiency)
                                setscoregre(testResult.gre)
                                setscoresat(testResult.sat)
                                setscoreexamType(testResult.examType)
                                setscoreexaminationDate(testResult.examinationDate)
                                setscoreoverall(testResult.overall)
                                setscorelistening(testResult.listening)
                                setscorereading(testResult.reading)
                                setscorwriting(testResult.writing)
                                setscorspeaking(testResult.speaking)
                            }
                            var experienceResult = res.data.allInfo[0].studentExperiences
                            if (Object.keys(experienceResult).length === 0) {
                                setmyexperienceResult("empty")
                            }
                            else {
                                setFormExperienceValues(experienceResult)
                            }
                            var activityResult = res.data.allInfo[0].studentActivities

                            if (Object.keys(activityResult).length === 0) {
                                setmyactivityResult("empty")
                            }
                            else {
                                setformActivityValues(activityResult)
                            }
                            var recommendationResult = res.data.allInfo[0].studentProfileRecommendations

                            if (Object.keys(recommendationResult).length === 0) {
                                setmyrecommendationResult("empty")
                            }
                            else {
                                setFormRecommendationValues(recommendationResult)
                            }
                        })
                        .catch(error => {
                        });
                    //remove document for student
                    //end for student details

                }
            })
            .catch(error => {
            });
        ///end one order of one student

        // setmyagentName(agentName)
        // setmyagentEmail(agentEmail)





        //start for order update 
        const obj2 = {
            view: 1,

        };
        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/orderView/' + id, obj2, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setmyloader("false")
                if (res.data.success === true) {
                    const url = process.env.REACT_APP_SERVER_URL + 'admin/OrdersAll';
                    fetch(url, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            var orderResult = data.orders
                            orderResult.forEach((item, i) => {
                                item.NO = i + 1;
                            });

                            setComments(orderResult);
                        })
                }
            })
            .catch(error => {
            });
        //end for order update
        setmyloader("false")
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        setmessageError("")
        if (message === "") {
            setmessageError("Please Enter Message")
        }
        else {
            setmyloader("true")

            const obj = new FormData();
            obj.append("message", message);
            obj.append("studentID", mystudentID);
            obj.append("type", 0);
            obj.append("file", msgFile);
            obj.append("msgfileName", selectedfileName);
            obj.append("mybuildApplicationID", mybuildApplicationID);
            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/msg/' + mystudentID + "/" + id, obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {

                    setmyloader("false")
                    setselectedfileName("")
                    if (res.data.success === true) {
                        setsuccessMessage("Message Sent")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        setmessage("")
                        axios.get(process.env.REACT_APP_SERVER_URL + 'admin/msg/' + mystudentID + "/" + id, { headers: { 'Authorization': mounted } })
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
    function clickCheckboxHandler(value1, value2, myemail) {
        setshowSweetAlert("1")
        if (myagentEmail !== "") {
            var mailId = myagentEmail
            var loginUrl = "https://abroad.coursementor.com/agentlogin"
        }
        else {
            var mailId = myemail
            var loginUrl = "https://abroad.coursementor.com/StudentLogin"
        }
        const obj = {
            applicationProgress: value1,
            applicationProgressStep: value2,
            email: mailId,
            applicationFee: applicationFee,
            applicationcurrency: applicationcurrency,
            mybuildApplicationID: mybuildApplicationID,
            myname: myname,
            universityName: myuniversityName,
            courseName: mycourseName,
            loginUrl: loginUrl
        };
        setmyobj(obj)

    }
    function handleFeeSubmit(event) {
        event.preventDefault();
        setmyloader("true")
        const obj = {
            appPrice: applicationFee,
            appCurrency: applicationcurrency,
        };
        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/updateOrderFee/' + id, obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setmyloader("false")
                if (res.data.success === true) {
                    setsuccessMessage("Application Fee Updated")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                }
            })
            .catch(error => {
            });
    }
    function downloadAllDocument() {
        var jsonData = {};
        resultDocument.forEach(function (column) {
            jsonData[mybuildStudentID + "-" + myname + "-" + column.documentName + column.name + "." + column.fileExtension] = column.file;
        });
        const obj1 = new FormData();
        obj1.append("vehicle", JSON.stringify(jsonData));
        const url4 = 'https://coursementor.com/uploadApi/downloadMany.php';
        fetch(url4, {
            method: 'POST',
            body: obj1,
            headers: { 'Accept': "application/zip" },
            responseType: "arraybuffer",

        }).then(res => res.blob())
            .then(blob => saveAs(blob, mybuildStudentID + "-" + myname + "-" + "allDocument.zip"))
            .catch((err) => {
            });
    }
    function dummy(value) {

        setmyindexValue(value)
        setshowModal(true)
    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container-fluid admin-dashboard admin-icon" >
                            {showSweetAlert === "1" ? <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, Confirm it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure want to update application status?"
                                onConfirm={(value) => {
                                    var adminUniversityId = localStorage.getItem('adminUniversityId');
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    axios.put(process.env.REACT_APP_SERVER_URL + 'admin/orderUpdate/' + myviewApplicationId, myobj, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("Application Step Updated")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)

                                                setmyapplicationProgressStep(myobj.applicationProgressStep)
                                                setmyapplicationProgress(myobj.applicationProgress)
                                            }
                                        })
                                        .catch(error => {
                                        });

                                }}
                                onCancel={() =>
                                    setshowSweetAlert("0")
                                }
                                focusCancelBtn
                            >
                            </SweetAlert>
                                : null
                            }
                            {showSweetAlertDelete === "1" ? <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, Confirm it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure want to delete this application?"
                                onConfirm={(value) => {
                                    var adminUniversityId = localStorage.getItem('adminUniversityId');
                                    setshowSweetAlertDelete("0");
                                    setmyloader("true")
                                    const url = process.env.REACT_APP_SERVER_URL + 'admin/OrderDelete/' + deleteId;
                                    fetch(url, {
                                        method: 'delete',
                                        headers: { 'Authorization': mounted }
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            setmyloader("false")
                                            setsuccessMessage("Application Deleted")
                                            setTimeout(() => setsubmitSuccess(""), 3000);
                                            setsubmitSuccess(1)
                                            const url11 = process.env.REACT_APP_SERVER_URL + 'admin/OrdersAll';
                                            fetch(url11, {
                                                method: 'GET',
                                                headers: { 'Authorization': mounted }
                                            })
                                                .then(response => response.json())
                                                .then(data => {

                                                    var orderResult = data.orders
                                                    orderResult.forEach((item, i) => {
                                                        item.NO = i + 1;
                                                    });

                                                    setComments(orderResult);
                                                })
                                        })

                                }}
                                onCancel={() =>
                                    setshowSweetAlertDelete("0")
                                }
                                focusCancelBtn
                            >
                            </SweetAlert>
                                : null
                            }

                            {
                                loader === "true" ?
                                    <Loader />
                                    : null
                            }
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Student Application</h1>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card">
                                        <div className="card-header">
                                            <div className="row">
                                                <div className="col-md-6"><h5>All Student Application</h5></div>
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
                                        <div className="card-body table-border-style">
                                            <div className="table-responsive">
                                                <table className="table table-hover">

                                                    <TableHeader

                                                        headers={tableHeaders}
                                                        onSorting={(field, order) =>
                                                            setSorting({ field, order })
                                                        }
                                                    />
                                                    <tbody>
                                                        {commentsData.map((object, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{object.NO}
                                                                        {object.view === 0 ?
                                                                            <span className="badge badge-danger msg-notif">new</span>
                                                                            : null}
                                                                    </td>
                                                                    <td> {object.studentDetail[0].buildStudentID + "-" + object.buildApplicationID}</td>
                                                                    {/* <td>{object.studentDetail[0].buildStudentID}</td> */}
                                                                    <td>{object.studentDetail[0].name}</td>
                                                                    <td>{object.studentDetail[0].email}</td>
                                                                    <td>{object.studentDetail[0].phone}</td>
                                                                    <td>{object.studentDetail[0].agentName}</td>
                                                                    <td>{object.studentDetail[0].agentEmail}</td>
                                                                    <td>{object.country}</td>
                                                                    <td>{object.universityName}</td>
                                                                    <td>{object.courseName}</td>
                                                                    <td>{object.date}</td>

                                                                    {/* <td>{object.view}</td> */}
                                                                    <td>
                                                                        <button title="View Student Application" className="btn btn-success"
                                                                            onClick={() => handleView(object._id)}

                                                                        >
                                                                            <FontAwesomeIcon icon={faEye} />
                                                                        </button>
                                                                        <button title="Delete Student Application" className="btn btn-success"
                                                                            onClick={() => handleDelete(object._id)}

                                                                        >
                                                                            <FontAwesomeIcon icon={faTrash} />
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
                            <div id="mySidenav" className="sidenav" style={{ width: firstviewWidth }}>
                                {submitError === 1 ? <div className="Show_error_message">
                                    <strong></strong> File extension not supported
                                </div> : null}
                                <section className="pcoded-main-containerx ">

                                    <div className="pcoded-content">
                                        <div className="container-fluid">
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <a onClick={() => handleCloseView()} className="closebtn" >×</a>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <div className="card">

                                                        <div className="card-body table-border-style">
                                                            <div className="row">
                                                                <div className="col-xl-8 col-lg-7">
                                                                    <div className="mb-4">
                                                                        <div className="admin">
                                                                            <div id="accordion">
                                                                                <div className="card-header app">
                                                                                    <div className="row">
                                                                                        <div className="col-md-4">
                                                                                            <h5>Application ID <span title="Application ID" className="badge badge-info">{mybuildStudentID + "-" + mybuildApplicationID}</span></h5>
                                                                                        </div>
                                                                                        <div className="col-md-4 text-center">
                                                                                        </div>
                                                                                        {submitSuccess === 1 ? <div className="Show_success_message">
                                                                                            <strong>Success!</strong> {successMessage}
                                                                                        </div> : null}
                                                                                        <div className="col-md-4 text-right">
                                                                                            <button title="Applied Application View" className="btn btn-primary" onClick={() => handleAppliedView()}>   Applied Application <span className="badge badge-light">{applicationNo}</span></button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="card">
                                                                                    <div id="collapseOne" className="collapse show" data-bs-parent="#accordion" style={{}}>
                                                                                        <div className="card-body">

                                                                                            <h5>Application Information</h5>
                                                                                            <hr />

                                                                                            <div className="row">

                                                                                                <div className="col-md-3">
                                                                                                    <h5>Application ID </h5>
                                                                                                    <p>{mybuildStudentID + "-" + mybuildApplicationID}</p>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <h5>Student ID </h5>
                                                                                                    <p>{mybuildStudentID}</p>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <h5>	Student Name</h5>
                                                                                                    <p>{myname} </p>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <h5>Student Email </h5>
                                                                                                    <p>{myemail}</p>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="row">

                                                                                                <div className="col-md-3">
                                                                                                    <h5>	Student Phone </h5>
                                                                                                    <p>{myphone}</p>
                                                                                                </div>

                                                                                                <div className="col-md-3">
                                                                                                    <h5>University Name</h5>
                                                                                                    <p>{myuniversityName}</p>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <h5>	Course Name </h5>
                                                                                                    <p>{mycourseName}</p>
                                                                                                </div>
                                                                                                <div className="col-md-3">
                                                                                                    <h5>	Applied Date</h5>
                                                                                                    <p>{mydate}</p>
                                                                                                </div>
                                                                                            </div>

                                                                                            <div className="col-md-12">

                                                                                                <>
                                                                                                    <h5>Payment Detail</h5>
                                                                                                    <hr />
                                                                                                    {applicationFee !== undefined
                                                                                                        ?
                                                                                                        <div className="row">

                                                                                                            <div className="col-md-3">
                                                                                                                <h5>Application Fee</h5>


                                                                                                                <p>{applicationFee + " " + applicationcurrency}</p>
                                                                                                            </div>
                                                                                                            <div className="col-md-3">
                                                                                                                <h5>Paid</h5>
                                                                                                                <p>{mypaid + " " + applicationcurrency}</p>
                                                                                                            </div>

                                                                                                        </div>
                                                                                                        :
                                                                                                        <div className="col-md-3">
                                                                                                            <h5>Total Price</h5>


                                                                                                            <p>Not Updated Yet</p>
                                                                                                        </div>
                                                                                                    }



                                                                                                </>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    {/* start for menu */}
                                                                                    <div className="activite">
                                                                                        <div className="row">
                                                                                            <div className="cardx mb-4">
                                                                                                <div className="act-note">
                                                                                                    <ul className="nav nav-tabs" role="tablist">
                                                                                                        <li className="nav-item">
                                                                                                            <a className="nav-link active" data-bs-toggle="tab" href="#message1">Messages</a>
                                                                                                        </li>
                                                                                                        <li className="nav-item">
                                                                                                            <a className="nav-link " data-bs-toggle="tab" href="#home">Application Profile</a>
                                                                                                        </li>
                                                                                                        <li className="nav-item">
                                                                                                            <a className="nav-link" data-bs-toggle="tab" href="#menu1">Documents</a>
                                                                                                        </li>
                                                                                                    </ul>
                                                                                                    {/* Tab panes */}
                                                                                                    <div className="tab-content">
                                                                                                        <div id="home" className=" tab-pane"><br />
                                                                                                            <div className="card-body">
                                                                                                                <div className="application-activity">
                                                                                                                    <div className="row">
                                                                                                                        <div className="col-md-12">
                                                                                                                            <div className="card">

                                                                                                                                <div className="card-body ">
                                                                                                                                    {mypersonalResult === "empty" ? <h5>Primary Information is not filled by user</h5>
                                                                                                                                        : <>

                                                                                                                                            <h5 className="mt-5">Primary Information</h5>
                                                                                                                                            <hr />

                                                                                                                                            <div className="row">
                                                                                                                                                {salutation != "" && salutation != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Salutation </h5>
                                                                                                                                                        <p>{salutation}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {firstName != "" && firstName != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>First Name</h5>
                                                                                                                                                        <p>{firstName}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {middleName != "" && middleName != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Middle Name</h5>
                                                                                                                                                        <p>{middleName}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {lastName != "" && lastName != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Last Name</h5>
                                                                                                                                                        <p>{lastName}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}

                                                                                                                                            </div>
                                                                                                                                            <div className="row mt-3">

                                                                                                                                                {otherName != "" && otherName != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Other Name</h5>
                                                                                                                                                        <p>{otherName}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {gender != "" && gender != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Gender</h5>
                                                                                                                                                        <p>{gender}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {dateOfBirth != "" && dateOfBirth != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Date of Birth</h5>
                                                                                                                                                        <p>{dateOfBirth}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {countryOfBirth != "" && countryOfBirth != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Country of Birth</h5>
                                                                                                                                                        <p>{countryOfBirth}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}

                                                                                                                                            </div>
                                                                                                                                            <div className="row mt-3">

                                                                                                                                                {nationality != "" && nationality != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Nationality</h5>
                                                                                                                                                        <p>{nationality}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {dualNationality != "" && dualNationality != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5> Dual Nationality</h5>
                                                                                                                                                        <p>{dualNationality}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {maritalStatus != "" && maritalStatus != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Marital Status</h5>
                                                                                                                                                        <p>{maritalStatus}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {differentlyAble != "" && differentlyAble != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>differently abled</h5>
                                                                                                                                                        <p>{differentlyAble}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}

                                                                                                                                            </div>
                                                                                                                                            {/* start for new row   */}
                                                                                                                                            <div className="row mt-3">
                                                                                                                                                {passport != "" && passport != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>valid passport</h5>
                                                                                                                                                        <p>{passport}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {aadharCard != "" && aadharCard != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5> valid Aadhar Card</h5>
                                                                                                                                                        <p>{aadharCard}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {firstLanguage != "" && firstLanguage != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>First Language</h5>
                                                                                                                                                        <p>{firstLanguage}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {visa != "" && visa != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5> valid study visa</h5>
                                                                                                                                                        <p>{visa}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {refusedVisa != "" && refusedVisa != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5> Refused Visa</h5>
                                                                                                                                                            <p>{refusedVisa}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}


                                                                                                                                                    {passportNo != "" && passportNo != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Passport No.</h5>
                                                                                                                                                            <p>{passportNo}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}


                                                                                                                                                    {passportIssueDate != "" && passportIssueDate != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Passport Issue Date</h5>
                                                                                                                                                            <p>{passportIssueDate}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                    {passportexpiryDate != "" && passportexpiryDate != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Passport Expire Date</h5>
                                                                                                                                                            <p>{passportexpiryDate}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}


                                                                                                                                                </div>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {passportCountry != "" && passportCountry != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5> Passport Issue Country</h5>
                                                                                                                                                            <p>{passportCountry}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}


                                                                                                                                                    {passportBirthPlace != "" && passportBirthPlace != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Place of Birth as per Passport</h5>
                                                                                                                                                            <p>{passportBirthPlace}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}


                                                                                                                                                    {aadharCardNo != "" && aadharCardNo != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Aadhar Card No.</h5>
                                                                                                                                                            <p>{aadharCardNo}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}




                                                                                                                                                </div>

                                                                                                                                            </div>

                                                                                                                                        </>}
                                                                                                                                    {/* end for new row */}
                                                                                                                                    {myaddressResult === "empty" ? <h5>Address & Contact is not filled by user</h5> :
                                                                                                                                        <> <h5 className="mt-5">Address &amp; Contact</h5>
                                                                                                                                            <hr />
                                                                                                                                            <div className="row">

                                                                                                                                                {country != "" && country != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Country</h5>
                                                                                                                                                        <p>{country}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {state != "" && state != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>State/Province</h5>
                                                                                                                                                        <p>{state}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {city != "" && city != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>City</h5>
                                                                                                                                                        <p>{city}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {address != "" && address != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Address</h5>
                                                                                                                                                        <p>{address}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}

                                                                                                                                            </div>
                                                                                                                                            <div className="row">

                                                                                                                                                {zipcode != "" && zipcode != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>Zipcode</h5>
                                                                                                                                                        <p>{zipcode}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                                {communication_address != "" && communication_address != undefined ?
                                                                                                                                                    <div className="col-md-3">
                                                                                                                                                        <h5>   Communication Address</h5>
                                                                                                                                                        <p>{communication_address}</p>
                                                                                                                                                    </div>
                                                                                                                                                    : null}
                                                                                                                                            </div>
                                                                                                                                        </>}
                                                                                                                                    {myfamilyResult === "empty" ?
                                                                                                                                        <h5>Family information is not filled by user</h5>
                                                                                                                                        : <>
                                                                                                                                            <h5 className="mt-5">Family Information</h5>
                                                                                                                                            <hr />
                                                                                                                                            {FormFamilyValues.map((element, index) => (
                                                                                                                                                <div key={index}>
                                                                                                                                                    <div className="row">

                                                                                                                                                        {element.relationship != "" && element.relationship != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Relationship</h5>
                                                                                                                                                                <p>{element.relationship}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.firstName != "" && element.firstName != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Full Name</h5>
                                                                                                                                                                <p>{element.salutation}{element.firstName} {element.middleName} {element.lastName}  </p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.email != "" && element.email != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Email</h5>
                                                                                                                                                                <p>{element.email}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.mobile != "" && element.mobile != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Mobile</h5>
                                                                                                                                                                <p>{element.mobile}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                    <div className="row mt-3">
                                                                                                                                                        {element.occupation != "" && element.occupation != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Occupation</h5>
                                                                                                                                                                <p>{element.occupation}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.qualification != "" && element.qualification != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Highest Qualification</h5>
                                                                                                                                                                <p>{element.qualification}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            ))}
                                                                                                                                        </>

                                                                                                                                    }
                                                                                                                                    {myeducationResult === "empty" ? <h5>Education is not filled by user </h5>
                                                                                                                                        : <>
                                                                                                                                            <h5 className="mt-5">Education</h5>
                                                                                                                                            <hr />
                                                                                                                                            {formEducationValues.map((element, index) => (
                                                                                                                                                <div key={index}>

                                                                                                                                                    <div className="row">

                                                                                                                                                        {element.highestEducation != "" && element.highestEducation != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Highest Level of Education</h5>
                                                                                                                                                                <p>{element.highestEducation}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.status != "" && element.status != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Education Status</h5>
                                                                                                                                                                <p>{element.status}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.specialization != "" && element.specialization != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Specialization</h5>
                                                                                                                                                                <p>{element.specialization}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.degree != "" && element.degree != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Degree</h5>
                                                                                                                                                                <p>{element.degree}</p>
                                                                                                                                                            </div>

                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                    <div className="row mt-3">
                                                                                                                                                        {element.gradePercentage != "" && element.gradePercentage != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Grade Scheme(GPA/Percentage)</h5>
                                                                                                                                                                <p>{element.gradePercentage}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.marks != "" && element.marks != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Grade Average/Marks Obtained</h5>
                                                                                                                                                                <p>{element.marks}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.attendedForm != "" && element.attendedForm != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Attended From</h5>
                                                                                                                                                                <p>{element.attendedForm}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.institution != "" && element.institution != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Name of Institution</h5>
                                                                                                                                                                <p>{element.institution}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                    <div className="row mt-3">
                                                                                                                                                        {element.affiliationUniversity != "" && element.affiliationUniversity != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Affiliating University/Board of Education</h5>
                                                                                                                                                                <p>{element.affiliationUniversity}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.language != "" && element.language != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Language of Instruction</h5>
                                                                                                                                                                <p>{element.language}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.country != "" && element.country != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Country</h5>
                                                                                                                                                                <p>{element.country}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.state != "" && element.state != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>State/Province</h5>
                                                                                                                                                                <p>{element.state}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                    <div className="row mt-3">
                                                                                                                                                        {element.city != "" && element.city != undefined ?

                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>City/Town</h5>
                                                                                                                                                                <p>{element.city}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.address != "" && element.address != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Address</h5>
                                                                                                                                                                <p>{element.address}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}
                                                                                                                                                        {element.zipcode != "" && element.zipcode != undefined ?
                                                                                                                                                            <div className="col-md-3">
                                                                                                                                                                <h5>Zipcode</h5>
                                                                                                                                                                <p>{element.zipcode}</p>
                                                                                                                                                            </div>
                                                                                                                                                            : null}

                                                                                                                                                    </div>
                                                                                                                                                </div>
                                                                                                                                            ))}
                                                                                                                                        </>}
                                                                                                                                    {mytestResult === "empty" ? <h5>Test Score is not filled by user</h5> : <>
                                                                                                                                        <h5 className="mt-5">Test Score</h5>
                                                                                                                                        <hr />
                                                                                                                                        <div className="row">
                                                                                                                                            {scoremarks != "" && scoremarks != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Marks in English in Class 12</h5>
                                                                                                                                                    <p>{scoremarks}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scoreenglishProficiency != "" && scoreenglishProficiency != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Have you taken any English Proficiency Test?</h5>
                                                                                                                                                    <p>{scoreenglishProficiency}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scoregre != "" && scoregre != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Have you taken IELTS/PTE/GRE/GMAT ?</h5>
                                                                                                                                                    <p>{scoregre}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scoresat != "" && scoresat != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Have you taken SAT/ACT?</h5>
                                                                                                                                                    <p>{scoresat}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}

                                                                                                                                        </div>
                                                                                                                                        <div className="row">
                                                                                                                                            {scoreexamType != "" && scoreexamType != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>ExamType</h5>
                                                                                                                                                    <p>{scoreexamType}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scoreexaminationDate != "" && scoreexaminationDate != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>ExaminationDate</h5>
                                                                                                                                                    <p>{scoreexaminationDate}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scoreoverall != "" && scoreoverall != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Overall</h5>
                                                                                                                                                    <p>{scoreoverall}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scorelistening != "" && scorelistening != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Listening</h5>
                                                                                                                                                    <p>{scorelistening}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}

                                                                                                                                        </div>
                                                                                                                                        <div className="row">
                                                                                                                                            {scorereading != "" && scorereading != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Reading</h5>
                                                                                                                                                    <p>{scorereading}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scorwriting != "" && scorwriting != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Writing</h5>
                                                                                                                                                    <p>{scorwriting}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                            {scorspeaking != "" && scorspeaking != undefined ?
                                                                                                                                                <div className="col-md-3">
                                                                                                                                                    <h5>Speaking</h5>
                                                                                                                                                    <p>{scorspeaking}</p>
                                                                                                                                                </div>
                                                                                                                                                : null}
                                                                                                                                        </div>
                                                                                                                                    </>
                                                                                                                                    }
                                                                                                                                    {myexperienceResult === "empty" ? <h5>Work Experience is not filled by user</h5> : <>
                                                                                                                                        <h5 className="mt-5">Work Experience</h5>
                                                                                                                                        <hr />
                                                                                                                                        {FormExperienceValues.map((element, index) => (
                                                                                                                                            <div key={index}>
                                                                                                                                                <div className="row">
                                                                                                                                                    {element.status != "" && element.status != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Work Status</h5>
                                                                                                                                                            <p>{element.status}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.type != "" && element.type != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Work Type</h5>
                                                                                                                                                            <p>{element.type}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.organization != "" && element.organization != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Name of Organization*</h5>
                                                                                                                                                            <p>{element.organization}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.designation != "" && element.designation != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Designation</h5>
                                                                                                                                                            <p>{element.designation}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {element.role != "" && element.role != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Job Role</h5>
                                                                                                                                                            <p>{element.role}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.started != "" && element.started != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Work Type</h5>
                                                                                                                                                            <p>{element.started}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.type != "" && element.type != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Started Date</h5>
                                                                                                                                                            <p>{element.type}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.ended != "" && element.ended != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>End Date</h5>
                                                                                                                                                            <p>{element.ended}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {element.country != "" && element.country != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Country</h5>
                                                                                                                                                            <p>{element.country}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.city != "" && element.city != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>City/Town</h5>
                                                                                                                                                            <p>{element.city}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        ))}
                                                                                                                                    </>}
                                                                                                                                    {myactivityResult === "empty" ? <h5> Extra Curricular Activities is not filled by user</h5> : <>
                                                                                                                                        <h5 className="mt-5">Extra Curricular Activities</h5>
                                                                                                                                        <hr />

                                                                                                                                        {formActivityValues.map((element, index) => (
                                                                                                                                            <div key={index}>
                                                                                                                                                <div className="row">
                                                                                                                                                    {element.activityStatus != "" && element.activityStatus != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Acitvity Status</h5>
                                                                                                                                                            <p>{element.activityStatus}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.activity != "" && element.activity != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Activity</h5>
                                                                                                                                                            <p>{element.activity}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.position != "" && element.position != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Position/Designation</h5>
                                                                                                                                                            <p>{element.position}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.description != "" && element.description != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Description</h5>
                                                                                                                                                            <p>{element.description}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {element.started != "" && element.started != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Started Date</h5>
                                                                                                                                                            <p>{element.started}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.ended != "" && element.ended != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>End Date</h5>
                                                                                                                                                            <p>{element.ended}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.apply != "" && element.apply != undefined ?
                                                                                                                                                        <div className="col-md-6">
                                                                                                                                                            <h5>Would you be interested in participating in similar activities at university</h5>
                                                                                                                                                            <p>{element.apply}</p>
                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        ))}
                                                                                                                                    </>}
                                                                                                                                    {myrecommendationResult === "empty" ? <h5> Recommendationis not filled by user</h5> : <>
                                                                                                                                        <h5 className="mt-5">Recommendation</h5>
                                                                                                                                        <hr />
                                                                                                                                        {FormRecommendationValues.map((element, index) => (
                                                                                                                                            <div key={index}>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {element.type != "" && element.type != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Reference Type</h5>
                                                                                                                                                            <p>{element.type}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.organization != "" && element.organization != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Name of Organisation/Institution</h5>
                                                                                                                                                            <p>{element.organization}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.recommenderName != "" && element.recommenderName != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Recommender Name</h5>
                                                                                                                                                            <p>{element.recommenderName}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.email != "" && element.email != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Official Email ID</h5>
                                                                                                                                                            <p>{element.email}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                                <div className="row mt-3">
                                                                                                                                                    {element.relation != "" && element.relation != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Relation with Recommender</h5>
                                                                                                                                                            <p>{element.relation}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.designation != "" && element.designation != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Recommender Designation</h5>
                                                                                                                                                            <p>{element.designation}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.number != "" && element.number != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Contact Number</h5>
                                                                                                                                                            <p>{element.number}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}
                                                                                                                                                    {element.address != "" && element.address != undefined ?
                                                                                                                                                        <div className="col-md-3">
                                                                                                                                                            <h5>Address of Organisation/Institution</h5>

                                                                                                                                                            <p>{element.address}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                    <div className="row mt-3">

                                                                                                                                                    </div>
                                                                                                                                                    {element.letter != "" && element.letter != undefined ?
                                                                                                                                                        <div className="col-md-6">
                                                                                                                                                            <h5>Do you have letter of recommendation?</h5>
                                                                                                                                                            <p>{element.letter}</p>

                                                                                                                                                        </div>
                                                                                                                                                        : null}

                                                                                                                                                </div>
                                                                                                                                            </div>
                                                                                                                                        ))}
                                                                                                                                    </>}
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div id="menu1" className=" tab-pane fade"><br />
                                                                                                            <div className="applic-document">

                                                                                                                <ul>
                                                                                                                    <li>
                                                                                                                        <div className="row">
                                                                                                                            <div className="col-md-6"><h6>All Documents Generate ZIP Folder</h6></div>
                                                                                                                            <div className="col-md-6">
                                                                                                                                <button type="button" title="Download All Document" className="btn btn-outline-primary btn-download" onClick={downloadAllDocument}><span>
                                                                                                                                    <FontAwesomeIcon icon={faCloudDownload} />
                                                                                                                                </span>Download All Document</button>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                    </li>
                                                                                                                    {/* start dummy */}
                                                                                                                    <div className="doc-topheader">
                                                                                                                        {resultDocument.map((element, index) => (
                                                                                                                            <div className="row" key={index}>
                                                                                                                                <div className="col-md-6">
                                                                                                                                    <h6>{element.documentName}</h6>
                                                                                                                                </div>
                                                                                                                                <div className="col-md-3 ">
                                                                                                                                    <a href={"https://coursementor.com/uploadApi/download.php?file=" + element.file}
                                                                                                                                        title="view document" type="button" ><FontAwesomeIcon icon={faDownload} title="view document" className="btn btn-outline-primary" />
                                                                                                                                    </a>
                                                                                                                                </div>
                                                                                                                                <div className="col-md-3 text-right">


                                                                                                                                    {element.fileExtension === "docx" || element.fileExtension === "doc" ?
                                                                                                                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + element.file}
                                                                                                                                            title="view document" type="button" ><FontAwesomeIcon icon={faEye} title="view document" className="btn btn-outline-primary" />
                                                                                                                                        </a>
                                                                                                                                        :
                                                                                                                                        <a title="view document" type="button" onClick={() => dummy(index)}>
                                                                                                                                            <FontAwesomeIcon icon={faEye} title="view document" className="btn btn-outline-primary" />
                                                                                                                                        </a>
                                                                                                                                    }

                                                                                                                                </div>
                                                                                                                                {myindexValue === index ?
                                                                                                                                    <Modal className="modal-container"
                                                                                                                                        show={showModal}
                                                                                                                                        onHide={() => close()}
                                                                                                                                        animation={true}>
                                                                                                                                        <Modal.Header closeButton>
                                                                                                                                            <Modal.Title>Document</Modal.Title>
                                                                                                                                        </Modal.Header>
                                                                                                                                        <div className="modal-body">

                                                                                                                                            {element.fileExtension === "jpeg" || element.fileExtension === "jpg" || element.fileExtension === "png" ?
                                                                                                                                                <img src={element.file} alt="passportback" />
                                                                                                                                                : element.fileExtension === "pdf" ?
                                                                                                                                                    <div>
                                                                                                                                                        <iframe src={element.file} width="100%" height="500px"></iframe>
                                                                                                                                                    </div>
                                                                                                                                                    : null
                                                                                                                                            }
                                                                                                                                        </div>
                                                                                                                                    </Modal>
                                                                                                                                    : null}
                                                                                                                            </div>
                                                                                                                        ))}
                                                                                                                    </div>
                                                                                                                    {/* end dummy */}

                                                                                                                </ul>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div id="message1" className=" tab-pane active"><br />

                                                                                                            <div className="applic-document">
                                                                                                                <div className="row">
                                                                                                                    <div className="col-xl-12 col-lg-7">
                                                                                                                        <div className="card shadow mb-4">
                                                                                                                            <div className="row">
                                                                                                                                <div className="col-md-12">
                                                                                                                                    <div className="chat-message msg_list">
                                                                                                                                        <div className="refes-msg">
                                                                                                                                            <span className="msgRefreshRight" onClick={() => handleRefresh()}>
                                                                                                                                                <FontAwesomeIcon icon={faRedo} />
                                                                                                                                                Refresh
                                                                                                                                            </span>
                                                                                                                                        </div>
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
                                                                                                                                                                            <div className="anw-content-rightblock  light-greenish">
                                                                                                                                                                                <div className="des-title">
                                                                                                                                                                                    <h6><strong>Student:</strong> ({myname}) Sent a Message</h6><span className="date-block">{element.messageTime}</span>
                                                                                                                                                                                </div>
                                                                                                                                                                                <div className="reply-content ">
                                                                                                                                                                                    <p>{element.message}</p>
                                                                                                                                                                                    {element.file !== "" ? <a className="appAttachment" href={"https://coursementor.com/uploadApi/download.php?file=" + element.file}  >{element.msgfileName}</a>
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
                                                                                                                                        <form onSubmit={handleFormSubmit}>
                                                                                                                                            <div className="row">
                                                                                                                                                <div>
                                                                                                                                                    <span className="msgRefreshRight" onClick={() => handleRefresh()}>
                                                                                                                                                        <FontAwesomeIcon icon={faRedo} />
                                                                                                                                                        Refresh
                                                                                                                                                    </span>
                                                                                                                                                </div>
                                                                                                                                                <div className="col-md-12">
                                                                                                                                                    <div className="form-group">
                                                                                                                                                        <label className="form-label">Message
                                                                                                                                                            <span className="req-star">*</span></label>
                                                                                                                                                        <textarea rows={5} cols={7} className="form-control" value={message}
                                                                                                                                                            onChange={(e) => setmessage(e.target.value)} />

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
                                                                                                                                                <FontAwesomeIcon icon={faPaperPlane} /> Send</button>
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
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-4">
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
                                                                            <div className="current-status">
                                                                                <h5>Set Application current-status</h5>

                                                                                <ul>
                                                                                    {universityApplication.map((object, i) => {
                                                                                        return (
                                                                                            <div key={i}>
                                                                                                {i <= myapplicationProgressStep ?
                                                                                                    <>
                                                                                                        {object === myapplicationProgress ?
                                                                                                            <li className="state-comp" ><span>
                                                                                                                <input type="checkbox"
                                                                                                                    onChange={() => clickCheckboxNotHandler(object, i, myemail)}
                                                                                                                    checked
                                                                                                                />{object}
                                                                                                            </span></li>
                                                                                                            : <li className="state-comp" ><span>
                                                                                                                <input type="checkbox"
                                                                                                                    onChange={() => clickCheckboxNotHandler(object, i, myemail)}
                                                                                                                    checked
                                                                                                                />{object}
                                                                                                            </span></li>}
                                                                                                    </>
                                                                                                    :
                                                                                                    <>

                                                                                                        {i === Number(myapplicationProgressStep) + Number(1) ? <li className="state-comp"><input type="checkbox"
                                                                                                            onChange={() => clickCheckboxHandler(object, i, myemail)}

                                                                                                        />{object}<span className="status-completed">

                                                                                                            </span></li>


                                                                                                            :
                                                                                                            <li className="state-comp"><input type="checkbox" disabled
                                                                                                                onChange={() => clickCheckboxHandler(object, i, myemail)}

                                                                                                            />{object}<span className="status-completed">

                                                                                                                </span></li>
                                                                                                        }

                                                                                                    </>
                                                                                                }
                                                                                            </div>
                                                                                        )
                                                                                    })}
                                                                                </ul>


                                                                            </div>



                                                                        </div>
                                                                        <div className="set-payment">
                                                                            <h5>Set Payment</h5>
                                                                            {/* start for update application fee */}
                                                                            <form onSubmit={handleFeeSubmit}>
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Application fee<span className="req-star">*</span></label>
                                                                                    <input type="number" className="form-control" placeholder="Application Fee"
                                                                                        name="applicationFee"
                                                                                        value={applicationFee}
                                                                                        onChange={(e) => setapplicationFee(e.target.value)} required />
                                                                                    {/* <div className="error-msg"> {applicationFeeError}</div> */}
                                                                                </div>





                                                                                <div className="form-group">
                                                                                    <label className="form-label"> Application Currency<span className="req-star">*</span></label>
                                                                                    <select type="text" className="form-control"
                                                                                        placeholder="Application Currency" name="applicationcurrency"

                                                                                        value={applicationcurrency}
                                                                                        onChange={(e) => setapplicationcurrency(e.target.value)}
                                                                                        required
                                                                                    >
                                                                                        <option value="">Select Currency</option>
                                                                                        <option value="USD">USD US Dollars</option>
                                                                                        <option value="GBP">GBP British Pounds</option>
                                                                                        <option value="EUR">EUR Euros</option>
                                                                                        <option value="CAD">Canadian dollar</option>
                                                                                        <option value="AUD">AUD Australian Dollars</option>
                                                                                        <option value="NZD">NZD New Zealand Dollars</option>
                                                                                        <option value="HKD">HKD Hong Kong Dollars</option>
                                                                                        <option value="SGD">SGD Singapore Dollars</option>
                                                                                        <option value="INR">INDIAN Rupees</option>
                                                                                    </select>
                                                                                </div>
                                                                                <button type="submit" className="btn-send-msg">Submit</button>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-body sidenav" id="mySidenav">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div className="card">
                                                                            <div className="card-header">
                                                                                <div className="row">
                                                                                    <div className="col-md-5">
                                                                                        <h5>Student Document Details</h5>
                                                                                    </div>
                                                                                    <div className="col-md-4" />
                                                                                    <div className="col-md-3">
                                                                                        <a href="#" className="closebtn" >×</a>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="card-body ">
                                                                                <h5>Identity Documents</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-4">
                                                                                        <h5>Passport</h5>
                                                                                        <p><img src="assets/images/passport.webp" alt="pas" loading="lazy" /></p>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <h5>Passport Back</h5>
                                                                                        <p><img src="assets/images/passport.webp" alt="pas" loading="lazy" /></p>
                                                                                    </div>
                                                                                    <div className="col-md-4">
                                                                                        <h5>CV</h5>
                                                                                        <p><img src="assets/images/cv.webp" alt="cv" loading="lazy" /></p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5> Education Documents</h5>
                                                                                <hr />
                                                                                <div className="row mt-3">
                                                                                    <div className="col-md-6">
                                                                                        <h5>Degree</h5>
                                                                                        <p>pict</p>
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        <h5>Secondary Education</h5>
                                                                                        <p>pict</p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="mt-5">Work Experience Documents</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <h5>Work Experience</h5>
                                                                                        <p>Experience PICt</p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="mt-5"> English Proficiency Test Document</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <h5>Work Experience</h5>
                                                                                        <p>Experience PICt</p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="mt-5"> Extra Curricular Document</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <h5>Work Experience</h5>
                                                                                        <p>Experience Pict</p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="mt-5"> Recommendation Documents</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <h5> Recommendation</h5>
                                                                                        <p>Documents Pict</p>
                                                                                    </div>
                                                                                </div>
                                                                                <h5 className="mt-5">Other Documents</h5>
                                                                                <hr />
                                                                                <div className="row">
                                                                                    <div className="col-md-12">
                                                                                        <h5> Documents</h5>
                                                                                        <p>Documents Pict</p>
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
                                </section >
                            </div >
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
                                                                <div className="col-md-5"> <h5>All Application</h5> </div>
                                                                <div className="col-md-4" />
                                                                <div className="col-md-3" />

                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            <div className="col-md-3">
                                                                <h5>Student ID </h5>
                                                                <p>{mybuildStudentID}</p>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h5>	Student Name</h5>
                                                                <p>{myname} </p>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h5>Student Email </h5>
                                                                <p>{myemail}</p>
                                                            </div>
                                                            <div className="col-md-3">
                                                                <h5>	Student Phone </h5>
                                                                <p>{myphone}</p>
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
                                                                        {FormStudentApplicationValues.map((object, i) => {
                                                                            return (
                                                                                <tr key={i}>
                                                                                    <td>{i + 1}</td>
                                                                                    <td>{mybuildStudentID + "-" + object.buildApplicationID}</td>
                                                                                    <td>{object.country}</td>
                                                                                    <td>{object.universityName}</td>
                                                                                    <td>{object.courseName}</td>
                                                                                    <td>
                                                                                        <button title="View single Application" className="btn btn-success"
                                                                                            onClick={() => handleView(object._id)}>
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
                            <Modal className="modal-container"
                                show={showModal}
                                onHide={() => close()}
                                animation={true}  >
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
                        </div >
                    </div >  </div >  </div >  </div >
    );
}
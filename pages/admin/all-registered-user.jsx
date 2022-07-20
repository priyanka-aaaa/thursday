import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/admin/DataTable";
import { Modal } from 'react-bootstrap';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Dropzone from "react-dropzone";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEye, faCloudDownload, faPaperPlane, faTrash, faDownload
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
export default function AdminUniversity() {

    const [myindexValue, setmyindexValue] = useState();

    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [comments, setComments] = useState([{
        name: "", email: "", phone: "", buildStudentID: "", _id: "", agentName: ""
    }])
    const [FormValues, setFormValues] = useState([{
        message: "", type: "", file: ""
    }])
    const [resultDocument, setresultDocument] = useState([{
    }])
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [submitError, setsubmitError] = useState("0");
    const [selectedfileName, setselectedfileName] = useState("");
    const [msgFile, setmsgFile] = useState([]);
    const [myfamilyResult, setmyfamilyResult] = useState("");
    const [myeducationResult, setmyeducationResult] = useState("");
    const [mytestResult, setmytestResult] = useState("");
    const [mypersonalResult, setmypersonalResult] = useState("");
    const [myaddressResult, setmyaddressResult] = useState("");
    const [myexperienceResult, setmyexperienceResult] = useState("");
    const [myactivityResult, setmyactivityResult] = useState("");
    const [myrecommendationResult, setmyrecommendationResult] = useState("");
    const [agentName, setagentName] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [showModalExtensionValue, setshowModalExtensionValue] = useState();
    const [firstviewWidth, setfirstviewWidth] = useState("0px");
    const [loader, setmyloader] = useState("false");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [successMessage, setsuccessMessage] = useState("");
    const [mystudentID, setmystudentID] = useState("0px");
    //start passport no
    const [passportNo, setpassportNo] = useState("");
    const [passportIssueDate, setpassportIssueDate] = useState("");
    const [passportexpiryDate, setpassportexpiryDate] = useState("");
    const [passportCountry, setpassportCountry] = useState("");
    const [passportBirthPlace, setpassportBirthPlace] = useState("");
    const [aadharCardNo, setaadharCardNo] = useState("");
    //end passport no
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
    const [country2, setcountry2] = useState();
    const [state2, setstate2] = useState();
    const [city2, setcity2] = useState();
    const [address2, setaddress2] = useState("");
    const [zipcode2, setzipcode2] = useState("");
    const [communication_address, setcommunication_address] = useState("no");
    const [myname, setmyname] = useState("");
    const [myemail, setmyemail] = useState("");
    const [myphone, setmyphone] = useState("");
    const [messageError, setmessageError] = useState("");
    const [mybuildStudentID, setmybuildStudentID] = useState("");
    const [showModal, setshowModal] = useState(false);
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
    const [scoreexamType, setscoreexamType] = useState("");
    const [scoreexaminationDate, setscoreexaminationDate] = useState("");
    const [scoreoverall, setscoreoverall] = useState("");
    const [scorelistening, setscorelistening] = useState("");
    const [scorereading, setscorereading] = useState("");
    const [scorwriting, setscorwriting] = useState("");
    const [scorspeaking, setscorspeaking] = useState("");
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
    const [message, setmessage] = useState("");
    const [studentPassportDocument, setstudentPassportDocument] = useState("");
    const [studentPassportBackDocument, setstudentPassportBackDocument] = useState("");
    const [studentCVDocument, setstudentCVDocument] = useState("");
    const [studentmarksheet10Document, setstudentmarksheet10Document] = useState("");
    const [studentmarksheet12Document, setstudentmarksheet12Document] = useState("");
    const [studentugDegreeDocument, setstudentugDegreeDocument] = useState("");
    const [studentugConsolidateDocument, setstudentugConsolidateDocument] = useState("");
    const [studentugMarksheetDocument, setstudentugMarksheetDocument] = useState("");
    const [studentpgDegreeDocument, setstudentpgDegreeDocument] = useState("");
    const [studentpgDegreeConsolidatedDocument, setstudentpgDegreeConsolidatedDocument] = useState("");
    const [studentpgMarksheetDocument, setstudentpgMarksheetDocument] = useState("");
    const [showModalValue, setshowModalValue] = useState("");
    // start for pagination

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;
    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },
        { name: "Student Id", field: "buildStudentID", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone", field: "phone", sortable: false },
        { name: "Registration Date", field: "currentTime", sortable: false },
        { name: "Agent Name", field: "agentName", sortable: false },
        { name: "Action", field: "", sortable: false },
    ];
    // end for pagination
    useEffect(() => {

        setFormValues([])
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function myallStudents() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + "admin/allStudents";
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")
                        var studentsResult = data.students
                        studentsResult.forEach((item, i) => {
                            item.NO = i + 1;
                        });
                        setComments(studentsResult);
                    })
            }
            myallStudents()
        }
    }, [])
    function dummy(value) {

        setmyindexValue(value)
        setshowModal(true)
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
                    comment.phone && comment.phone.includes(search.toLowerCase()) ||
                    comment.agentName && comment.agentName.toLowerCase().includes(search.toLowerCase()) ||
                    comment.currentTime && comment.currentTime.toLowerCase && comment.currentTime.toLowerCase().includes(search.toLocaleLowerCase())
            );
        }
        setTotalItems(computedComments.length);
        //Sorting comments
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
        setmessageError("")
        if (message === "") {
            setmessageError("Please Enter Message")
        }
        else {
            setmyloader("true")


            const obj = new FormData();
            obj.append("file", msgFile);
            obj.append("message", message);
            obj.append("studentID", mystudentID);
            obj.append("type", 0);


            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/messages/' + mystudentID, obj, { headers: { 'Authorization': mounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Message Sent")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        setmessage("")
                        axios.get(process.env.REACT_APP_SERVER_URL + 'admin/messages/' + mystudentID, { headers: { 'Authorization': mounted } })
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
    function handleCloseView() {
        setfirstviewWidth("0px");
    }

    function handleView(id, mybuildStudentID, name, email, phone, agentName) {
        const url = process.env.REACT_APP_SERVER_URL + "admin/students/" + id + "/documents/";
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                var resultDocument = data.studentDocuments;
                setresultDocument(resultDocument)


            })
        //end all document
        setFormValues([])
        setfirstviewWidth("90%");

        setmyfamilyResult("")
        setmyeducationResult("")
        setmytestResult("")
        setmyaddressResult("")
        setmypersonalResult("")
        setmyexperienceResult("")
        setmyactivityResult("")
        setmyrecommendationResult("")
        setagentName(agentName)
        setmystudentID(id)
        setmyname(name)
        setmyemail(email)
        setmyphone(phone)
        var splitname = name.split(" ");
        var mystudentID = id
        setmybuildStudentID(mybuildStudentID)
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
        setcountry2("");
        setstate2("");
        setcity2("");
        setaddress2("");
        setzipcode2("");
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
        axios.get(process.env.REACT_APP_SERVER_URL + 'admin/messages/' + mystudentID, { headers: { 'Authorization': mounted } })
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
                    setcountry2(studentAddress.country2);
                    setstate2(studentAddress.state2);
                    setcity2(studentAddress.city2);
                    setaddress2(studentAddress.address2);
                    setzipcode2(studentAddress.zipcode2);
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
        //remove from here
        setmyloader("false")
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    // function viewSingleDocument(value, extension) {
    //     if (extension === "jpeg" || extension === "jpg" || extension === "png" || extension === "pdf") {
    //         setshowModal(true)
    //         setshowModalValue(value)
    //         setshowModalExtensionValue(extension)
    //     }
    //     if (extension === "doc" || extension === "docx") {
    //         window.location.href = value
    //     }
    // }



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
    function downloadParticularDocument(documentName, name, fileExtension, file) {
        var jsonData = {};
        resultDocument.forEach(function (column) {
            jsonData[mybuildStudentID + "-" + myname + "-" + documentName + name + "." + fileExtension] = file;
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
    function close() {
        setshowModal(false)
    }

    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container-fluid">

                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}
                            {loader === "true" ?
                                <Loader />
                                : null}
                            {showSweetAlert === "1" ? <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, delete it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure want to delete student? This action can’t be reversed. Press ‘yes’ to delete"
                                onConfirm={(value) => {
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/deleteStudent/' + deleteId, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("Student deleted")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)
                                                const url = process.env.REACT_APP_SERVER_URL + "admin/allStudents";
                                                fetch(url, {
                                                    method: 'GET',
                                                    headers: { 'Authorization': mounted }
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {


                                                        var studentsResult = data.students
                                                        studentsResult.forEach((item, i) => {
                                                            item.NO = i + 1;
                                                        });


                                                        setComments(studentsResult);

                                                    })
                                            }
                                        })
                                        .catch(error => {
                                        });
                                }}
                                onCancel={() =>
                                    setshowSweetAlert("0")
                                }
                                focusCancelBtn>
                            </SweetAlert>
                                : null
                            }
                            <div className="row">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>All Registered Students</h3>
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
                                <div className="col-xl-12 col-lg-7">

                                    <div className="card shadow mb-4">
                                        <div className=" mb-4">

                                            <div className="table-responsive-sm">
                                                <table className="table table-bordered">
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
                                                                    <td>{object.NO}</td>
                                                                    <td>{object.buildStudentID}</td>
                                                                    <td> {object.name}</td>
                                                                    <td>{object.email}</td>
                                                                    <td>{object.phone}</td>
                                                                    <td>{object.currentTime || ""}</td>
                                                                    <td>{object.agentName}</td>

                                                                    <td>
                                                                        <button title="View Student Application" className="btn btn-success"
                                                                            onClick={() => handleView(object._id, object.buildStudentID,
                                                                                object.name, object.email, object.phone,
                                                                                object.agentName
                                                                            )}>
                                                                            <FontAwesomeIcon icon={faEye} />
                                                                        </button>
                                                                        <button title="Delete" className="btn btn-danger vbtn" onClick={() => handleDeleteClick(object._id)}>
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
                                                        <div className="card-body">
                                                            <h5>Application Information</h5>
                                                            <hr />
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
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <h5>	Student Phone </h5>
                                                                    <p>{myphone}</p>
                                                                </div>
                                                                {agentName !== undefined ?
                                                                    <div className="col-md-3">
                                                                        <h5>	Agent Name </h5>
                                                                        <p>{agentName}</p>
                                                                    </div>
                                                                    : null}

                                                            </div>
                                                        </div>
                                                        <div className="card-body table-border-style">
                                                            <div className="row">
                                                                <div className="col-xl-8 col-lg-7">
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

                                                                                                                            </div>
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
                                                                                                                            {/* start address2 */}
                                                                                                                            <div className="row">

                                                                                                                                {country2 != "" && country2 != undefined ?
                                                                                                                                    <div className="col-md-3">
                                                                                                                                        <h5>Country</h5>
                                                                                                                                        <p>{country2}</p>
                                                                                                                                    </div>
                                                                                                                                    : null}
                                                                                                                                {state2 != "" && state2 != undefined ?
                                                                                                                                    <div className="col-md-3">
                                                                                                                                        <h5>State/Province</h5>
                                                                                                                                        <p>{state2}</p>
                                                                                                                                    </div>
                                                                                                                                    : null}
                                                                                                                                {city2 != "" && city2 != undefined ?
                                                                                                                                    <div className="col-md-3">
                                                                                                                                        <h5>City</h5>
                                                                                                                                        <p>{city2}</p>
                                                                                                                                    </div>
                                                                                                                                    : null}
                                                                                                                                {address2 != "" && address2 != undefined ?
                                                                                                                                    <div className="col-md-3">
                                                                                                                                        <h5>Address</h5>
                                                                                                                                        <p>{address2}</p>
                                                                                                                                    </div>
                                                                                                                                    : null}

                                                                                                                            </div>
                                                                                                                            <div className="row">

                                                                                                                                {zipcode2 != "" && zipcode2 != undefined ?
                                                                                                                                    <div className="col-md-3">
                                                                                                                                        <h5>Zipcode</h5>
                                                                                                                                        <p>{zipcode2}</p>
                                                                                                                                    </div>
                                                                                                                                    : null}

                                                                                                                            </div>
                                                                                                                            {/* end address2 */}
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
                                                                                                                            <div key={index} className="repreated-value">
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
                                                                                                                                                                    {element.file !== "" ? <a className="appAttachment" href={"https://coursementor.com/uploadApi/download.php?file=" + element.file} target="_blank" rel="noreferrer" >download Attachment</a>
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
                                                                                                                                                                {element.file !== "" ? <a className="appAttachment" href={"https://coursementor.com/uploadApi/download.php?file=" + element.file} target="_blank" rel="noreferrer" >download Attachment</a>
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
                                                                                                                                    <div className="form-group">
                                                                                                                                        <label className="form-label">Message
                                                                                                                                            <span className="req-star">*</span></label>
                                                                                                                                        <textarea rows={5} cols={7} className="form-control" value={message}
                                                                                                                                            onChange={(e) => setmessage(e.target.value)} />
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
                                </section>
                            </div>

                        </div >
                    </div>

                </div >  </div>

        </div >
    );
}
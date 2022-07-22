import React, { useState, useEffect } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faEye

} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import { faBimobject } from "@fortawesome/free-brands-svg-icons";
export default function Commission() {
    const [mounted, setMounted] = useState();
    const [Percentage, setPercentage] = useState();
    const [commissionChecked, setcommissionChecked] = useState();
    const [commissionTimeChecked, setcommissionTimeChecked] = useState("");
    const [displaymyAmount, setdisplaymyAmount] = useState("none");
    const [displayPercentage, setdisplayPercentage] = useState("none");
    const [displayone, setdisplayone] = useState("none");
    const [displaymany, setdisplaymany] = useState("none");
   
    const [EditcommissionType, setEditcommissionType] = useState([]);
    const [EdittimeType, setEdittimeType] = useState([]);
    const [displayEditAmount, setdisplayEditAmount] = useState("none");
    const [displayEditPercentage, setdisplayEditPercentage] = useState("none");
    const [courseName, setcourseName] = useState("");
    const [tuitionFee, settuitionFee] = useState("");
    const [commissionValue, setcommissionValue] = useState("");

    const [width, setwidth] = useState("");
    const [viewWidth, setviewWidth] = useState("");
    const [addWidth, setaddWidth] = useState("");
    const [data, setdata] = useState([]);
    const [commissionData, setcommissionData] = useState([]);
    const [editId, seteditId] = useState([]);
    const [universityId, setuniversityId] = useState([]);
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [loader, setmyloader] = useState("false");
    const [commissionCheckedError, setcommissionCheckedError] = useState("");
    const [commissionValueError, setcommissionValueError] = useState("");
    const [timeTypeError, settimeTypeError] = useState("");

    const [alreadySetCommission, setalreadySetCommission] = useState("");
    const [currency, setcurrency] = useState("");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");

    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        if (adminUniversityId !== null) {
            const url = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/commissions'

            fetch(url, {
                method: 'GET',
                headers: { 'Authorization': adminmounted }
            })
                .then(response => response.json())
                .then(data => {
                    setcommissionData(data.universityCommissions)
                })
            const url2 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/courses'
            fetch(url2, {
                method: 'GET',
                headers: { 'Authorization': adminmounted }
            })
                .then(response => response.json())
                .then(data => {
                    setdata(data.universityCourses)
                })
        }
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId)

    }, [])

    function changecommissionChecked(value) {
        setcommissionChecked(value)
        if (value === "fixed") {
            setdisplaymyAmount("inline")
            setdisplayPercentage("none")
        }
        else {
            setdisplaymyAmount("none")
            setdisplayPercentage("inline")
        }
    }
    function changecommissionTimeChecked(value) {
        setcommissionTimeChecked(value)
        if (value === "one time") {
            setdisplayone("inline")
            setdisplaymany("none")
        }
        else {
            setdisplayone("none")
            setdisplaymany("inline")
        }
    }
    function setEditcommissionData(value) {
        setEditcommissionType(value)
        if (value === "fixed") {
            setdisplayEditAmount("inline");
            setdisplayEditPercentage("none");
        }
        else {
            setdisplayEditPercentage("inline");
            setdisplayEditAmount("none");
        }
    }

    function percentagecommissionValue(percentageValue) {
        const mytuitionFeeArray = tuitionFee.split(" ");
        var number1 = mytuitionFeeArray[0]
        var number2 = percentageValue;

        var value = (number2 / 100) * number1;


        var finalValue = Math.trunc(value)
        setPercentage(finalValue)
        setcommissionValue(finalValue)
    }
    function amountcommissionValue(value) {
        setcommissionValue(value)
    }
    function handleChange(value, q) {
        const myArray = value.split("&&");
        settuitionFee(myArray[1])
        setcourseName(myArray[0])
        const myArray2 = myArray[1].split(" ");
        setcurrency(myArray2[1])
    }
    function handleEditClick(value) {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
   
        seteditId(value);
        setwidth("90%");
        const url =process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/commissions/' + value
      
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': adminmounted }
        })
            .then(response => response.json())
            .then(data => {
                seteditId(data.universityCommission._id)
                setcourseName(data.universityCommission.courseName)
                settuitionFee(data.universityCommission.fee)
                setEditcommissionType(data.universityCommission.commissionType)
                setcommissionValue(data.universityCommission.commissionValue)
                setEdittimeType(data.universityCommission.timeType)
                setcommissionTimeChecked(data.universityCommission.timeType)
                if (data.universityCommission.commissionType === "fixed") {
                    setdisplayEditAmount("inline");
                    setdisplayEditPercentage("none");
                }
                else {
                    setdisplayEditPercentage("inline");
                    setdisplayEditAmount("none");
                }

            })
    }
    function handleAdd() {
        setaddWidth("90%");
        setalreadySetCommission("")
        setcourseName("")
        settuitionFee("")
        setcommissionChecked("")
        setcommissionValue("")
        setcommissionTimeChecked("")

        setdisplaymyAmount("none")
        setdisplayPercentage("none")
        setdisplaymany("none")
        setdisplayone("none")
    }
    let handleAddSubmit = (event) => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setcommissionCheckedError("")
        setcommissionValueError("")
        settimeTypeError("")

        setalreadySetCommission("")
        event.preventDefault();
        if (commissionChecked === "" || commissionChecked === undefined) {
            setcommissionCheckedError("Please Check Commission Type")
        }
        else if (commissionValue === "" || commissionValue === undefined) {
            setcommissionValueError("Please Enter Commission Value")
        }
        else if (commissionTimeChecked === "" || commissionTimeChecked === undefined) {
            settimeTypeError("Please Enter Commission Time")
        }

        else {

            setmyloader("true")
            const obj1 = new FormData();
            obj1.append("courseName", courseName);
            obj1.append("fee", tuitionFee);
            obj1.append("commissionType", commissionChecked);
            obj1.append("commissionValue", commissionValue + " " + currency);
            obj1.append("timeType", commissionTimeChecked);

            const url2 =process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/commissions'

            fetch(url2, {
                method: 'post',
                headers: { 'Authorization': adminmounted },
                body: obj1
            })
                .then(response => response.json())
                .then(data => {
                    setmyloader("false")
                    if (data.success === true) {
                        setaddWidth("0");
                        setsuccessMessage("Commisssion Added")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        setcourseName("")
                        settuitionFee("")
                        setcommissionChecked("")
                        setcommissionValue("")
                        setcommissionTimeChecked("")

                        const url = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/commissions'
                       
                        fetch(url, {
                            method: 'GET',
                            headers: { 'Authorization': adminmounted }
                        })
                            .then(response => response.json())
                            .then(data => {
                                setcommissionData(data.universityCommissions)
                            })
                    }
                    if (data.success === false) {
                        setalreadySetCommission(data.message)

                    }
                })

        }
    }
    function handleDelete(value) {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function closebox(value) {
        setwidth("0px");
    }
    function closeviewbox(value) {
        setviewWidth("0px");
    }
    function closeaddbox(value) {
        setaddWidth("0px");
        setwidth("0px");
    }

    let handleEditSubmit = (event) => {
        event.preventDefault();
        setwidth("0");
        setmyloader("true")
        const obj1 = new FormData();
        obj1.append("courseName", courseName);
        obj1.append("fee", tuitionFee);
        obj1.append("commissionType", EditcommissionType);
        obj1.append("commissionValue", commissionValue + " " + currency);
        obj1.append("timeType", commissionTimeChecked);

        const url2 = process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/commissions/' + editId
       
        fetch(url2, {
            method: 'put',
            headers: { 'Authorization': adminmounted },
            body: obj1
        })
            .then(response => response.json())
            .then(data => {
                setmyloader("false")
                setaddWidth("0");
                setsuccessMessage("Commisssion Updated")
                setTimeout(() => setsubmitSuccess(""), 3000);
                setsubmitSuccess(1)
                const url = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/commissions';
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': adminmounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setcommissionData(data.universityCommissions)
                    })
            })
    }
    return (
        <div className="container">
            {loader === "true" ?
                <Loader />
                : null}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">  Commission</h1>
                {showSweetAlert === "1" ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={(value) => {
                        var adminUniversityId = localStorage.getItem('adminUniversityId');
                        setshowSweetAlert("0");
                        setmyloader("true")
                        const url2 = process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/commissions/' + deleteId
                       
                        fetch(url2, {
                            method: 'delete',
                            headers: { 'Authorization': adminmounted }
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")

                                setaddWidth("0");
                                setsuccessMessage("Commisssion Deleted")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/commissions';
                                fetch(url, {
                                    method: 'GET',
                                    headers: { 'Authorization': adminmounted }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        setcommissionData(data.universityCommissions)
                                    })
                            })

                    }}
                    onCancel={() =>
                        setshowSweetAlert("0")
                    }
                    focusCancelBtn
                >
                </SweetAlert>
                    : null
                }

                <button type="button" onClick={() => handleAdd()} className="btn btn-outline-success"
                    title="Add Commission" data-toggle="tooltip" data-placement="right"
                ><span>
                        <FontAwesomeIcon icon={faPlus} />
                    </span> Add Commission</button>
            </div>
            <div className="row">
                <div className="col-xl-12 ">
                    <div className="mb-4">
                        <div className="card shadow mb-4">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Course Name</th>
                                            <th>Fee</th>
                                            <th>Commission Type</th>
                                            <th>Commission Set</th>
                                            <th>Commission Value</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {commissionData.map((object, i) => {
                                            return (

                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{object.courseName}</td>
                                                    <td>{object.fee}</td>
                                                    <td>{object.commissionType}</td>
                                                    <td>{object.timeType}</td>
                                                    <td>{object.commissionValue}</td>

                                                    <td>
                                                        <div className="tab-btn-grp">
                                                            <button title="Delete" className="btn btn-danger btn-sm vbtn" onClick={() => handleDelete(object._id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                            <button title="Edit" className="btn btn-success btn-sm " onClick={() => handleEditClick(object._id)}>                                        <FontAwesomeIcon icon={faPen} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="card-body course-sidenav" id="mySideAdd"
                            style={{ width: addWidth }}
                        >
                            <div className="student-view container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-6">
                                        <a
                                            title="Close" data-toggle="tooltip" data-placement="right"
                                            className="closebtn" onClick={closeaddbox} >&times;</a>
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12">
                                        <h3>Add Commission</h3>
                                    </div>
                                </div>
                                <div className="table-responsive ">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">   <div className="col-xl-12">
                                                <div className="card shadow mb-4">
                                                    <div className="mb-4">
                                                        <div id="accordion">
                                                            <div className="card-body">
                                                                <div className="from-block">
                                                                </div>
                                                                <form onSubmit={handleAddSubmit}>
                                                                    <div className="mb-3">
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label className="form-label">Course Name<span className="req-star">*</span></label>

                                                                                    <select className="form-control"
                                                                                        required
                                                                                        onChange={(e) => handleChange(e.target.value)}>
                                                                                        <option value="" >Select Course Name</option>
                                                                                        {data.map((object, i) => {
                                                                                            return (
                                                                                                <option

                                                                                                    value={object.courseName + "&&" + object.tuitionFee + " " + object.currency} key={i}>{object.courseName}</option>
                                                                                            )
                                                                                        })}
                                                                                    </select>
                                                                                    <div className="error-msg"> {alreadySetCommission}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label className="form-label"> Tuition Fee<span className="req-star">*</span></label>
                                                                                    <input type="text" readOnly={true} value={tuitionFee} className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <fieldset>
                                                                                        <label className="form-label">Commision Type<span className="req-star">*</span></label><br />
                                                                                        <div className="form-check form-check-inline">

                                                                                            <input className="form-check-input" type="radio" name="commissionType" id="flexRadioDefault1"
                                                                                                checked={commissionChecked === "fixed"}
                                                                                                onChange={(e) => changecommissionChecked("fixed")}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                                                Fixed
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className="form-check form-check-inline">
                                                                                            <input className="form-check-input" type="radio" name="commissionType" id="flexRadioDefault2"

                                                                                                checked={commissionChecked === "variable"}
                                                                                                onChange={(e) => changecommissionChecked("variable")}

                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                                                Variable
                                                                                            </label>
                                                                                        </div>
                                                                                    </fieldset>
                                                                                    <div className="error-msg"> {commissionCheckedError}</div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <div style={{ display: displaymyAmount }}>
                                                                                        <label className="form-label" >Enter Amount</label>
                                                                                        <input type="number"
                                                                                            onChange={e => amountcommissionValue(e.target.value)}
                                                                                            className="form-control" placeholder="" name="enteramount" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="form-group">
                                                                                    <div style={{ display: displayPercentage }}>

                                                                                        <label className="form-label" >Enter Percentage(%)</label>
                                                                                        <input type="number" className="form-control" placeholder="" name="enter Percentage"
                                                                                            onChange={e => percentagecommissionValue(e.target.value)}
                                                                                        />
                                                                                        <span>The Total commission is {Percentage}</span>
                                                                                    </div>

                                                                                    <div className="error-msg"> {commissionValueError}</div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="row mt-3">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <fieldset
                                                                                    >
                                                                                        <label className="form-label">Commision Set<span className="req-star">*</span></label><br />
                                                                                        <div className="form-check form-check-inline">
                                                                                            <input className="form-check-input" type="radio" name="commissionTime" id="flexRadioDefault3"

                                                                                                checked={commissionTimeChecked === "one time"}
                                                                                                onChange={(e) => changecommissionTimeChecked("one time")}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                                                                For One time
                                                                                            </label>
                                                                                        </div>
                                                                                        <div className="form-check form-check-inline">
                                                                                            <input className="form-check-input" type="radio" name="commissionTime" id="flexRadioDefault4"

                                                                                                checked={commissionTimeChecked === "every time"}
                                                                                                onChange={(e) => changecommissionTimeChecked("every time")}
                                                                                            />
                                                                                            <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                                                                For Every Time
                                                                                            </label>
                                                                                        </div>
                                                                                    </fieldset>
                                                                                    <div className="error-msg"> {timeTypeError}</div>
                                                                                </div>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <button type="submit" className="btn btn-success"

                                                                            title="Submit" data-toggle="tooltip" data-placement="right"
                                                                        >Submit</button>
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
                            </div>
                        </div>
                        <div className="card-body course-sidenav" id="mySideview"
                            style={{ width: width }}
                        >
                            <div className="student-view container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6 className="mt-2 font-weight-bold text-primary"></h6>
                                    </div>
                                    <div className="col-md-6">
                                        <a
                                            title="Close" data-toggle="tooltip" data-placement="right"
                                            className="closebtn" onClick={closeaddbox} >&times;</a>

                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6 text-right"></div>
                                </div>
                                <div className="table-responsive mt-0">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-xl-12">
                                                    <h3>Edit Commission</h3>
                                                    <div className="card shadow mb-4">
                                                        <div className=" mb-4">
                                                            <div id="accordion">
                                                                <div className="card-body">
                                                                    <div className="from-block">
                                                                    </div>
                                                                    <form onSubmit={handleEditSubmit}>
                                                                        <div className="mb-3">
                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <label className="form-label">Course Name<span className="req-star">*</span></label>
                                                                                        <select className="form-control" onChange={(e) => handleChange(e.target.value)}>
                                                                                            <option value={courseName} >{courseName}</option>
                                                                                            {data.map((object, i) => {
                                                                                                return (
                                                                                                    <option
                                                                                                        value=
                                                                                                        {object.courseName + "&&" + object.tuitionFee + " " + object.currency} key={i}>{object.courseName}</option>
                                                                                                )
                                                                                            })}
                                                                                        </select>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <label className="form-label">Tuition Fee<span className="req-star">*</span></label>
                                                                                        <input type="text" readOnly={true} value={tuitionFee} className="form-control" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="row mt-3">

                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <fieldset onChange={(e) => setEditcommissionData(e.target.value)
                                                                                        }

                                                                                        >
                                                                                            <label className="form-label">Commision Type<span className="req-star">*</span></label><br />


                                                                                            <div className="form-check form-check-inline">


                                                                                                <input className="form-check-input" type="radio" onChange={(e) =>
                                                                                                    setEditcommissionData(e.target.value)}
                                                                                                    value="fixed"
                                                                                                    checked={EditcommissionType === "fixed"}

                                                                                                    name="commissionType"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                                                                    Fixed
                                                                                                </label>
                                                                                            </div>
                                                                                            <div className="form-check form-check-inline">
                                                                                                <input className="form-check-input" type="radio" onChange={(e) =>
                                                                                                    setEditcommissionData(e.target.value)}
                                                                                                    value="variable"

                                                                                                    checked={EditcommissionType === "variable"}

                                                                                                    name="commissionType"
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                                                                    Variable
                                                                                                </label>
                                                                                            </div>
                                                                                        </fieldset>
                                                                                    </div>
                                                                                </div>



                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <div style={{ display: displayEditAmount }}>
                                                                                            <label className="form-label">Enter Amount</label>
                                                                                            <input type="number" value={commissionValue} onChange={e => amountcommissionValue(e.target.value)}
                                                                                                className="form-control" placeholder="" name="enteramount" />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <div style={{ display: displayEditPercentage }}>
                                                                                            <label className="form-label">Enter Percentage(%)</label>
                                                                                            <input type="number" className="form-control" placeholder="" name="enter Percentage" onChange={e =>
                                                                                                percentagecommissionValue(e.target.value)}
                                                                                            />
                                                                                        </div>

                                                                                        <span>The Total commission is {commissionValue}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>


                                                                            <div className="row mt-3">
                                                                                <div className="col-md-6">
                                                                                    <div className="form-group">
                                                                                        <fieldset
                                                                                        >
                                                                                            <label className="form-label">Commision Set<span className="req-star">*</span></label><br />
                                                                                            <div className="form-check form-check-inline"   >

                                                                                                <input className="form-check-input" type="radio" name="commissionTime" id="flexRadioDefault3"

                                                                                                    checked={commissionTimeChecked === "one time"}
                                                                                                    onChange={(e) => changecommissionTimeChecked("one time")}
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                                                                    For One time
                                                                                                </label>
                                                                                            </div>
                                                                                            <div className="form-check form-check-inline" >
                                                                                                <input className="form-check-input" type="radio" name="commissionTime" id="flexRadioDefault4"

                                                                                                    checked={commissionTimeChecked === "every time"}
                                                                                                    onChange={(e) => changecommissionTimeChecked("every time")}
                                                                                                />
                                                                                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                                                                                    For Every Time
                                                                                                </label>
                                                                                            </div>
                                                                                        </fieldset>
                                                                                        <div className="error-msg"> {timeTypeError}</div>
                                                                                    </div>

                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        <div className="mb-3">
                                                                            <button type="submit" className="btn btn-success"
                                                                                title="Submit" data-toggle="tooltip" data-placement="right"

                                                                            >Submit</button>
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


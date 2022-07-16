
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
// import Loader from '../../Home/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function WorkExperienceProfile() {
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [formValues, setFormValues] = useState([{
        status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "",
        _id: "null"
    }])
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [deleteId, setdeleteId] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [CheckState, setCheckState] = useState("0");
    const [cityError, setcityError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
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
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            const url = process.env.REACT_APP_SERVER_URL + 'student/experiences';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': mounted,
                }
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.studentExperiences;
                    if (Object.keys(myresults).length === 0) {
                    }
                    else {
                        setFormValues(data.studentExperiences)
                    }
                })
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
    let handleChange = (i, e) => {
        var myvalue = e.target.value
        if (e.target.name === "country") {
            axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + myvalue + '/')
                .then(function (res) {
                    if (res.data.success === true) {
                        setstates(res.data.result);
                    }
                })
                .catch(error => {
                });
        }
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    let addFormFields = () => {
        setFormValues([...formValues, {
            status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "",
            _id: "null"
        }])
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        var myvalues = JSON.stringify(formValues);
        setmyloader("true")
        formValues.map(async (item) => {
            if (item._id === "null") {
                await axios.post(process.env.REACT_APP_SERVER_URL + 'student/experiences', item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("Work Experience Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + 'student/experiences';
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Authorization': mounted,
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.studentExperiences;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.studentExperiences)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
            else {
                await axios.put(process.env.REACT_APP_SERVER_URL + 'student/experiences/' + item._id, item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("Work Experience Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + 'student/experiences';
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Authorization': mounted,
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.studentExperiences;
                                    if (Object.keys(myresults).length === 0) {

                                    }
                                    else {
                                        setFormValues(data.studentExperiences)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
        })
    }
    function setworkStatus(i, myvalue) {
        let newFormValues = [...formValues];
        newFormValues[i]["status"] = myvalue;
        setFormValues(newFormValues);
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function handlecountry(e) {
        setcountry(e)
        axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setstates(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handleEmptyDeleteClick(index) {
        let newFormValues = [...formValues];
        newFormValues.splice(index, 1);
        setFormValues(newFormValues)
    }
    return (
        <div>
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            {showSweetAlert === "1" ? <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={(value) => {
                    setshowSweetAlert("0");
                    setmyloader("true")
                    axios.delete(process.env.REACT_APP_SERVER_URL + 'student/experiences/' + deleteId, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("Work Experience deleted")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'student/experiences';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': mounted,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.studentExperiences;
                                        if (Object.keys(myresults).length === 0) {
                                            setFormValues([{
                                                status: '', type: "", organization: "", designation: "", role: "", started: '', ended: "", country: "", city: "",
                                                _id: "null"
                                            }])
                                        }
                                        else {
                                            setFormValues(data.studentExperiences)
                                        }
                                    })
                            }
                        })
                }}
                onCancel={() =>
                    setshowSweetAlert("0")
                }
                focusCancelBtn >
            </SweetAlert>
                : null
            }
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse6" onClick={() => handleClick()}><strong>6</strong>
                    Work Experience
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon icon={faAngleDown} style={{
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
                        <FontAwesomeIcon icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapse6" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {formValues.map((element, index) => (
                                <div key={index}>
                                    <div className="row mt-3">
                                        <div className="col-12 col-sm-3 col-md-3 col-lg-3">
                                            <div className="form-group">
                                                <label>Work Status<span className="text-danger">*</span></label>
                                                <div className="checkgrp">
                                                    <label className="ant-radio-wrapper"><span className="ant-radio">
                                                        <input
                                                            required
                                                            onChange={(e) => setworkStatus(index, "Ongoing")}
                                                            checked={element.status === "Ongoing"}
                                                            name="status" type="radio" className="ant-radio-input" />
                                                        <span className="ant-radio-inner"></span></span><span>Ongoing</span></label>
                                                    <label className="ant-radio-wrapper ant-radio-wrapper-checked"><span className="ant-radio ant-radio-checked"><input
                                                        required
                                                        onChange={(e) => setworkStatus(index, "Completed")}
                                                        checked={element.status === "Completed"}
                                                        name="status" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span><span>Completed</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group"><label htmlFor="work_type">Work Type<span className="text-danger">*</span></label><select
                                                value={element.type || ""} onChange={e => handleChange(index, e)}
                                                required
                                                className="form-control" id="work_type" name="type">
                                                <option value="">Select</option>
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Internship">Internship</option>
                                            </select></div>
                                        </div>
                                        <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                            <div className="form-group"><label htmlFor="company_name">Name of
                                                Organization<span className="text-danger">*</span></label><input
                                                    value={element.organization || ""} onChange={e => handleChange(index, e)}
                                                    required
                                                    type="text" className="form-control" id="company_name" name="organization" placeholder="Name of Organization" /></div>
                                        </div>
                                        <div className="col-12 col-sm-1 col-md-1 col-lg-1 text-right mt-4">
                                        {element._id !== "null" ?
                                                    <>
                                                        <a title="Delete" className="btn  btn-danger " onClick={() => handleDeleteClick(element._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </a>
                                                    </>
                                                    :
                                                    <>
                                                        {index!==0 ?
                                                            <a title="Delete" className="btn  btn-danger " onClick={() => handleEmptyDeleteClick(index)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </a>
                                                            : null
                                                        }
                                                    </>
                                                }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="work_designation">Designation</label><input
                                                value={element.designation || ""} onChange={e => handleChange(index, e)}
                                                type="text" className="form-control" id="work_designation" name="designation" placeholder="Designation" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="role_description">Job
                                                Role</label><input
                                                    value={element.role || ""} onChange={e => handleChange(index, e)}
                                                    type="text" className="form-control" id="role_description" name="role" placeholder="Job Role" /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="start_from">Started From</label>
                                                <input
                                                    value={element.started || ""} onChange={e => handleChange(index, e)}
                                                    type="date" className="form-control" name="started" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="start_from">Ended On</label>
                                                <input
                                                    value={element.ended || ""} onChange={e => handleChange(index, e)}
                                                    type="date" className="form-control" name="ended" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group">
                                                <label>Country</label>
                                                <select
                                                    value={element.country || ""}
                                                    // onChange={(e) => handlecountry(e.target.value)}
                                                    className="form-control" name="country" onChange={e => handleChange(index, e)} required>

                                                    {countries.map((element, index) => {
                                                        return (
                                                            <option
                                                                value={element.country_name} key={index}>{element.country_name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label
                                                htmlFor="job_city">City/Town</label><input
                                                    value={element.city || ""} onChange={e => handleChange(index, e)}
                                                    type="text"
                                                    className="form-control" id="job_city"
                                                    placeholder="City/Town" name="city" /></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                    <button title="Add New Test Score" type="button" className="btn btn-success" onClick={() => addFormFields()}>Add New</button>
                                    </div>
                                    <div className="col-md-6 text-right">
                                   
                                        {formValues[0].status !== "" && formValues[0].type !== "" && formValues[0].organization !== "" ?
                                            <button title="Save" type="submit" data-bs-toggle="collapse" href="#collapse7" className="btn btn-success">Save
                                            </button> :
                                            <button title="Save" type="submit" className="btn btn-secondary  mr-2 ml-2">Save
                                            </button>
                                        }

                                        <button title="Skip & Next" type="button" data-bs-toggle="collapse" href="#collapse7" className="btn btn-secondary  mr-2 ml-2">
                                            Skip & Next
                                        </button>
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

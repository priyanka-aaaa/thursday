
import React, { useState, useEffect } from "react";
// import Loader from '../../Home/Loader';
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function RecommendationProfile() {
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [formValues, setFormValues] = useState([{
        type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "",

        _id: "null"
    }])
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [loader, setmyloader] = useState("false");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [submitError, setsubmitError] = useState("0");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            const url = process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': mounted,
                }
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.studentProfileRecommendations;
                    if (Object.keys(myresults).length === 0) {
                    }
                    else {
                        setFormValues(data.studentProfileRecommendations)
                    }
                })
        }
    }, [])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    let addFormFields = () => {
        setFormValues([...formValues, {
            type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "",
            _id: "null"
        }])
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        setmyloader("true")
        formValues.map(async (item) => {
            if (item.type === "") {
                setmyloader("false")
                setTimeout(() => setsubmitError(""), 3000);
                setsubmitError(1)
            }
            else {
                if (item._id === "null") {
                    await axios.post(process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations', item, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("Recommendation Updated")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': mounted,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.studentProfileRecommendations;
                                        if (Object.keys(myresults).length === 0) {
                                        }
                                        else {
                                            setFormValues(data.studentProfileRecommendations)
                                        }
                                    })
                            }

                        })
                        .catch(error => {
                        });
                }
                else {
                    await axios.put(process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations/' + item._id, item, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("Recommendation Updated")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': mounted,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.studentProfileRecommendations;
                                        if (Object.keys(myresults).length === 0) {
                                        }
                                        else {
                                            setFormValues(data.studentProfileRecommendations)
                                        }
                                    })
                            }
                        })
                        .catch(error => {

                        });
                }
            }
        })
    }
    function setreferenceType(i, myvalue) {

        let newFormValues = [...formValues];
        newFormValues[i]["type"] = myvalue;
        setFormValues(newFormValues);
    }
    function setletter(i, myvalue) {
        let newFormValues = [...formValues];
        newFormValues[i]["letter"] = myvalue;
        setFormValues(newFormValues);
    }
    function handleDeleteClick(value) {
        setshowSweetAlert("1")
        setdeleteId(value)
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
            {submitError === 1 ? <div className="Show_error_message">
                <strong></strong> Type Is Required
            </div> : null}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
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
                    axios.delete(process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations/' + deleteId, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("Recommendation Deleted")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'student/profileRecommendations';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': mounted,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.studentProfileRecommendations;
                                        if (Object.keys(myresults).length === 0) {
                                            setFormValues([{
                                                type: "", organization: "", recommenderName: "", email: "", relation: "", designation: "", number: "", address: "", letter: "",
                                                _id: "null"
                                            }])
                                        }
                                        else {
                                            setFormValues(data.studentProfileRecommendations)
                                        }
                                    })
                            }
                            else {
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
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse8" onClick={() => handleClick()}><strong>8</strong>
                    Recommendation
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
                <div id="collapse8" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {formValues.map((element, index) => (
                                <div key={index}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5 col-md-5 col-lg-5">
                                            <div className="form-group"><label>Reference Type<span className="text-danger">*</span></label>
                                                <div className="checkgrp">
                                                    <label className="ant-radio-wrapper ant-radio-wrapper-checked"><span className="ant-radio ant-radio-checked"><input
                                                        onChange={(e) => setreferenceType(index, "Professional")}
                                                        checked={element.type === "Professional"}
                                                        required
                                                        name="type" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span><span>Professional</span></label><label className="ant-radio-wrapper"><span className="ant-radio"><input
                                                            required
                                                            onChange={(e) => setreferenceType(index, "Academic")}
                                                            checked={element.type === "Academic"}
                                                            name="type" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span><span>Academic</span></label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="Name_of_organisation">Name
                                                of Organisation/Institution<span className="text-danger">*</span></label><input
                                                    value={element.organization || ""} onChange={e => handleChange(index, e)}
                                                    required
                                                    type="text" className="form-control" id="Name_of_organisation" name="organization" placeholder="Name of Organisation/Institution" />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-1 col-md-1 col-lg-1 text-right mt-4">
                                        {element._id !== "null" ?
                                                    <>
                                                        <a title="Delete" className="btn  btn-danger " onClick={() => handleDeleteClick(element._id)}>
                                                            <FontAwesomeIcon  className="sidebar-faicon" icon={faTrash} />
                                                        </a>
                                                    </>
                                                    :
                                                    <>
                                                        {index!==0 ?
                                                            <a title="Delete" className="btn  btn-danger " onClick={() => handleEmptyDeleteClick(index)}>
                                                                <FontAwesomeIcon  className="sidebar-faicon" icon={faTrash} />
                                                            </a>
                                                            : null
                                                        }
                                                    </>
                                                }
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="recommender_name">Recommender Name<span className="text-danger">*</span></label><input
                                                value={element.recommenderName || ""} onChange={e => handleChange(index, e)}
                                                required
                                                type="text" className="form-control" id="recommender_name" name="recommenderName" placeholder="Recommender Name" /></div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="official_email_id">Official
                                                Email ID<span className="text-danger">*</span></label><input
                                                    value={element.email || ""} onChange={e => handleChange(index, e)}
                                                    required
                                                    type="email" className="form-control" id="official_email_id" name="email" placeholder="Email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="relation_with_applicant">Relation with Recommender</label><input
                                                value={element.relation || ""} onChange={e => handleChange(index, e)}

                                                type="text" className="form-control" id="relation_with_applicant" name="relation" placeholder="Relation with recommender" /></div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="recommender_designation">Recommender Designation</label><input
                                                value={element.designation || ""} onChange={e => handleChange(index, e)}

                                                type="text" className="form-control" id="recommender_designation" name="designation" placeholder="Recommender Designation" /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="contact_number">Contact Number</label><input
                                                value={element.number || ""} onChange={e => handleChange(index, e)}

                                                type="number" className="form-control" id="contact_number" name="number" placeholder="Contact Number" /></div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label htmlFor="address_of_organisation">Address of Organisation/Institution</label><input
                                                value={element.address || ""} onChange={e => handleChange(index, e)}
                                                type="text" className="form-control" id="address_of_organisation" name="address" placeholder="Address of Organisation/Institution" /></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                            <div className="form-group"><label>Do you have letter of recommendation?</label>
                                                <div className="checkgrp">
                                                    <label className="ant-radio-wrapper ant-radio-wrapper-checked"><span className="ant-radio ant-radio-checked"><input
                                                        onChange={(e) => setletter(index, "yes")}
                                                        checked={element.letter === "yes"}
                                                        name="letter" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span><span>Yes</span></label><label className="ant-radio-wrapper"><span className="ant-radio"><input
                                                            onChange={(e) => setletter(index, "no")}
                                                            checked={element.letter === "no"}
                                                            name="letter" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span><span>No</span></label> <br /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                    <button title="Add new Recommendation" type="button" className="btn btn-success " onClick={() => addFormFields()}>Add New</button>
                                    </div>
                                    <div className="col-md-6 text-right">
                                    
                                        <button title="Save" type="submit" className="btn btn-success ml-2">Save
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

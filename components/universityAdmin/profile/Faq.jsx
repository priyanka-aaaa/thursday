
import React, { useState, useEffect } from "react";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faAngleDown, faAngleUp

} from '@fortawesome/free-solid-svg-icons';
export default function Faq() {
    const [formValues, setFormValues] = useState([{
        question: "", answer: "",
        _id: "null"
    }])
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [universityId, setuniversityId] = useState([]);
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [display, setdisplay] = useState("none");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [loader, setmyloader] = useState("false");
    const [completedHeading, setcompletedHeading] = useState("inline");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        if (adminUniversityId !== null) {
            const url = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/faqs'

            fetch(url, {
                method: 'GET',
                headers: { 'Authorization': adminmounted }
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.universityFaqs;
                    if (Object.keys(myresults).length === 0) {
                    }
                    else {
                        setFormValues(data.universityFaqs)
                    }
                })
        }
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId)
     
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
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        setFormValues([...formValues, {
            question: "", answer: "",
            _id: "null"
        }])
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setmyloader("true")
        var myvalues = JSON.stringify(formValues);
        formValues.map(async (item) => {
            if (item._id === "null") {
                await axios.post(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/faqs', item, { headers: { 'Authorization': adminmounted } })
                    .then(function (res) {
                        setmyloader("false")

                        if (res.data.success === true) {
                            setsuccessMessage("Faq Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url =process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/faqs'
                          
                            fetch(url, {
                                method: 'GET',
                                headers: { 'Authorization': adminmounted }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.universityFaqs;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.universityFaqs)
                                    }
                                })
                        }
                    })
                    .catch(error => {

                    });
            }
            else {
                await axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/faqs/' + item._id, item, { headers: { 'Authorization': adminmounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("Faq Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url =process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/faqs'
                            
                            fetch(url, {
                                method: 'GET',
                                headers: { 'Authorization': adminmounted }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.universityFaqs;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.universityFaqs)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
        })
    }
    function ToggleButton() {
        if (display === "inline") {
            setdisplay("none");
            setcompletedHeading("inline")
        }
        else {
            setdisplay("inline");
            setcompletedHeading("none")
        }
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
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
                <a className="card-header" data-bs-toggle="collapse" href="#collapse9" onClick={() => handleClick()}><strong>9</strong>
                    FAQ
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
                        <FontAwesomeIcon icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",

                        }} />
                    }
                </a>
                <div id="collapse9" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
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

                                axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/faqs/' + deleteId, { headers: { 'Authorization': adminmounted } })
                                    .then(function (res) {
                                        setmyloader("false")

                                        if (res.data.success === true) {
                                            setsuccessMessage("faq deleted")
                                            setTimeout(() => setsubmitSuccess(""), 3000);
                                            setsubmitSuccess(1)
                                 
                                            const url =process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/faqs'
                                            fetch(url, {
                                                method: 'GET',
                                                headers: { 'Authorization': adminmounted }
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    var myresults = data.universityFaqs;
                                                    if (Object.keys(myresults).length === 0) {
                                                        setFormValues([{
                                                            question: "", answer: "",
                                                            _id: "null"
                                                        }])
                                                    }
                                                    else {
                                                        setFormValues(data.universityFaqs)
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
                        <div className="form-block">

                            <div className="row mt-3">
                                <div className="col-md-8">
                                    <p style={{ display: completedHeading }}>I haven’t had any FAQ</p>
                                </div>
                                <div className=" col-md-4 text-right">
                                    <label className="switch">
                                        <input type="checkbox" />
                                        <span className="slider round" onClick={() => ToggleButton()}></span>
                                    </label>

                                </div>
                                <div>
                                    <div className="col-xl-12 ">
                                        <div className="card shadow mb-4" style={{ display: display }}>
                                            <div id="accordion">
                                                <div className="card-body">
                                                    <div className="from-block">
                                                        <form onSubmit={handleSubmit}>
                                                            {formValues.map((element, index) => (
                                                                <div key={index}>



                                                                    <div className="mb-3">

                                                                        <div className="row">

                                                                            <div className="col-md-11">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="fname" className="form-label">Question<span className="req-star">*</span></label>
                                                                                    <input required type="text" className="form-control" placeholder="Question" name="question"
                                                                                        value={element.question || ""} onChange={e => handleChange(index, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-1 text-left">
                                                                                {element._id !== "null" ?
                                                                                    <a title="Delete" className="btn  btn-danger deleteFamily" onClick={() => handleDeleteClick(element._id)}>
                                                                                        <FontAwesomeIcon icon={faTrash} />
                                                                                    </a>
                                                                                    : null}

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <div className="row">
                                                                            <div className="col">
                                                                                <div className="form-group">
                                                                                    <label htmlFor="fname" className="form-label">Answer<span className="req-star">*</span></label>
                                                                                    <input required type="text" className="form-control" placeholder="Answer" name="answer"
                                                                                        value={element.answer || ""} onChange={e => handleChange(index, e)}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div className="mb-3">
                                                                <div className="row">
                                                                    <div className="col-md-6"></div>
                                                                    <div className="col-md-6 text-right">
                                                                        <button type="button" className="btn btn-success " data-toggle="tooltip" data-placement="right" title="Add New " onClick={() => addFormFields()}>Add New
                                                                        </button>
                                                                        <button type="submit"
                                                                            data-toggle="tooltip" data-placement="right" title="Save"
                                                                            className="btn btn-secondary vbtn">Save
                                                                        </button>
                                                                        <button type="button" className="btn btn-success"
                                                                            data-bs-toggle="collapse" href="#collapseOne">Save &
                                                                            Preview</button>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}



import React, { useState, useEffect } from "react";
import parse from 'html-react-parser'
import axios from 'axios';
import "trix/dist/trix";
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faAngleDown, faAngleUp,

} from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
export default function Application() {
    const [formAdminValues, setformAdminValues] = useState([{
        application: ""
    }])
    const [FormValues, setFormValues] = useState([{
        point: ""

    }])
    const [editnewcomponent, seteditnewcomponent] = useState(0);
    const [addnewcomponent, setaddnewcomponent] = useState(0);
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [tempp, settempp] = useState("0");
    const [myapplication, setmyapplication] = useState();
    const [addWidth, setaddWidth] = useState("");
    const [editId, seteditId] = useState([]);
    const [width, setwidth] = useState("");
    const [editPoint, seteditPoint] = useState("");
    const [universityId, setuniversityId] = useState("");
    const [MYpoint, setMYpoint] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [myTable, setTable] = useState("false");
    const [loader, setmyloader] = useState("false");
    const [ApplicationError, setApplicationError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId);
        if (adminUniversityId !== null) {

            const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'
            fetch(url1, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.universityAdmissions;
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setFormValues(data.universityAdmissions)
                })

            const url = process.env.REACT_APP_SERVER_URL + 'admin/applications/';
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    setformAdminValues(data.adminApplications)
                })
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
    function closeaddbox(value) {
        setaddWidth("0px");
    }
    function closebox(value) {
        setwidth("0px");
    }
    function handleAdd() {
        // start for admin
        const url = process.env.REACT_APP_SERVER_URL + 'admin/applications/';
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setformAdminValues(data.adminApplications)
            })
        // end for admin
        setaddWidth("90%");
        setaddnewcomponent(1);
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function handleEditClick(value) {
        
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        seteditId(value);
        setwidth("90%");
        seteditnewcomponent(1)
        axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions/' + value, {
            headers: { 'Authorization': adminmounted }
        })
            .then(function (res) {
                var myuniversityAdmission = res.data.universityAdmission;
                if (res.data.success === true) {
             var myresultPoint = parse(myuniversityAdmission.point)
                    seteditPoint(myresultPoint);
                }
            })
            .catch(error => {
            });
    }

    let clickAddHandler = (datum) => {

        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul><br/>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#applicationTrixAdd")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleAddSubmit = () => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setApplicationError("")
        let originalString = document.getElementById("addApplicationx").value;
        var div = document.createElement("div");
        div.innerHTML = originalString;
        var InsetApplication = div.innerText;
        if (InsetApplication === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setaddWidth(0)
            setTable("false")
            setmyloader("true")
            const obj = {
                point: originalString
            };

            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/admissions', obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Admission Added")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'

                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityAdmissions)
                            })
                    }
                })
                .catch(error => {

                });
        }
    }
    let clickEditHandler = (datum) => {

        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#applicationTrixEdit")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleEditSubmit = () => {
        setApplicationError("")
        let originalString = document.getElementById("editApplicationx").value;
        var div = document.createElement("div");
        div.innerHTML = originalString;
        var InsetApplication = div.innerText;
        if (InsetApplication === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setwidth(0)
            setmyloader("true")
            const obj = {
                point: originalString
            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/admissions/' + editId


                , obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Admission Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'
                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityAdmissions)
                            })
                    }
                })
                .catch(error => {

                });
        }
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
                        axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/admissions/' + deleteId, { headers: { 'Authorization': adminmounted } })
                            .then(function (res) {
                                setmyloader("false")
                                if (res.data.success === true) {
                                    setsuccessMessage("Document deleted")
                                    setTimeout(() => setsubmitSuccess(""), 3000);
                                    setsubmitSuccess(1)
                                    const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions';
                                    fetch(url1, {
                                        method: 'GET'
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            var myresults = data.universityAdmissions
                                            if (Object.keys(myresults).length === 0) {
                                                setTable("true");
                                            }
                                            setFormValues(data.universityAdmissions)
                                        })
                                }
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
                <a className="card-header" data-bs-toggle="collapse" href="#collapse4"
                    onClick={() => handleClick()}><strong>4</strong>
                    Application Process
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
                <div id="collapse4" className="collapse" data-bs-parent="#accordion">

                    <div className="card-body">
                        <div className="formbody">
                            <div className="row">
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h5>Application Process</h5>
                                    <button type="button" onClick={() => handleAdd()}
                                        data-toggle="tooltip" data-placement="right" title="Add New Application"
                                        className="btn btn-outline-success"><span>

                                            <FontAwesomeIcon icon={faPlus} />

                                        </span>Add New Application</button>

                                </div>

                                <div className="card shadow mb-4">

                                    {myTable === "true" ?
                                        null
                                        : <div className="table-responsive-sm">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Application</th>
                                                        <th>Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {FormValues.map((element, index) => {

                                                        return (
                                                            <tr key={index}>
                                                                <td> {index + 1}</td>
                                                                <td>
                                                                    {parse(element.point)}
                                                                </td>
                                                                <td>
                                                                    <div className="tab-btn-grp">
                                                                        <button title="Edit" className="btn btn-success btn-sm " onClick={() => handleEditClick(element._id)}>

                                                                            <FontAwesomeIcon icon={faPen} />

                                                                        </button>
                                                                        <button title="Delete" className="btn btn-danger btn-sm vbtn" onClick={() => handleDeleteClick(element._id)}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>}
                                </div>
                                <div className="card-body course-sidenav" id="mySideAdd"
                                    style={{ width: addWidth }}
                                >
                                    <div className="student-view container-fluid">
                                        <div className="row">
                                            <div className="col-md-6">

                                            </div>
                                            <div className="col-md-6">
                                                <a title="Close" data-toggle="tooltip" data-placement="right" className="closebtn" onClick={closeaddbox} >&times;</a>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-lg-12 col-12 ">
                                                <h3>Add Application</h3>
                                            </div>
                                            <div className="trix_form_adjustement" >
                                                <div className="row card shadow">
                                                    <div className="col-lg-12">
                                                        <div className="row">
                                                            <div className="col-xl-6 col-md-12 " >
                                                                <div className="form-group ">
                                                                    <label htmlFor="comment">Add Application:</label>
                                                                    <input id="addApplicationx" type="hidden" />
                                                                    <trix-editor
                                                                        name="universityApplication"
                                                                        onChange={event => this.changeHandler(event)} className="applicationTrixAdd form-control editarea help "
                                                                        input="addApplicationx" id="applicationTrixAdd"
                                                                    >
                                                                    </trix-editor>
                                                                    <span className="error-msg"> {ApplicationError}</span>

                                                                </div>

                                                            </div>
                                                            <div className="col-xl-6  mt-2 " >
                                                                <div className="form-group textarea">
                                                                    <div className="EditorSide">
                                                                        <p>Choose your relevant pre-written examples. </p>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="WriterPoints">
                                                                                {formAdminValues.map((element, index) => (


                                                                                    <div key={index} className="rowx mt-3 ml-2 border border-secondary help_content" id="content_1">
                                                                                        <div className="col-sm-2x ">
                                                                                            <button
                                                                                                className="vert-btn"
                                                                                                onClick={() => clickAddHandler(element.application)}


                                                                                            >  <span className="VerticalText m-0">Add</span></button>
                                                                                        </div>
                                                                                        <div className="col-sm-10x p-0 ">
                                                                                            <p className="m-0 help_text">{element.application || ""}.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6"></div>
                                                            <div className="col-md-6 text-right">
                                                                <button type="button"
                                                                    onClick={() => handleAddSubmit()}
                                                                    className="btn btn-success" title="Save">Save
                                                                </button>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card-body course-sidenav" id="mySidenav"
                                    style={{ width: width }}
                                >
                                    <div className="student-view container-fluid">
                                        <div className="row">
                                            <div className="col-md-6">

                                            </div>
                                            <div className="col-md-6">
                                                <a title="Close" data-toggle="tooltip" data-placement="right" className="closebtn" onClick={closebox} >&times;</a>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-lg-12 col-12 ">
                                                <h3>Edit Application Process</h3>
                                            </div>
                                            <div className="trix_form_adjustement" >
                                                <div className="row card shadow">
                                                    <div className="col-lg-12">
                                                        <div className="row">
                                                            <div className="col-xl-6 col-md-12 " >
                                                                <div className="form-group ">
                                                                    <label htmlFor="comment">Application:</label>
                                                                    <input id="editApplicationx" type="hidden" />
                                                                    <trix-editor
                                                                        name="universityApplication"
                                                                        onChange={event => this.changeHandler(event)} className="applicationTrixEdit form-control editarea "
                                                                        input="editApplicationx" id="applicationTrixEdit"
                                                                    >

                                                                        {/* {parse(editPoint)} */}
                                                                        {editPoint}
                                                                    </trix-editor>
                                                                    <span className="error-msg"> {ApplicationError}</span>

                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6  mt-2 " >
                                                                <div className="form-group textarea">
                                                                    <div className="EditorSide">
                                                                        <p>Choose your relevant pre-written examples. </p>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="WriterPoints">
                                                                                {formAdminValues.map((element, index) => (
                                                                                    <div key={index} className="rowx mt-3 ml-2 border border-secondary help_content" id="content_1">
                                                                                        <div className="col-sm-2x ">
                                                                                            <button
                                                                                                className="vert-btn"
                                                                                                onClick={() => clickEditHandler(element.application)}

                                                                                            >  <span className="VerticalText m-0">Add</span></button>
                                                                                        </div>
                                                                                        <div className="col-sm-10x p-0 ">
                                                                                            <p className="m-0 help_text">{element.application || ""}.</p>
                                                                                        </div>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6"></div>
                                                            <div className="col-md-6 text-right">
                                                                <button type="button"
                                                                    onClick={() => handleEditSubmit()}
                                                                    className="btn btn-success" title="Save">Save
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
                    </div>
                </div>
            </div>
        </div >
    );
}


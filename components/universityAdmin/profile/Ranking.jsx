
import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { Modal, Button } from 'react-bootstrap';

import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash, faPlus, faPen
} from '@fortawesome/free-solid-svg-icons';
export default function Ranking() {

    const [certificateValue, setcertificateValue] = useState("");

    const [agencyName, setagencyName] = useState("");
    const [rank, setrank] = useState("");
    const [year, setyear] = useState("");
    const [certificate, setcertificate] = useState("");
    const [showCertificate, setshowCertificate] = useState("");
    const [certificateError, setcertificateError] = useState("");
    const [editdata, seteditdata] = useState([]);
    const [formAdminValues, setformAdminValues] = useState([{
        application: ""
    }])
    const [editPoint, seteditPoint] = useState([{
        agencyName: "", rank: "", year: "", certificate: ""
    }])
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [editnewcomponent, seteditnewcomponent] = useState(0);
    const [addnewcomponent, setaddnewcomponent] = useState(0);
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [tempp, settempp] = useState("0");
    const [myapplication, setmyapplication] = useState();
    const [addWidth, setaddWidth] = useState("");
    const [editId, seteditId] = useState([]);
    const [width, setwidth] = useState("");
    const [universityId, setuniversityId] = useState("");
    const [MYpoint, setMYpoint] = useState();
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [myTable, setTable] = useState("false");
    const [loader, setmyloader] = useState("false");
    const [ApplicationError, setApplicationError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [extensionError, setextensionError] = useState("0");
    const [submitError, setsubmitError] = useState("0");
    const [showModal, setshowModal] = useState(false);
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    function open(value) {

        setcertificateValue(value)
        setshowModal(true)
    }
    function close() {
        setshowModal(false)
    }
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        if (adminUniversityId !== null) {
            const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/rankings';
            fetch(url1, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.universityRankings;
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setdata(data.universityRankings)
                })
        }
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId);

    }, [])


    function handleAdd() {

        setaddWidth("90%");
        setaddnewcomponent(1);
    }

    function closeaddbox(value) {
        setaddWidth("0px");
        setwidth("0PX")
    }

    function handleFormSubmit(event) {
        event.preventDefault();
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setcertificateError("")
        setshowCertificate("")
        if (certificate === "") {
            setcertificateError("Certificate Is Required")
        }
        else {
            var fileName = certificate.path;
            var fileExtension = fileName.split('.').pop();
        }


        if (certificate === "") {
            setcertificateError("Certificate Is Required")
        }
        else if (fileExtension !== "jpeg" && fileExtension !== "jpg" && fileExtension !== "png" && fileExtension !== "webp"
        ) {
            setTimeout(() => setsubmitError(""), 3000);
            setsubmitError(1)
        }
        else {
            setaddWidth(0)
            setTable("false")
            setmyloader("true")
            const obj1 = new FormData();
            obj1.append("agencyName", agencyName);
            obj1.append("rank", rank);
            obj1.append("year", year);
            obj1.append("certificate", certificate);

            const url2 = process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/rankings'
            fetch(url2, {
                method: 'post',
                headers: { 'Authorization': adminmounted },
                body: obj1
            })
                .then(response => response.json())
                .then(data => {
                    setmyloader("false")
                    setsuccessMessage("Ranking Added")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    setagencyName("")
                    setrank("")
                    setyear("")
                    setcertificate("")
                    const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/rankings'

                    fetch(url1, {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(data => {
                            var myresults = data.universityRankings;
                            if (Object.keys(myresults).length === 0) {
                                setTable("true");
                            }
                            setdata(data.universityRankings)
                        })
                })
        }
    }
    function handleEditClick(value) {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        seteditId(value);
        setwidth("90%");
        seteditnewcomponent(1)
        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/rankings/' + value
        fetch(url1, {
            method: 'GET',

            headers: { 'Authorization': adminmounted }
        })
            .then(response => response.json())
            .then(data => {
                var myresults = data.universityRanking;

                setagencyName(myresults.agencyName)
                setrank(myresults.rank)
                setyear(myresults.year)
                setcertificate(myresults.certificate)

            })





    }
    let handleEditSubmit = (event) => {
        event.preventDefault();
        setcertificateError("")
        setshowCertificate("")

        if (certificate === "") {
            setcertificateError("Certificate Is Required")


        }

        else {


            setwidth(0)

            setTable("false")
            setmyloader("true")
            const obj1 = new FormData();
            obj1.append("agencyName", agencyName);
            obj1.append("rank", rank);
            obj1.append("year", year);
            obj1.append("certificate", certificate);

            const url2 = process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/rankings/' + editId
            fetch(url2, {
                method: 'put',
                headers: { 'Authorization': adminmounted },
                body: obj1
            })
                .then(response => response.json())
                .then(data => {
                    setsuccessMessage("Ranking Updated")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)

                    setmyloader("false")
                    const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/rankings';
                    fetch(url1, {
                        method: 'GET'
                    })
                        .then(response => response.json())
                        .then(data => {
                            var myresults = data.universityRankings;
                            if (Object.keys(myresults).length === 0) {
                                setTable("true");
                            }
                            setdata(data.universityRankings)
                        })
                })
        }


    }

    function handleDeleteClick(value) {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    return (
        <div>
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
                        axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/rankings/' + deleteId, { headers: { 'Authorization': adminmounted } })
                            .then(function (res) {
                                setmyloader("false")
                                if (res.data.success === true) {
                                    setsuccessMessage("Document deleted")
                                    setTimeout(() => setsubmitSuccess(""), 3000);
                                    setsubmitSuccess(1)
                                    const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/rankings';
                                    fetch(url1, {
                                        method: 'GET'
                                    })
                                        .then(response => response.json())
                                        .then(data => {
                                            var myresults = data.universityRankings;
                                            if (Object.keys(myresults).length === 0) {
                                                setTable("true");
                                            }
                                            setdata(data.universityRankings)
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
                <a className="card-header" data-bs-toggle="collapse" href="#collapse7"


                ><strong>7</strong>
                    Ranking
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
                <div id="collapse7" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        {loader === "true" ?
                            <Loader />
                            : null}

                        {submitSuccess === 1 ? <div className="Show_success_message">
                            <strong></strong> {successMessage}
                        </div> : null}


                        <div className="container">
                            <div className="mt-4 mb-4">
                                <div className='row'>
                                    <div className='col-md-6'><h5>Ranking</h5></div>
                                    <div className='col-md-6 text-right'> <button type="button" onClick={() => handleAdd()} className="btn btn-outline-success"
                                        data-toggle="tooltip" data-placement="right" title="Add New Ranking"
                                    ><span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </span>Add New Ranking</button></div>
                                </div>

                                <div className="card shadow mb-4 mt-3">

                                    {myTable === "true" ?
                                        null
                                        : <div className="table-responsive-sm">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>No.</th>
                                                        <th>Agency Name</th>
                                                        <th>Rank</th>
                                                        <th>Year</th>
                                                        <th>Certificate</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((element, index) => {

                                                        return (
                                                            <tr key={index}>
                                                                <td> {index + 1}</td>
                                                                <td> {element.agencyName}</td>
                                                                <td> {element.rank}</td>
                                                                <td> {element.year}</td>
                                                                <td>
                                                                    <Button onClick={() => open(element.certificate)} >View Certificate</Button>
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
                                            {submitError === 1 ? <div className="Show_error_message">
                                                <strong></strong> File extension not supported
                                            </div> : null}
                                            <div className="col-lg-12 col-12 ">
                                                <h3>Add New Ranking</h3>
                                            </div>

                                            <form onSubmit={handleFormSubmit}>
                                                <div className="card shadow">
                                                    <div className="mb-3 ">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="fname" className="form-label">Agency Name<span className="req-star">*</span></label>
                                                                    <input required type="text" className="form-control" placeholder="Agency Name" name="agname"
                                                                        value={agencyName}
                                                                        onChange={(e) => setagencyName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="lname" className="form-label">Rank<span className="req-star">*</span></label>
                                                                    <input required type="number" className="form-control" placeholder="" name="rank"
                                                                        value={rank}
                                                                        onChange={(e) => setrank(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="lname" className="form-label">Year<span className="req-star">*</span></label>
                                                                    <input required type="number" className="form-control" placeholder="" name="rank"
                                                                        value={year}
                                                                        onChange={(e) => setyear(e.target.value)}
                                                                    />


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="form-group ">
                                                                <label htmlFor="fname" className="form-label">Certificate<span className="req-star">*</span>

                                                                </label>
                                                                {/* <p>File extensions supported  .jpeg, .jpg, .webp</p> */}
                                                                <Dropzone onDrop={(acceptedFiles) => {
                                                                    setcertificate(acceptedFiles[0])
                                                                    setshowCertificate(acceptedFiles[0].path)

                                                                    setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                        preview: URL.createObjectURL(file)

                                                                    })));
                                                                }} name="heroImage" multiple={false}>
                                                                    {({ getRootProps, getInputProps }) => (
                                                                        <div {...getRootProps({ className: 'ranking-dropzone' })}>
                                                                            <input {...getInputProps()} />
                                                                            <div style={{ fontSize: ".8rem" }}>
                                                                                Upload/Drag & Drop here
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Dropzone>

                                                                <span className="error-msg"> {certificateError}</span>


                                                                <p className="selected-certificate"> {showCertificate}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6"></div>
                                                            <div className="col-md-6 text-right">

                                                                <button type="submit"

                                                                    className="btn btn-success" title='Add'>Add
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                                </div>

                                <div className="card-body course-sidenav" id="mySidenav" style={{ width: width }}>

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
                                                <h3>Edit Ranking</h3>
                                            </div>
                                            <form onSubmit={handleEditSubmit}>
                                                <div className="card shadow">
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="fname" className="form-label">Agency Name<span className="req-star">*</span></label>
                                                                    <input required type="text" className="form-control" placeholder="Agency Name" name="agname"
                                                                        value={agencyName}
                                                                        onChange={(e) => setagencyName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="lname" className="form-label">Rank<span className="req-star">*</span></label>
                                                                    <input required type="number" className="form-control" placeholder="" name="rank"
                                                                        value={rank}
                                                                        onChange={(e) => setrank(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="form-group ">
                                                                    <label htmlFor="lname" className="form-label">Year<span className="req-star">*</span></label>
                                                                    <input required type="number" className="form-control" placeholder="" name="rank"
                                                                        value={year}
                                                                        onChange={(e) => setyear(e.target.value)}
                                                                    />


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="form-group ">

                                                                <label htmlFor="fname" className="form-label">Certificate<span className="req-star">*</span>

                                                                </label>

                                                                {/* <p>File extensions supported  .jpeg, .jpg, .webp</p> */}

                                                                <div className="ranking-certif"> <img src={certificate} alt="certificate" className="edit-certificate" /></div>
                                                                <Dropzone onDrop={(acceptedFiles) => {

                                                                    setcertificate(acceptedFiles[0])
                                                                    setshowCertificate(acceptedFiles[0].path)

                                                                    setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                                                        preview: URL.createObjectURL(file)

                                                                    })));
                                                                }} name="heroImage" multiple={false}>
                                                                    {({ getRootProps, getInputProps }) => (
                                                                        <div {...getRootProps({ className: 'ranking-dropzone' })}>
                                                                            <input {...getInputProps()} />
                                                                            <div style={{ fontSize: ".8rem" }}>
                                                                                Upload/Drag & Drop here
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Dropzone>

                                                                <span className="error-msg"> {certificateError}</span>

                                                                {/* <p className="selected-certificate"> {certificate}</p> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-6"></div>
                                                            <div className="col-md-6 text-right">

                                                                <button type="submit"

                                                                    className="btn btn-success" title='Submit'>Submit
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
                </div>

            </div >
            <Modal className="modal-container"
                show={showModal}
                onHide={() => close()}

                animation={true}
                bsSize="small">

                <Modal.Header closeButton>
                    <Modal.Title>Certificate</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <img src={certificateValue} alt="passportback" />
                </Modal.Body>


            </Modal>
        </div>

    );
}


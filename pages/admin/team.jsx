import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../components/Loader';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
// import '../../scss/adminTeam.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash, faPlus, faPen
} from '@fortawesome/free-solid-svg-icons';

export default function AdminTeam() {
    const [showModal, setshowModal] = useState(false);
    const [showModal2, setshowModal2] = useState(false);
    const [editId, seteditId] = useState(false);
    const [editName, seteditName] = useState(false);
    const [editEmail, seteditEmail] = useState(false);
    const [editPassword, seteditPassword] = useState(false);
    const [editType, seteditType] = useState(false);


    const [mounted, setMounted] = useState();
    const [adminId, setadminId] = useState();
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [type, settype] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [address, setaddress] = useState("");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [pincode, setpincode] = useState("");

    const [description, setdescription] = useState("");
    const [website, setwebsite] = useState("");
    const [data, setdata] = useState([]);
    const [myTable, setTable] = useState("");
    const [organization, setorganization] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [CheckState, setCheckState] = useState("0");
    const [CheckCity, setCheckCity] = useState("0");
    const [phoneError, setphoneError] = useState("");
    const [typeError, settypeError] = useState("");
    const [descriptionError, setdescriptionError] = useState("");
    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");
    const [DescriptionLengthError, setDescriptionLengthError] = useState("");
    const [websiteStartError, setwebsiteStartError] = useState("");
    const [websiteEndError, setwebsiteEndError] = useState("");
    const [pincodeError, setpincodeError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [loader, setmyloader] = useState("false");
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
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem('adminToken');
        setMounted(mounted)
        setadminId(adminId);
        if (adminId !== null) {
            const url1 = process.env.REACT_APP_SERVER_URL + 'admin/team';
            fetch(url1, {
                method: 'GET',
                headers: { 'Authorization': mounted }
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.adminTeam;

                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setdata(data.adminTeam)
                })
        }

    }, [])
    function open() {
        setshowModal(true)
    }
    function close() {
        setshowModal(false)
    }
    function open2(id, name, email, password, type) {
        seteditId(id)
        seteditName(name)
        seteditEmail(email)
        seteditPassword(password)
        seteditType(type)
        setshowModal2(true)
    }
    function close2() {
        setshowModal2(false)
    }
    function handleEditSubmit(event) {
        event.preventDefault();

        setmyloader("true")
        const obj = {
            name: editName,
            email: editEmail,
            password: editPassword,
            type: editType,

        };
        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/team/' + editId, obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setshowModal2(false)
                setmyloader("false")
                if (res.data.success === true) {
                    setsuccessMessage("Team Updated")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    const url1 = process.env.REACT_APP_SERVER_URL + 'admin/team';
                    fetch(url1, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            var myresults = data.adminTeam;
                            if (Object.keys(myresults).length === 0) {
                                setTable("true");
                            }
                            setdata(data.adminTeam)
                        })
                }
            })
            .catch(error => {
            });
    }
    function handleFormSubmit(event) {
        event.preventDefault();
        setmyloader("true")
        const obj = {
            name: name,
            email: email,
            password: password,
            type: type,

        };
        axios.post(process.env.REACT_APP_SERVER_URL + 'admin/team', obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setshowModal(false)
                setmyloader("false")
                if (res.data.success === true) {
                    setsuccessMessage("Team Added")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    const url1 = process.env.REACT_APP_SERVER_URL + 'admin/team';
                    fetch(url1, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            var myresults = data.adminTeam;
                            if (Object.keys(myresults).length === 0) {
                                setTable("true");
                            }
                            setdata(data.adminTeam)
                        })
                }
            })
            .catch(error => {
            });
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
    function handlestate(e) {
        setstate(e)
        setCheckCity("1")
        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handleDeleteClick(value) {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function handleEditClick() {
        alert("dfgd")
    }
    return (
        <div id="page-top">
            <div id="wrapper"><AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container-fluid">
                            {loader === "true" ?
                                <Loader />
                                : null}
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong></strong> {successMessage}
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
                                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/team/' + deleteId, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("Team Deleted")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)
                                                const url1 = process.env.REACT_APP_SERVER_URL + 'admin/team';
                                                fetch(url1, {
                                                    method: 'GET',
                                                    headers: { 'Authorization': mounted }
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        var myresults = data.adminTeam;
                                                        if (Object.keys(myresults).length === 0) {
                                                            setTable("true");
                                                        }
                                                        setdata(data.adminTeam)
                                                    })
                                            }
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
                                <h1 className="h3 mb-0 text-gray-800">Partner Team</h1>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mb-4">
                                    <div className="card shadow mb-4">
                                        <div className="card-header py-3">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h6 className="m-0 font-weight-bold text-primary">All Team</h6>
                                                </div>
                                                <div className="col-md-4"></div>
                                                <div className="col-md-2">
                                                    <button type="button" className="btn btn-success"
                                                        onClick={() => open()}
                                                    ><span><i className="fas fa-plus"></i></span>Add Team</button>
                                                </div>
                                            </div>
                                        </div>
                                        <Modal className="modal-container"
                                            show={showModal}
                                            onHide={() => close()}
                                            animation={true}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Add Team</Modal.Title>
                                            </Modal.Header>
                                            <div className="modal-body">
                                                <form onSubmit={handleFormSubmit}>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label className="form-label"><span>*</span>Name</label>
                                                                <input type="text" className="form-control"
                                                                    required
                                                                    placeholder="" name="name"
                                                                    value={name}
                                                                    onChange={(e) => setname(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="form-label"><span>*</span>Email</label>
                                                                <input type="text" className="form-control" placeholder="" name="email"
                                                                    required
                                                                    value={email}
                                                                    onChange={(e) => setemail(e.target.value)} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <div className="row">
                                                            <div className="col-md-4">
                                                                <label className="form-label"><span>*</span>Password</label>
                                                                <input type="text" className="form-control" placeholder="" name="password"
                                                                    value={password}
                                                                    required
                                                                    onChange={(e) => setpassword(e.target.value)} />
                                                            </div>
                                                            <div className="col-md-4">
                                                                <label className="form-label"><span>*</span>Type</label>
                                                                <select className="form-control" name="type" required
                                                                    value={type}
                                                                    onChange={(e) => settype(e.target.value)}>
                                                                    <option value="">Select Type</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="moderator">Moderator</option>
                                                                </select>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button type="submit" className="btn btn-primary" >Save</button>
                                                </form>
                                            </div>
                                        </Modal>
                                        <div className="card-body">
                                            <div className="table-responsive">
                                                <div id="dataTable_wrapper" className="dataTables_wrapper dt-bootstrap4">
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <div className="card shadow mb-4 mt-3">
                                                                {myTable === "true" ?
                                                                    null
                                                                    : <div className="table-responsive-sm">
                                                                        <table className="table table-bordered">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>No.</th>
                                                                                    <th>Name</th>
                                                                                    <th> Email</th>

                                                                                    <th> Password</th>
                                                                                    <th> Type</th>
                                                                                    <th>Action</th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {data.map((element, index) => {
                                                                                    return (
                                                                                        <tr key={index}>
                                                                                            <td> {index + 1}</td>
                                                                                            <td> {element.name}</td>
                                                                                            <td> {element.email}</td>

                                                                                            <td> {element.password}</td>
                                                                                            <td> {element.type}</td>
                                                                                            <td>
                                                                                                <button title="Edit" className="btn btn-success btn-sm " onClick={() => open2(element._id, element.name, element.email, element.password, element.type)}>
                                                                                                    <FontAwesomeIcon icon={faPen} />
                                                                                                </button>
                                                                                                <button title="Delete" className="btn btn-danger btn-sm vbtn" onClick={() => handleDeleteClick(element._id)}>
                                                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                                                </button>
                                                                                            </td>
                                                                                        </tr>
                                                                                    )
                                                                                })}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Modal className="modal-container"
                                show={showModal2}
                                onHide={() => close2()}
                                animation={true}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Team</Modal.Title>
                                </Modal.Header>
                                <div className="modal-body">
                                    <form onSubmit={handleEditSubmit}>
                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label className="form-label"><span>*</span>Name</label>
                                                    <input type="text" className="form-control"
                                                        required
                                                        placeholder="" name="name"
                                                        value={editName}
                                                        onChange={(e) => seteditName(e.target.value)}
                                                    />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label"><span>*</span>Email</label>
                                                    <input type="text" className="form-control" placeholder="" name="email"
                                                        required
                                                        value={editEmail}
                                                        onChange={(e) => seteditEmail(e.target.value)} />
                                                </div>

                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label className="form-label"><span>*</span>Password</label>
                                                    <input type="text" className="form-control" placeholder="" name="password"
                                                        value={editPassword}
                                                        required
                                                        onChange={(e) => seteditPassword(e.target.value)} />
                                                </div>
                                                <div className="col-md-4">
                                                    <label className="form-label"><span>*</span>Type</label>
                                                    <select className="form-control" name="type" required
                                                        value={editType}
                                                        onChange={(e) => seteditType(e.target.value)}>
                                                        <option value="">Select Type</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="moderator">Moderator</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" className="btn btn-primary" >Save</button>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
   faTrash
} from '@fortawesome/free-solid-svg-icons';
const Adminscholarship = () => {
    const [formValues, setFormValues] = useState([{
        scholarship: "", _id: "null"
    }])
    const [mounted, setMounted] = useState();
    const [loader, setmyloader] = useState("false");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    useEffect(() => {
        var adminId = localStorage.getItem('adminId')
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
        const url = process.env.REACT_APP_SERVER_URL + "admin/scholarships/";
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                var myresults = data.adminScholarships;
                if (Object.keys(myresults).length === 0) {
                }
                else {
                    setFormValues(data.adminScholarships)
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
            scholarship: "",
            _id: "null"
        }])
    }
    let handleSubmit = (event) => {
        event.preventDefault();
        setmyloader("true")
        formValues.map(async (item) => {
            if (item._id === "null") {
                await axios.post(process.env.REACT_APP_SERVER_URL + 'admin/scholarships', item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("scholarship Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + "admin/scholarships/";
                            fetch(url, {
                                method: 'GET',
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.adminScholarships;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.adminScholarships)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
            else {
                await axios.put(process.env.REACT_APP_SERVER_URL + 'admin/scholarships/' + item._id, item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("scholarship Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + "admin/scholarships/";
                            fetch(url, {
                                method: 'GET',
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.adminScholarships;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.adminScholarships)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
        })
    }
    function handleDeleteClick(value) {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    return (
        <div className="card">
            <a className="card-header" data-bs-toggle="collapse" href="#collapse3"><strong>3</strong>
                Scholarship
            </a>
            {loader === "true" ?
                <Loader />
                : null}
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
                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/scholarships/' + deleteId, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("scholarship deleted")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + "admin/scholarships/";
                                fetch(url, {
                                    method: 'GET',
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.adminScholarships;
                                        if (Object.keys(myresults).length === 0) {
                                            setFormValues([{
                                                scholarship: "",
                                                _id: "null"
                                            }])
                                         }
                                        else {
                                            setFormValues(data.adminScholarships)
                                        }
                                    })
                            }
                        })
                        .catch(error => {
                        });
                }}
                onCancel={() =>
                    setshowSweetAlert("0")
                }
                focusCancelBtn  >
            </SweetAlert>
                : null
            }
            <div id="collapse3" className="collapse" data-bs-parent="#accordion">
                <div className="card-body">
                    <div className="form-block">
                        <form onSubmit={handleSubmit}>
                            <div className="card-body" >
                                <div className="from-block" >
                                    {formValues.map((element, index) => (
                                        <div className="row" key={index}>
                                            <div className="mb-3">
                                            {element._id !== "null" ?
                                                <a title="Delete" className="btn  btn-danger deleteFamily" onClick={() => handleDeleteClick(element._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </a>
                                                : null}
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label className="form-label">Scholarship
                                                                <span className="text-danger"> *</span></label>
                                                            <input type="text" className="form-control" required
                                                                placeholder="scholarship" name="scholarship"
                                                                value={element.scholarship || ""} onChange={e => handleChange(index, e)} />
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
                                                <button title="Add New" type="button" className="btn btn-success " onClick={() => addFormFields()}>Add New</button>
                                                <button title="Save" type="submit" className="btn btn-secondary ml-2">Save
                                                </button>
                                                <button title="Save & Next" type="submit" data-bs-toggle="collapse" href="#collapse4" className="btn btn-success ">Save &
                                                    Next</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="row pl-4 pr-4 mt-3">
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminscholarship
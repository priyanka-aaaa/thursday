import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
// import '../../scss/adminApplicationStep.scss';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
export default function ApplicationStep() {
    const [viewWidth, setviewWidth] = useState("0px");
    const [countryId, setcountryId] = useState("0px");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [successDeleteMessage, setsuccessDeleteMessage] = useState("");
    const [submitDeleteSuccess, setsubmitDeleteSuccess] = useState("0");
    const [universityApplication, setuniversityApplication] = useState([])
    const [data, setdata] = useState([]);
    const [mounted, setMounted] = useState();
    const [loader, setmyloader] = useState("false");
    useEffect(() => {
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function countries() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + 'admin/countries';
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")
                        setdata(data.adminCountrys)
                    })
            }
            countries()
        }
    }, [])
    function handleCloseView() {
        setviewWidth("0px");
    }

    function handleEdit(value) {
        setcountryId(value)
        setviewWidth("1600px");
        const url2 = process.env.REACT_APP_SERVER_URL + 'admin/countries/' + value;
        fetch(url2, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                setuniversityApplication(data.adminCountry.countrySteps)
            })
    }
    let addFormFields = () => {
        let person = prompt("Enter string");
        if (person) {
            setuniversityApplication([...universityApplication, person]
            )
        }
    }
    let handleChange = (i, e) => {
        let newFormValues = [...universityApplication];
        newFormValues[i] = e.target.value;
        setuniversityApplication(newFormValues);
    }

    function handleDelete(i, e) {
        setmyloader("true")
        // alert(i)
        // var filteredurls = universityApplication.filter(e => e !== i)
        // alert(filteredurls)
        // return
        let newFormValues = [...universityApplication];
        newFormValues.splice(i, 1);
        setuniversityApplication(newFormValues)

        const itemw = {
            countrySteps: newFormValues,
        };

        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/countries/' + countryId, itemw, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setmyloader("false")
                if (res.data.success === true) {
                 
                    setsuccessDeleteMessage("Application Step Deleted")
                    setTimeout(() => setsubmitDeleteSuccess(""), 3000);
                    setsubmitDeleteSuccess(1)
                    //start
                    const url2 = process.env.REACT_APP_SERVER_URL + 'admin/countries/' + countryId;
                    fetch(url2, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setuniversityApplication(data.adminCountry.countrySteps)
                        })
                    //end
                }
            })
            .catch(error => {
            });
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        var ar1r = []
        ar1r = universityApplication.filter(item => item);
       

        const item = {
            countrySteps: ar1r,
        };

        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/countries/' + countryId, item, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.success === true) {
                    setsuccessMessage("Application Step Updated")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    //start
                    const url2 = process.env.REACT_APP_SERVER_URL + 'admin/countries/' + countryId;
                    fetch(url2, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setuniversityApplication(data.adminCountry.countrySteps)
                        })
                    //end
                }
            })
            .catch(error => {
            });
    }
    return (
        <div id="page-top">
        <div id="wrapper"><AdminSidebar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <AdminTopbar />
        <div className="container-fluid admin-dashboard">
            {loader === "true" ?
                <Loader />
                : null}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Application Step</h1>
                {submitSuccess === 1 ? <div className="Show_success_message">
                    <strong>Success!</strong> {successMessage}
                </div> : null}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="card shadow mb-4">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Country Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((object, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{object.country}</td>
                                            <td>
                                                <button title="Edit" className="btn btn-success btn-sm" onClick={() => handleEdit(object._id)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="mySidenav" className="sidenav" style={{ width: viewWidth }}>
                    <div className="container-fluid">
                        <div className="card">
                            <div className="row">
                                <div className="col-md-12">
                                    <a onClick={() => handleCloseView()} className="closebtn mt-50" >×</a>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="form-block">
                                    {submitSuccess === 1 ? <div className="Show_success_message">
                                        <strong>Success!</strong> {successMessage}
                                    </div> : null}
                                    {submitDeleteSuccess === 1 ? <div className="Show_success_message">
                                        <strong>Success!</strong> {successDeleteMessage}
                                    </div> : null}
                                    <div className="card-body">
                                        <h1 className="h3 mb-3 text-gray-800">Add Application Step</h1>
                                        <div className="col-sm-12">
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="row">
                                                            {universityApplication.map((object, i) => {
                                                                return (
                                                                    <div className="col-sm-4 ">
                                                                        <div className="form-group" key={i}>
                                                                            <label htmlFor="password"> Steps</label>
                                                                            <div className="row">
                                                                           <div className="col-md-10">
                                                                                <input required="" name="countrySteps"
                                                                                        type="text"
                                                                                        className="form-control"
                                                                                        value={object}
                                                                                        onChange={e => handleChange(i, e)}

                                                                                    />
                                                                           </div>
                                                                           <div className="col-md-2">
                                                                           <button title="Delete" className="btn btn-danger  vbtn"  onClick={e => handleDelete(i, e)}>
                                                                                <FontAwesomeIcon icon={faTrash} />
                                                                            </button>
                                                                           </div>
                                                                           </div>  
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                            <div className="col-sm-12 text-danger"></div>
                                                        </div>
                                                        <div className="mb-3">
                                                            <div className="row">
                                                                <div className="col-md-6"></div>
                                                                <div className="col-md-6 text-right">
                                                                    <button title="Add New" type="button" className="btn btn-success " onClick={() => addFormFields()}>Add New</button>
                                                                    <button title="Save" type="submit" className="btn btn-secondary ml-2">Save
                                                                    </button>
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
                </div>
            </div>
        </div>
    );
}
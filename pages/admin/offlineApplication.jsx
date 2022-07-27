import React, { useState, useEffect } from "react";
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';
// import '../../scss/adminDashboard.scss';
export default function offlineApplication(props) {

    const [email, setemail] = useState("");
    const [universityName, setuniversityName] = useState("");
    const [courseName, setcourseName] = useState("");
    const [country, setcountry] = useState("");
    const [mounted, setMounted] = useState();
    const [emailExistError, setemailExistError] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");

    
    useEffect(() => {
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
    }, [])
    function Personal_Information(event) {
        event.preventDefault();
        const obj = {
            universityName: universityName,
            courseName: courseName,
            country: country,
            email: email
            //end for passport yes
        };
        axios.post(process.env.REACT_APP_SERVER_URL + 'admin/order', obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                if (res.data.message === "Email not exist") {
                    setemailExistError("Email not exist")
                }
                if (res.data.success === true) {
                    setsuccessMessage("Appllication Added")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                }

            })
            .catch(error => {
              
            });
    }
    return (
        <div id="page-top">

            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container">
                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Start New Offline Application </h1>
                            </div>
                            <form onSubmit={Personal_Information}>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="state" className="form-label">Student Email<span className="req-star">*</span></label>

                                                <input
                                                    value={email || ""}
                                                    onChange={(e) => setemail(e.target.value)}
                                                    type="text" className="form-control" placeholder="Email" name="fname" required />
                                                <div className="error-msg"> {emailExistError}</div>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="fname" className="form-label">University Name<span className="req-star">*</span></label>
                                                <input
                                                    value={universityName || ""}
                                                    onChange={(e) => setuniversityName(e.target.value)}
                                                    type="text" className="form-control" placeholder="University Name" name="fname" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="row">

                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="Mname" className="form-label">Course
                                                    Name</label>
                                                <input
                                                    value={courseName || ""}
                                                    onChange={(e) => setcourseName(e.target.value)}
                                                    type="text" className="form-control" placeholder="Course Name" name="Mname" required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="lname" className="form-label">Country Name  <span className="req-star">*</span></label>
                                                <select className="form-control" name="country" required
                                                    value={country || ""}
                                                    onChange={(e) => setcountry(e.target.value)}
                                                >
                                                    <option value="">Select Country</option>
                                                    <option value="United States">USA</option>
                                                    <option value="United Kingdom">UK</option><option value="Australia">Australia</option>
                                                    <option value="New Zealand">New Zealand</option>
                                                    <option value="Germany">Germany</option><option value="Canada">Canada</option>
                                                    <option value="Cyprus">Cyprus</option>
                                                </select>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success mr-2" title="Save">Save
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useState, useEffect, useMemo } from "react";
// import Loader from '../../Loader';
import Loader from '../../components/Loader';
import AdminLayout from '../../components/AdminLayout';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';
// import '../../scss/adminDashboard.scss';
export default function OfflineApplication(props) {
    const [session, setsession] = useState("");
    const [loader, setmyloader] = useState("false");
    const [email, setemail] = useState("");
    const [universityName, setuniversityName] = useState("");
    const [courseName, setcourseName] = useState("");
    const [country, setcountry] = useState("");
    const [month, setmonth] = useState("");

    const [year, setyear] = useState("");

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
        setmyloader("true")
        var finalvalue = month + " " + year;
        const obj = {
            universityName: universityName,
            courseName: courseName,
            country: country,
            email: email,
            session: finalvalue
            //end for passport yes
        };
        axios.post(process.env.REACT_APP_SERVER_URL + 'admin/order', obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setmyloader("false")
                if (res.data.message === "Email not exist") {
                    setemailExistError("Email not exist")
                }
                if (res.data.success === true) {
                    setsuccessMessage("Appllication Added")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    setuniversityName("")
                    setcourseName("")
                    setcountry("")
                    setemail("")
                    setsession("")
                }

            })
            .catch(error => {

            });
    }
    return (<>
        <AdminLayout />
        <div className="mainmain">

            <div className="container">
                {loader === "true" ?
                    <Loader />
                    : null}
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
                                        onChange={(e) => {
                                            setemail(e.target.value)
                                            setemailExistError("")
                                        }
                                        }
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
                        <div className="mb-3">
                            <div className="row">

                                <div className="col-md-6">
                                    <div className="from-group">
                                        <label htmlFor="Mname" className="form-label">Session month</label>
                                        <select

                                            className="form-control"
                                            placeholder="Session" name="Month"
                                            value={month} required
                                            onChange={(e) => setmonth(e.target.value)}>
                                            <option value=''>Select Month</option>
                                            <option value='Jan'>Janaury</option>
                                            <option value='Feb'>February</option>
                                            <option value='March'>March</option>
                                            <option value='April'>April</option>
                                            <option value='May'>May</option>
                                            <option value='June'>June</option>
                                            <option value='July'>July</option>
                                            <option value='Aug'>August</option>
                                            <option value='Sep'>September</option>
                                            <option value='Oct'>October</option>
                                            <option value='Nov'>November</option>
                                            <option value='Dec'>December</option>
                                        </select>


                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="from-group">
                                        <label htmlFor="Mname" className="form-label">Session Year</label>
                                        <select required
                                            className="form-control"
                                            placeholder="Year" name="year"
                                            value={year}
                                            onChange={(e) => setyear(e.target.value)}>
                                            <option value=''>Select Year</option>
                                            <option value='2022'>2022</option>
                                            <option value='2023'>2023</option>
                                            <option value='2024'>2024</option>
                                            <option value='2025'>2025</option>
                                            <option value='2026'>2026</option>

                                        </select>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success mr-2" title="Save">Save
                    </button>
                </form>
            </div>
        </div></>

    );
}

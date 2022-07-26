import React,{useState} from "react";
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';

// import '../../scss/adminDashboard.scss';
function offlineApplication(props) {
    const [email, setemail] = useState("");
    const [universityName, setuniversityName] = useState("");
    const [courseName, setcourseName] = useState("");
    const [countryName, setcountryName] = useState("");
    function Personal_Information(event){

    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Offline Application </h1>
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
                                         
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="fname" className="form-label">University Name<span className="req-star">*</span></label>
                                                <input
                                                    value={universityName || ""}
                                                    onChange={(e) => setuniversityName(e.target.value)}
                                                    type="text" className="form-control" placeholder="University Name" name="fname" required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="Mname" className="form-label">Course
                                                    Name</label>
                                                <input
                                                    value={courseName || ""}
                                                    onChange={(e) => setcourseName(e.target.value)}
                                                    type="text" className="form-control" placeholder="Course Name" name="Mname" />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="from-group">
                                                <label htmlFor="lname" className="form-label">Country Name  <span className="req-star">*</span></label>
                                                <input
                                                    value={countryName || ""}
                                                    onChange={(e) => setcountryName(e.target.value)}
                                                    type="text" className="form-control" placeholder="Country Name" name="lname" required />
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

export default offlineApplication;
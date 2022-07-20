import React from "react";

import AdminApplication from '../../components/admin/Application';
import AdminDocument from '../../components/admin/Document';
import AdminScholarship from '../../components/admin/Scholarship';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
// import '../../scss/adminDashboard.scss';
function AdminProfile(props) {
    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">University/School </h1>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 ">
                                    <div id="accordion">
                                        <AdminApplication />
                                        <AdminDocument />
                                        <AdminScholarship />
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

export default AdminProfile;
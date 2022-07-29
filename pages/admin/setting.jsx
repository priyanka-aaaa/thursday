import React from "react";
import AdminLayout from '../../components/AdminLayout';
import AdminApplication from '../../components/admin/Application';
import AdminDocument from '../../components/admin/Document';
import AdminScholarship from '../../components/admin/Scholarship';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
// import '../../scss/adminDashboard.scss';
function AdminProfile(props) {
    return (
        <>
            <AdminLayout />
            <div className="mainmain">
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
        </>
    );
}

export default AdminProfile;
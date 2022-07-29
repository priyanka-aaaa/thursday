import React, { useState, useEffect, useMemo } from "react";
import AdminLayout from '../../components/AdminLayout';
import { TableHeader, Pagination, Search } from "../../components/admin/DataTable";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash
} from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
export default function Counseling() {
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [comments, setComments] = useState([{
        name: "", email: "", phone: "", buildStudentID: "", _id: "", agentName: ""
    }])
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [loader, setmyloader] = useState("false");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [successMessage, setsuccessMessage] = useState("");
    // start for pagination
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;
    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },
        { name: "Enquiry Id", field: "buildCounsolerId", sortable: true },
        { name: "Student Id", field: "buildStudentID", sortable: true },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone", field: "phone", sortable: false },
        { name: "Enquiry Date", field: "currentTime", sortable: false },
        { name: "Service", field: "level", sortable: false },
        { name: "Country", field: "study", sortable: false },
        { name: "Action", field: "", sortable: false },
    ];
    // end for pagination
    function myallStudents() {
        setmyloader("true")
        const url = process.env.REACT_APP_SERVER_URL + "admin/allenquiry";
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                setmyloader("false")
                var studentsResult = data.students
                studentsResult.forEach((item, i) => {
                    item.NO = i + 1;
                });
                setComments(studentsResult);
            })
    }
    useEffect(() => {
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function myallStudents() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + "admin/allenquiry";
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")
                        var studentsResult = data.students
                        studentsResult.forEach((item, i) => {
                            item.NO = i + 1;
                        });
                        setComments(studentsResult);
                    })
            }
            myallStudents()
        }
    }, [])
    // start for pagination
    const commentsData = useMemo(() => {
        let computedComments = comments;
        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.buildCounsolerId.toLowerCase().includes(search.toLowerCase()) ||
                    comment.buildStudentID.toLowerCase().includes(search.toLowerCase()) ||
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.phone.toLowerCase().includes(search.toLowerCase()) ||
                    comment.currentTime.toLowerCase().includes(search.toLowerCase()) ||
                    comment.level.toLowerCase().includes(search.toLowerCase()) ||
                    comment.study.toLowerCase().includes(search.toLowerCase())
            );
        }
        setTotalItems(computedComments.length);
        //Sorting comments
        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);
    // end for pagination
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }

    return (
        <>
        <AdminLayout />
        <div className="mainmain">
                        <div className="container-fluid">

                            {submitSuccess === 1 ? <div className="Show_success_message">
                                <strong>Success!</strong> {successMessage}
                            </div> : null}
                            {loader === "true" ?
                                <Loader />
                                : null}
                            {showSweetAlert === "1" ? <SweetAlert
                                warning
                                showCancel
                                confirmBtnText="Yes, delete it!"
                                confirmBtnBsStyle="danger"
                                title="Are you sure want to delete student? This action can’t be reversed. Press ‘yes’ to delete"
                                onConfirm={(value) => {
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/enquiry/' + deleteId, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("Student deleted")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)
                                                myallStudents()
                                            }
                                        })
                                        .catch(error => {
                                        });
                                }}
                                onCancel={() =>
                                    setshowSweetAlert("0")
                                }
                                focusCancelBtn>
                            </SweetAlert>
                                : null
                            }

                            <div className="row">
                                <div className="col-md-6">
                                    <h3>Enquiry Receive From Popup</h3>
                                </div>
                                <div className="col-md-6 text-right">
                                    <div className="search-bar">
                                        <Search
                                            onSearch={value => {
                                                var trimValue = value.trim();
                                                setSearch(trimValue);
                                                setCurrentPage(1);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">

                                    <div className="card shadow mb-4">
                                        <div className=" mb-4">

                                            <div className="table-responsive-sm">
                                                <table className="table table-bordered">
                                                    <TableHeader

                                                        headers={tableHeaders}
                                                        onSorting={(field, order) =>
                                                            setSorting({ field, order })
                                                        }
                                                    />
                                                    <tbody>
                                                        {commentsData.map((object, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <td>{object.NO}</td>
                                                                    <td>{object.buildCounsolerId}</td>


                                                                    <td>{object.buildStudentID}</td>
                                                                    <td> {object.name}</td>
                                                                    <td>{object.email}</td>
                                                                    <td>{object.phone}</td>
                                                                    <td>{object.currentTime}</td>
                                                                    <td>{object.level}</td>
                                                                    <td>{object.study}</td>

                                                                    <td>
                                                                        {/* <button title="View Student Application" className="btn btn-success"
                                                            onClick={() => handleView(object._id, object.buildStudentID,
                                                                object.name, object.email, object.phone,
                                                                object.agentName
                                                            )}>
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </button> */}
                                                                        <button title="Delete" className="btn btn-danger  vbtn" onClick={() => handleDeleteClick(object._id)}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <Pagination
                                                total={totalItems}
                                                itemsPerPage={ITEMS_PER_PAGE}
                                                currentPage={currentPage}
                                                onPageChange={page => setCurrentPage(page)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
         
    );
}
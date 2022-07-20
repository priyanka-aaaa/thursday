import React, { useState, useEffect, useMemo } from "react";
import Link from 'next/link'
import { TableHeader, Pagination, Search } from "../../components/admin/DataTable";
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '../../scss/adminUniversity.scss';
import {
    faTrash, faPen, faEye, faUserSlash, faPlus
} from '@fortawesome/free-solid-svg-icons';

export default function AdminUniversity() {
    const [comments, setComments] = useState([{
        name: "", email: "", phone: "", _id: "", universityPrimaryInformation: ""
    }])

    // start for pagination

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;

    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },

        { name: "University Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone", field: "phone", sortable: false },

        { name: "Action", field: "", sortable: false },
    ];
    // end for pagination
    const [mounted, setMounted] = useState();
    const [foundedYear, setfoundedYear] = useState("");
    const [formValues, setFormValues] = useState([{
        name: "", email: "", phone: "", _id: "", universityPrimaryInformation: ""
    }])
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    useEffect(() => {
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function universities() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + "universities";
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")


                        var universityResult = data.universities
                        universityResult.forEach((item, i) => {
                            item.NO = i + 1;
                        });

                        setComments(universityResult);
                    })
            }
            universities()
        }
    }, [])
    // start for pagination
    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase())





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
    function handleViewUniversity(value) {
        localStorage.setItem('adminUniversityId', value);
    }
    function handleNewUniversity() {
        localStorage.removeItem("adminUniversityId");
    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
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
                                title="Are you sure want to delete university? This action can’t be reversed. Press ‘yes’ to delete"
                                onConfirm={(value) => {
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/deleteUniversity/' + deleteId, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("University deleted")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)
                                                const url = process.env.REACT_APP_SERVER_URL + "universities";
                                                fetch(url, {
                                                    method: 'GET',
                                                    headers: { 'Authorization': mounted }
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        var universityResult = data.universities
                                                        universityResult.forEach((item, i) => {
                                                            item.NO = i + 1;
                                                        });

                                                        setComments(universityResult);
                                                    })
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
                                </div>

                                <div className="col-xl-12 col-lg-7">
                                    <div className="row">
                                        <div className="col-md-6"><h3>Universities</h3></div>
                                        <div className="col-md-6 text-right">
                                            <Link href={'/universityAdmin/dashboard'} className="btn btn-success mr-3 " title="Add New University" target="_blank" onClick={() => handleNewUniversity()} >
                                                <a>
                                                    <span>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </span>Add New University
                                                </a>
                                            </Link>
                                            <div className="search-bar ">
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
                                                                    <td> {object.name}</td>
                                                                    <td>{object.email}</td>
                                                                    <td>{object.phone}</td>
                                                                    <td>
                                                                        <button title="Delete" className="btn btn-danger btn-sm vbtn" onClick={() => handleDeleteClick(object._id)}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </button>
                                                                        <button title="View" className="btn btn-primary btn-sm vbtn" ><Link href={'/schools/' + object.universityPrimaryInformation.slug}
                                                                            target="_blank"
                                                                            className="nav-link" >
                                                                            <FontAwesomeIcon icon={faEye} />
                                                                        </Link></button>
                                                                        <button title="Edit" className="btn btn-success btn-sm vbtn" ><Link
                                                                            href={'/universityAdmin/dashboard'} onClick={() => handleViewUniversity(object._id)}
                                                                            target="_blank"
                                                                            className="nav-link" >
                                                                            <FontAwesomeIcon icon={faPen} />
                                                                        </Link></button>
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
                </div>
            </div>
        </div>
    );
}
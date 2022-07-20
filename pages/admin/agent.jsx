import React, { useState, useEffect, useMemo } from "react";
import { TableHeader, Pagination, Search } from "../../components/admin/DataTable";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
// import '../../scss/adminAgent.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash, faCheck, faTimes

} from '@fortawesome/free-solid-svg-icons';
import AdminTopbar from '../../components/AdminTopbar';
import AdminSidebar from '../../components/AdminSidebar';
import Loader from '../../components/Loader';
export default function AdminUniversity() {
    const [mounted, setMounted] = useState();
    const [comments, setComments] = useState([{
        name: "", email: "", phone: "", _id: "",
    }])

    const [submitError, setsubmitError] = useState("");

    const [ErrorMessage, setErrorMessage] = useState("");

    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    // start for pagination

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;
    const tableHeaders = [
        { name: "No.", field: "_id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Phone", field: "phone", sortable: false },
        { name: "country", field: "country", sortable: false },
        { name: "state", field: "state", sortable: false },
        { name: "city", field: "city", sortable: false },
        { name: "companyName", field: "companyName", sortable: false },
        { name: "code", field: "code", sortable: false },
        { name: "address", field: "address", sortable: false },
        { name: "Action", field: "", sortable: false },
    ];
    // end for pagination
    useEffect(() => {
        var adminId = localStorage.getItem('adminId');
        var mounted = localStorage.getItem("adminToken")
        setMounted(mounted)
        if (adminId !== null) {
            function myallAgents() {
                setmyloader("true")
                const url = process.env.REACT_APP_SERVER_URL + "admin/allAgents";
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        setmyloader("false")
                        var agentResult = data.agents
                        agentResult.forEach((item, i) => {
                            item.NO = i + 1;
                        });
                        setComments(agentResult);
                    })
            }
            myallAgents()
        }
    }, [])
    // start for pagination
    const commentsData = useMemo(() => {
        let computedComments = comments;
        if (search) {
            computedComments = computedComments.filter(
                comment =>

                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase()) ||
                    comment.phone.toLowerCase().includes(search.toLowerCase())


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
    let handlVerifyClick = (id, name, email) => {
        setmyloader("true")
        const obj = {
            agentId: id,
            agentName: name,
            agentEmail: email

        };
        axios.put(process.env.REACT_APP_SERVER_URL + 'admin/verifyAgent/', obj, { headers: { 'Authorization': mounted } })
            .then(function (res) {
                setmyloader("false")
                if (res.data.success === true) {
                    setsuccessMessage("Agent verified")
                    setTimeout(() => setsubmitSuccess(""), 3000);
                    setsubmitSuccess(1)
                    const url = process.env.REACT_APP_SERVER_URL + "admin/allAgents";
                    fetch(url, {
                        method: 'GET',
                        headers: { 'Authorization': mounted }
                    })
                        .then(response => response.json())
                        .then(data => {
                            setmyloader("false")
                            var agentResult = data.agents
                            agentResult.forEach((item, i) => {
                                item.NO = i + 1;
                            });
                            setComments(agentResult);
                        })

                }

            })
            .catch(error => {
            });
    }
    function handlAleadyVerifyClick() {

        setErrorMessage("Already Verify")
        setTimeout(() => setsubmitError(""), 3000);
        setsubmitError(1)

    }
    return (
        <div id="page-top">
            <div id="wrapper">
                <AdminSidebar />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <AdminTopbar />
                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                            </div>
                            {submitError === 1 ? <div className="Show_error_message">
                                <strong></strong> {ErrorMessage}
                            </div> : null}

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
                                title="Are you sure want to delete agent? This action can’t be reversed. Press ‘yes’ to delete"
                                onConfirm={(value) => {
                                    setshowSweetAlert("0");
                                    setmyloader("true")
                                    axios.delete(process.env.REACT_APP_SERVER_URL + 'admin/deleteAgent/' + deleteId, { headers: { 'Authorization': mounted } })
                                        .then(function (res) {
                                            setmyloader("false")
                                            if (res.data.success === true) {
                                                setsuccessMessage("Agent deleted")
                                                setTimeout(() => setsubmitSuccess(""), 3000);
                                                setsubmitSuccess(1)


                                                const url = process.env.REACT_APP_SERVER_URL + "admin/allAgents";
                                                fetch(url, {
                                                    method: 'GET',
                                                    headers: { 'Authorization': mounted }
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        setmyloader("false")
                                                        var agentResult = data.agents
                                                        agentResult.forEach((item, i) => {
                                                            item.NO = i + 1;
                                                        });
                                                        setComments(agentResult);
                                                    })
                                            }
                                        })
                                        .catch(error => {
                                        });
                                }}
                                onCancel={() =>
                                    setshowSweetAlert("0")
                                }
                                focusCancelBtn
                            >
                            </SweetAlert>
                                : null
                            }
                            <div className="row">
                                <div className="col-xl-12 col-lg-7">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3>Recruitment Partner</h3>
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
                                    <div className="card shadow mt-3">
                                        <div className=" mb-4">
                                            <div className="table-responsive">


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
                                                                    <td>{object.country}</td>
                                                                    <td>{object.state}</td>
                                                                    <td>{object.city}</td>
                                                                    <td>{object.companyName}</td>
                                                                    <td>{object.address}</td>
                                                                    <td>{object.code}</td>

                                                                    <td>
                                                                        <button title="Delete" className="btn btn-danger " onClick={() => handleDeleteClick(object._id)}>
                                                                            <FontAwesomeIcon icon={faTrash} />
                                                                        </button>
                                                                        {object.verify !== "1" ?
                                                                            <button title="Approve" className="btn btn-success " onClick={() => handlVerifyClick(object._id, object.name, object.email)}>
                                                                                <FontAwesomeIcon icon={faCheck} />
                                                                            </button>
                                                                            : null
                                                                        }

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
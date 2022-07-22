
import React, { useState, useEffect } from "react";
import axios from 'axios';
import parse from 'html-react-parser'

import "trix/dist/trix";
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faAngleDown, faAngleUp

} from '@fortawesome/free-solid-svg-icons';
export default function Scholarship() {
    const [FormValues, setFormValues] = useState([{
        point: "", scholarship: ""
    }])
    const [formAdminValues, setformAdminValues] = useState([{
        application: ""
    }])
    const [editnewcomponent, seteditnewcomponent] = useState(0);
    const [addnewcomponent, setaddnewcomponent] = useState(0);
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [tempp, settempp] = useState("0");
    const [myapplication, setmyapplication] = useState();
    const [addWidth, setaddWidth] = useState("");
    const [editId, seteditId] = useState([]);
    const [width, setwidth] = useState("");
    const [editPoint, seteditPoint] = useState("");
    const [universityId, setuniversityId] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [MYpoint, setMYpoint] = useState("");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [deleteId, setdeleteId] = useState("");
    const [myTable, setTable] = useState("false");
    const [loader, setmyloader] = useState("false");
    const [ApplicationError, setApplicationError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        if (adminUniversityId !== null) {
            const url7 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/scholarships'
            fetch(url7, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.universityScholarships
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setFormValues(data.universityScholarships)
                })



            const url = process.env.REACT_APP_SERVER_URL + 'admin/scholarships/';
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.adminScholarships;
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setformAdminValues(data.adminScholarships)
                })
            var universityId = localStorage.getItem('universityId');
            var mounted = localStorage.getItem('universityToken');


            setMounted(mounted)
            setuniversityId(universityId)
        }
    }, [])
    function handleClick() {
        if (down === "1") {
            setdown("0");
            setup("1")
        }
        else {
            setdown("1");
            setup("0")
        }
    }
    function closeaddbox(value) {
        setaddWidth("0px");
    }
    function closebox(value) {
        setwidth("0px");
    }
    function handleAdd() {
            // start for admin
            const url = process.env.REACT_APP_SERVER_URL + 'admin/scholarships/';
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.adminScholarships;
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setformAdminValues(data.adminScholarships)
                })
            // end for admin
        setaddWidth("90%");
        setaddnewcomponent(1);
    }
    function handleEditClick(value) {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
   
        seteditId(value);
        setwidth("90%");
        seteditnewcomponent(1)
        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/scholarships/' + value

        fetch(url1, {
            method: 'GET',
            headers: { 'Authorization': adminmounted }
        })
            .then(response => response.json())
            .then(data => {
                setMYpoint(data.universityScholarship.scholarship)
            })
    }
    let clickAddHandler = (datum) => {
        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul><br/>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#scholarshipTrixAdd")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleAddSubmit = () => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setApplicationError("")
        let originalString = document.getElementById("addx").value;

        if (originalString === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setaddWidth(0)
            setTable("false")
            setmyloader("true")
            const obj = {
                scholarship: originalString
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/scholarships', obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setaddWidth(0)
                        setsuccessMessage("Scholarship Added")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/scholarships'
                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityScholarships)
                            })
                    }
                })
                .catch(error => {
                });
        }
    }
    let clickEditAddHandler = (datum) => {
        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#scholarshipTrixEdit")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleEditSubmit = () => {
        setApplicationError("")
        let originalString = document.getElementById("editx").value;

        if (originalString === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setwidth(0)
            setmyloader("true")
            const obj = {
                scholarship: originalString
            };

            var EditUrl = process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/scholarships/' + editId
            axios.put(EditUrl, obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setwidth(0)
                        setsuccessMessage("Scholarship Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/scholarships'

                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityScholarships)
                            })
                    }
                })
                .catch(error => {
                });
        }
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    return (
       <></>
    );
}



import React, { useState, useEffect } from "react";
import parse from 'html-react-parser'
import axios from 'axios';
import { TrixEditor } from "react-trix";
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus, faTrash, faPen, faAngleDown, faAngleUp,

} from '@fortawesome/free-solid-svg-icons';
import SweetAlert from 'react-bootstrap-sweetalert';
export default function Application() {
    const [formAdminValues, setformAdminValues] = useState([{
        application: ""
    }])
    const [FormValues, setFormValues] = useState([{
        point: ""

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
    const [MYpoint, setMYpoint] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
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
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId);
        if (adminUniversityId !== null) {

            const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'
            fetch(url1, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.universityAdmissions;
                    if (Object.keys(myresults).length === 0) {
                        setTable("true");
                    }
                    setFormValues(data.universityAdmissions)
                })

            const url = process.env.REACT_APP_SERVER_URL + 'admin/applications/';
            fetch(url, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(data => {
                    setformAdminValues(data.adminApplications)
                })
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
        const url = process.env.REACT_APP_SERVER_URL + 'admin/applications/';
        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setformAdminValues(data.adminApplications)
            })
        // end for admin
        setaddWidth("90%");
        setaddnewcomponent(1);
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function handleEditClick(value) {
        
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        seteditId(value);
        setwidth("90%");
        seteditnewcomponent(1)
        axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions/' + value, {
            headers: { 'Authorization': adminmounted }
        })
            .then(function (res) {
                var myuniversityAdmission = res.data.universityAdmission;
                if (res.data.success === true) {
             var myresultPoint = parse(myuniversityAdmission.point)
                    seteditPoint(myresultPoint);
                }
            })
            .catch(error => {
            });
    }

    let clickAddHandler = (datum) => {

        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul><br/>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#applicationTrixAdd")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleAddSubmit = () => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setApplicationError("")
        let originalString = document.getElementById("addApplicationx").value;
        var div = document.createElement("div");
        div.innerHTML = originalString;
        var InsetApplication = div.innerText;
        if (InsetApplication === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setaddWidth(0)
            setTable("false")
            setmyloader("true")
            const obj = {
                point: originalString
            };

            axios.post(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/admissions', obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Admission Added")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'

                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityAdmissions)
                            })
                    }
                })
                .catch(error => {

                });
        }
    }
    let clickEditHandler = (datum) => {

        if (tempp !== 1) {
            var datum = "<ul><li>" + datum + "</li></ul>";
            settempp(1);
        }
        else {
            var datum = "<br/><ul><li>" + datum + "</li></ul><br/>";
        }
        var element = document.querySelector("#applicationTrixEdit")
        element.editor.insertHTML(datum);
        setmyapplication(datum)
    }
    let handleEditSubmit = () => {
        setApplicationError("")
        let originalString = document.getElementById("editApplicationx").value;
        var div = document.createElement("div");
        div.innerHTML = originalString;
        var InsetApplication = div.innerText;
        if (InsetApplication === "") {
            setApplicationError("Please Enter Application")
        }
        else {
            setwidth(0)
            setmyloader("true")
            const obj = {
                point: originalString
            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/admissions/' + editId


                , obj, { headers: { 'Authorization': adminmounted } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Admission Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url1 = process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/admissions'
                        fetch(url1, {
                            method: 'GET'
                        })
                            .then(response => response.json())
                            .then(data => {
                                setFormValues(data.universityAdmissions)
                            })
                    }
                })
                .catch(error => {

                });
        }
    }
    return (
    <></>
    );
}


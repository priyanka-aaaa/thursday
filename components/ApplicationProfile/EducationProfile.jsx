import React, { useState, useEffect } from "react";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
// import Loader from '../../Home/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';
export default function EducationProfile() {
    const [deleteId, setdeleteId] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [formValues, setFormValues] = useState([{
        highestEducation: "", status: "", specialization: "", degree: "", gradePercentage: "", marks: "", attendedForm: "",
        institution: "", affiliationUniversity: "", language: "", country: "", state: "", city: "", address: "", zipcode: "",
        _id: "null"
    }])
    const [mounted, setMounted] = useState();
    const [data, setdata] = useState([]);
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [country, setcountry] = useState("Select Country");
    const [state, setstate] = useState("Select State");
    const [city, setcity] = useState("Select City");
    const [CheckState, setCheckState] = useState("0");
    const [CheckCity, setCheckCity] = useState("0");
    const [stateError, setstateError] = useState("");
    const [cityError, setcityError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [Checkmycountry, setCheckmycountry] = useState("0")
    const [countries, setcountries] = useState([{
        country_name: ""
    }]);
    const [states, setstates] = useState([{
        state_name: ""
    }])
    const [cities, setcities] = useState([{
        city_name: ""
    }])
    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            const url = process.env.REACT_APP_SERVER_URL + 'student/educations';
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': mounted,
                }
            })
                .then(response => response.json())
                .then(data => {
                    var myresults = data.studentEducations;
                    if (Object.keys(myresults).length === 0) {
                    }
                    else {
                        setFormValues(data.studentEducations)
                    }
                })
            axios.get(process.env.REACT_APP_SERVER_URL + 'countries/')
                .then(function (res) {
                    if (res.data.success === true) {
                        setcountries(res.data.result);
                    }
                })
                .catch(error => {
                });
            axios.get(process.env.REACT_APP_SERVER_URL + 'states/india')
                .then(function (res) {
                    if (res.data.success === true) {
                    }
                })
                .catch(error => {
                });
        }
    }, [])
    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }
    let addFormFields = () => {
        setFormValues([...formValues, {
            highestEducation: "", status: "", specialization: "", degree: "", gradePercentage: "", marks: "", attendedForm: "",
            institution: "", affiliationUniversity: "", language: "", country: "", state: "", city: "", address: "", zipcode: "",
            _id: "null"
        }])
    }
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
    let handleSubmit = (event) => {
        event.preventDefault();
        var myvalues = JSON.stringify(formValues);
        setmyloader("true")
        formValues.map(async (item) => {
            if (item._id === "null") {
                await axios.post(process.env.REACT_APP_SERVER_URL + 'student/educations', item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("Work Experience Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + 'student/educations';
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Authorization': mounted,
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.studentEducations;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.studentEducations)
                                    }
                                })
                        }
                    })
                    .catch(error => {
                    });
            }
            else {
                await axios.put(process.env.REACT_APP_SERVER_URL + 'student/educations/' + item._id, item, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                        setmyloader("false")
                        if (res.data.success === true) {
                            setsuccessMessage("Education Updated")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            const url = process.env.REACT_APP_SERVER_URL + 'student/educations';
                            fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Authorization': mounted,
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    var myresults = data.studentEducations;
                                    if (Object.keys(myresults).length === 0) {
                                    }
                                    else {
                                        setFormValues(data.studentEducations)
                                    }
                                })
                        }
                        else {
                        }
                    })
                    .catch(error => {
                    });
            }
        })
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    function setstatusType(i, myvalue) {
        let newFormValues = [...formValues];
        newFormValues[i]["status"] = myvalue;
        setFormValues(newFormValues);
    }
    function handlecountry(e) {
        setcountry(e)
        setCheckState("1")
        axios.get(process.env.REACT_APP_SERVER_URL + 'states/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setstates(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handlestate(e) {
        setstate(e)
        axios.get(process.env.REACT_APP_SERVER_URL + 'cities/' + e + '/')
            .then(function (res) {
                if (res.data.success === true) {
                    setcities(res.data.result);
                }
            })
            .catch(error => {
            });
    }
    function handleEmptyDeleteClick(index) {
        let newFormValues = [...formValues];
        newFormValues.splice(index, 1);
        setFormValues(newFormValues)
    }
    return (
        <div>
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            {showSweetAlert === "1" ? <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Are you sure?"
                onConfirm={(value) => {
                    setshowSweetAlert("0");
                    setmyloader("true")
                    axios.delete(process.env.REACT_APP_SERVER_URL + 'student/educations/' + deleteId, { headers: { 'Authorization': mounted } })
                        .then(function (res) {
                            setmyloader("false")
                            if (res.data.success === true) {
                                setsuccessMessage("Education deleted")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                                const url = process.env.REACT_APP_SERVER_URL + 'student/educations';
                                fetch(url, {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': mounted,
                                    }
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        var myresults = data.studentEducations;
                                        if (Object.keys(myresults).length === 0) {
                                            setFormValues([{
                                                highestEducation: "", status: "", specialization: "", degree: "", gradePercentage: "", marks: "", attendedForm: "",
                                                institution: "", affiliationUniversity: "", language: "", country: "", state: "", city: "", address: "", zipcode: "",
                                                _id: "null"
                                            }])
                                        }
                                        else {
                                            setFormValues(data.studentEducations)
                                        }
                                    })
                            }
                        })
                }}
                onCancel={() =>
                    setshowSweetAlert("0")
                }
                focusCancelBtn  >
            </SweetAlert>
                : null
            }
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse4" onClick={() => handleClick()} >
                    <strong>4</strong>  Education
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon  className="sidebar-faicon" icon={faAngleDown} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",

                        }} />
                    }
                    {up === "0" ?
                        null
                        :
                        <FontAwesomeIcon  className="sidebar-faicon" icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapse4" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-block">
                                {formValues.map((element, index) => (
                                    <div key={index}>
                                        <div className="row">
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5">
                                                <div className="form-group">
                                                    <label htmlFor="Highest Level of Education">Highest Level of
                                                        Education<span className="text-danger">*</span></label>
                                                    <select
                                                        value={element.highestEducation || ""} onChange={e => handleChange(index, e)}
                                                        required
                                                        className="form-control" id="Highest Level of Education" name="highestEducation">
                                                        <option value=''>Select</option>
                                                        <option value="Secondary">Secondary</option>
                                                        <option value="Undergraduate Degree">Undergraduate Degree</option>
                                                        <option value="Postgraduate Degree">Postgraduate Degree</option>
                                                        <option value="Research and Doctoral">Research &amp; Doctoral</option>
                                                        <option value="Undergraduate Diploma">Undergraduate Diploma</option>
                                                        <option value="Postgraduate Diploma">Postgraduate Diploma</option>
                                                        <option value="Foundation Degree">Foundation Degree</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-5 col-md-5 col-lg-5">
                                                <div className="form-group">
                                                    <label htmlFor="education_status">Education Status<span className="text-danger">*</span></label>
                                                    <div className="checkgrp">
                                                        <label className="ant-radio-wrapper ant-radio-wrapper-checked">
                                                            <span className="ant-radio ant-radio-checked"><input
                                                                onChange={(e) => setstatusType(index, "Pursuing")}
                                                                checked={element.status === "Pursuing"}
                                                                required
                                                                name="status" type="radio" className="ant-radio-input" />
                                                                <span className="ant-radio-inner"></span></span>Pursuing</label>
                                                        <label className="ant-radio-wrapper"><span className="ant-radio"><input
                                                            onChange={(e) => setstatusType(index, "Completed")}
                                                            checked={element.status === "Completed"}
                                                            required
                                                            name="status" type="radio" className="ant-radio-input" /><span className="ant-radio-inner"></span></span>
                                                            Completed</label></div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-2 col-md-2 col-lg-2 text-right mt-2">
                                                {element._id !== "null" ?
                                                    <>
                                                        <a title="Delete" className="btn  btn-danger " onClick={() => handleDeleteClick(element._id)}>
                                                            <FontAwesomeIcon  className="sidebar-faicon" icon={faTrash} />
                                                        </a>
                                                    </>
                                                    :
                                                    <>
                                                        {index!==0 ?
                                                            <a title="Delete" className="btn  btn-danger " onClick={() => handleEmptyDeleteClick(index)}>
                                                                <FontAwesomeIcon  className="sidebar-faicon" icon={faTrash} />
                                                            </a>
                                                            : null
                                                        }
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="specialisation">Specialization<span className="text-danger">*</span>
                                                    </label>
                                                    <select
                                                        value={element.specialization || ""} onChange={e => handleChange(index, e)}
                                                        required
                                                        className="form-control" id="specialisation" name="specialization" >
                                                        <option value="">Select</option>
                                                        <option value="Social Science and Humanities">Social Science and Humanities</option>
                                                        <option value="Management">Management</option>
                                                        <option value="Law">Law</option>
                                                        <option value="Engineering">Engineering</option>
                                                        <option value="Architecture">Architecture</option>
                                                        <option value="Design">Design</option>
                                                        <option value="Medicine">Medicine</option>
                                                        <option value="Physical Sciences">Physical Sciences</option>
                                                        <option value="Archaeology">Archaeology</option>
                                                        <option value="Visual Arts">Visual Arts</option>
                                                        <option value="History">History</option>
                                                        <option value="Literature">Literature</option>
                                                        <option value="Linguistics">Linguistics</option>
                                                        <option value="Performing Arts">Performing Arts</option>
                                                        <option value="Philosophy">Philosophy</option>
                                                        <option value="Theology & Religious Studies">Theology &amp; Religious Studies</option>
                                                        <option value="Accounting & Finance">Accounting &amp; Finance</option>
                                                        <option value="Anthropology">Anthropology</option>
                                                        <option value="Business & Management Studies">Business &amp; Management Studies</option>
                                                        <option value="Economics & Econometrics">Economics &amp; Econometrics</option>
                                                        <option value="Education & Training">Education &amp; Training</option>
                                                        <option value="Hospitality & Tourism">Hospitality &amp; Tourism</option>
                                                        <option value="Library & Information Management">Library &amp; Information Management</option>
                                                        <option value="Media and Communication">Media and Communication</option>
                                                        <option value="Politics & International Studies">Politics &amp; International Studies</option>
                                                        <option value="Sociology">Sociology</option>
                                                        <option value="Sports and Physical Education">Sports and Physical Education</option>
                                                        <option value="Statistics & Operational Research">Statistics &amp; Operational Research</option>
                                                        <option value="Law">Law</option>
                                                        <option value="Taxation Law">Taxation Law</option>
                                                        <option value="Administrative Law">Administrative Law</option>
                                                        <option value="Civil Law">Civil Law</option>
                                                        <option value="Constitutional Law">Constitutional Law</option>
                                                        <option value="Corporate Law">Corporate Law</option>
                                                        <option value="Criminal Law">Criminal Law</option>
                                                        <option value="Cyber Law">Cyber Law</option>
                                                        <option value="International Law">International Law</option>
                                                        <option value="Labour Law">Labour Law</option>
                                                        <option value="Patent Law">Patent Law</option>
                                                        <option value="Property Law">Property Law</option>
                                                        <option value="Aeronautical Engineering">Aeronautical Engineering</option>
                                                        <option value="Automobile Engineering">Automobile Engineering</option>
                                                        <option value="Chemical Engineering">Chemical Engineering</option>
                                                        <option value="Civil & Structural Engineering">Civil &amp; Structural Engineering</option>
                                                        <option value="Computer Science Engineering">Computer Science Engineering</option>
                                                        <option value="4Electrical & Electronics Engineering6">Electrical &amp; Electronics Engineering</option>
                                                        <option value="Electronics Enginnering">Electronics Enginnering</option>
                                                        <option value="Industrial and Production Engineering">Industrial and Production Engineering</option>
                                                        <option value="Manufacturing Engineering">Manufacturing Engineering</option>
                                                        <option value="Materials Science & Engineering">Materials Science &amp; Engineering</option>
                                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                        <option value="Mineral & Mining Engineering">Mineral &amp; Mining Engineering</option>
                                                        <option value="Architecture">Architecture</option>
                                                        <option value="Urban Planning">Urban Planning</option>
                                                        <option value="Landscape Architecture">Landscape Architecture</option>
                                                        <option value="Interior Design">Interior Design</option>
                                                        <option value="Fashion Design">Fashion Design</option>
                                                        <option value="Footwear Design">Footwear Design</option>
                                                        <option value="Jewellery Design">Jewellery Design</option>
                                                        <option value="Game Design">Game Design</option>
                                                        <option value="UX and HCI Design">UX and HCI Design</option>
                                                        <option value="Agriculture">Agriculture</option>
                                                        <option value="Anatomy & Physiology">Anatomy &amp; Physiology</option>
                                                        <option value="Biological Sciences">Biological Sciences</option>
                                                        <option value="Dentist">Dentist</option>
                                                        <option value="General Medicine & Surgery">General Medicine &amp; Surgery</option>
                                                        <option value="Nursing">Nursing</option>
                                                        <option value="Pharmacy & Pharmacology">Pharmacy &amp; Pharmacology</option>
                                                        <option value="Psychology">Psychology</option>
                                                        <option value="Veterinary Science">Veterinary Science</option>
                                                        <option value="Chemistry">Chemistry</option>
                                                        <option value="Earth & Marine Sciences">Earth &amp; Marine Sciences</option>
                                                        <option value="Environmental Sciences">Environmental Sciences</option>
                                                        <option value="Geography">Geography</option>
                                                        <option value="Mathematics">Mathematics</option>
                                                        <option value="Physics">Physics</option>
                                                        <option value="Astronomy">Astronomy</option>
                                                        <option value="Mathematics">Mathematics</option>
                                                        <option value="Computers">Computers </option>
                                                        <option value="Data Science">Data Science</option>
                                                        <option value="Others">Others</option>
                                                        <option value="Computers">Computers</option>
                                                        <option value="Life Science & Environment">Life Science &amp; Environment</option>
                                                        <option value="Agriculture, Food and Natural Resources">Agriculture, Food and Natural Resources</option>
                                                        <option value="Marketing and Advertising">Marketing and Advertising</option>
                                                        <option value="Financial Economics">Financial Economics</option>
                                                        <option value="Operations And Logistics">Operations And Logistics</option>
                                                        <option value="International Business">International Business</option>
                                                        <option value="Computer Science">Computer Science</option>
                                                        <option value="Public Health">Public Health</option>
                                                        <option value="Photography">Photography</option>
                                                        <option value="Forensic Science">Forensic Science</option>
                                                        <option value="Financial Technology">Financial Technology</option>
                                                        <option value="Project Management">Project Management</option>
                                                        <option value="Information and Technology">Information and Technology</option>
                                                        <option value="Mechatronics and Robotics">Mechatronics and Robotics</option>
                                                        <option value="Cyber Security">Cyber Security</option>
                                                        <option value="Aviation">Aviation</option>
                                                        <option value="Software Development">Software Development</option>
                                                        <option value="Graphic Design">Graphic Design</option>
                                                        <option value="Intelligence and Robotics">Intelligence and Robotics</option>
                                                        <option value="Data Analytics">Data Analytics</option>
                                                        <option value="Music">Music</option>
                                                        <option value="Acting">Acting</option>
                                                        <option value="Performing Arts">Performing Arts</option>
                                                        <option value="Agriculture">Agriculture</option>
                                                        <option value="Artificial Intelligence">Artificial Intelligence</option>
                                                        <option value="Creative Arts">Creative Arts</option>
                                                        <option value="Journalism">Journalism</option>
                                                        <option value="Finance and Management">Finance and Management</option>
                                                        <option value="Dance Science">Dance Science</option>
                                                        <option value="Composition">Composition</option>
                                                        <option value="Choreography">Choreography</option>
                                                        <option value="Music">Music</option>
                                                        <option value="Digital Marketing">Digital Marketing</option>
                                                        <option value="Accounting and Management">Accounting and Management</option>
                                                        <option value="Animal Science">Animal Science</option>
                                                        <option value="Public Administration">Public Administration</option>
                                                        <option value="Nutrition and Fitness">Nutrition and Fitness</option>
                                                        <option value="Advertising">Advertising </option>
                                                        <option value="Animation">Animation</option>
                                                        <option value="Oncology">Oncology</option>
                                                        <option value="Clinician">Clinician</option>
                                                        <option value="Biotechnology">Biotechnology</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Banking">Banking</option>
                                                        <option value="Allied Medicine28">Allied Medicine</option>
                                                        <option value="Fashion">Fashion</option>
                                                        <option value="Applied Arts">Applied Arts</option>
                                                        <option value="Environmental Engineering">Environmental Engineering</option>
                                                        <option value="Aerospace Engineering">Aerospace Engineering</option>
                                                        <option value="Biomedical & Biotechnology Engineering">Biomedical &amp; Biotechnology Engineering</option>
                                                        <option value="Power Engineering">Power Engineering</option>
                                                        <option value="Sound Engineering">Sound Engineering</option>
                                                        <option value="Marine Engineering">Marine Engineering</option>
                                                        <option value="Information Technology">Information Technology</option>
                                                        <option value="Computer Application">Computer Application</option>
                                                        <option value="Game Development">Game Development</option>
                                                        <option value="Ethical Hacking">Ethical Hacking</option>
                                                        <option value="Business Analytics">Business Analytics</option>
                                                        <option value="Pilot">Pilot</option>
                                                        <option value="Aircraft Control">Aircraft Control</option>
                                                        <option value="Air-traffic Control">Air-traffic Control</option>
                                                        <option value="Architectural Engineering">Architectural Engineering</option>
                                                        <option value="Architectural Design">Architectural Design</option>
                                                        <option value="Interior Architecture">Interior Architecture</option>
                                                        <option value="Construction Management">Construction Management</option>
                                                        <option value="Sustainable Architecture">Sustainable Architecture</option>
                                                        <option value="Naval Architecture">Naval Architecture</option>
                                                        <option value="Food Science and Technology">Food Science and Technology</option>
                                                        <option value="Agricultural Biotechnology">Agricultural Biotechnology</option>
                                                        <option value="Agronomy">Agronomy</option>
                                                        <option value="Plant Breeding and Genetics">Plant Breeding and Genetics</option>
                                                        <option value="Soil Science">Soil Science</option>
                                                        <option value="Dairy Technology">Dairy Technology</option>
                                                        <option value="Horticulture">Horticulture</option>
                                                        <option value="Agricultural Engineering">Agricultural Engineering</option>
                                                        <option value="Environment studies">Environment studies</option>
                                                        <option value="Wildlife science">Wildlife science</option>
                                                        <option value="Pure Mathematics">Pure Mathematics</option>
                                                        <option value="Applied Mathematics">Applied Mathematics</option>
                                                        <option value="Computational Mathematics">Computational Mathematics</option>
                                                        <option value="Algebra and Number Theory">Algebra and Number Theory</option>
                                                        <option value="Topology and Foundations">Topology and Foundations</option>
                                                        <option value="Geometric Analysis">Geometric Analysis</option>
                                                        <option value="Analysis">Analysis</option>
                                                        <option value="Probability and Statistics">Probability and Statistics</option>
                                                        <option value="Actuarial Science">Actuarial Science</option>
                                                        <option value="Meteorology">Meteorology</option>
                                                        <option value="Geology">Geology</option>
                                                        <option value="Disaster Management">Disaster Management</option>
                                                        <option value="Cartography">Cartography</option>
                                                        <option value="Flavor Chemistry">Flavor Chemistry</option>
                                                        <option value="Biology">Biology</option>
                                                        <option value="Botany">Botany</option>
                                                        <option value="Zoology">Zoology</option>
                                                        <option value="Microbiology">Microbiology</option>
                                                        <option value="Biochemistry">Biochemistry</option>
                                                        <option value="Genetics">Genetics</option>
                                                        <option value="Marine Biology">Marine Biology</option>
                                                        <option value="Environmental Science">Environmental Science</option>
                                                        <option value="Bioinformatics">Bioinformatics</option>
                                                        <option value="Fishery Science">Fishery Science</option>
                                                        <option value="Biophysics">Biophysics</option>
                                                        <option value="Epidemiology">Epidemiology</option>
                                                        <option value="Oceanography">Oceanography</option>
                                                        <option value="Wildlife Conservation">Wildlife Conservation</option>
                                                        <option value="Doctor">Doctor</option>
                                                        <option value="Veterinarian">Veterinarian</option>
                                                        <option value="Homeopathy">Homeopathy</option>
                                                        <option value="Ayurveda">Ayurveda</option>
                                                        <option value="Optometry">Optometry</option>
                                                        <option value="Public Health Administration">Public Health Administration</option>
                                                        <option value="Occupational Therapy">Occupational Therapy</option>
                                                        <option value="Radio Technician">Radio Technician</option>
                                                        <option value="Audiologist">Audiologist</option>
                                                        <option value="Clinical Research">Clinical Research</option>
                                                        <option value="Medical Laboratory Technologist">Medical Laboratory Technologist</option>
                                                        <option value="Physiotherapist">Physiotherapist</option>
                                                        <option value="Pharmacy">Pharmacy</option>
                                                        <option value="Health science">Health science</option>
                                                        <option value="Dietetics">Dietetics</option>
                                                        <option value="Nutrition">Nutrition</option>
                                                        <option value="Clinical nutritional care">Clinical nutritional care</option>
                                                        <option value="Community nutrition">Community nutrition</option>
                                                        <option value="Fitness">Fitness</option>
                                                        <option value="Textile And Apparel Design">Textile And Apparel Design</option>
                                                        <option value="Interior Design">Interior Design</option>
                                                        <option value="Accessory Design">Accessory Design</option>
                                                        <option value="Jewellery Design">Jewellery Design</option>
                                                        <option value="Leather Design">Leather Design</option>
                                                        <option value="Fashion Communication">Fashion Communication</option>
                                                        <option value="Fashion Technology">Fashion Technology</option>
                                                        <option value="Fashion Business Management">Fashion Business Management</option>
                                                        <option value="Product Design">Product Design</option>
                                                        <option value="Industrial Design">Industrial Design</option>
                                                        <option value="UI Design">UI Design</option>
                                                        <option value="UX Design">UX Design</option>
                                                        <option value="Graphic Design">Graphic Design</option>
                                                        <option value="Web Design">Web Design</option>
                                                        <option value="Cartoonist">Cartoonist</option>
                                                        <option value="Interaction Design">Interaction Design</option>
                                                        <option value="New Media Design">New Media Design</option>
                                                        <option value="Animation">Animation</option>
                                                        <option value="Event Management">Event Management</option>
                                                        <option value="Wedding Planner">Wedding Planner</option>
                                                        <option value="Media Studies">Media Studies</option>
                                                        <option value="Video">Video</option>
                                                        <option value="Radio Jockey">Radio Jockey</option>
                                                        <option value="Writing">Writing</option>
                                                        <option value="Editing">Editing</option>
                                                        <option value="Direction">Direction</option>
                                                        <option value="Production">Production</option>
                                                        <option value="Film Studies">Film Studies</option>
                                                        <option value="Public Relations">Public Relations</option>
                                                        <option value="Content Writer">Content Writer</option>
                                                        <option value="Digital Media">Digital Media</option>
                                                        <option value="Advertising">Advertising</option>
                                                        <option value="Fine Arts">Fine Arts</option>
                                                        <option value="Film Making">Film Making</option>
                                                        <option value="Sculpture">Sculpture</option>
                                                        <option value="Florist">Florist</option>
                                                        <option value="Choreographer">Choreographer</option>
                                                        <option value="Modelling">Modelling</option>
                                                        <option value="Culinary Arts">Culinary Arts</option>
                                                        <option value="Hotel Management">Hotel Management</option>
                                                        <option value="Tourism">Tourism</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="Product Management">Product Management</option>
                                                        <option value="Market Research">Market Research</option>
                                                        <option value="General Management">General Management</option>
                                                        <option value="Strategy">Strategy</option>
                                                        <option value="Sales">Sales</option>
                                                        <option value="Marketing">Marketing</option>
                                                        <option value="Advertising">Advertising</option>
                                                        <option value="Human Resource">Human Resource</option>
                                                        <option value="Sports Management">Sports Management</option>
                                                        <option value="Hospital Management">Hospital Management</option>
                                                        <option value="Luxury Brand Management">Luxury Brand Management</option>
                                                        <option value="Retail Management">Retail Management</option>
                                                        <option value="Spa Management">Spa Management</option>
                                                        <option value="Entrepreneurship">Entrepreneurship</option>
                                                        <option value="Supply Chain Management">Supply Chain Management</option>
                                                        <option value="Tax Law">Tax Law</option>
                                                        <option value="Real Estate Law">Real Estate Law</option>
                                                        <option value="Media Law">Media Law</option>
                                                        <option value="Competition Law">Competition Law</option>
                                                        <option value="Intellectual Property Law">Intellectual Property Law</option>
                                                        <option value="Mergers and Acquisition Law">Mergers and Acquisition Law</option>
                                                        <option value="Finance">Finance</option>
                                                        <option value="Stock Broking">Stock Broking</option>
                                                        <option value="Banking">Banking</option>
                                                        <option value="International Relations">International Relations</option>
                                                        <option value="Political Science">Political Science</option>
                                                        <option value="Home Science">Home Science</option>
                                                        <option value="Instructional Design">Instructional Design</option>
                                                        <option value="Language">Language</option>
                                                        <option value="Development Studies">Development Studies</option>
                                                        <option value="Gender/Women Studies">Gender/Women Studies</option>
                                                        <option value="Museology">Museology</option>
                                                        <option value="Public Administration">Public Administration</option>
                                                        <option value="Sustainability Management">Sustainability Management</option>
                                                        <option value="Social wor">Social work</option>
                                                        <option value="Public Policy">Public Policy</option>
                                                        <option value="Global Affairs">Global Affairs</option>
                                                        <option value="Education">Education</option>
                                                        <option value="Special Education">Special Education</option>
                                                        <option value="Counselling">Counselling</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="education_degree">Degree/Diploma/Certificate<span className="text-danger">*</span></label>
                                                    <select
                                                        value={element.degree || ""} onChange={e => handleChange(index, e)}
                                                        required
                                                        className="form-control" id="education_degree" name="degree" >
                                                        <option value="">Select</option> <option value="BEd">BEd</option> <option value="MA">MA</option> <option value="MM">MM</option> <option value="MBM">MBM</option> <option value="MIM">MIM</option> <option value="MIB">MIB</option> <option value="MBA">MBA</option> <option value="PGPM">PGPM</option> <option value="MBS">MBS</option> <option value="MCA">MCA</option> <option value="MFA">MFA</option> <option value="MVA">MVA</option> <option value="MPA">MPA</option> <option value="CFA - Level 1">CFA - Level 1</option> <option value="CFA - Level 2">CFA - Level 2</option> <option value="CFA - Level 3">CFA - Level 3</option> <option value="JD">JD</option> <option value="LLM">LLM</option> <option value="MCom">MCom</option> <option value="MEng">MEng</option> <option value="ME">ME</option> <option value="MSE">MSE</option> <option value="MTech">MTech</option> <option value="MS">MS</option> <option value="MSc">MSc</option> <option value="MPH">MPH</option> <option value="MPharm">MPharm</option> <option value="MDS">MDS</option> <option value="MEd">MEd</option> <option value="MArch">MArch</option> <option value="MDes">MDes</option> <option value="MPT">MPT</option> <option value="MD">MD</option> <option value="MS">MS</option> <option value="Other Masters">Other Masters</option> <option value="PG Certificate">PG Certificate</option> <option value="MMus">MMus</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="grading_scheme_id">Grade
                                                    Scheme(GPA/Percentage)</label><select
                                                        value={element.gradePercentage || ""} onChange={e => handleChange(index, e)}
                                                        className="form-control" id="grading_scheme_id" name="gradePercentage" >
                                                        <option >Select</option>
                                                        <option value="Grade Scale 0-4">Grade Scale 0-4</option>
                                                        <option value="Grade Scale 0-10">Grade Scale 0-10</option>
                                                        <option value="Percentage 0-100">Percentage 0-100</option>
                                                        <option value="Division/Class">Division/Class</option>
                                                        <option value="Letter Grade F to A+">Letter Grade F to A+</option>
                                                    </select></div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="grade_marks">Grade
                                                    Average/Marks Obtained</label><input
                                                        value={element.marks || ""} onChange={e => handleChange(index, e)}
                                                        type="text" className="form-control" id="grade_marks" name="marks" placeholder="Grade Average/Marks Obtained" /></div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="attendedFrom">Attended From</label>
                                                    <input
                                                        value={element.attendedForm || ""} onChange={e => handleChange(index, e)}
                                                        name="attendedForm"
                                                        type="date" className="form-control" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="institute_name">Name of Institution</label>
                                                    <input
                                                        value={element.institution || ""} onChange={e => handleChange(index, e)}
                                                        type="text" className="form-control" id="institute_name" name="institution" placeholder="Name of Institution" />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                <div className="form-group"><label htmlFor="institute_affiliation">Affiliating University/Board
                                                    of Education</label>
                                                    <input
                                                        value={element.affiliationUniversity || ""} onChange={e => handleChange(index, e)}
                                                        type="text" className="form-control" id="institute_affiliation" name="affiliationUniversity" placeholder="Name of Institution" />
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                                <div className="form-group">
                                                    <label htmlFor="language_of_study">Language of
                                                        Instruction</label>
                                                    <select
                                                        value={element.language || ""} onChange={e => handleChange(index, e)}
                                                        className="form-control" id="language_of_study" name="language" >
                                                        <option value="English">English</option>
                                                        <option value="Hindi">Hindi</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group">
                                                    <label htmlFor="nationality">Country</label>
                                                    <select
                                                        value={country}
                                                        onChange={(e) => handlecountry(e.target.value)}
                                                        className="form-control" name="country" required>
                                                        {Checkmycountry === "0" ? <option value={country}>{country}</option> : <option value="">Please select Country</option>}
                                                        {countries.map((element, index) => {
                                                            return (
                                                                <option
                                                                    value={element.country_name} key={index}>{element.country_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="institute_address_state">State/Province</label>
                                                    <select className="form-control" name="state"
                                                        onChange={(e) => handlestate(e.target.value)}
                                                        required
                                                        value={state}>
                                                        {CheckState === "0" ? <option value={state}>{state}</option> : <option value="">Please select state</option>}
                                                        {states.map((element, index) => {
                                                            return (
                                                                <option
                                                                    value={element.state_name} key={index}>{element.state_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <span className="error-msg"> {stateError}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="City/institute_address_city">City/Town</label>
                                                    <select className="form-control" name="city" required
                                                        value={city}
                                                        onChange={(e) => setcity(e.target.value)}
                                                    >
                                                        {CheckCity === "0" ? <option value={city}>{city}</option> : <option value="">Please select City</option>}
                                                        {cities.map((element, index) => {
                                                            return (
                                                                <option
                                                                    value={element.city_name} key={index}>{element.city_name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <span className="error-msg"> {cityError}</span>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="institute_address_text_1">Address</label><input
                                                    value={element.address || ""} onChange={e => handleChange(index, e)}
                                                    type="text" className="form-control" id="institute_address_text_1" placeholder="Address" name="address" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                                <div className="form-group"><label htmlFor="institute_address_zipcode">Zipcode</label><input
                                                    value={element.zipcode || ""} onChange={e => handleChange(index, e)}
                                                    type="number" className="form-control" id="institute_address_zipcode" placeholder="Zipcode" name="zipcode" /></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="mb-3">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <button type="button" title="Add New Education" className="btn btn-success " onClick={() => addFormFields()}>Add New</button>
                                        </div>
                                        <div className="col-md-6 text-right">

                                           
                                            {formValues[0].highestEducation !== "" && formValues[0].status !== "" && formValues[0].specialization !== "" && formValues[0].degree !== "" ?
                                                <button title="Save" type="submit" className="btn btn-success ml-2  mr-2" data-bs-toggle="collapse" href="#collapse5">Save
                                                </button> :
                                                <button title="Save" type="submit" className="btn btn-success ml-2  mr-2" >Save
                                                </button>}
                                            <button title="Skip & Next" type="button" data-bs-toggle="collapse" className="btn btn-secondary" href="#collapse5">Skip & Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
export default function Overview() {
    const [myallEnglish, setmyallEnglish] = useState([]);
    const [arrayEnglish, setarrayEnglish] = useState([]);
    const [myallGroupsUserSpecific, setmyallGroupsUserSpecific] = useState([]);
    const [mounted, setMounted] = useState();
    const [foundedYear, setfoundedYear] = useState("");
    const [ranking, setranking] = useState("");
    const [rate, setrate] = useState("");
    const [course, setcourse] = useState("");
    const [courseNo, setcourseNo] = useState("");
    const [month, setmonth] = useState("");
    const [myyear, setmyyear] = useState("");
    const [english, setenglish] = useState("");
    const [cgpa, setcgpa] = useState("");
    const [acceptanceRate, setacceptanceRate] = useState("");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [foundedYearMessage, setfoundedYearMessage] = useState("");
    const [yearMessage, setyearMessage] = useState("");
    const [loader, setmyloader] = useState("false");
    const [FoundedYearNoError, setFoundedYearNoError] = useState("");
    const [RankingNoError, setRankingNoError] = useState("");
    const [PopularCourseNoError, setPopularCourseNoError] = useState("");
    const [YearNoError, setYearNoError] = useState("");
    const [AcceptanceNoError, setAcceptanceNoError] = useState("");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    const [errorEnglish, seterrorEnglish] = useState("");


    const onChangefoundedYear = (e) => {
        setfoundedYear(e);
        setfoundedYearMessage("")
    }
    const onChangeYear = (e) => {
        setmyyear(e);
        setyearMessage("")
    }
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)

        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        if (adminUniversityId !== null) {
            axios.get(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/overview')
                .then(function (res) {

                    if (res.data.success === true) {

                        var student_universityOverview = res.data.universityOverview;

                        setfoundedYear(student_universityOverview.foundedYear);
                        setranking(student_universityOverview.ranking);
                        setrate(student_universityOverview.rate);
                        setcourse(student_universityOverview.course);
                        setcourseNo(student_universityOverview.courseNo);
                        setmonth(student_universityOverview.month);
                        setmyyear(student_universityOverview.year);
                        setenglish(student_universityOverview.english);
                        setcgpa(student_universityOverview.cgpa);
                        setacceptanceRate(student_universityOverview.acceptanceRate);
                        var arrayEnglish = student_universityOverview.english
                        setarrayEnglish(arrayEnglish)
                        let buildEnglishArray = [
                            { "id": "IELTS", "name": "IELTS" },
                            { "id": "PTE", "name": "PTE" },
                            { "id": "TOEFL", "name": "TOEFL" },
                            { "id": "Duolingo", "name": "Duolingo" },
                            { "id": "CPE", "name": "CPE" },
                            { "id": "CAE", "name": "CAE" },
                            { "id": "OET", "name": "OET" },
                            { "id": "Other", "name": "Other" },
                            { "id": "Null", "name": "Null" },

                        ];
                        let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                            { ...group, following: arrayEnglish.includes(group.id) })
                        );
                        setmyallEnglish(allGroupsUserSpecific1)

                    }
                    else {
                        let buildEnglishArray = [
                            { "id": "IELTS", "name": "IELTS" },
                            { "id": "PTE", "name": "PTE" },
                            { "id": "TOEFL", "name": "TOEFL" },
                            { "id": "Duolingo", "name": "Duolingo" },
                            { "id": "CPE", "name": "CPE" },
                            { "id": "CAE", "name": "CAE" },
                            { "id": "OET", "name": "OET" },
                            { "id": "Other", "name": "Other" },
                            { "id": "Null", "name": "Null" },

                        ];
                        let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                            { ...group, following: arrayEnglish.includes(group.id) })
                        );
                        setmyallEnglish(allGroupsUserSpecific1)
                    }

                })
                .catch(error => {
                    let buildEnglishArray = [
                        { "id": "IELTS", "name": "IELTS" },
                        { "id": "PTE", "name": "PTE" },
                        { "id": "TOEFL", "name": "TOEFL" },
                        { "id": "Duolingo", "name": "Duolingo" },
                        { "id": "CPE", "name": "CPE" },
                        { "id": "CAE", "name": "CAE" },
                        { "id": "OET", "name": "OET" },
                        { "id": "Other", "name": "Other" },
                        { "id": "Null", "name": "Null" },


                    ];
                    let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                        { ...group, following: arrayEnglish.includes(group.id) })
                    );
                    setmyallEnglish(allGroupsUserSpecific1)
                });
        }
        else {
            let buildEnglishArray = [
                { "id": "IELTS", "name": "IELTS" },
                { "id": "PTE", "name": "PTE" },
                { "id": "TOEFL", "name": "TOEFL" },
                { "id": "Duolingo", "name": "Duolingo" },
                { "id": "CPE", "name": "CPE" },
                { "id": "CAE", "name": "CAE" },
                { "id": "OET", "name": "OET" },
                { "id": "Other", "name": "Other" },
                { "id": "Null", "name": "Null" },

            ];
            let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                { ...group, following: arrayEnglish.includes(group.id) })
            );
            setmyallEnglish(allGroupsUserSpecific1)
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

    const handleuniveristyEnglishProficiencyChange = (e) => {

        const { value, checked } = e.target;
        if (checked) {

            var mycheckboxValue = e.target.value
            setarrayEnglish((prevVals) =>
                [...prevVals, mycheckboxValue])
            var checkCountry = arrayEnglish.concat(mycheckboxValue);
            let buildEnglishArray = [
                { "id": "IELTS", "name": "IELTS" },
                { "id": "PTE", "name": "PTE" },
                { "id": "TOEFL", "name": "TOEFL" },
                { "id": "Duolingo", "name": "Duolingo" },
                { "id": "CPE", "name": "CPE" },
                { "id": "CAE", "name": "CAE" },
                { "id": "OET", "name": "OET" },
                { "id": "Other", "name": "Other" },
                { "id": "Null", "name": "Null" },


            ];
            let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                { ...group, following: checkCountry.includes(group.id) })
            );
            setmyallEnglish(allGroupsUserSpecific1)


        }
        else {
            var mycheckboxValue = e.target.value
            var filteredEnglishArray = arrayEnglish.filter(e => e !== mycheckboxValue)
            let buildEnglishArray = [
                { "id": "IELTS", "name": "IELTS" },
                { "id": "PTE", "name": "PTE" },
                { "id": "TOEFL", "name": "TOEFL" },
                { "id": "Duolingo", "name": "Duolingo" },
                { "id": "CPE", "name": "CPE" },
                { "id": "CAE", "name": "CAE" },
                { "id": "OET", "name": "OET" },
                { "id": "Other", "name": "Other" },
                { "id": "Null", "name": "Null" },

            ];
            let allGroupsUserSpecific1 = buildEnglishArray.map(group => (
                { ...group, following: filteredEnglishArray.includes(group.id) })
            );
            setmyallEnglish(allGroupsUserSpecific1)
            setarrayEnglish(filteredEnglishArray)
        }
    };
    function handleFormSubmit(event) {
        event.preventDefault();
        seterrorEnglish("")
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        var myPattern = /^[0-9_.]*$/;
        var foundedYearNo = foundedYear.toString().length;
        setFoundedYearNoError("")
        setRankingNoError("")
        setPopularCourseNoError("")
        setYearNoError("")
        setAcceptanceNoError("")
        var arrayEnglishLength = Object.keys(arrayEnglish).length
        if (myPattern.test(ranking) === false) {
            setRankingNoError("Please Enter Only Number")

        }
        else if (myPattern.test(courseNo) === false) {
            setPopularCourseNoError("Please Enter Only Number")
        }
        else if (myPattern.test(acceptanceRate) === false) {
            setAcceptanceNoError("Please Enter Only Number")
        }
        else if (arrayEnglishLength === 0) {
            seterrorEnglish("Please Select English Proficency")
        }
        else {
            setmyloader("true")
            const obj = {
                foundedYear: foundedYear,
                ranking: ranking,
                rate: rate,
                course: course,
                courseNo: courseNo,
                month: month,
                year: myyear,
                english: arrayEnglish,
                cgpa: cgpa,
                acceptanceRate: acceptanceRate
            };
            axios.put(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/overview', obj, {
                headers: { 'Authorization': adminmounted }
            })


                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setsuccessMessage("Overview Updated")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                    }
                })
                .catch(error => {

                });
        }
    }

    return (
        <div>

            {loader === "true" ?
                <Loader />
                : null}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
            </div> : null}
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapseTwo" onClick={() => handleClick()} ><strong>2</strong>
                    Overview
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon icon={faAngleDown}  className="sidebar-faicon"style={{
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
                        <FontAwesomeIcon icon={faAngleUp} style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                    <form onSubmit={handleFormSubmit}>


                        <div className="card-body">
                            <div className="d-flex flex-wrap" id="Address">
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label>Founded year<span className="req-star">*</span></label>
                                        <input type="number" className="form-control"
                                            required
                                            value={foundedYear}
                                            onChange={(e) => onChangefoundedYear(e.target.value)}
                                        />
                                        <span className="error-msg"> {foundedYearMessage}</span>
                                        <div className="error-msg"> {FoundedYearNoError}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label htmlFor="State/Province">Ranking<span className="req-star">*</span></label>
                                        <input type="number" className="form-control"
                                            required
                                            value={ranking}
                                            onChange={(e) => setranking(e.target.value)}
                                        />
                                        <div className="error-msg"> {RankingNoError}</div>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group"><label htmlFor="City/Town">International Student Rate<span className="req-star">*</span></label>
                                        <select
                                            value={rate}
                                            onChange={(e) => setrate(e.target.value)}
                                            className="form-control" name="city" required>
                                            <option value="">Select Student Rate</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-4">
                                    <div className="form-group">
                                        <label>Popular Courses<span className="req-star">*</span></label>
                                        <input type="text" name="city" className="form-control"
                                            placeholder="Master in Architecture"
                                            required
                                            value={course}
                                            onChange={(e) => setcourse(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-2">
                                    <div className="form-group">
                                        <label htmlFor="Zipcode">No. of courses<span className="req-star">*</span></label>
                                        <input type="number" name="courseNo" className="form-control"
                                            required
                                            value={courseNo}
                                            onChange={(e) => setcourseNo(e.target.value)}
                                            placeholder="7"
                                        />
                                        <div className="error-msg"> {PopularCourseNoError}</div>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        < label htmlFor="State/Province">English Proficiency<span className="req-star">*</span></label>
                                        <div className="checkgrp">
                                            {myallEnglish.map((element, index) => (
                                                <div key={index}>
                                                    <input type="checkbox" name="univeristyExam"
                                                        value={element.name || ""}
                                                        checked={!!element.following === true}
                                                        onChange={handleuniveristyEnglishProficiencyChange} /> {element.name}
                                                </div>
                                            ))}

                                        </div>
                                        <div className="error-msg"> {errorEnglish}</div>

                                    </div>
                                </div>


                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="State/Province">CGPA</label>
                                                <input type="number" className="form-control" placeholder="CGPA"
                                                    value={cgpa}
                                                    onChange={(e) => setcgpa(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="State/Province">Acceptance rate(%)<span className="req-star">*</span></label>
                                                <input type="number" className="form-control" placholder=" acceptance rate"
                                                    required value={acceptanceRate}
                                                    onChange={(e) => setacceptanceRate(e.target.value)}
                                                />
                                                <div className="error-msg"> {AcceptanceNoError}</div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6"></div>
                                    <div className="col-md-6 text-right">
                                        <button type="submit" className="btn btn-secondary" title="Save"
                                            data-toggle="tooltip" data-placement="right"
                                        >Save</button>
                                        <button type="submit" data-bs-toggle="collapse" href="#collapse3" className="btn btn-success" title="Save & Next">Save & Next</button>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </form>
                </div>

            </div >
        </div >
    );
};



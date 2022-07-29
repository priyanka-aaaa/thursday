import React, { useState, useEffect, useMemo } from "react";
// import Loader from './Loader';
import Head from 'next/head'
import Link from 'next/link'
import Loader from '../components/Loader';
//start for pagination
import { Pagination, Search } from "../components/student/DataTable";
import { PaginationCourse, SearchCourse } from "../components/student/DataTableCourse";

// end for Pagination

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { Modal, Button } from 'react-bootstrap';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import {
  faStar, faHistory, faSearch, faUniversity, faCheckSquare, faCreditCard, faLaptop
} from '@fortawesome/free-solid-svg-icons';

function FinalFilter() {
  const [getmycountry, setgetmycountry] = useState([]);
  const [getmycourse, setgetmycourse] = useState("");
  const [getmyinterest, setgetmyinterest] = useState([]);
  const [getmyintake, setgetmyintake] = useState([]);
  const [getmyenglish, setgetmyenglish] = useState("");


  const [arrayCountry, setarrayCountry] = useState([]);
  const [completeCountry, setcompleteCountry] = useState([]);
  const [arrayIntake, setarrayIntake] = useState([]);
  const [completeIntake, setcompleteIntake] = useState([]);
  const [courseLevel, setcourseLevel] = useState("");
  const [englishProficiency, setenglishProficiency] = useState("");
  const [universityNumber, setuniversityNumber] = useState("");
  const [allUniversityValues, setallUniversityValues] = useState([{
    myinformation: [{ name: "", slug: "", country: "", state: "", type: "" }], myoverview: [{ ranking: "", foundedYear: "" }],
    myimage: [{ logo: "" }], _id: "", focusCount: ""
  }])
  const [allCourseValues, setallCourseValues] = useState([{
    _id: "",
    universities: [{
      information: [{ name: "", state: "", country: "" }],
      myimage: [{ logo: "" }]
    }],
  }])
  const [courseNumber, setcourseNumber] = useState("");
  const [arrayAreaOfInterest, setarrayAreaOfInterest] = useState([]);
  const [completeAreaOfInterest, setcompleteAreaOfInterest] = useState([]);
  const [mycourseSearchName, setmycourseSearchName] = useState("");
  const [loader, setmyloader] = useState("false");
  const [showModal, setshowModal] = useState(true);
  const [myuniversityName, setmyuniversityName] = useState("");
  const [mycourseName, setmycourseName] = useState("");
  const [showSweetAlert, setshowSweetAlert] = useState("0");
  const [showErrorSweetAlert, setshowErrorSweetAlert] = useState("0");
  const [showLoginSweetAlert, setshowLoginSweetAlert] = useState("0");
  // start for login
  const [email, setEmail] = useState("");
  const [myemail, setmyemail] = useState("");


  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState();
  const [wrongPassword, setwrongPassword] = useState("");
  const [wrongUsername, setwrongUsername] = useState("");
  //start for bookmark
  const [successMessage, setsuccessMessage] = useState("");
  const [studentToken, setstudentToken] = useState("");
  const [submitSuccess, setsubmitSuccess] = useState("0");
  const [displayPrpoerty, setdisplayPrpoerty] = useState("inline");
  //end for bookmark
  // end for login

  const [showuniversity, setshowuniversity] = useState("inline");
  const [showcourse, setshowcourse] = useState("none");

  // start for pagination
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });
  const ITEMS_PER_PAGE = 10;

  // end for pagination
  //start for pagination course
  const [totalItemsCourse, setTotalItemsCourse] = useState(0);
  //end for pagination course
  useEffect(() => {
    var studentToken = localStorage.getItem('studentToken')
    setstudentToken(studentToken)
    function handleApplyFilter() {

      var mycourseSearchName = localStorage.getItem('mycourseSearchName');
      if (mycourseSearchName !== null) {
        setmyloader("true")
        var getmycountry = [];
        // start for country checkbox
        let buildfilterCountryArray = [
          { "id": "United States", "name": "United States" },
          { "id": "United Kingdom", "name": "United Kingdom" },
          { "id": "Australia", "name": "Australia" },
          { "id": "Canada", "name": "Canada" }
        ];
        let filterCountryFollowing = buildfilterCountryArray.map(group => (
          { ...group, following: getmycountry.includes(group.id) })
        );
        setcompleteCountry(filterCountryFollowing)
        //end for country checkbox
        var getmyinterest = [];
        // start for areaOfInterest checkbox
        let buildfilterAreaOfInterestArray = [
          { "id": "Management", "name": "Management" },
          { "id": "Master", "name": "Master" },
          { "id": "Engineering", "name": "Engineering" },
          { "id": "Computers and Data Science", "name": "Computers and Data Science" },
          { "id": "Design", "name": "Design" }
        ];
        let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
          { ...group, following: getmyinterest.includes(group.id) })
        );
        setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
        //end for areaOfInterest checkbox


        //start dummy for search
        setmycourseSearchName(mycourseSearchName)
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/name'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({
            courseName: mycourseSearchName
          }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/name';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseName: mycourseSearchName }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        setmyloader("false")
        return

        //end dummy for search

      }


      if (JSON.parse(localStorage.getItem('mycountry')) !== null && JSON.parse(localStorage.getItem('mycountry')) !== undefined) {
        var getmycountry = JSON.parse(localStorage.getItem('mycountry'))
        setgetmycountry(getmycountry)
      }
      else {
        var getmycountry = [];

      }
      // start for country checkbox
      let buildfilterCountryArray = [
        { "id": "United States", "name": "United States" },
        { "id": "United Kingdom", "name": "United Kingdom" },
        { "id": "Australia", "name": "Australia" },
        { "id": "Canada", "name": "Canada" }
      ];
      let filterCountryFollowing = buildfilterCountryArray.map(group => (
        { ...group, following: getmycountry.includes(group.id) })
      );
      setcompleteCountry(filterCountryFollowing)
      //end for country checkbox
      if (localStorage.getItem('mycourse') !== null) {
        var getmycourse = localStorage.getItem('mycourse')
        setgetmycourse(getmycourse)
      }
      else {
        var getmycourse = "";
      }
      if (JSON.parse(localStorage.getItem('myinterest')) !== null && JSON.parse(localStorage.getItem('myinterest')) !== undefined) {
        var getmyinterest = JSON.parse(localStorage.getItem('myinterest'))
        setgetmyinterest(getmyinterest)
      }
      else {
        var getmyinterest = [];
      }
      // start for areaOfInterest checkbox
      let buildfilterAreaOfInterestArray = [
        { "id": "Management", "name": "Management" },
        { "id": "Master", "name": "Master" },
        { "id": "Engineering", "name": "Engineering" },
        { "id": "Computers and Data Science", "name": "Computers and Data Science" },
        { "id": "Design", "name": "Design" }
      ];
      let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
        { ...group, following: getmyinterest.includes(group.id) })
      );
      setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
      //end for areaOfInterest checkbox
      if (JSON.parse(localStorage.getItem('myintake')) !== null && JSON.parse(localStorage.getItem('myintake')) !== undefined) {
        var getmyintake = JSON.parse(localStorage.getItem('myintake'))
        setgetmyintake(getmyintake)
      }
      else {
        var getmyintake = [];
      }
      // start for intake checkbox

      // setcompleteIntake(buildfilterIntakeArray)
      //end for intake checkbox
      // start for areaOfInterest checkbox
      let buildfilterIntakeArray = [
        { "id": "Jan - April", "name": "Jan - April" },
        { "id": "May - August", "name": "May - August" },
        { "id": "Sep - Dec", "name": "Sep - Dec" }
      ];
      let filterIntakeFollowing = buildfilterIntakeArray.map(group => (
        { ...group, following: getmyintake.includes(group.id) })
      );
      setcompleteIntake(filterIntakeFollowing)
      //end for areaOfInterest checkbox

      if (localStorage.getItem('myenglish') !== null) {
        var getmyenglish = localStorage.getItem('myenglish')
        setgetmyenglish(getmyenglish)
      }
      else {
        var getmyenglish = "";
      }
      var mycountryLength = getmycountry.length;
      var myinterestLength = getmyinterest.length;
      var myintakeLength = getmyintake.length;
      if (getmyintake !== null) {
        var newnew = [...getmyintake];

        const index1 = newnew.indexOf('Jan - April');
        if (index1 != -1) {
          newnew[index1] = "Jan";
          newnew.push("Feb", "March", "April");
        }

        const index2 = newnew.indexOf('May - August');
        if (index2 != -1) {
          newnew[index2] = "May";
          newnew.push("June", "July", "Aug");
        }
        const index3 = newnew.indexOf('Sep - Dec');
        if (index3 != -1) {
          newnew[index3] = "Sep";
          newnew.push("Oct", "Nov", "Dec");
        }
      }
      //start


      if ((getmycountry === null || mycountryLength === 0) && (getmycourse === "" || getmycourse === null)
        && (getmyinterest === null || myinterestLength === 0) && (getmyintake === null || myintakeLength === 0)
        && (getmyenglish === "" || getmyenglish === null)
      ) {
        setmyloader("true")
        const url = process.env.REACT_APP_SERVER_URL + 'flt/allUniversity';
        fetch(url, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {

            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/allCourses';
        fetch(url2, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications


            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })

        return
      }

      //end
      //start group of five
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyinterest !== null
        && myinterestLength !== 0
        && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null
      ) {
        setmyloader("true")
        const url = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/In/En';
        fetch(url, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),

          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {


            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)

          })

        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/In/En';
        fetch(url2, {

          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }

        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })

        return
      }
      //end group of five

      //start group of four
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/In'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/In';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyinterest !== null && myinterestLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/En';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/In/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/In/En';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmyinterest !== null && myinterestLength !== 0 && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/In/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {

            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/In/En';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycourse !== "" && getmycourse !== null && getmyinterest !== null && myinterestLength !== 0 && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/In/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/In/En/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      //end group of four

      //start group of three
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/In/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {

            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/In/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }


      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/En/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/En/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/In'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/In';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/En';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/In/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/In/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/En/'

        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/En/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
      }
      if (getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/In/En/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/In/En/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/I/In/En'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/I/In/En';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      //end group of three

      //start gropu of two
      if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })

        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/In/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/In/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycountry !== null && mycountryLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("false")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/En/'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/En/';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry, english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("true")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      //end group of two

      //start group of one

      if (getmycountry !== null && mycountryLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/country'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/country';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ country: getmycountry }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmycourse !== "" && getmycourse !== null) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/level'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse }),
          headers: { "Content-Type": "application/json" }

        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/level';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ courseLevel: getmycourse }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")

            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmyinterest !== null && myinterestLength !== 0) {
        setmyloader("true")

        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/areaOfInterest'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/areaOfInterest';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ areaOfInterest: getmyinterest }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmyintake !== null && myintakeLength !== 0) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/intake'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {


            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)

          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/intake';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ month: newnew }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      if (getmyenglish !== "" && getmyenglish !== null) {
        setmyloader("true")
        const url1 = process.env.REACT_APP_SERVER_URL + 'flt/englishProficiency'
        fetch(url1, {
          method: 'put',
          body: JSON.stringify({ english: getmyenglish }),
          headers: { "Content-Type": "application/json" }

        })
          .then(response => response.json())
          .then(data => {
            setallUniversityValues(data.applications)
            var myresultsUniversity = data.applications
            var universityNumber = Object.keys(myresultsUniversity).length;
            setuniversityNumber(universityNumber)
          })
        const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/englishProficiency';
        fetch(url2, {
          method: 'put',
          body: JSON.stringify({ english: getmyenglish }),
          headers: { "Content-Type": "application/json" }
        })
          .then(response => response.json())
          .then(data => {
            setmyloader("false")
            setallCourseValues(data.applications)
            var myresultsCourse = data.applications
            var courseNumber = Object.keys(myresultsCourse).length;
            setcourseNumber(courseNumber)
          })
        return
      }
      //end group of one

    }
    handleApplyFilter()

  }, [])
  function clickPill() {
    setshowuniversity("none")
    setshowcourse("inline")
  }
  function clickUniversity() {
    setshowuniversity("inline")
    setshowcourse("none")
  }
  // start for pagination
  const commentsData = useMemo(() => {
    let computedComments = allUniversityValues;

    if (search) {
      computedComments = computedComments.filter(
        comment =>
          comment.myinformation[0].name.toLowerCase().includes(search.toLowerCase())
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
  }, [allUniversityValues, currentPage, search, sorting]);
  // end for pagination
  //start for pagination  course
  const commentsDataCourse = useMemo(() => {
    let computedComments = allCourseValues;

    if (search) {
      computedComments = computedComments.filter(
        comment =>
          comment.courseName.toLowerCase().includes(search.toLowerCase())
        // comment.myinformation[0].name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItemsCourse(computedComments.length);
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
  }, [allCourseValues, currentPage, search, sorting]);

  //end for pagination course
  function handleStarClick(value, universityID, name, logo, slug) {

    if (!localStorage.getItem("studentId")) {
      // setshowModal(true)
      // $('#exampleModal').modal('show'); 
      window.location.href = "/";
    }
    else {
      setmyloader("true")
      if (value === "active") {
        axios.delete(process.env.REACT_APP_SERVER_URL + 'student/bookmarks/' + universityID, { headers: { 'Authorization': studentToken } })
          .then(function (res) {

            if (res.data.success === true) {
              const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
              fetch(url, {
                method: 'GET',
                headers: { 'Authorization': studentToken }
              })
                .then(response => response.json())
                .then(data => {
                  setmyloader("false")
                  // setdata(data.studentBookmarks)
                  setsuccessMessage("You have crossed off This University")
                  setTimeout(() => setsubmitSuccess(""), 3000);
                  setsubmitSuccess(1)
                })
            }
          })
          .catch(error => {
            setmyloader("false")
          });
      }
      else {
        const obj = {
          universityID: universityID,
          name: name,
          logo: logo,
          slug: slug
        };
        axios.post(process.env.REACT_APP_SERVER_URL + 'student/bookmarks', obj, { headers: { 'Authorization': studentToken } })
          .then(function (res) {


            if (res.data.success === true) {
              const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
              fetch(url, {
                method: 'GET',
                headers: { 'Authorization': studentToken }
              })
                .then(response => response.json())
                .then(data => {
                  setmyloader("false")
                  const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
                  fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': studentToken }
                  })
                    .then(response => response.json())
                    .then(data => {
                      // setdata(data.studentBookmarks)
                      setsuccessMessage("You have Shortlisted This University")
                      setTimeout(() => setsubmitSuccess(""), 3000);
                      setsubmitSuccess(1)
                      // var resultstudentBookmarks = data.studentBookmarks
                      // let followingIds = resultstudentBookmarks.map(group => group.universityID);
                      // let allGroupsUserSpecific1 = UniveristyValues.map(group => (
                      //   { ...group, following: followingIds.includes(group._id) })
                      // );
                      // setallGroupsUserSpecific(allGroupsUserSpecific1)
                    })
                })
            }
          })
          .catch(error => {
            setmyloader("false")
          });
      }
    }
  }
  function handleEmailChange(event) {
    setEmail(event.target.value)

  }

  function open() {
    setshowModal(true)
  }
  function close() {
    setshowModal(false)
  }

  function handleSubmit(event) {
    setemailError("");
    setpasswordError("");
    setwrongUsername("")
    setwrongPassword("")
    event.preventDefault();
    if (email === "") {
      setemailError("Please enter email");
    }
    if (password === "") {
      setpasswordError("Please enter password");
    }
    else {
      setmyloader("true")
      const obj = {
        email: email,
        password: password
      };
      var myurl = process.env.REACT_APP_SERVER_URL;
      axios.post(myurl + 'student/login', obj)
        .then(result => {
          let responseJson = result;
          setmyloader("false")
          if (responseJson.data.success === true) {

            setshowModal(false)

            localStorage.setItem('studentId', responseJson.data.student._id);
            localStorage.setItem('studentToken', responseJson.data.token);
            localStorage.setItem('studentName', responseJson.data.student.name);
            localStorage.setItem('studentEmail', responseJson.data.student.email);

            setshowLoginSweetAlert("1")
          }
          else {
            if (responseJson.data.message === "Password not matched") {
              setwrongPassword(" Please enter a correct password")
            }
            else {

              setwrongUsername("Please enter a correct email")
            }
          }
        }
        )
        .catch(error => {
        });
    }
  }
  function handleApplyNow(universityID, courseID, session, applicationProgress, mycountry, universityName, courseName) {


    if (!localStorage.getItem("studentId")) {
      // setshowModal(true)
      alert("Please Login First")
    }
    else {
      setmyuniversityName(universityName)
      setmycourseName(courseName)

      var studentToken = localStorage.getItem("studentToken")
      setmyloader("true")
      const obj = {
        universityID: universityID,
        courseID: courseID,
        session: session,
        applicationProgress: applicationProgress,
        country: mycountry,
        universityName: universityName
      };
      axios.post(process.env.REACT_APP_SERVER_URL + 'student/orders', obj, { headers: { 'Authorization': studentToken } })
        .then(function (res) {
          setmyloader("false")
          if (res.data.success === true) {
            setshowSweetAlert("1")
          }
          else {
            setshowErrorSweetAlert("1")
          }
        })
        .catch(error => {

        });
    }
  }
  const handlecountry = (e) => {

    const { value, checked } = e.target;
    if (checked) {
      var mycheckboxValue = e.target.value
      setarrayCountry((prevVals) =>
        [...prevVals, mycheckboxValue])

      var checkCountry = arrayCountry.concat(mycheckboxValue);
      // var mycountryArray = [];
      var mycountryArray = getmycountry.concat(mycheckboxValue);
      localStorage.setItem("mycountry", JSON.stringify(mycountryArray));
      setgetmycountry(mycountryArray)

      let buildfilterCountryArray = [
        { "id": "United States", "name": "United States" },
        { "id": "United Kingdom", "name": "United Kingdom" },
        { "id": "Australia", "name": "Australia" },
        { "id": "Canada", "name": "Canada" }
      ];
      let filterCountryFollowing = buildfilterCountryArray.map(group => (
        // { ...group, following: checkCountry.includes(group.id) })
        { ...group, following: mycountryArray.includes(group.id) })

      );
      setcompleteCountry(filterCountryFollowing)
    }
    else {

      var mycheckboxValue = e.target.value
      var filteredExamArray = arrayCountry.filter(e => e !== mycheckboxValue)
      setarrayCountry(filteredExamArray)
      // var mycountryArray = [];
      var mycountryArray = getmycountry.filter(e => e !== mycheckboxValue)
      setgetmycountry(mycountryArray)
      localStorage.setItem("mycountry", JSON.stringify(mycountryArray));
      // start for unchecked
      let buildfilterCountryArray = [
        { "id": "United States", "name": "United States" },
        { "id": "United Kingdom", "name": "United Kingdom" },
        { "id": "Australia", "name": "Australia" },
        { "id": "Canada", "name": "Canada" }
      ];
      let filterCountryFollowing = buildfilterCountryArray.map(group => (
        { ...group, following: filteredExamArray.includes(group.id) })
      );
      setcompleteCountry(filterCountryFollowing)
      // end for unchecked
    }

  };
  function handlecourse(value) {
    setcourseLevel(value)
    setgetmycourse(value)
    localStorage.setItem("mycourse", value);
  }
  const handleinterest = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      var mycheckboxValue = e.target.value
      setarrayAreaOfInterest((prevVals) =>
        [...prevVals, mycheckboxValue])
      var checkAreaOfInterest = arrayAreaOfInterest.concat(mycheckboxValue);
      // var myinterestArray = [];
      var myinterestArray = getmyinterest.concat(mycheckboxValue);
      localStorage.setItem("myinterest", JSON.stringify(myinterestArray));
      setgetmyinterest(myinterestArray)
      let buildfilterAreaOfInterestArray = [
        { "id": "Management", "name": "Management" },
        { "id": "Master", "name": "Master" },
        { "id": "Engineering", "name": "Engineering" },
        { "id": "Computers and Data Science", "name": "Computers and Data Science" },
        { "id": "Design", "name": "Design" }
      ];
      let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
        { ...group, following: myinterestArray.includes(group.id) })
      );

      setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
    }
    else {
      var mycheckboxValue = e.target.value
      var filteredAreaOfInterestArray = arrayAreaOfInterest.filter(e => e !== mycheckboxValue)
      setarrayAreaOfInterest(filteredAreaOfInterestArray)
      //start
      // var myinterestArray = [];
      var myinterestArray = getmyinterest.filter(e => e !== mycheckboxValue)
      setgetmyinterest(myinterestArray)
      localStorage.setItem("myinterest", JSON.stringify(myinterestArray));
      //end
      // start for unchecked
      let buildfilterAreaOfInterestArray = [
        { "id": "Management", "name": "Management" },
        { "id": "Master", "name": "Master" },
        { "id": "Engineering", "name": "Engineering" },
        { "id": "Computers and Data Science", "name": "Computers and Data Science" },
        { "id": "Design", "name": "Design" }
      ];
      let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
        { ...group, following: myinterestArray.includes(group.id) })
      );
      setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
      // end for unchecked
    }

  };
  const handleintake = (e) => {

    const { value, checked } = e.target;
    if (checked) {
      var mycheckboxValue = e.target.value
      setarrayIntake((prevVals) =>
        [...prevVals, mycheckboxValue])
      var checkIntake = arrayIntake.concat(mycheckboxValue);
      //start
      // var myintakeArray = [];
      var myintakeArray = getmyintake.concat(mycheckboxValue);
      localStorage.setItem("myintake", JSON.stringify(myintakeArray));
      setgetmyintake(myintakeArray)

      //end
      let buildfilterIntakeArray = [
        { "id": "Jan - April", "name": "Jan - April" },
        { "id": "May - August", "name": "May - August" },
        { "id": "Sep - Dec", "name": "Sep - Dec" }
      ];
      let filterIntakeFollowing = buildfilterIntakeArray.map(group => (
        { ...group, following: myintakeArray.includes(group.id) })
      );
      setcompleteIntake(filterIntakeFollowing)
    }
    else {
      var mycheckboxValue = e.target.value
      var filteredExamArray = arrayIntake.filter(e => e !== mycheckboxValue)
      setarrayIntake(filteredExamArray)
      //start

      // var myintakeArray = [];
      var myintakeArray = getmyintake.filter(e => e !== mycheckboxValue)
      setgetmyintake(myintakeArray)
      localStorage.setItem("myintake", JSON.stringify(myintakeArray));
      //end
      // start for unchecked
      let buildfilterIntakeArray = [
        { "id": "Jan - April", "name": "Jan - April" },
        { "id": "May - August", "name": "May - August" },
        { "id": "Sep - Dec", "name": "Sep - Dec" }
      ];
      let filterIntakeFollowing = buildfilterIntakeArray.map(group => (
        { ...group, following: myintakeArray.includes(group.id) })
      );
      setcompleteIntake(filterIntakeFollowing)
      // end for unchecked
    }

  };
  function handleenglish(value) {
    setenglishProficiency(value)
    setgetmyenglish(value)
    localStorage.setItem("myenglish", value);
  }
  function deletecourseSearchName() {
    setmycourseSearchName("")
    localStorage.setItem('mycourseSearchName', "");

  }
  function deletecountry(value) {

    var filteredExamArray = arrayCountry.filter(e => e !== value)
    // var mycountryArray = [];
    var mycountryArray = getmycountry.filter(e => e !== value)
    localStorage.setItem("mycountry", JSON.stringify(mycountryArray));
    setgetmycountry(mycountryArray)
    setarrayCountry(filteredExamArray)

    let buildfilterCountryArray = [
      { "id": "United States", "name": "United States" },
      { "id": "United Kingdom", "name": "United Kingdom" },
      { "id": "Australia", "name": "Australia" },
      { "id": "Canada", "name": "Canada" }
    ];
    let filterCountryFollowing = buildfilterCountryArray.map(group => (
      // { ...group, following: filteredExamArray.includes(group.id) })
      { ...group, following: mycountryArray.includes(group.id) })

    );
    setcompleteCountry(filterCountryFollowing)
  }
  function deletecourse() {
    setcourseLevel("")
    setgetmycourse("")
    localStorage.setItem("mycourse", "");
  }
  function deleteinterest(value) {
    var filteredAreaOfInterestArray = arrayAreaOfInterest.filter(e => e !== value)
    setarrayAreaOfInterest(filteredAreaOfInterestArray)
    //start
    // var myinterestArray = [];
    var myinterestArray = getmyinterest.filter(e => e !== value)
    localStorage.setItem("myinterest", JSON.stringify(myinterestArray));
    setgetmyinterest(myinterestArray)
    //end
    let buildfilterAreaOfInterestArray = [
      { "id": "Management", "name": "Management" },
      { "id": "Master", "name": "Master" },
      { "id": "Engineering", "name": "Engineering" },
      { "id": "Computers and Data Science", "name": "Computers and Data Science" },
      { "id": "Design", "name": "Design" }
    ];
    let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
      { ...group, following: myinterestArray.includes(group.id) })
    );
    setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
  }
  function deleteintake(value) {
    var filteredExamArray = arrayIntake.filter(e => e !== value)
    setarrayIntake(filteredExamArray)
    //start
    // var myintakeArray = [];
    var myintakeArray = getmyintake.filter(e => e !== value)
    localStorage.setItem("myintake", JSON.stringify(myintakeArray));
    setgetmyintake(myintakeArray)
    //end
    let buildfilterIntakeArray = [
      { "id": "Jan - April", "name": "Jan - April" },
      { "id": "May - August", "name": "May - August" },
      { "id": "Sep - Dec", "name": "Sep - Dec" }
    ];
    let filterIntakeFollowing = buildfilterIntakeArray.map(group => (
      { ...group, following: myintakeArray.includes(group.id) })
    );
    setcompleteIntake(filterIntakeFollowing)
  }
  function deleteenglish() {
    setenglishProficiency("")
    setgetmyenglish("")
    localStorage.setItem("myenglish", "");
  }
  function handleApplyFilter() {

    if (JSON.parse(localStorage.getItem('mycountry')) !== null && JSON.parse(localStorage.getItem('mycountry')) !== undefined) {
      var getmycountry = JSON.parse(localStorage.getItem('mycountry'))
      setgetmycountry(getmycountry)
    }
    else {
      var getmycountry = [];

    }
    // start for country checkbox
    let buildfilterCountryArray = [
      { "id": "United States", "name": "United States" },
      { "id": "United Kingdom", "name": "United Kingdom" },
      { "id": "Australia", "name": "Australia" },
      { "id": "Canada", "name": "Canada" }
    ];
    let filterCountryFollowing = buildfilterCountryArray.map(group => (
      { ...group, following: getmycountry.includes(group.id) })
    );
    setcompleteCountry(filterCountryFollowing)
    //end for country checkbox
    if (localStorage.getItem('mycourse') !== null) {
      var getmycourse = localStorage.getItem('mycourse')
      setgetmycourse(getmycourse)
    }
    else {
      var getmycourse = "";
    }
    if (JSON.parse(localStorage.getItem('myinterest')) !== null && JSON.parse(localStorage.getItem('myinterest')) !== undefined) {
      var getmyinterest = JSON.parse(localStorage.getItem('myinterest'))
      setgetmyinterest(getmyinterest)
    }
    else {
      var getmyinterest = [];
    }
    // start for areaOfInterest checkbox
    let buildfilterAreaOfInterestArray = [
      { "id": "Management", "name": "Management" },
      { "id": "Master", "name": "Master" },
      { "id": "Engineering", "name": "Engineering" },
      { "id": "Computers and Data Science", "name": "Computers and Data Science" },
      { "id": "Design", "name": "Design" }
    ];
    let filterAreaOfInterestFollowing = buildfilterAreaOfInterestArray.map(group => (
      { ...group, following: getmyinterest.includes(group.id) })
    );
    setcompleteAreaOfInterest(filterAreaOfInterestFollowing)
    //end for areaOfInterest checkbox
    if (JSON.parse(localStorage.getItem('myintake')) !== null && JSON.parse(localStorage.getItem('myintake')) !== undefined) {
      var getmyintake = JSON.parse(localStorage.getItem('myintake'))
      setgetmyintake(getmyintake)
    }
    else {
      var getmyintake = [];
    }
    // start for intake checkbox

    // setcompleteIntake(buildfilterIntakeArray)
    //end for intake checkbox
    // start for areaOfInterest checkbox
    let buildfilterIntakeArray = [
      { "id": "Jan - April", "name": "Jan - April" },
      { "id": "May - August", "name": "May - August" },
      { "id": "Sep - Dec", "name": "Sep - Dec" }
    ];
    let filterIntakeFollowing = buildfilterIntakeArray.map(group => (
      { ...group, following: getmyintake.includes(group.id) })
    );
    setcompleteIntake(filterIntakeFollowing)
    //end for areaOfInterest checkbox

    if (localStorage.getItem('myenglish') !== null) {
      var getmyenglish = localStorage.getItem('myenglish')
      setgetmyenglish(getmyenglish)
    }
    else {
      var getmyenglish = "";
    }
    var mycountryLength = getmycountry.length;
    var myinterestLength = getmyinterest.length;
    var myintakeLength = getmyintake.length;
    if (getmyintake !== null) {
      var newnew = [...getmyintake];

      const index1 = newnew.indexOf('Jan - April');
      if (index1 != -1) {
        newnew[index1] = "Jan";
        newnew.push("Feb", "March", "April");
      }

      const index2 = newnew.indexOf('May - August');
      if (index2 != -1) {
        newnew[index2] = "May";
        newnew.push("June", "July", "Aug");
      }
      const index3 = newnew.indexOf('Sep - Dec');
      if (index3 != -1) {
        newnew[index3] = "Sep";
        newnew.push("Oct", "Nov", "Dec");
      }
    }
    //start group of five
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyinterest !== null
      && myinterestLength !== 0
      && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null
    ) {
      setmyloader("true")

      const url = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/In/En';
      fetch(url, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),

        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {


          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)

        })

      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/In/En';
      fetch(url2, {

        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }

      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")

          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    //end group of five
    //start group of four
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")

      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/In'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/In';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")

          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyinterest !== null && myinterestLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")

      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/En';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")

          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")

      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/In/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/In/En';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmyinterest !== null && myinterestLength !== 0 && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/In/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/In/En';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycourse !== "" && getmycourse !== null && getmyinterest !== null && myinterestLength !== 0 && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/In/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/In/En/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    //end group of four

    //start group of three
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/I/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/I/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/In/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {

          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/In/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }


    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L/En/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L/En/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/In'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/In';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/En';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/In/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/In/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycourse !== "" && getmycourse !== null && myinterestLength !== 0 && getmyinterest !== null && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/I/En/'

      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/I/En/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, areaOfInterest: getmyinterest, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
    }
    if (getmycourse !== "" && getmycourse !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/L/In/En/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/L/In/En/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (myinterestLength !== 0 && getmyinterest !== null && getmyintake !== null && myintakeLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/I/In/En'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/I/In/En';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ areaOfInterest: getmyinterest, month: newnew, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    //end group of three

    //start gropu of two
    if (getmycountry !== null && mycountryLength !== 0 && getmycourse !== "" && getmycourse !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/L'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })

      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/L';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, courseLevel: getmycourse }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && myinterestLength !== 0 && getmyinterest !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/I/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/I/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/In/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/In/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycountry !== null && mycountryLength !== 0 && getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/C/En/'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/C/En/';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry, english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    //end group of two

    //start group of one

    if (getmycountry !== null && mycountryLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/country'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/country';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ country: getmycountry }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmycourse !== "" && getmycourse !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/level'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse }),
        headers: { "Content-Type": "application/json" }

      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/level';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ courseLevel: getmycourse }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmyinterest !== null && myinterestLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/areaOfInterest'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/areaOfInterest';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ areaOfInterest: getmyinterest }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmyintake !== null && myintakeLength !== 0) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/intake'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {


          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)

        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/intake';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ month: newnew }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    if (getmyenglish !== "" && getmyenglish !== null) {
      setmyloader("true")
      const url1 = process.env.REACT_APP_SERVER_URL + 'flt/englishProficiency'
      fetch(url1, {
        method: 'put',
        body: JSON.stringify({ english: getmyenglish }),
        headers: { "Content-Type": "application/json" }

      })
        .then(response => response.json())
        .then(data => {
          setallUniversityValues(data.applications)
          var myresultsUniversity = data.applications
          var universityNumber = Object.keys(myresultsUniversity).length;
          setuniversityNumber(universityNumber)
        })
      const url2 = process.env.REACT_APP_SERVER_URL + 'fcourse/englishProficiency';
      fetch(url2, {
        method: 'put',
        body: JSON.stringify({ english: getmyenglish }),
        headers: { "Content-Type": "application/json" }
      })
        .then(response => response.json())
        .then(data => {
          setmyloader("false")
          setallCourseValues(data.applications)
          var myresultsCourse = data.applications
          var courseNumber = Object.keys(myresultsCourse).length;
          setcourseNumber(courseNumber)
        })
      return
    }
    //end group of one
  }
  return (
    <div>
      <Head>
        <title>Search from 100K+ Study Abroad Programs @ CourseMentor™</title>
        <meta name="description" content="CourseMentor™ - Study Abroad - Search the Best University and colleges Courses to study in foreign. Save upto 1000's USD, Apply for upcoming intakes now!" />
        <meta property="og:title" content="Search from 100K+ Study Abroad Programs @ CourseMentor™" />
        <meta property="og:description" content="CourseMentor™ - Study Abroad - Search the Best University and college Courses to study in foreign. Save upto 1000's USD, Apply for upcoming intakes now!" />
        <meta property="og:image" content="og image" />
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <div className="main-content">

        {loader === "true" ?
          <Loader />
          : null}

        {submitSuccess === 1 ? <div className="Show_success_bookmark">
          <strong>Success!</strong> {successMessage}
        </div> : null}
        {submitSuccess === 1 ? <div className="Show_success_bookmark">
          <strong>Success!</strong> {successMessage}
        </div> : null}
        {/*Full width header Start*/}
        <div className="full-width-header">
          <Header />
        </div>
        {/*Full width header End*/}
        {/* Breadcrumbs Start */}
        <div className="rs-breadcrumbs img1">
          <div className="breadcrumbs-inner text-center">
            <h1 className="page-title">{courseNumber} Courses in {universityNumber} universities found</h1>
            <ul>
              <li title="coursementor">

                <a className="active" href="https://coursementor.com/">Home</a>
              </li>
              <li>Universities / Courses</li>
            </ul>
          </div>
        </div>
        {/* Breadcrumbs End */}

        <div className="container-fluid">
          <div className="row mb-3 mt-5">
            {
              mycourseSearchName !== null && mycourseSearchName !== "" ?
                <div className="col-md-2" >
                  <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deletecourseSearchName()}  >×</span>
                    </button>  {mycourseSearchName}
                  </div>
                </div> :
                null
            }
            {getmycountry !== null && getmycountry !== undefined ?
              <>
                {getmycountry.map((element, index) =>
                (
                  <div className="col-md-2" key={index}>
                    <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deletecountry(element)}  >×</span>
                      </button>  {element}
                    </div>
                  </div>
                ))}

              </> : null
            }

            {getmycourse !== "" && getmycourse !== null ?
              <div className="col-md-2" >
                <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deletecourse()}  >×</span>
                  </button>  {getmycourse}
                </div>
              </div> :
              null
            }

            {getmyinterest !== null ?
              <>  {getmyinterest.map((element, index) =>
              (
                <div className="col-md-2" key={index}>
                  <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deleteinterest(element)}  >×</span>
                    </button>  {element}
                  </div>
                </div>
              ))}</> : null
            }

            {getmyintake !== null ? <>
              {
                getmyintake.map((element, index) =>
                (
                  <div className="col-md-2" key={index}>
                    <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deleteintake(element)}  >×</span>
                      </button>  {element}
                    </div>
                  </div>
                ))
              }
            </>
              : null}


            {getmyenglish !== "" && getmyenglish !== null ?
              <div className="col-md-2" >
                <div className="alert alert-info fade in alert-dismissible show" style={{ marginTop: '18px' }}>
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" style={{ fontSize: '20px' }} onClick={() => deleteenglish()}  >×</span>
                  </button>  {getmyenglish}
                </div>
              </div> :
              null
            }

          </div>
          <div className="row mb-5">
            <div className="col-md-3">
              <section id="filterSection">
                <div className="search-country">
                  <div id="accordion">
                    <div className="card">
                      <a className="card-link collapsed card-header" data-bs-toggle="collapse" href="#collapseOne">
                        Country
                      </a>
                      <div id="collapseOne" className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                          {/* start  for country */}
                          {completeCountry.map((element, index) => (
                            <div key={index}>
                              <input type="checkbox" name="univeristyExam"
                                value={element.name || ""}
                                checked={!!element.following === true}
                                onChange={handlecountry} /> {element.name}
                            </div>
                          ))}
                          {/* end for country */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <a className="card-header collapsed card-link" data-bs-toggle="collapse" href="#collapseThree">
                        Course Level
                      </a>
                      <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                          <select className="form-control" value={courseLevel}
                            onChange={(e) => handlecourse(e.target.value)}
                          >
                            <option value="">Select Type</option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>

                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <a className="card-header collapsed card-link" data-bs-toggle="collapse" href="#collapseTwo">
                        Area of Interest
                      </a>
                      <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                          <form>
                            <div className="form-group d-flex serch-from">
                              <span className="btn btn-primary">
                                <FontAwesomeIcon icon={faSearch} />
                              </span>
                              <input type="search" className="form-control" placeholder="Search" id="search" />
                            </div>
                          </form>
                          {/* start  for country */}
                          {completeAreaOfInterest.map((element, index) => (
                            <div key={index}>
                              <input type="checkbox" name="areaOfInterest"
                                value={element.name || ""}
                                checked={!!element.following === true}
                                onChange={handleinterest} /> {element.name}
                            </div>
                          ))}
                          {/* end for country */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <a className="card-header collapsed card-link" data-bs-toggle="collapse" href="#collapse4">
                        Intake
                      </a>
                      <div id="collapse4" className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                          {/* start  for intake */}
                          {completeIntake.map((element, index) => (
                            <div key={index}>
                              <input type="checkbox" name="univeristyExam"
                                value={element.name || ""}
                                checked={!!element.following === true}
                                onChange={handleintake} /> {element.name}
                            </div>
                          ))}
                          {/* end for intake */}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <a className="card-header collapsed card-link" data-bs-toggle="collapse" href="#collapse8">
                        English Proficiency Exam
                      </a>
                      <div id="collapse8" className="collapse" data-bs-parent="#accordion">
                        <div className="card-body">
                          <form>
                            <select className="form-control"
                              value={englishProficiency}
                              onChange={(e) => handleenglish(e.target.value)}

                            >
                              <option>Select</option>
                              <option value="IELTS">IELTS</option>
                              <option value="PTE">PTE</option>
                              <option value="TOEFL">TOEFL</option>
                              <option value="Duolingo">Duolingo</option>
                              <option value="CPE">CPE</option>
                              <option value="CAE">CAE</option>
                              <option value="OET">OET</option>
                            </select>
                          </form>
                        </div>
                      </div>
                    </div>





                  </div>
                </div>
                <div className="text-center">
                  <button type="button" className="btn website-btn talk-btn" onClick={() => handleApplyFilter()}>Apply Filter</button>
                </div>
              </section>
            </div>
            <div className="col-md-9">
              <div className="unver-coures-block search-country">
                {/* Nav pills */}
                <ul className="nav nav-pills" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="pill" href="#home" onClick={() => clickUniversity()}>Universities ({universityNumber})</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="pill" href="#menu1" onClick={() => clickPill()}>Courses ({courseNumber})</a>
                  </li>
                </ul>
                {/* Tab panes */}
                <div className="tab-content">
                  <div id="home" className=" tab-panea active"><br />

                    <div className="universityCustomTabs">
                      <div className="overviewblock">

                      </div>


                      {showuniversity === "inline" ? <>
                        <Search
                          onSearch={value => {
                            var trimValue = value.trim();
                            setSearch(trimValue);
                            setCurrentPage(1);
                          }}
                        />
                        <div className="dreamuniversity mt-5">
                          <h2><span className="icon">
                            <FontAwesomeIcon icon={faStar} />

                          </span>{universityNumber} Dream Universities</h2>

                          <div className="row">
                            {commentsData.map((element, index) =>
                            (
                              <div className="col-md-6" key={index}>
                                <div className="uniBox mt-3">
                                  <div className="head">
                                    <div className="imgBox"><img src={element.myimage[0].logo} alt="logo" loading="lazy" /></div>
                                    <div className="details">
                                      <Link target="_blank" href={'/schools/' + element.myinformation[0].slug}
                                      >
                                        {element.myinformation[0].name}</Link>
                                      <p>{element.myinformation[0].state}, {element.myinformation[0].country}</p>

                                    </div>
                                    <div className="bookmark  d-none d-sm-block">
                                      <img onClick={() => handleStarClick("inactive", element._id, element.myinformation[0].name, element.myimage[0].logo, element.myinformation[0].slug)} alt=""
                                        src="/images/starInactive.webp"
                                        style={{
                                          width: "33px",
                                          height: "33px",
                                          display: displayPrpoerty
                                        }}
                                      />
                                    </div>
                                  </div>
                                  <div className="body">
                                    <div className="leftSection">
                                      <div className="data">
                                        <FontAwesomeIcon icon={faUniversity} />

                                        <div className="details">
                                          <h4>{element.myinformation[0].type}</h4>
                                          <p>University Type</p>
                                        </div>
                                      </div>
                                      <div className="data">
                                        <FontAwesomeIcon icon={faLaptop} />
                                        <div className="details">
                                          <h4>{element.myoverview[0].foundedYear}</h4>
                                          <p>Established Since</p>
                                        </div>
                                      </div>
                                      <div className="data">
                                        <FontAwesomeIcon icon={faStar} />
                                        <div className="details">
                                          <h4> {element.myoverview[0].ranking} </h4>
                                          <p>NA Ranking</p>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="rightSection">
                                      <div className="data">
                                        <Link target="_blank" href={'/schools/' + element.myinformation[0].slug}
                                        ><a>
                                            <FontAwesomeIcon icon={faCheckSquare} className="sidebar-faicon" />
                                            Know More</a></Link></div>
                                    </div>
                                  </div>

                                  <div className="foot">
                                    {/* <button className="recommended"><span>
                                   RECOMMENDED COURSES ({element.focusCount})
                                 </span></button> */}
                                    <div className="custom-shortlist d-flex d-sm-none">Tap to Shortlist<div className="condition_btn shortlist"><img src="https://images.leverageedu.com/assets/img/course-finder/Star.svg" className="no-icon" alt="" loading="lazy" /><img src="https://images.leverageedu.com/assets/img/course-finder/Star-filled.svg" className="yes-icon" alt="" loading="lazy" /></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                        {/* start for pagination */}
                        <Pagination
                          total={totalItems}
                          itemsPerPage={ITEMS_PER_PAGE}
                          currentPage={currentPage}
                          onPageChange={page => setCurrentPage(page)}
                        />
                      </>
                        : null}
                      {/* end for pagination */}
                    </div>
                  </div>
                  <div id="menu1" className="tab-panea fade"><br />
                    {showcourse === "inline" ? <>
                      {/* start for pagination course */}
                      <SearchCourse
                        onSearch={value => {
                          var trimValue = value.trim();
                          setSearch(trimValue);
                          setCurrentPage(1);
                        }}
                      />
                      {/* end for pagination course */}
                      <div className="unv-coures">
                        {commentsDataCourse.map((element, index) =>
                        (
                          <div className="courseBox mb-3" key={index}>
                            <div className="courseData">
                              <div className="head-title"><span className="title">{element.courseName} - {element.areaOfInterest}</span></div>
                              <div className="university-details">

                                <img src={element.universities[0].myimage[0].logo}
                                  className="uni-logo" alt={9} id={9} loading="lazy" />
                                <div className="details">
                                  <h5>{element.universities[0].information[0].name}</h5>
                                  <p>{element.universities[0].information[0].state}, {element.universities[0].information[0].country}</p>
                                </div>
                              </div>
                              <div className="facilities">
                                <div className="data">
                                  <span>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                  </span>
                                  <div className="dataDetails">
                                    <h5>{element.currency + " " + element.tuitionFee}</h5>
                                    <p> Tuition Fee </p>
                                  </div>
                                </div>
                                <div className="data">
                                  <span>
                                    <FontAwesomeIcon icon={faHistory} />
                                  </span>
                                  <div className="dataDetails">
                                    <h5>{element.duration} Months</h5>
                                    <p> Duration </p>
                                  </div>
                                </div>
                                <div className="data" >
                                  <span>
                                    <FontAwesomeIcon icon={faHistory} />
                                  </span>
                                  <div className="dataDetails">
                                    <h5>{element.month} </h5>
                                    <p> Intake </p>
                                  </div>
                                </div>
                                <div className="data" >
                                  <span>
                                    <FontAwesomeIcon icon={faHistory} />
                                  </span>
                                  <div className="dataDetails">
                                    <h5>{element.english} </h5>
                                    <p> English Proficiency </p>
                                  </div>
                                </div>
                              </div>
                              <div className="action">


                                <button onClick={() => handleApplyNow(element.universities[0]._id, element._id, element.month, "first",
                                  element.universities[0].information[0].country, element.universities[0].information[0].name,
                                  element.courseName)}>Apply Now

                                </button>
                              </div>


                            </div>
                          </div>
                        ))}
                      </div>
                      {/* start for pagination course */}
                      <Pagination
                        total={totalItemsCourse}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                      />
                      {/* end for pagination course */}
                    </> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export default FinalFilter;
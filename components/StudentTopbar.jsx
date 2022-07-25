import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';
import Router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faDashboard, faBars, faUserCircle, faAngleLeft, faAddressBook, faBookmark, faCog, faEnvelope, faAward
} from '@fortawesome/free-solid-svg-icons';
const StudentTopbar = () => {
  const [width, setwidth] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const [redirectToReferrer, setredirectToReferrer] = useState("false");
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [notification, setnotification] = useState([]);
  const [resultLength, setresultLength] = useState();
  const [studentEmail, setstudentEmail] = useState();
  const [studentId, setstudentId] = useState();
  const [currentMenu, setcurrentMenu] = useState("");
  function handletoogleClick() {
    if (width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    }
  }

  useEffect(() => {

    var mounted = localStorage.getItem("studentToken")
    var studentEmail = localStorage.getItem("studentEmail")
    var studentId = localStorage.getItem("studentId")
    setMounted(mounted)
    setstudentEmail(studentEmail)
    setstudentId(studentId)

    if (localStorage.getItem("studentId")) {
      var mounted = localStorage.getItem("studentToken")
      var studentEmail = localStorage.getItem("studentEmail")
      var studentId = localStorage.getItem("studentId")
      setMounted(mounted)
      setstudentEmail(studentEmail)
      setstudentId(studentId)

      const url = process.env.REACT_APP_SERVER_URL + 'student/messagesUnread';
      fetch(url, {
        method: 'GET',
        headers: { 'Authorization': mounted }
      })
        .then(response => response.json())
        .then(data => {
          if (data.notifications === undefined) {
            localStorage.removeItem("studentId");
            localStorage.removeItem("studentToken");
            localStorage.removeItem("studentName");
            localStorage.removeItem("studentEmail");
            window.location.href = "/";
          }
          var myresults = data.notifications


          setnotification(data.notifications)
          var resultLength = Object.keys(myresults).length
          setresultLength(resultLength)
        })



    }
    else {

      var studentEmail = "";
      Router.push("/ ")
      setredirectToReferrer("true")
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("student/")
    setcurrentMenu(splitcurrentUrl[1])
  }, [])
  if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
  }
  function handleCurrentClick(value) {
    setcurrentMenu(value)
  }
  function logout() {
    localStorage.removeItem("studentId");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentPhone");
    window.location.href = "/";
  }



  return (

    <div>
      {redirectToReferrer === "true" ?
        <>  </>
        : <div>
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"
              onClick={() => handletoogleClick()}
            >
              <FontAwesomeIcon className="sidebar-faicon" icon={faBars} />

            </button>

            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown no-arrow mr-0">
                <a className="nav-link dropdown-toggle" href="#collapseEleven1" id="userDropdown2" role="button" data-bs-toggle="collapse" aria-haspopup="true" aria-expanded="false">
                  <i className="fas fa-envelope fa-fw"></i>
                  <FontAwesomeIcon className="sidebar-faicon" icon={faEnvelope} />
                  {resultLength !== 0 ?
                    <span className="badge badge-danger badge-counter">{resultLength}</span>
                    : null}
                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown2" id="collapseEleven1" data-bs-parent="#accordion" >
                  <p className="dropdown-item"

                    onClick={(e) => logout()}

                    href="" data-toggle="modal" data-target="#logoutModal">
                    <FontAwesomeIcon className="sidebar-faicon" icon={faSignOutAlt} />

                    Logout

                  </p>

                </div>
              </li>
              <div className="topbar-divider d-none d-sm-block"></div>
              <li className="nav-item dropdown no-arrow">

                <a className="nav-link dropdown-toggle" href="#collapseEleven" id="userDropdown" role="button" data-bs-toggle="collapse" aria-haspopup="true" aria-expanded="false">
                  <span>{studentEmail}</span>
                  <span className="mr-2 d-none d-lg-inline text-gray-600 small">{email}</span>
                  <img className="img-profile rounded-circle" src="/images/undraw_profile.svg" loading="lazy" />

                  {/* <img src="undraw_profile" alt="dev logo" /> */}

                </a>
                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown" id="collapseEleven" data-bs-parent="#accordion" >
                  <p className="dropdown-item"
                    onClick={(e) => logout()}

                    href="" data-toggle="modal" data-target="#logoutModal">
                    <FontAwesomeIcon className="sidebar-faicon" icon={faSignOutAlt} />

                    Logout
                  </p>
                </div>




              </li>
            </ul>
          </nav>
        </div>}
    </div>

  )
}
export default StudentTopbar
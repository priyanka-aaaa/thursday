import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faBars, faDashboard, faUserCircle, faAngleLeft, faAddressBook, faBookmark, faCog, faEnvelope, faAward
} from '@fortawesome/free-solid-svg-icons';
const StudentDummy = () => {
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
      setredirectToReferrer("true")
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("student/")
    setcurrentMenu(splitcurrentUrl[1])
  }, [])

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
    <>
    {/* start student sidebar */}
      <div className="Home_navcontainer__1-_Sr">
        <ul className={width} id="accordionSidebar">

          {/* <div className="sidebar-brand-icon ">
            CM
        </div> */}
          <span className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            {width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" ?
              <Link href='/student/dashboard'  >
                <img src="/images/small-dash-logo.webp" alt="dev logo" />

              </Link>
              :
              <Link href='/student/dashboard'  >

                <img src="/images/footerlogo.webp" alt="dev logo" />
              </Link>

            }
            <div className="sidebar-brand-text mx-3">
            </div>
          </span>
          <hr className="sidebar-divider my-0" />
          {currentMenu === "Explore" ?
            <li className="nav-item " onClick={() => handleCurrentClick("Explore")}>
              <Link href='/student/search-courses' className="nav-link current-tab" title="Explore" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon"


                /><span className="text-mob-hide">Explore Courses</span>  </span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("Explore")}>
              <Link href='/student/search-courses' className="nav-link" title="Explore" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Explore Courses</span>  </span></a></Link>
            </li>
          }
          {currentMenu === "Free Profile Assessment" ?
            <li className="nav-item " onClick={() => handleCurrentClick("Free Profile Assessment")}>
              <Link href='/student/Free-Profile-Assessment' className="nav-link current-tab" title="Free Profile Assessment" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Free Profile Assessment</span>  </span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("Free Profile Assessment")}>
              <Link href='/student/Free-Profile-Assessment' className="nav-link" title="Free Profile Assessment" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Free Profile Assessment</span>  </span></a></Link>
            </li>
          }
          {currentMenu === "dashboard" ?
            <li className="nav-item " onClick={() => handleCurrentClick("dashboard")}>
              <Link href='/student/dashboard' className="nav-link current-tab" title="Dashboard" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Applied Application</span>  </span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("dashboard")}>
              <Link href='/student/dashboard' className="nav-link" title="Dashboard" ><a className="nav-link">
                <i className="fas fa-fw fa-tachometer-alt"></i>
                <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Applied Application</span>  </span></a></Link>
            </li>
          }
          {currentMenu === "applicationProfile" ?
            <li className="nav-item" onClick={() => handleCurrentClick("applicationProfile")}>

              <Link href='/student/applicationProfile' className="nav-link current-tab" title="Application Profile"><a className="nav-link">
                <i className="fas fa-file-alt"></i>
                <span><FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" /><span className="text-mob-hide">Application Profile</span></span></a></Link>
            </li>
            :
            <li className="nav-item" onClick={() => handleCurrentClick("applicationProfile")}>

              <Link href='/student/applicationProfile' className="nav-link" title="Application Profile"><a className="nav-link">
                <i className="fas fa-file-alt"></i>
                <span><FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" /><span className="text-mob-hide">Application Profile</span></span></a></Link>
            </li>
          }
          {currentMenu === "document" ?
            <li className="nav-item " onClick={() => handleCurrentClick("document")}>
              <Link href='/student/document' className="nav-link current-tab" title="My Documents" ><a className="nav-link">
                <i className="fas fa-file-upload"></i>
                <span><FontAwesomeIcon icon={faFile} className="sidebar-faicon" /><span className="text-mob-hide">My Documents</span></span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("document")}>
              <Link href='/student/document' className="nav-link" title="My Documents" ><a className="nav-link">
                <i className="fas fa-file-upload"></i>
                <span><FontAwesomeIcon icon={faFile} className="sidebar-faicon" /><span className="text-mob-hide">My Documents</span></span></a></Link>
            </li>
          }
          {currentMenu === "bookmark" ?
            <li className="nav-item " onClick={() => handleCurrentClick("bookmark")}>
              <Link href='/student/bookmark' className="nav-link current-tab" title="Bookmark"><a className="nav-link">
                <i className="fas fa-bookmark"></i>
                <span><FontAwesomeIcon icon={faBookmark} className="sidebar-faicon" /><span className="text-mob-hide">Bookmark</span></span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("bookmark")}>
              <Link href='/student/bookmark' className="nav-link" title="Bookmark"><a className="nav-link">
                <i className="fas fa-bookmark"></i>
                <span><FontAwesomeIcon icon={faBookmark} className="sidebar-faicon" /><span className="text-mob-hide">Bookmark</span></span></a></Link>
            </li>
          }
          {currentMenu === "Message" ?
            <li className="nav-item " onClick={() => handleCurrentClick("Message")}>
              <Link href='/student/message' className="nav-link current-tab" title="Message"

              ><a className="nav-link">
                  <i className="fas fa-bookmark"></i>
                  <span><FontAwesomeIcon icon={faEnvelope} className="sidebar-faicon" /><span className="text-mob-hide">Messages</span></span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("Message")}>
              <Link href='/student/message' className="nav-link" title="Message"

              ><a className="nav-link">
                  <i className="fas fa-bookmark"></i>
                  <span><FontAwesomeIcon icon={faEnvelope} className="sidebar-faicon" /><span className="text-mob-hide">Message</span></span></a></Link>
            </li>
          }
          {currentMenu === "Settings" ?
            <li className="nav-item " onClick={() => handleCurrentClick("Settings")}>
              <Link href='/student/setting' className="nav-link current-tab" title="Settings"><a className="nav-link">
                <i className="fas fa-bookmark"></i>
                <span><FontAwesomeIcon icon={faCog} className="sidebar-faicon" /><span className="text-mob-hide">Settings</span></span></a></Link>
            </li>
            :
            <li className="nav-item " onClick={() => handleCurrentClick("Settings")}>
              <Link href='/student/setting' className="nav-link" title="Settings"><a className="nav-link">
                <i className="fas fa-bookmark"></i>
                <span><FontAwesomeIcon icon={faCog} className="sidebar-faicon" /><span className="text-mob-hide"> Settings</span></span></a></Link>
            </li>
          }


          <div className="text-center d-none d-md-inline">
            <button title="Sidenar-toggle" className="rounded-circle border-0" id="sidebarToggle" onClick={() => handletoogleClick()}>
              <i className="fa-solid fa-arrow-right"></i>
              <FontAwesomeIcon icon={faAngleLeft} className="sidebar-faicon" style={{
                fontWeight: 900,
                marginRight: "0.1rem",
                color: "rgba(255, 255, 255, 0.5)"
              }} />
            </button>
          </div>
        </ul>
      </div>
         {/* end student sidebar */}
      {/* start for student topbar */}
      <div className="Home_headcontainer__1MkbA">
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
      </div>
    </>
  )
}
export default StudentDummy
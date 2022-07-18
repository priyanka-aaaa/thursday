import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faDashboard, faUserCircle, faAngleLeft, faAddressBook, faBookmark, faCog, faEnvelope, faAward
} from '@fortawesome/free-solid-svg-icons';
const StudentSidebar = () => {
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
  var title = "ggggggg"
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
          <Link href='/student/search-courses' className="nav-link current-tab" title="Explore" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Explore Courses</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Explore")}>
          <Link href='/student/search-courses' className="nav-link" title="Explore" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Explore Courses</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "Free Profile Assessment" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Free Profile Assessment")}>
          <Link href='/student/Free-Profile-Assessment' className="nav-link current-tab" title="Free Profile Assessment" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Free Profile Assessment</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Free Profile Assessment")}>
          <Link href='/student/Free-Profile-Assessment' className="nav-link" title="Free Profile Assessment" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Free Profile Assessment</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "dashboard" ?
        <li className="nav-item " onClick={() => handleCurrentClick("dashboard")}>
          <Link href='/student/dashboard' className="nav-link current-tab" title="Dashboard" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Applied Application</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("dashboard")}>
          <Link href='/student/dashboard' className="nav-link" title="Dashboard" ><a>
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} /><span className="text-mob-hide">Applied Application</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "applicationProfile" ?
        <li className="nav-item" onClick={() => handleCurrentClick("applicationProfile")}>

          <Link href='/student/applicationProfile' className="nav-link current-tab" title="Application Profile"><a>
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faAddressBook} /><span className="text-mob-hide">Application Profile</span></span></a></Link>
        </li>
        :
        <li className="nav-item" onClick={() => handleCurrentClick("applicationProfile")}>

          <Link href='/student/applicationProfile' className="nav-link" title="Application Profile"><a>
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faAddressBook} /><span className="text-mob-hide">Application Profile</span></span></a></Link>
        </li>
      }
      {currentMenu === "document" ?
        <li className="nav-item " onClick={() => handleCurrentClick("document")}>
          <Link href='/student/document' className="nav-link current-tab" title="My Documents" ><a>
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faFile} /><span className="text-mob-hide">My Documents</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("document")}>
          <Link href='/student/document' className="nav-link" title="My Documents" ><a>
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faFile} /><span className="text-mob-hide">My Documents</span></span></a></Link>
        </li>
      }
      {currentMenu === "bookmark" ?
        <li className="nav-item " onClick={() => handleCurrentClick("bookmark")}>
          <Link href='/student/bookmark' className="nav-link current-tab" title="Bookmark"><a>
            <i className="fas fa-bookmark"></i>
            <span><FontAwesomeIcon icon={faBookmark} /><span className="text-mob-hide">Bookmark</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("bookmark")}>
          <Link href='/student/bookmark' className="nav-link" title="Bookmark"><a>
            <i className="fas fa-bookmark"></i>
            <span><FontAwesomeIcon icon={faBookmark} /><span className="text-mob-hide">Bookmark</span></span></a></Link>
        </li>
      }
      {currentMenu === "Message" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Message")}>
          <Link href='/student/message' className="nav-link current-tab" title="Message"

          ><a>
              <i className="fas fa-bookmark"></i>
              <span><FontAwesomeIcon icon={faEnvelope} /><span className="text-mob-hide">Messages</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Message")}>
          <Link href='/student/message' className="nav-link" title="Message"

          ><a>
              <i className="fas fa-bookmark"></i>
              <span><FontAwesomeIcon icon={faEnvelope} /><span className="text-mob-hide">Message</span></span></a></Link>
        </li>
      }
      {currentMenu === "Settings" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Settings")}>
          <Link href='/student/setting' className="nav-link current-tab" title="Settings"><a>
            <i className="fas fa-bookmark"></i>
            <span><FontAwesomeIcon icon={faCog} /><span className="text-mob-hide">Settings</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Settings")}>
          <Link href='/student/setting' className="nav-link" title="Settings"><a>
            <i className="fas fa-bookmark"></i>
            <span><FontAwesomeIcon icon={faCog} /><span className="text-mob-hide"> Settings</span></span></a></Link>
        </li>
      }


      <div className="text-center d-none d-md-inline">
        <button title="Sidenar-toggle" className="rounded-circle border-0" id="sidebarToggle" onClick={() => handletoogleClick()}>
          <i className="fa-solid fa-arrow-right"></i>
          <FontAwesomeIcon icon={faAngleLeft} style={{
            fontWeight: 900,
            marginRight: "0.1rem",
            color: "rgba(255, 255, 255, 0.5)"
          }} />
        </button>
      </div>
    </ul>

  )
}
export default StudentSidebar
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faBars, faUser, faDashboard, faUserCircle, faAngleLeft, faAddressBook, faBookmark, faCog, faEnvelope, faAward
} from '@fortawesome/free-solid-svg-icons';
const StudentDummy2 = () => {

  const [width, setwidth] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const [redirectToReferrer, setredirectToReferrer] = useState("false");
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [notification, setnotification] = useState([]);
  const [resultLength, setresultLength] = useState();
  const [studentEmail, setstudentEmail] = useState();
  const [studentId, setstudentId] = useState();
  const [currentMenu, setcurrentMenu] = useState("");
  const [studentName, setstudentName] = useState("");
  const [sidebarmobileShow, setsidebarmobileShow] = useState("");



  function handletoogleClick() {
    if (width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    }
  }
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
    var mounted = localStorage.getItem("studentToken")
    var studentEmail = localStorage.getItem("studentEmail")
    var studentName = localStorage.getItem("studentName")
    var studentId = localStorage.getItem("studentId")
    setMounted(mounted)
    setstudentEmail(studentEmail)
    setstudentName(studentName)

    setstudentId(studentId)

    if (localStorage.getItem("studentId")) {
      var mounted = localStorage.getItem("studentToken")
      var studentEmail = localStorage.getItem("studentEmail")
      var studentId = localStorage.getItem("studentId")
      setMounted(mounted)
      setstudentEmail(studentEmail)
      setstudentId(studentId)

   


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
  function handleNewtoogleClick() {

    if (sidebarmobileShow === "") {
      setsidebarmobileShow("dashboardSidebarDisplay")
    }
    else {
      setsidebarmobileShow("")
    }
  }

  return (
    <div className="studentLayout">
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="brand">
          <a href="https://www.codeavail.com/dashboard"></a><img src="https://www.codeavail.com/img/logo-dark.png" alt="CodeAvail Logo" className="img-responsive logo-only-mobile" />

        </div>
        <div id="navbar-menu">
          <ul className="nav">
            <li>

            </li>
            {/* <li className="dropdown">
                      <a title="Add Money to Wallet" href="https://www.codeavail.com/add-money" className="icon-menu">
                      <i className="fas fa-wallet"></i>
                      <span className="badge bg-danger">2</span>
                  </a>
              </li> */}
            <div className="logout-hovarable">
              <li id="msg_notification" className="dropdown"><a title="Notifaction" href="#" className="icon-menu" data-toggle="dropdown">
                <i className="fas fa-bell" />
                <FontAwesomeIcon className="sidebar-faicon" icon={faEnvelope} />
                <span className="badge bg-danger">10+</span></a>
                <ul className="dropdown-menu-right notifications  dropdown-content">

                </ul>
              </li>
            </div>
            {/*<li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="far fa-question-circle" ></i> <span>Help</span> <i className="icon-submenu lnr lnr-chevron-down"></i></a>
                  <ul className="dropdown-menu">
                      <li><a href="#">Basic Use</a></li>
                      <li><a href="#">Working With Data</a></li>
                      <li><a href="#">Security</a></li>
                      <li><a href="#">Troubleshooting</a></li>
                  </ul>
              </li>*/}
            <div className="logout-hovarable">

              <a className="nav-link dropdown-toggle" href="#collapseEleven" id="userDropdown" role="button" data-bs-toggle="collapse" aria-haspopup="true" aria-expanded="false">
                {/* <span>{studentName}fff</span> */}
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{studentName}</span>
                <FontAwesomeIcon className="sidebar-faicon" icon={faUser} />

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


             
            </div>
            {/* <li>
                  <a className="update-pro" href="https://www.themeineed.com/downloads/klorofil-pro-bootstrap-admin-dashboard-template/?utm_source=klorofil&utm_medium=template&utm_campaign=KlorofilPro" title="Upgrade to Pro" target="_blank"><i className="fa fa-rocket"></i> <span>UPGRADE TO PRO</span></a>
              </li> */}
          </ul>
        </div>
      </nav>
      <a href="#" className="mobile-menu"><span>
        <FontAwesomeIcon className="sidebar-faiconNew" icon={faBars} onClick={() => handleNewtoogleClick()} />
      </span> MENU</a>
      <div id="sidebar-nav" className={"sidebar mobile-show " + sidebarmobileShow} >
        <div className="sidebar-scroll">
          <div className="brand">
            <a href="https://www.codeavail.com/dashboard"><img src="https://www.codeavail.com/img/dashbord-logo.png" alt="CodeAvail Logo" className="img-responsive only-desktop" /></a>
          </div>
          <a href="https://www.codeavail.com/new-order" className="compose" title="Place New Order"><span><i className="fa fa-plus" title="Compose" aria-hidden="true" /><span className="sr-only">Compose</span></span><span className="mb-texthide">Ask Question</span></a>
          <nav>
            <ul className="nav">
              <li><a title="All Orders" href="https://www.codeavail.com/dashboard" className><i className="fa fa-tasks " aria-hidden="true" /><span>All Orders</span></a></li>
              <li><a title="In-process Orders" href="https://www.codeavail.com/in-process" className><i className="fa fa-spinner" aria-hidden="true" /><span>In-process Orders</span></a></li>
              <li><a title="Completed Orders" href="https://www.codeavail.com/completed" className><i className="fa fa-check-square " aria-hidden="true" /><span>Completed Orders</span></a></li>
              {/* <li><a title="Add Money" href="https://www.codeavail.com/add-money" className=""><i className="fa fa-retweet " aria-hidden="true"></i><span>Add Wallet Money</span></a></li> */}
              <li><a title="My Earning" href="https://www.codeavail.com/earn-money" className><i className="fas fa-dollar-sign " /><span>Refer &amp; Earn</span></a></li>
              <li><a title="Refer & Earn" href="https://www.codeavail.com/referral" className><i className="fa fa-retweet " aria-hidden="true" /><span>Become Partner</span></a></li>
              <li><a title="Settings" href="https://www.codeavail.com/settings" className><i className="fas fa-users-cog" /><span>Settings</span></a></li>
              <li><a title="Settings" href="https://courses.codeavail.com/" target="_blank"  rel="noreferrer" className><i className="fas fa-laptop-code" /><span>Online Courses</span></a></li>
              {/* <li><a title="Settings" href="https://www.codeavail.com/tracking_details"  className=""><i className="fa fa-history"></i><span>Tracking Details</span></a></li> */}
            </ul>				</nav>
        </div>
      </div>
    </div>
  )
}
export default StudentDummy2
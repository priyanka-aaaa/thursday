import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faAngleLeft, faSignOutAlt, faUser, faUsers, faPercent
} from '@fortawesome/free-solid-svg-icons';
const RecruitmentSidebar = () => {
  const [width, setwidth] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const [redirectToReferrer, setredirectToReferrer] = useState("false");
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [notification, setnotification] = useState([]);
  const [resultLength, setresultLength] = useState();
  const [agentEmail, setagentEmail] = useState();
  const [agentId, setagentId] = useState();
  const [currentMenu, setcurrentMenu] = useState("");
  function handletoogleClick() {
    if (width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled")
    }
    else {
      setwidth("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
    }
  }
  if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
  }
  useEffect(() => {

    var mounted = localStorage.getItem("agentToken")
    var agentEmail = localStorage.getItem("agentEmail")
    var agentId = localStorage.getItem("agentId")
    setMounted(mounted)
    setagentEmail(agentEmail)
    setagentId(agentId)

    if (localStorage.getItem("agentId")) {
      var mounted = localStorage.getItem("agentToken")
      var agentEmail = localStorage.getItem("agentEmail")
      var agentId = localStorage.getItem("agentId")
      setMounted(mounted)
      setagentEmail(agentEmail)
      setagentId(agentId)

      // const url = process.env.REACT_APP_SERVER_URL + 'agent/messagesUnread';
      // fetch(url, {
      //   method: 'GET',
      //   headers: { 'Authorization': mounted }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     if (data.notifications === undefined) {
      //       localStorage.removeItem("agentId");
      //       localStorage.removeItem("agentToken");
      //       localStorage.removeItem("agentName");
      //       localStorage.removeItem("agentEmail");
      //       window.location.href = "/";
      //     }
      //     var myresults = data.notifications


      //     setnotification(data.notifications)
      //     var resultLength = Object.keys(myresults).length
      //     setresultLength(resultLength)
      //   })



    }
    else {
      var agentEmail = "";
      setredirectToReferrer("true")
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("agent/")
    setcurrentMenu(splitcurrentUrl[1])
  }, [])

  function handleCurrentClick(value) {
    setcurrentMenu(value)
  }

  return (

    <ul className={width} id="accordionSidebar">

      {/* <div className="sidebar-brand-icon ">
                  CM
              </div> */}
      <span className="sidebar-brand d-flex align-items-center justify-content-center" >
        {width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" ?
          <Link href='/recruitment/dashboard'>
            <img src="/images/small-dash-logo.webp" alt="dev logo" />

          </Link>
          :
          <Link href='/recruitment/dashboard'  >

            <img src="/images/footerlogo.webp" alt="dev logo" />
          </Link>

        }
        <div className="sidebar-brand-text mx-3">
        </div>
      </span>
      <hr className="sidebar-divider my-0" />
      {currentMenu === "dashboard" ?
        <li className="nav-item" onClick={() => handleCurrentClick("dashboard")}>

          <Link href={'/recruitment/dashboard'} className="nav-link current-tab" title="Partner Team" ><a className="nav-link current-tab">
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faUsers} className="sidebar-faicon"/>Partner Team</span></a></Link>
        </li>
        : <li className="nav-item" onClick={() => handleCurrentClick("dashboard")}>

          <Link href={'/recruitment/dashboard'} className="nav-link " title="Partner Team" ><a className="nav-link current-tab">
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faUsers} className="sidebar-faicon"/>Partner Team</span></a></Link>
        </li>}
      {currentMenu === "addStudent" || currentMenu === "student" ?
        <li className="nav-item current-tab" onClick={() => handleCurrentClick("addStudent")}>
          <a className="nav-link collapsed" title="My Student" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <i className="fas fa-user-tie"></i>
            <span> <FontAwesomeIcon icon={faUser} className="sidebar-faicon"/>My Student </span>
          </a>
          <div id="collapseTwo" className="collapse" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link href={'/recruitment/addStudent'} className="collapse-item" title="Add Student"><a className="collapse-item">
                <span>Add Student</span></a></Link>
              <Link href={'/recruitment/student'} className="collapse-item" title="Student"><a className="collapse-item">
                <span>Student</span></a></Link>
            </div>
          </div>
        </li>
        :
        <li className="nav-item" onClick={() => handleCurrentClick("addStudent")}>
          <a className="nav-link collapsed" title="My Student" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <i className="fas fa-user-tie"></i>
            <span> <FontAwesomeIcon icon={faUser}  className="sidebar-faicon"/>My Student </span>
          </a>
          <div id="collapseTwo" className="collapse" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
            <div className="bg-white py-2 collapse-inner rounded">
              <Link href={'/agent/addStudent'} className="collapse-item" title="Add Student">
                <span>Add Student</span></Link>
              <Link href={'/agent/student'} className="collapse-item" title="Student">
                <span>Student</span></Link>
            </div>
          </div>

        </li>
      }
      {currentMenu === "profile" ?
        <li className="nav-item current-tab" onClick={() => handleCurrentClick("profile")}>
          <Link href={'/recruitment/profile'} className="nav-link" title="profile"><a className="nav-link">
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faPercent}  className="sidebar-faicon"/>Profile</span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("profile")}>
          <Link href={'/recruitment/profile'} className="nav-link" title="profile"><a className="nav-link">
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faPercent}  className="sidebar-faicon"/>Profile</span></a></Link>
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

  )
}
export default RecruitmentSidebar
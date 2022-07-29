import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faDashboard, faUserCircle, faUser, faAngleLeft, faAddressBook, faSetting, faCog, faEnvelope, faAward
} from '@fortawesome/free-solid-svg-icons';
const AdminSidebar = () => {
  const [width, setwidth] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const [redirectToReferrer, setredirectToReferrer] = useState("false");
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [notification, setnotification] = useState([]);
  const [resultLength, setresultLength] = useState();
  const [adminEmail, setadminEmail] = useState();
  const [adminId, setadminId] = useState();
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

    var mounted = localStorage.getItem("adminToken")
    var adminEmail = localStorage.getItem("adminEmail")
    var adminId = localStorage.getItem("adminId")
    setMounted(mounted)
    setadminEmail(adminEmail)
    setadminId(adminId)

    if (localStorage.getItem("adminId")) {
      var mounted = localStorage.getItem("adminToken")
      var adminEmail = localStorage.getItem("adminEmail")
      var adminId = localStorage.getItem("adminId")
      setMounted(mounted)
      setadminEmail(adminEmail)
      setadminId(adminId)
    }
    else {
      var adminEmail = "";
      setredirectToReferrer("true")
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("admin/")
    setcurrentMenu(splitcurrentUrl[1])
  }, [])

  function handleCurrentClick(value) {
    setcurrentMenu(value)
  }
  function logout() {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPhone");
    window.location.href = "/";
  }



  return (

    <ul className={width} id="accordionSidebar">

      {/* <div className="sidebar-brand-icon ">
                  CM
              </div> */}
      <span className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
        {width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" ?
          <Link href='/admin/dashboard' class="nav-link">
            <img src="/images/small-dash-logo.webp" alt="dev logo" />

          </Link>
          :
          <Link href='/admin/dashboard' class="nav-link" >

            <img src="/images/footerlogo.webp" alt="dev logo" />
          </Link>

        }
        <div className="sidebar-brand-text mx-3">
        </div>
      </span>
      <hr className="sidebar-divider my-0" />

      <li >
        <a className="nav-link collapsed" title="My Student" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <i className="fas fa-user-tie"></i>
          <span> <FontAwesomeIcon icon={faUser} />
            Users </span>
        </a>
        <div id="collapseTwo" className="collapse" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link href={'/admin/all-registered-user'} className="collapse-item" title="All Registered Users"><a className="collapse-item">
              <span>All Registered Users</span></a></Link>
            <Link href={'/admin/enquiry'} className="collapse-item" title="Enquiry Pop-UP"><a className="collapse-item">
              <span>Enquiry Pop-UP</span></a></Link>
            <Link href={'/admin/counseling'} className="collapse-item" title="Counseling Form"><a className="collapse-item">
              <span> Counseling Form</span></a></Link>
            <Link href={'/admin/registered-user'} className="collapse-item" title="Registered Students"><a className="collapse-item">
              <span>Registered Students</span></a></Link>

          </div>
        </div>
      </li>
      {currentMenu === "dashboard" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Dashboard")}>
          <Link href='/admin/dashboard' className="nav-link current-tab" title="Dashboard" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon"


            /><span className="text-mob-hide">Student Applications</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Dashboard")}>
          <Link href='/admin/dashboard' className="nav-link" title="Dashboard" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Student Applications</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "Recruitment Partner" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Recruitment Partner")}>
          <Link href='/admin/agent' className="nav-link current-tab" title="Recruitment Partner" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Recruitment Partner</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Recruitment Partner")}>
          <Link href='/admin/agent' className="nav-link" title="Recruitment Partner" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Recruitment Partner</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "dashboard" ?
        <li className="nav-item " onClick={() => handleCurrentClick("University")}>
          <Link href='/admin/university' className="nav-link current-tab" title="Dashboard" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">University</span>  </span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("University")}>
          <Link href='/admin/university' className="nav-link" title="Dashboard" ><a className="nav-link">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span> <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">University</span>  </span></a></Link>
        </li>
      }
      {currentMenu === "applicationStep" ?
        <li className="nav-item" onClick={() => handleCurrentClick("applicationStep")}>

          <Link href='/admin/applicationStep' className="nav-link current-tab" title="Application Step"><a className="nav-link">
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" /><span className="text-mob-hide">Application Step</span></span></a></Link>
        </li>
        :
        <li className="nav-item" onClick={() => handleCurrentClick("applicationStep")}>

          <Link href='/admin/applicationStep' className="nav-link" title="Application Step"><a className="nav-link">
            <i className="fas fa-file-alt"></i>
            <span><FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" /><span className="text-mob-hide">Application Step</span></span></a></Link>
        </li>
      }
      {currentMenu === "team" ?
        <li className="nav-item " onClick={() => handleCurrentClick("team")}>
          <Link href='/admin/team' className="nav-link current-tab" title="Partner team" ><a className="nav-link">
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faFile} className="sidebar-faicon" /><span className="text-mob-hide">Partner team</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("team")}>
          <Link href='/admin/team' className="nav-link" title="Partner team" ><a className="nav-link">
            <i className="fas fa-file-upload"></i>
            <span><FontAwesomeIcon icon={faFile} className="sidebar-faicon" /><span className="text-mob-hide">Partner team</span></span></a></Link>
        </li>
      }
      {currentMenu === "Setting" ?
        <li className="nav-item " onClick={() => handleCurrentClick("Setting")}>
          <Link href='/admin/setting' className="nav-link current-tab" title="Setting"><a className="nav-link">
            <i className="fas fa-Setting"></i>
            <span><FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Settings</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("Setting")}>
          <Link href='/admin/setting' className="nav-link" title="Setting"><a className="nav-link">
            <i className="fas fa-Setting"></i>
            <span><FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Settings</span></span></a></Link>
        </li>
      }
      {currentMenu === "offlineApplication" ?
        <li className="nav-item " onClick={() => handleCurrentClick("offlineApplication")}>
          <Link href='/admin/offlineApplication' className="nav-link current-tab" title="Offline Application"><a className="nav-link">
            <i className="fas fa-Setting"></i>
            <span><FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Offline Application</span></span></a></Link>
        </li>
        :
        <li className="nav-item " onClick={() => handleCurrentClick("offlineApplication")}>
          <Link href='/admin/offlineApplication' className="nav-link" title="Offline Application"><a className="nav-link">
            <i className="fas fa-Setting"></i>
            <span><FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" /><span className="text-mob-hide">Offline Application</span></span></a></Link>
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
export default AdminSidebar
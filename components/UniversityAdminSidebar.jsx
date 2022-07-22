import React, { useState, useEffect } from "react";
import axios from 'axios';
import Link from 'next/link'
import Image from 'next/image'
import { Dropdown } from 'react-bootstrap';
// import '../scss/dashboardSidebar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUniversity, faBook, faClock, faCog, faBars, faAngleLeft, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
const UniversityAdminSidebar = () => {
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

      const url = process.env.REACT_APP_SERVER_URL + 'admin/messagesUnread';
      fetch(url, {
        method: 'GET',
        headers: { 'Authorization': mounted }
      })
        .then(response => response.json())
        .then(data => {
          if (data.notifications === undefined) {
            localStorage.removeItem("adminId");
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminName");
            localStorage.removeItem("adminEmail");
            window.location.href = "/";
          }
          var myresults = data.notifications


          setnotification(data.notifications)
          var resultLength = Object.keys(myresults).length
          setresultLength(resultLength)
        })



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
      <span className="sidebar-brand d-flex align-items-center justify-content-center" >
        {width === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" ?
          <Link href='/admin/dashboard'  class="nav-link">
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
      {currentMenu === "dashboard" ?
                        <li className="nav-item"
                            onClick={() => handleCurrentClick("dashboard")}

                            data-toggle="tooltip" data-placement="right" title="University">
                            <Link href={'/universityAdmin/dashboard'} className="nav-link current-tab" ><a  className="nav-link current-tab">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faUniversity} />
                                <span>University</span></a></Link>
                        </li>
                        : <li className="nav-item"
                            onClick={() => handleCurrentClick("dashboard")}

                            data-toggle="tooltip" data-placement="right" title="University">
                            <Link href={'/universityAdmin/dashboard'} className="nav-link" ><a className="nav-link">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faUniversity} />
                                <span>University</span></a></Link>
                        </li>}
                    {currentMenu === "courses" ?
                        <li onClick={() => handleCurrentClick("courses")} className="nav-item" data-toggle="tooltip" data-placement="right" title="Coures Listing">
                            <Link href={'/universityAdmin/courses'} className="nav-link current-tab" data-toggle="tooltip" data-placement="right" title="Coures Listing"><a className="nav-link current-tab" >
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faBook}/>
                                <span>Courses Listing</span></a></Link>
                        </li> :
                        <li onClick={() => handleCurrentClick("courses")}

                            className="nav-item" data-toggle="tooltip" data-placement="right" title="Coures Listingn">
                            <Link href={'/universityAdmin/courses'} className="nav-link" data-toggle="tooltip" data-placement="right" title="Coures Listing"><a className="nav-link">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faBook} />
                                <span>Courses Listing</span></a></Link>
                        </li>
                    }
                    {currentMenu === "commission" ?
                        <li className="nav-item "

                            data-toggle="tooltip" data-placement="right" title="Set Commission">
                            <Link href={'/universityAdmin/commission'} className="nav-link current-tab" 
                                onClick={() => handleCurrentClick("commission")}><a className="nav-link current-tab" >
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faClock} />
                                <span >Commission</span></a></Link>
                        </li>

                        : <li className="nav-item " data-toggle="tooltip" data-placement="right" title="Set Commission">
                            <Link href={'/universityAdmin/commission'} className="nav-link" 
                                onClick={() => handleCurrentClick("commission")} ><a  className="nav-link" >
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faClock} />
                                <span >Commission</span></a></Link>
                        </li>}
                    {currentMenu === "summary" ?
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Summary Information"  >
                            <Link href={'/universityAdmin/summary'} className="nav-link current-tab" 
                                onClick={() => handleCurrentClick("summary")}  ><a className="nav-link current-tab" >
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faClock} />
                                <span >Summary Information</span></a></Link>
                        </li>
                        :
                        <li className="nav-item " data-toggle="tooltip" data-placement="right" title="Summary Information"
                        >
                            <Link href={'/universityAdmin/summary'} className="nav-link" 
                                onClick={() => handleCurrentClick("summary")}  ><a className="nav-link">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faClock} />
                                <span >Summary Information</span></a></Link>
                        </li>
                    }



                    {currentMenu === "setting" ?
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Setting"
                            onClick={() => handleCurrentClick("setting")}
                        >
                            <a className="nav-link current-tab" data-bs-toggle="collapse" href="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faCog} />
                                <span>Settings </span>
                            </a>
                            <div id="collapseTen" className="collapse" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
                                <div className="bg-white py-2 collapse-inner rounded">

                                    <Link href={'/universityAdmin/intake'} className="collapse-item" >
                                        <span>Intake</span></Link>
                                </div>
                            </div>
                        </li>
                        :
                        <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Setting"
                            onClick={() => handleCurrentClick("setting")}
                        >
                            <a className="nav-link collapsed" data-bs-toggle="collapse" href="#collapseTen" aria-expanded="false" aria-controls="collapseTen">
                                <FontAwesomeIcon   className="sidebar-faicon" icon={faCog} />
                                <span>Settings </span>
                            </a>
                            <div id="collapseTen" className="collapse" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
                                <div className="bg-white py-2 collapse-inner rounded">
                                    <Link href={'/universityAdmin/intake'} className="collapse-item" >
                                        <span>Intake</span></Link>
                                </div>
                            </div>
                        </li>


                    }
 


      <div className="text-center d-none d-md-inline">
        <button title="Sidenar-toggle" className="rounded-circle border-0" id="sidebarToggle" onClick={() => handletoogleClick()}>
          <i className="fa-solid fa-arrow-right"></i>
          <FontAwesomeIcon   className="sidebar-faicon" icon={faAngleLeft}  style={{
            fontWeight: 900,
            marginRight: "0.1rem",
            color: "rgba(255, 255, 255, 0.5)"
          }} />
        </button>
      </div>
    </ul>

  )
}
export default UniversityAdminSidebar
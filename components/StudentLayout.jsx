import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faBars, faUser, faDashboard, faStar, faAddressBook, faCog, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
const StudentLayout = () => {
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [studentEmail, setstudentEmail] = useState();
  const [studentId, setstudentId] = useState();
  const [currentMenu, setcurrentMenu] = useState("");
  const [sidebarmobileShow, setsidebarmobileShow] = useState("");
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
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
    }
    else {
      Router.push("/");
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("student/")
    
    setcurrentMenu(splitcurrentUrl[1])
  }, [])

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
          <Link href="https://coursementor.com/">
          <img src="/images/logo2.webp" alt="coursemetnor Logo" className="img-responsive logo-only-mobile" /></Link>
        </div>
        <div id="navbar-menu">
          <ul className="nav">
            <li>
            </li>
            <div className="logout-hovarable">
              <a className="nav-link dropdown-toggle" href="#collapseEleven" id="userDropdown" role="button" data-bs-toggle="collapse" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{studentEmail}</span>
                <FontAwesomeIcon className="sidebar-faicon" icon={faUser} />
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
          </ul>
        </div>
      </nav>
      <a href="#" className="mobile-menu"><span>
        <FontAwesomeIcon className="sidebar-faiconNew" icon={faBars} onClick={() => handleNewtoogleClick()} />
      </span> MENU</a>
      <div id="sidebar-nav" className={"sidebar mobile-show " + sidebarmobileShow} >
        <div className="sidebar-scroll">
          <div className="brand">
            <Link href="https://coursementor.com/"><a>

              <img src="/images/footerlogo.webp" alt="coursemetnor Logo" className="img-responsive only-desktop" /></a></Link>
          </div>

          <nav>
            <ul className="nav">
            {currentMenu === "search-courses" ?
              <li className="sidecurrentMenu">
                <Link href='/student/search-courses'><a title="Explore Courses">
                  <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                  <span>Explore Courses</span>
                </a></Link>
              </li>
              :
              <li >
              <Link href='/student/search-courses'><a title="Explore Courses">
                <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                <span>Explore Courses</span>
              </a></Link>
            </li>}
            {currentMenu === "Free-Profile-Assessment" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/Free-Profile-Assessment'><a title="Free Profile Assessment">
                  <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                  <span>Free Profile Assessment</span>
                </a></Link>
              </li>
              :
              <li >
              <Link href='/student/Free-Profile-Assessment'><a title="Free Profile Assessment">
                <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                <span>Free Profile Assessment</span>
              </a></Link>
            </li>}
            {currentMenu === "dashboard" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/dashboard'><a title="Applied Application">
                  <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                  <span>Applied Application(s)</span>
                </a></Link>
              </li>:
               <li >
               <Link href='/student/dashboard'><a title="Applied Application">
                 <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                 <span>Applied Application(s)</span>
               </a></Link>
             </li>}
             {currentMenu === "applicationProfile" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/applicationProfile'><a title="My Application Profile">
                  <FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" />
                  <span>My Application Profile</span>
                </a></Link>
              </li>:
              <li >
              <Link href='/student/applicationProfile'><a title="My Application Profile">
                <FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" />
                <span>My Application Profile</span>
              </a></Link>
            </li>}
            {currentMenu === "document" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/document'><a title="My Documents">
                  <FontAwesomeIcon icon={faFile} className="sidebar-faicon" />
                  <span>My Documents</span>
                </a></Link>
              </li>: <li >
                <Link href='/student/document'><a title="My Documents">
                  <FontAwesomeIcon icon={faFile} className="sidebar-faicon" />
                  <span>My Documents</span>
                </a></Link>
              </li>}
              {currentMenu === "bookmark" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/bookmark'><a title="Favourites">
                  <FontAwesomeIcon icon={faStar} className="sidebar-faicon" />
                  <span>Favourites</span>
                </a></Link>
              </li>:
               <li >
               <Link href='/student/bookmark'><a title="Favourites">
                 <FontAwesomeIcon icon={faStar} className="sidebar-faicon" />
                 <span>Favourites</span>
               </a></Link>
             </li>}
             {currentMenu === "message" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/message'><a title="Messages">
                  <FontAwesomeIcon icon={faEnvelope} className="sidebar-faicon" />
                  <span>Messages</span>
                </a></Link>
              </li>:
              <li >
                <Link href='/student/message'><a title="Messages">
                  <FontAwesomeIcon icon={faEnvelope} className="sidebar-faicon" />
                  <span>Messages</span>
                </a></Link>
              </li>}
              {currentMenu === "setting" ?
              <li  className="sidecurrentMenu">
                <Link href='/student/setting'><a title="Settings">
                  <FontAwesomeIcon icon={faCog} className="sidebar-faicon" />
                  <span>Settings</span>
                </a></Link>
              </li>:
              <li >
              <Link href='/student/setting'><a title="Settings">
                <FontAwesomeIcon icon={faCog} className="sidebar-faicon" />
                <span>Settings</span>
              </a></Link>
            </li>}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default StudentLayout
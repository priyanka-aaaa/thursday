import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Router from "next/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt, faFile, faBars, faUser, faDashboard, faStar, faAddressBook, faCog, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
const AdminLayout = () => {
  const [mounted, setMounted] = useState();
  const [email, setemail] = useState();
  const [adminEmail, setadminEmail] = useState();
  const [adminId, setadminId] = useState();
  const [currentMenu, setcurrentMenu] = useState("");
  const [sidebarmobileShow, setsidebarmobileShow] = useState("");
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
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
      Router.push("/");
    }
    var currentUrl = window.location.href;
    var splitcurrentUrl = currentUrl.split("admin/")

    setcurrentMenu(splitcurrentUrl[1])
  }, [])

  function logout() {
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPhone");
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
          <a href="https://www.codeavail.com/dashboard"></a>
          <img src="/images/logo2.webp" alt="coursemetnor Logo" className="img-responsive logo-only-mobile" />
        </div>
        <div id="navbar-menu">
          <ul className="nav">
            <li>
            </li>
            <div className="logout-hovarable">
              <a className="nav-link dropdown-toggle" href="#collapseEleven" id="userDropdown" role="button" data-bs-toggle="collapse" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">{adminEmail}</span>
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
            <a href="https://www.codeavail.com/dashboard">

              <img src="/images/footerlogo.webp" alt="coursemetnor Logo" className="img-responsive only-desktop" /></a>
          </div>

          <nav>
            <ul className="nav">
              <li >
                <a className="nav-link collapsed" title="My Student" data-bs-toggle="collapse" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  <i className="fas fa-user-tie"></i>
                  <span> <FontAwesomeIcon icon={faUser} />
                    Users </span>
                </a>
                <div id="collapseTwo" className="collapse user-collpase" data-bs-parent="#accordion" data-parent="#accordionSidebar" >
                  <div className="user-submenu">
                    <Link href='/admin/all-registered-user'><a title="Student Applications" >

                      <span>All Registered Users</span>
                    </a></Link><br />
                    <Link href='/admin/enquiry'><a title="Student Applications">

                      <span>Enquiry Pop-UP</span>
                    </a></Link><br />
                    <Link href='/admin/counseling'><a title="Student Applications">

                      <span>Counseling Form</span>
                    </a></Link><br />
                    <Link href='/admin/registered-user'><a title="Student Applications">
                      <span>Registered Students</span>
                    </a></Link>
                  </div>
                </div>
              </li>
              {currentMenu === "dashboard" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/dashboard'><a title="Student Applications">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Student Applications</span>
                  </a></Link>
                </li>
                :
                <li >
                  <Link href='/admin/dashboard'><a title="Student Applications">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Student Applications</span>
                  </a></Link>
                </li>}
              {currentMenu === "agent" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/agent'><a title="Recruitment Partner">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Recruitment Partner</span>
                  </a></Link>
                </li>
                :
                <li >
                  <Link href='/admin/agent'><a title="Recruitment Partner">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Recruitment Partner</span>
                  </a></Link>
                </li>}
              {currentMenu === "university" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/university'><a title="Applied Application">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>University</span>
                  </a></Link>
                </li> :
                <li >
                  <Link href='/admin/university'><a title="Applied Application">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>University</span>
                  </a></Link>
                </li>}
              {currentMenu === "applicationStep" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/applicationStep'><a title="Application Step">
                    <FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" />
                    <span>Application Step</span>
                  </a></Link>
                </li> :
                <li >
                  <Link href='/admin/applicationStep'><a title="Application Step">
                    <FontAwesomeIcon icon={faAddressBook} className="sidebar-faicon" />
                    <span>Application Step</span>
                  </a></Link>
                </li>}
              {currentMenu === "team" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/team'><a title="Partner team">
                    <FontAwesomeIcon icon={faFile} className="sidebar-faicon" />
                    <span>Partner team</span>
                  </a></Link>
                </li> : <li >
                  <Link href='/admin/team'><a title="Partner team">
                    <FontAwesomeIcon icon={faFile} className="sidebar-faicon" />
                    <span>Partner team</span>
                  </a></Link>
                </li>}
              {currentMenu === "setting" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/setting'><a title="Settings">
                    <FontAwesomeIcon icon={faStar} className="sidebar-faicon" />
                    <span>Settings</span>
                  </a></Link>
                </li> :
                <li >
                  <Link href='/admin/setting'><a title="Settings">
                    <FontAwesomeIcon icon={faStar} className="sidebar-faicon" />
                    <span>Settings</span>
                  </a></Link>
                </li>}
              {currentMenu === "offlineApplication" ?
                <li className="sidecurrentMenu">
                  <Link href='/admin/offlineApplication'><a title="Offline Application">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Offline Application</span>
                  </a></Link>
                </li> :
                <li >
                  <Link href='/admin/offlineApplication'><a title="Offline Application">
                    <FontAwesomeIcon icon={faDashboard} className="sidebar-faicon" />
                    <span>Offline Application</span>
                  </a></Link>
                </li>}

            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
export default AdminLayout
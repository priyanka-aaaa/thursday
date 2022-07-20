import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'
import {
  faPlus, faTrash, faPen, faAngleDown, faAngleUp, faBars, faSearch, faClose, faArrowRight

} from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
const Header = () => {
  const [textflag, settextflag] = useState("-500px");
  const [display, setdisplay] = useState("");
  const [mobiledisplay, setmobiledisplay] = useState("none");
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [redirectToReferrer, setredirectToReferrer] = useState("false");
  const [slug, setslug] = useState("");

  const [coursedisplay, setcoursedisplay] = useState("none");
  const [searchdisplay, setsearchdisplay] = useState("");
  const [searchData, setsearchData] = useState([]);
  // const [searchData, setsearchData] = useState([]);
  const [country, setcountry] = useState("");



  const [showModal, setshowModal] = useState(false);
  // const [profileState, setProfileState] = useState(props);
  // useEffect(() => {
  //     setProfileState(props);
  // }, [props]);

  useEffect(() => {
    // const url1 = process.env.REACT_APP_SERVER_URL + 'suggestion'
    // fetch(url1, {
    //   method: 'get',
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     var myDatabaseValue = data.suggestion
    //     setsearchData(myDatabaseValue)
    //   })

  }, [])
  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setWordEntered(searchWord);

    const url1 = process.env.REACT_APP_SERVER_URL + 'suggestion'
    fetch(url1, {
      method: 'get',
    })
      .then(response => response.json())
      .then(data => {
        var myDatabaseValue = data.suggestion
        setsearchData(myDatabaseValue)

        const newFilter = myDatabaseValue.filter((value) => {
          return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
          setFilteredData([]);
        } else {
          setFilteredData(newFilter);
        }
      })





  };


  // or
  function handleAdd(value, type, slug) {
    setWordEntered(value)
    if (type === "School") {
      // window.location = '/schools/'+slug;
      setredirectToReferrer("true")
      setslug(slug)
    }

    else {
      setcoursedisplay("block")
      setsearchdisplay("none")
    }

  }
  function open() {
    setshowModal(true)
  }
  function close() {
    setshowModal(false)
  }

  function ToggleButton() {


    if (profileState.name == "-500px") {
      setProfileState({ name: "0px" })
    }
    else {
      setProfileState({ name: "-500px" })
    }

    if (textflag == "-500px") {
      settextflag("0px")
    }
    else {
      settextflag("-500px")
    }
  }
  function ToggleTwoButton() {
    if (mobiledisplay === "none") {
      setmobiledisplay("inline")
    }
    else {
      setmobiledisplay("none")

    }
  }
  return (
    <header id="rs-header" className="rs-header style3 modify1">
      <div className="menu-area menu-sticky">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-2 col-lg-2">
              <div className="logo-part">
                <Link href="/" title="Coursementor"
                >
                  <img layout="fill" unoptimized={true} src="/images/logo.webp" alt="" loading="lazy" />
                </Link>


              </div>
              <div className="mobile-menu">
                <a className="rs-menu-toggle rs-menu-toggle-close secondary" onClick={() => ToggleTwoButton()}>
                  {/* <i className="fa fa-bars" /> */}
                  <FontAwesomeIcon icon={faBars} />

                </a>
              </div>
            </div>

            <div className="col-md-10 col-lg-10 text-right"  >
              <div className="rs-menu-area" >
                {/* start mobile navbar */}
                <div className="main-menu mobile" style={{ display: mobiledisplay }}>
                  <nav className="rs-menu pr-86 lg-pr-50 md-pr-0">
                    <ul className="nav-menu">

                      <li><a target="_blank" rel="noreferrer" className="menu-item-has-children current-menu-item" href="https://study.coursementor.com/dashboard/" title="Schools">
                        <span className='icon'><i className="fal fa-university fa-fw" ></i></span>Learn
                      </a>
                      </li>

                      <li><Link href='/School' className="nav-link" title="Schools">
                        Schools</Link>
                      </li>
                      <li><Link href='/Recruitment' className="nav-link" title="Recruitment Partners">
                        Recruitment Partners yhhhh</Link>
                      </li>
                      <li><Link href='/' title="Students">
                        Students </Link>
                      </li>
                      <li className='mr-3'>
                        <Link href='/' className="btn outline-website-btn" title="Login">Login</Link>
                      </li>
                      <li>
                        <Link href='/StudentRegister' className="btn website-btn" title="Register">Register</Link>


                      </li>


                    </ul> {/* //.nav-menu */}

                  </nav>

                </div>
                {/* end mobile navbar */}
                {/* start desktop navbar */}
                <div className="main-menu desktop" style={{ display: display }}>
                  <nav className="rs-menu pr-86 lg-pr-50 md-pr-0">
                    <ul className="nav-menu">
                      
                    <li><Link href='/evaluation' title="evaluation">
                    Free Profile Assessment</Link>
                      </li>
                      <li><a className="menu-item-has-children current-menu-item" href="https://study.coursementor.com/dashboard/" title="Learn" target="_blank" rel="noreferrer">
                        <span className='icon'><i className="fal fa-university fa-fw" ></i></span>Learn
                      </a>
                      </li>


                      <li><Link href='/School' title="School">
                        Schools</Link>
                      </li>

                      <li><Link href='/Recruitment' className="nav-link" title="Recruitment Partners">
                        Recruitment Partners </Link>
                      </li>
                      <li><Link href='/' title="Students">
                        Students</Link>
                      </li>

                     

                    </ul>

                  </nav>
                </div>

                <div className="homedropdown dropdown dropdown-menu-end my-account"><a className="" href="https://abroad.coursementor.com/StudentRegister" data-bs-toggle="dropdown" title="Login or signup to access your dashboard"> <img layout="fill" src="/images/user-profile.png" alt="" unoptimized={true} loading="lazy" /></a>
                  <div className="dropdown-menu ">
                    <h5>Dashboard</h5>
                    <p>Login or signup to access your dashboard</p>
                    <Link className="dropdown-item btn btn-login" href="https://abroad.coursementor.com/StudentLogin">Login</Link>
                    <Link className="dropdown-item btn btn-register" href="https://abroad.coursementor.com/StudentRegister">Register</Link>

                  </div>
                </div>

                {/* end desktop navbar */}
                <div className="expand-btn-inner search-icon ">
                  <ul>
                    <li className="sidebarmenu-search">

                      <a onClick={() => open()} className="frontend-main-search" title="Enter course, college, exam or destination">
                        <FontAwesomeIcon icon={faSearch} /></a>
                    </li>
                    <li>

                      <a title="Contact Detail" id="nav-expander" className="humburger nav-expander" onClick={() => ToggleButton()}
                      >

                        <span className="dot1" />
                        <span className="dot2" />
                        <span className="dot3" />
                        <span className="dot4" />
                        <span className="dot5" />
                        <span className="dot6" />
                        <span className="dot7" />
                        <span className="dot8" />
                        <span className="dot9" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
      {/* Menu End */}
      {/* start for toogle */}

      <nav className="right_menu_togle "  >
        <div className="close-btn">
          <div className="nav-link">
            <a title="close" id="nav-close" className="humburger nav-expander" onClick={() => ToggleButton()} >
              <span className="dot1" />
              <span className="dot2" />
              <span className="dot3" />
              <span className="dot4" />
              <span className="dot5" />
              <span className="dot6" />
              <span className="dot7" />
              <span className="dot8" />
              <span className="dot9" />
            </a>
          </div>
        </div>

        <ul className="mobilemenu">
          {/* <a className="btn-search " href="https://abroad.coursementor.com/search-study-abroad-program"><span><FontAwesomeIcon icon={faSearch} /></span>Search for universities & courses</a> */}
          <h5>Site Map</h5>
          <li><a href="https://study.coursementor.com/">Learn</a></li>
          <li><a href="https://abroad.coursementor.com/School">Schools</a></li>
          <li><a href="https://abroad.coursementor.com/Recruitment">Recruitment
            Partners</a>
          </li>
          <li><a href="https://abroad.coursementor.com/students">Students</a></li>
        </ul>
        <div className="canvas-logo">
          <a href="index.html">
            <img layout="fill" src="/images/logo.webp" unoptimized={true} alt="logo" loading="lazy" /></a>
        </div>
        <div className="offcanvas-text">
          <p>Get the full-stack career guidance, study abroad with the best university match & live mentoring platform that matches students with the right courses, mentors and job opportunities.
          </p>
        </div>
        <div className="canvas-contact">
          <div className="address-area">
            <div className="address-list">
              <div className="info-icon">
                <i className="flaticon-location" />
              </div>
              <div className="info-content">
                <h4 className="title">Address</h4>
                <em>Sector7 Kurukshetra, Haryana 136118</em>
              </div>
            </div>
            <div className="address-list">
              <div className="info-icon">
                <i className="flaticon-email" />
              </div>
              <div className="info-content">
                <h4 className="title">Email</h4>
                <em><a href="mailto:hello@coursementor.com/">hello@coursementor.com</a></em>
              </div>
            </div>
            <div className="address-list">
              <div className="info-icon">
                <i className="flaticon-call" />
              </div>
              <div className="info-content">
                <h4 className="title">Phone</h4>
                <em>+91 81990 04747
                </em>
              </div>
            </div>
          </div>
          <ul className="social">
            <li><a ><i className="fa fa-facebook" /></a></li>
            <li><a ><i className="fa fa-twitter" /></a></li>
            <li><a ><i className="fa fa-instagram" /></a></li>
          </ul>
        </div>
      </nav>
      {/* end for toogle */}
      {/* start for search model */}


      <Modal dialogclassName="custom-modal" className="modal-container custom-map-modal search-modal" id="front-search-modal"
        show={showModal}
        onHide={() => close()}

        animation={true}
      >
        <button type="button" className="close" onClick={() => close()}  >

          <FontAwesomeIcon icon={faClose} onClick={() => close()} />
          <span className="flaticon-cross" />
        </button>
        <div className="">
          <div className="modal-content">
            <div className="search-block clearfix">
              <form>
                <div className="form-group mt-3">
                  <label>Search</label>
                  {/* start search bar */}
                  {redirectToReferrer === "true" ? <>bbb
                    {/* //   <Redirect href='/schools/' + slug /> */}
                  </>
                    :
                    <div className="search">

                      {/* start for after search suggestion */}
                      <div className="row" style={{ display: coursedisplay }}>
                        <div className="col-md-12">
                          <div className="searchInputs">
                            {/* <span> <FontAwesomeIcon icon={faSearch} /></span> */}
                            <input
                              type="text"
                              placeholder="Enter course, college, exam or destination"
                              value={wordEntered}
                              onChange={handleFilter}
                            />
                            <div className="searchIcon">
                              {filteredData.length === 0 ? (

                                <input type="text" />
                              ) : (
                                <>
                                  <a
                                    //  onClick={() => open()}
                                    className="frontend-main-search">
                                    {/* <FontAwesomeIcon icon={faSearch} /> */}
                                  </a>
                                </>

                                // <CloseIcon id="clearBtn" onClick={clearInput} />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
                          <select className="form-control" name="country" placeholder="Location"
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}>


                            <option value="">Location</option>
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="New Zealand" >New Zealand</option>
                            <option value="Germany" >Germany</option>
                            <option value="Canada" >Canada</option>
                            <option value="Cyprus" >Cyprus</option>


                          </select>
                        </div>
                      </div>
                      {/* end for after search suggestion */}
                      <div className="searchInputs" style={{ display: searchdisplay }}>
                        <span> <FontAwesomeIcon icon={faSearch} /></span>
                        <input
                          type="text"
                          placeholder="Enter course, college, exam or destination"
                          value={wordEntered}
                          onChange={handleFilter}
                        />
                        <div className="searchIcon x">
                          {filteredData.length === 0 ? (

                            <input type="text" />
                          ) : (
                            <>
                              <a
                                //  onClick={() => open()}
                                className="frontend-main-search x">
                                <FontAwesomeIcon icon={faSearch} /></a>
                            </>

                            // <CloseIcon id="clearBtn" onClick={clearInput} />
                          )}
                        </div>
                      </div>
                      <div className="search-country">

                      </div>
                      {filteredData.length != 0 && (
                        <div className="dataResult" style={{ display: searchdisplay }}>
                          {filteredData.slice(0, 15).map((value, key) => {
                            return (

                              <p className="search-suggestion" key={value} onClick={() => handleAdd(value.name, value.type, value.slug)}> {value.name} <span className="suggession-type">{value.type}</span></p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  }
                  {/* end search bar */}
                  <button className="btn-search">Search <span><FontAwesomeIcon icon={faArrowRight} /></span></button>
                </div>
              </form>
              <div className="top-country mt-5">
                <h3>Popular Destinations</h3>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 md-mb-50">
                    <div className="addon-process">
                      <Link href='/study-in-australia' className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">
                            <a >
                              <img layout="fill" src="/images/process1.webp"
                                alt="" unoptimized={true} loading="lazy" />
                            </a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">Australia</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 md-mb-50">
                    <div className="addon-process">
                      <Link href='/study-in-canada' className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">
                            <a ><img layout="fill" src="/images/process2.webp" alt="" unoptimized={true} loading="lazy" /></a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">Canada</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="addon-process">
                      <Link href='/study-in-uk' className="process-wrap" onClick={() => close()}>

                        <div className="process-wrap">
                          <div className="process-img">
                            <a ><img layout="fill" src="/images/process3.webp" alt="" unoptimized={true} loading="lazy" /></a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">United Kingdom</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="addon-process">
                      <Link href='/study-in-usa' className="process-wrap" onClick={() => close()}>

                        <div className="process-wrap">
                          <div className="process-img">
                            <a ><img layout="fill" src="/images/process-4.webp" alt="" unoptimized={true} loading="lazy" /></a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">United States</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="top-country mt-5">
                <h3>Popular Tests</h3>
                <div className="row">
                  <div className="col-lg-3 col-sm-6 md-mb-50">
                    <div className="addon-process">
                      <a href="https://coursementor.com/ielts" className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">

                            <a href="https://coursementor.com/ielts">

                              <img layout="fill" src="/images/ielts.webp" alt="" unoptimized={true} loading="lazy" />
                            </a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">IELTS</h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6 md-mb-50">
                    <div className="addon-process">
                      <a href="https://coursementor.com/gmat" className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">
                            <a href="https://coursementor.com/gmat">

                              <img layout="fill" src="/images/gmat.webp" alt="" unoptimized={true} loading="lazy" />
                            </a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">GMAT</h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="addon-process">
                      <a href="https://coursementor.com/gre" className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">
                            <a href="https://coursementor.com/gre">

                              <img layout="fill" src="/images/gre.webp" alt="" unoptimized={true} loading="lazy" />
                            </a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">GRE</h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-6">
                    <div className="addon-process">
                      <a href="https://coursementor.com/sat" className="process-wrap" onClick={() => close()}>
                        <div className="process-wrap">
                          <div className="process-img">
                            <a href="https://coursementor.com/sat">

                              <img layout="fill" src="/images/sat.webp" alt="" unoptimized={true} loading="lazy" />

                            </a>
                          </div>
                          <div className="process-text">
                            <h3 className="title">SAT</h3>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* end for search model */}
    </header>
  )
}
export default Header;

import React, { useState, useEffect, Suspense } from "react";
import { isValidPhoneNumber } from 'react-phone-number-input'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import { Footer } from '../components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import Header from '../components/Header';
import EnquiryModal from '../components/EnquiryModal';
import parse from 'html-react-parser'
// import StudentForgotPass from './StudentForgotPass'
// import LoaderFrontend from './LoaderFrontend';
import SweetAlert from 'react-bootstrap-sweetalert';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Slider from "react-slick";
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tabs, Tab } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input'
import {
  faAngleRight, faFile,
  faStar, faGraduationCap, faCalendarCheck, faPhone,
  faEnvelope, faGlobe, faCheckCircle, faAngleDown, faAngleUp, faHistory

} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF, faGoogle, faTwitter, faFacebook,
  faPinterest, faInstagram
} from "@fortawesome/free-brands-svg-icons";
const Study = () => {
  const [UniveristyValues, setUniveristyValues] = useState([{
    universityPrimaryInformation: "", universityOverview: "", universityImage: "", _id: "", slug: ""
  }])
  const [enquiryname, setenquiryname] = useState("");
  const [enquiryemail, setenquiryemail] = useState("");
  const [enquiryphone, setenquiryphone] = useState("");
  const [enquiryservice, setenquiryservice] = useState("");
  const [enquirycountry, setenquirycountry] = useState("");
  const [enquiryphoneError, setenquiryphoneError] = useState("");
  const [enquiryemailError, setenquiryemailError] = useState("");
  const [activeValue, setactiveValue] = useState("fast");
  const [articleStructuredData, setarticleStructuredData] = useState("");

  const [blogData, setblogData] = useState([{
    link: "",
    content: [{ rendered: "" }],
    title: [{ rendered: "" }],
    _embedded: [{ 'wp:featuredmedia': [{ source_url: "" }] }]

  }])

  // const PhoneInput = React.lazy(() => import('react-phone-number-input'));


  const [displayPrpoerty, setdisplayPrpoerty] = useState("inline");
  const [data, setdata] = useState([]);
  const [allGroupsUserSpecific, setallGroupsUserSpecific] = useState([]);
  const [showModal, setshowModal] = useState(false);
  const [showModalEnquiry, setshowModalEnquiry] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");

  const [key, setKey] = useState('After 12th / UG');
  const [passwordError, setpasswordError] = useState();
  const [wrongPassword, setwrongPassword] = useState("");
  const [wrongUsername, setwrongUsername] = useState("");
  const [studentToken, setstudentToken] = useState();
  const [submitSuccess, setsubmitSuccess] = useState("0");
  const [successMessage, setsuccessMessage] = useState("");
  const [showSweetAlert, setshowSweetAlert] = useState("0");
  const [showLoginSweetAlert, setshowLoginSweetAlert] = useState("0");
  const [loader, setmyloader] = useState("false");
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  useEffect(() => {

    window.scrollTo(0, 0)
    const articleStructuredData = {
      "@context": "https://schema.org", "@type": "FAQPage", "mainEntity":
        [{ "@type": "Question", "name": "How much does it cost to study in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "The total cost of studying in Austat level of country are you lookralia varies across courses and universities. The average tuition fees for UG courses is $15,000 to $33,000 (INR 11,15,332- 24,53,731 and PG courses is $20,000 to $37,000 (INR 14,87,150- 27,51,153)" } }, { "@type": "Question", "name": "How do you get PR in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "Points determine one’s eligibility for a PR visa. You must score at least 65 points under the Point’s Grid. The categories to achieve points include age, skills, education, experience, language, and sponsorships." } }, { "@type": "Question", "name": "How much does a student earn in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "Points determine one’s eligibility for a PR visa. You must score at least 65 points under the Point’s Grid. The categories to achieve points include age, skills, education, experience, language, and sponsorships." } }, { "@type": "Question", "name": "Which is the best course to study in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "Being the biggest technology hub, Canada is known for courses like Engineering, Data Science, and Electronics. Apart from these, other popular courses include Business Management, Medicine, Architecture, and Accounting." } }, { "@type": "Question", "name": "Which is the best university to study in Canada?", "acceptedAnswer": { "@type": "Answer", "text": "The following are the top-ranked universities in Canada." } }]
    };
    setarticleStructuredData(articleStructuredData)
    const url2 = "https://www.coursementor.com/blog/wp-json/wp/v2/posts?per_page=3&_embed";
    fetch(url2, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data2 => {
        setblogData(data2)
      })

    const url1 = process.env.REACT_APP_SERVER_URL + 'universityCountry/Canada';
    fetch(url1, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data1 => {
        var myresultsUniversity = data1.universities;

        setUniveristyValues(data1.universities)
        if (Object.keys(myresultsUniversity).length > 3) {
          var universityLength = 3
        }
        else {
          var universityLength = Object.keys(myresultsUniversity).length
        }


        if (localStorage.getItem("studentToken")) {
          var studentToken = localStorage.getItem("studentToken")
          setstudentToken(studentToken)
          const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
          fetch(url, {
            method: 'GET',
            headers: { 'Authorization': studentToken }
          })
            .then(response => response.json())
            .then(data => {
              setdata(data.studentBookmarks)
              var resultstudentBookmarks = data.studentBookmarks
              let followingIds = resultstudentBookmarks.map(group => group.universityID);
              let allGroupsUserSpecific1 = myresultsUniversity.map(group => (
                { ...group, following: followingIds.includes(group._id) })
              );
              setallGroupsUserSpecific(allGroupsUserSpecific1)
            })
        }
        else {
          var allGroupsUserSpecific1 = data1.universities
          setallGroupsUserSpecific(allGroupsUserSpecific1)
        }
      })
  }, [])
  function open() {
    setshowModal(true)
  }
  function close() {
    setshowModal(false)
  }
  function openEnquiry() {
    setenquiryemailError("")
    setshowModalEnquiry(true)
  }
  function closeEnquiry() {
    setshowModalEnquiry(false)
  }
  function handlesecondNavbar(value) {
    setactiveValue(value)
  }
  function handleSubmit(event) {
    setemailError("");
    setpasswordError("");
    setwrongUsername("")
    setwrongPassword("")
    event.preventDefault();
    if (email === "") {
      setemailError("Please enter email");
    }
    if (password === "") {
      setPassword("Please enter password");
    }
    else {
      setmyloader("true")
      const obj = {
        email: email,
        password: password
      };
      var myurl = process.env.REACT_APP_SERVER_URL;
      axios.post(myurl + 'student/login', obj)
        .then(result => {
          let responseJson = result;
          setmyloader("false")
          if (responseJson.data.success === true) {
            setshowModal(false)
            localStorage.setItem('studentId', responseJson.data.student._id);
            localStorage.setItem('studentToken', responseJson.data.token);
            localStorage.setItem('studentName', responseJson.data.student.name);
            localStorage.setItem('studentEmail', responseJson.data.student.email);
            setshowLoginSweetAlert("1")
            setstudentToken(responseJson.data.token)
            const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
            fetch(url, {
              method: 'GET',
              headers: { 'Authorization': responseJson.data.token }
            })
              .then(response => response.json())
              .then(data => {
                setdata(data.studentBookmarks)
                var resultstudentBookmarks = data.studentBookmarks
                let followingIds = resultstudentBookmarks.map(group => group.universityID);
                let allGroupsUserSpecific1 = UniveristyValues.map(group => (
                  { ...group, following: followingIds.includes(group._id) })
                );
                setallGroupsUserSpecific(allGroupsUserSpecific1)
              })
          }
          else {
            if (responseJson.data.message === "Password not matched") {
              setwrongPassword(" Please enter a correct password")
            }
            else {
              setwrongUsername("Please enter a correct email")
            }
          }
        }
        )
        .catch(error => {
        });
    }
  }
  function handleEnquiry(event) {
    event.preventDefault();
    setenquiryemailError("")
    setenquiryphoneError("")
    if (isValidPhoneNumber(enquiryphone) === false) {
      setenquiryphoneError("Please enter correct phone number");
    }
    else {


      setmyloader("true")

      const obj = {
        name: enquiryname,
        email: enquiryemail,
        phone: enquiryphone,
        level: enquiryservice,
        study: enquirycountry

      };
      axios.post(process.env.REACT_APP_SERVER_URL + 'student/enquiry', obj)
        .then(function (res) {

          setmyloader("false")

          if (res.data.success === true) {
            setshowModalEnquiry(false)

            setshowSweetAlert("1")
            // setName("");
            // setEmail("");
            // setPhone("");

          }
          else if (res.data.message === "Student already exist") {
            setenquiryemailError("Email already exist");
          }
          else {

          }
        })
        .catch(error => {

        });
    }

  }
  function handleStarClick(value, universityID, name, logo, slug) {
    if (!localStorage.getItem("studentId")) {
      setshowModal(true)
    }
    else {
      setmyloader("true")
      if (value === "active") {
        axios.delete(process.env.REACT_APP_SERVER_URL + 'student/bookmarks/' + universityID, { headers: { 'Authorization': studentToken } })
          .then(function (res) {

            if (res.data.success === true) {
              const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
              fetch(url, {
                method: 'GET',
                headers: { 'Authorization': studentToken }
              })
                .then(response => response.json())
                .then(data => {
                  setmyloader("false")
                  setdata(data.studentBookmarks)
                  setsuccessMessage("You have crossed off This University")
                  setTimeout(() => setsubmitSuccess(""), 3000);
                  setsubmitSuccess(1)
                  var resultstudentBookmarks = data.studentBookmarks
                  let followingIds = resultstudentBookmarks.map(group => group.universityID);
                  let allGroupsUserSpecific1 = UniveristyValues.map(group => (
                    { ...group, following: followingIds.includes(group._id) })
                  );
                  setallGroupsUserSpecific(allGroupsUserSpecific1)
                })
            }
          })
          .catch(error => {
            setmyloader("false")
          });
      }
      else {
        const obj = {
          universityID: universityID,
          name: name,
          logo: logo,
          slug: slug
        };
        axios.post(process.env.REACT_APP_SERVER_URL + 'student/bookmarks', obj, { headers: { 'Authorization': studentToken } })
          .then(function (res) {


            if (res.data.success === true) {
              const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
              fetch(url, {
                method: 'GET',
                headers: { 'Authorization': studentToken }
              })
                .then(response => response.json())
                .then(data => {
                  setmyloader("false")
                  const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
                  fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': studentToken }
                  })
                    .then(response => response.json())
                    .then(data => {
                      setdata(data.studentBookmarks)
                      setsuccessMessage("You have Shortlisted This University")
                      setTimeout(() => setsubmitSuccess(""), 3000);
                      setsubmitSuccess(1)
                      var resultstudentBookmarks = data.studentBookmarks
                      let followingIds = resultstudentBookmarks.map(group => group.universityID);
                      let allGroupsUserSpecific1 = UniveristyValues.map(group => (
                        { ...group, following: followingIds.includes(group._id) })
                      );
                      setallGroupsUserSpecific(allGroupsUserSpecific1)
                    })
                })
            }
          })
          .catch(error => {
            setmyloader("false")
          });
      }
    }
  }
  return (
    <div>
      <Head>
        <title>Canada Study Visa | CourseMentor</title>
        <title>CourseMentor - Study Abroad - Course Finder study austrial</title>
        <meta name="description" content="CourseMentor - Study Abroad - Course Finder study austrial" />
        <meta property="og:title" content="Canada Study Visa | CourseMentor" />
        <meta property="og:description" content="CourseMentor - Study Abroad - Course Finder study austrial" />
        <meta property="og:image" content="og image" />
        <script type="application/ld+json">
          {JSON.stringify(articleStructuredData)}
        </script>
      </Head>


      {submitSuccess === 1 ? <div className="Show_success_bookmark">
        <strong>Success!</strong> {successMessage}
      </div> : null}

      {/* {loader === "true" ?
        <LoaderFrontend />
        : null} */}
      {showLoginSweetAlert === "1" ?
        <SweetAlert
          success
          title="Success!"
          onConfirm={(value) => {
            setshowLoginSweetAlert("0")
          }}
        >
          You Have Login Successfully. Now You Can Bookmark University
        </SweetAlert>
        : null
      }
      {showSweetAlert === "1" ?
        <SweetAlert
          success
          title="Success!"
          onConfirm={(value) => {
            setshowSweetAlert("0")
          }}
        >
          Thank you for sending a inquiry request. Our visa experts team will contact you soon!! Please regular check your email for updates.
        </SweetAlert>
        : null
      }
      <div className="main-content">
        {/*Full width header Start*/}
        <div className="full-width-header">
          {/*Header Start*/}
          <Header />

        </div>
        {/*Full width header End*/}
        {/* Breadcrumbs Start */}
        <div className="rs-breadcrumbs img1">
          <div className="breadcrumbs-inner text-center">
            <h1 className="page-title">Study in Canada
            </h1>
            {/* <a className="readon started" onClick={() => openEnquiry()}> Get Started</a> */}
            <EnquiryModal />
          </div>
        </div>
        {/* Breadcrumbs End */}
        <div id="secondaryNavBar" className="menu-area menu-sticky">
          <div className="fastFacts">
            <ul className="fastFactList">
              {activeValue === "fast" ?
                <li className="active" onClick={() => handlesecondNavbar("fast")} ><Link href="#fast-facts"><a>FAST FACTS</a></Link></li> :
                <li Click={() => handlesecondNavbar("fast")}><Link href="#fast-facts"> FAST FACTS</Link></li>}
              {activeValue === "topUniversity" ?
                <li className="active" onClick={() => handlesecondNavbar("topUniversity")} ><Link href="#top-universities"> TOP UNIVERSITIES</Link></li> :
                <li onClick={() => handlesecondNavbar("topUniversity")} ><Link href="#top-universities"> TOP UNIVERSITIES</Link></li>
              }
              {activeValue === "admission" ?
                <li className="active" onClick={() => handlesecondNavbar("admission")}><Link href="#admissions"> ADMISSIONS</Link></li> :
                <li onClick={() => handlesecondNavbar("admission")}><Link href="#admissions"> ADMISSIONS</Link></li>
              }
              {activeValue === "visa" ?
                <li className="active" onClick={() => handlesecondNavbar("visa")}><Link href="#visa"> VISA</Link></li> :
                <li onClick={() => handlesecondNavbar("visa")}><Link href="#visa"> VISA</Link></li>
              }
              {activeValue === "COST" ?
                <li className="active" onClick={() => handlesecondNavbar("COST")}><Link href="#cost-of-living"> COST OF LIVING</Link></li> :
                <li onClick={() => handlesecondNavbar("COST")}><Link href="#cost-of-living"> COST OF LIVING</Link></li>
              }
              {activeValue === "work" ?
                <li className="active" onClick={() => handlesecondNavbar("work")}><Link href="#work-opportunities"> WORK OPPORTUNITIES</Link></li> :
                <li onClick={() => handlesecondNavbar("work")}><Link href="#work-opportunities"> WORK OPPORTUNITIES</Link></li>
              }
              {activeValue === "FAQs" ?
                <li className="active" onClick={() => handlesecondNavbar("FAQs")}><Link href="#faqs"> FAQs</Link></li> :
                <li onClick={() => handlesecondNavbar("FAQs")}><Link href="#faqs"> FAQs</Link></li>
              }
            </ul>

            <div className="container">
              <div className="row  mt-5 mb-5">
                <div className="col-sm-10 ">
                  <div className="row">
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/washington-monument.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Capital<br /><strong>Canberra</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/population.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Population<br /><strong>26 Mn</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/language.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Language<br /><strong>English</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/int-student.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>International Students<br /><strong>869,709</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/economic.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>GDP<br /><strong>$1.37 Trillion</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/keypad.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Dialing Code<br /><strong>+61</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/money.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Currency<br /><strong>Canadan Dollar</strong></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4 mb-3">
                      <div className="study-location-facts_capital__1MYWF">
                        <div className="study-location-facts_imgBox__3psUR">
                          <img src="/images/graduation-hat.webp" alt="dev logo" />

                        </div>
                        <div className="study-location-facts_imgDetails__3qjdN">
                          <p>Universities<br /><strong>43</strong></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-2">
                  <div className="study-location-facts_rankingBox__2pQ44 mobile-hide">
                    <img src="/images/7.webp" alt="dev logo" />

                  </div>
                  <div className="study-location-facts_studyGuide__isgq9 mobile-hide">
                    <div className="textC ">
                      {/* <p style={{ marginBottom: '0px' }}>Download your Canada Free Guide</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="taranding-block" id="top-universities">
              <div className="container">
                <h2>Canada Universities</h2>
                <Slider {...settings}>

                  {allGroupsUserSpecific.map((element, index) => (



                    <div className="uniBlock" key={index}>
                 
                      {/* start for bookmark */}
                      {/* end for bookmark */}
                      <div className="headerBlock"><a href="#" target="_blank">
                        <Link href={'/schools/' + element.universityPrimaryInformation.slug} target="_blank" className="name">
                          <img className="logo"
                            src=
                            {element.universityImage.logo}

                            loading="lazy"
                          />
                        </Link>
                      </a>
                        <div className="nameBlock">

                          <div className="name">
                            <Link href={'/schools/' + element.universityPrimaryInformation.slug} target="_blank" className="name">
                              {element.universityPrimaryInformation.name}
                            </Link>
                          </div>
                          <div className="address">{element.universityPrimaryInformation.state}, {element.universityPrimaryInformation.country}</div>

                          {element.following === true ?
                            <img onClick={() => handleStarClick("active", element._id, element.universityPrimaryInformation.name, element.universityImage.logo, element.universityPrimaryInformation.slug)} src=
                              "/images/starActive.webp" alt=""
                              style={{
                                width: "33px",
                                height: "33px",
                                display: displayPrpoerty
                              }} loading="lazy"
                            />
                            :
                            <img onClick={() => handleStarClick("inactive", element._id, element.universityPrimaryInformation.name, element.universityImage.logo, element.universityPrimaryInformation.slug)} alt=""
                              src="/images/starInactive.webp"
                              style={{
                                width: "33px",
                                height: "33px",
                                display: displayPrpoerty
                              }}
                            />
                          }
                        </div>
                      </div>
                      <div className="detailBlock">
                        <div className="detail"><img className="logo" src=""
                          loading="lazy"
                        />
                          <div className="content">
                            <div className="value">6</div>
                            <div className="description">Minimum IELTS Required</div>
                          </div>
                        </div>
                        <div className="detail">
                        
                          <div className="content">
                            <div className="value">{element.universityOverview.ranking}</div>
                            <div className="description">Ranking</div>
                          </div>
                        </div>
                      </div>
                      <Link  href={'/schools/' + element.universityPrimaryInformation.slug} target="_blank"  ><a className="redirector">
                      Apply Now
                      </a>
     
                      </Link>

                    </div>



                  ))}

                </Slider>



              </div>
            </section>
            {/* Main content End */}

            <section className="taranding-block" id="fast-facts">
              <div className="container">

                <h2>What’s Trending?</h2>


                <div className="row">
                  {blogData.map((element, index) => {

                    return (

                      <div className="col-md-4" key={index}>
                        <div className="boxs-trad">
                          <div className="image-wrap">

                            {element._embedded['wp:featuredmedia'] &&
                              <div className="image">
                                <img src={element._embedded['wp:featuredmedia'][0].source_url} />
                              </div>
                            }


                          </div>

                          <div className="blog-content">
                            <h4 className="blog-title mt-3">
                              <Link href="#"><a>{element.title.rendered}nj</a></Link>
                            </h4>
                            {element.content.rendered != null ?
                              <p className="desc">
                                {parse(element.content.rendered.substring(0, 250))}</p> : <p></p>
                            }

                            <Link href={element.link} tabIndex="0" target="_blank"><a>Learn More..</a></Link>

                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>


              </div>
            </section>


            <section className="admission-require" id="admissions">
              <div className="container">
                <h2>Admission Requirements</h2>
                <div className="admissionlist">
                  <div className="row">
                    <div className="col-md-6">
                      <ul>
                        <li><span>


                          <FontAwesomeIcon icon={faFile} /></span>Copy of a valid passport</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>ACT/SAT/LSAT for UG programs</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>English proficiency scores (TOEFL/IELTS)</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>CV/Resume/Essays</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>Evidence of funds</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>Canadan secondary school certificate of
                          education (Year 12) or equivalent or Diploma / Advanced Diploma from the Vocational
                          Education and Training (VET) sector</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>GMAT/GRE scores for PG programs</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>Letters of Recommendation</li>
                        <li><span><FontAwesomeIcon icon={faFile} /></span>Statement of Purpose (SOP) </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="rs-partner pt-80 pb-70">
              <div className="container">
                <div className="freedemo">
                  <div className="row">
                    <div className="col-md-9">
                      <h4><span>Get your Dream IELTS or GMAT Score with Coursementor Live Classes</span>
                        Learn from the Best Coursementor</h4>
                    </div>
                    <div className="col-md-3">
                      <EnquiryModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="admission-timeline" id="visa">
              <div className="container">
                <div className="timelinetab">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                  >
                    <Tab eventKey="After 12th / UG" title="After 12th / UG">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>How to Apply</h4>
                            <p>UG Applications are submitted directly through the websites of each university
                            </p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Programs</h4>
                            <ul>
                              <li><span>


                                <FontAwesomeIcon icon={faAngleRight} /></span>Agriculture and
                                Environmental
                                Sciences</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Business</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Engineering</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Medicine</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Education and Training</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Management and Commerce</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Information Technology</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Nursing and Allied Health
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>Cost Estimate</h4>
                            <p>$15,000 to $33,000 (INR 11,15,332- 24,53,731) per year</p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Universities</h4>
                            <div className="un-logo">
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/aus-logo1.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo2.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo3.webp" alt="dev logo" />


                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/aus-logo4.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo5.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo6.webp" alt="dev logo" />

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="Masters" title="Masters">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>How to Apply</h4>
                            <p>PG applications are directly sent to the universities via online or offline modes
                            </p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Programs</h4>
                            <ul>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Agriculture and
                                Environmental
                                Sciences</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Business</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Engineering</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Medicine</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Hospitality and Tourism</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Education and Training</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Management and Commerce</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Information Technology</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Nursing and Allied Health
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>Cost Estimate</h4>
                            <p>$20,000 to $37,000 (INR 14,87,150- 27,51,153) per year</p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Universities</h4>
                            <div className="un-logo">
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/us-logo1.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo2.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo3.webp" alt="dev logo" />

                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/aus-logo4.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo1.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo6.webp" alt="dev logo" />

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey="MBA" title="MBA">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>How to Apply</h4>
                            <p>MBA applications are submitted directly to the universities</p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Programs</h4>
                            <ul>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Agriculture and
                                Environmental
                                Sciences</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Business</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Engineering</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Medicine</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Hospitality and Tourism</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Education and Training</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Management and Commerce</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Information Technology</li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Nursing and Allied Health
                              </li>
                              <li><span><FontAwesomeIcon icon={faAngleRight} /></span>Corporate Administration
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="timeline-box">
                            <h4>Cost Estimate</h4>
                            <p>$58,384- $60,000 (INR 43,38,369- 44,58,450) per year</p>
                          </div>
                          <div className="timeline-box">
                            <h4>Popular Universities</h4>
                            <div className="un-logo">
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/aus-logo1.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo2.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo3.webp" alt="dev logo" />

                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-4">
                                  <img src="/images/aus-logo4.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo5.webp" alt="dev logo" />

                                </div>
                                <div className="col-md-4">
                                  <img src="/images/aus-logo6.webp" alt="dev logo" />

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </section >
            <section className="postadmission" id="cost-of-living">
              <div className="container">
                <h2>Post Admission Experience</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="visa-opt">
                      <h5>Visa Options</h5>
                      <div className="visaBox blue">
                        <h5 className="name">Temporary Graduate Visa Subclass 485</h5>
                        <h6 className="cost">Cost - AU$1634</h6>
                        <p className="type">Type- Work</p>
                        <p className="desc">This visa is for international students who have recently graduated in
                          Canada. It lets you live, study and work in Canada temporarily.</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 Weather">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="clearfix ">
                          <h5 className="options__title float-left">Weather</h5>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6 text-right"><span className="mr-2">Min</span> <span
                        className="mr-3">Max</span>
                      </div>
                      <div className="col-sm-6 text-right mobile-hide"><span className="mr-2">Min</span> <span
                        className="mr-3">Max</span></div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Canberra</div>
                          <div className="float-right"><span className="celc">11<sup>o</sup></span><span
                            className="fahren">25<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Melbourne</div>
                          <div className="float-right"><span className="celc">15<sup>o</sup></span><span
                            className="fahren">24<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Sydney</div>
                          <div className="float-right"><span className="celc">18<sup>o</sup></span><span
                            className="fahren">25<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Adelaide</div>
                          <div className="float-right"><span className="celc">16<sup>o</sup></span><span
                            className="fahren">26<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Brisbane</div>
                          <div className="float-right"><span className="celc">20<sup>o</sup></span><span
                            className="fahren">29<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Perth</div>
                          <div className="float-right"><span className="celc">18<sup>o</sup></span><span
                            className="fahren">29<sup>o</sup></span></div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="temp__list clearfix">
                          <div className="float-left">Gold Coast</div>
                          <div className="float-right"><span className="celc">19<sup>o</sup></span><span
                            className="fahren">28<sup>o</sup></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-50" id="cost">
                  <div className="col-md-6">
                    <h5>Cost Of Living</h5>
                    <div className="cost-pict">
                      <img src="/images/Ellipse.webp" alt="dev logo" />

                      <span className="needle low" />
                    </div>
                    <div className="row">
                      <div className="col-12 d-flex">
                        <div className="low_text">
                          <p>Low</p>
                        </div>
                        <div className="high_text">
                          <p>High</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5>Monthly Living Expenses</h5>
                    <div className="row mt-3">
                      <div className="col-6">
                        <div className="livingBox text-center">
                          <img src="/images/rent.svg" alt="dev logo" />

                          <h5 className="name">Rent</h5>
                          <p className="cost">AU$201 - AU$583</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="livingBox text-center">
                          <img src="/images/food.svg" alt="dev logo" />

                          <h5 className="name">Food</h5>
                          <p className="cost">AU$243 - AU$341</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="livingBox text-center">
                          <img src="/images/transport.svg" alt="dev logo" />

                          <h5 className="name">Transport</h5>
                          <p className="cost">AU$96 - AU$583</p>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="livingBox text-center">
                          <img src="/images/dice.svg" alt="dev logo" />

                          <h5 className="name">Miscellaneous</h5>
                          <p className="cost">AU$243 - AU$487</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="rs-partner pt-80 pb-70">
              <div className="container">
                <div className="freedemo">
                  <div className="row">
                    <div className="col-md-9">
                      <h4><span>Worried About Your Career ?</span>
                        Our Team Is Ready To Help You 24*7</h4>
                    </div>
                    <div className="col-md-3">
                      <EnquiryModal />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="carrer-work" id="work-opportunities">
              <div className="container">
                <h2>Careers + Work Opportunities</h2>
                <div className="row">
                  <div className="col-md-6">
                    <div className="care-list">
                      <ul>
                        <li><span>
                          <img src="/images/arts.webp" alt="dev logo" />
                        </span>Arts and Humanities</li>
                        <li><span>
                          <img src="/images/Consulting.webp" alt="dev logo" />
                        </span>Law and Legal Studies</li>
                        <li><span>
                          <img src="/images/engineering.webp" alt="dev logo" />
                        </span>Architecture</li>
                        <li><span>
                          <img src="/images/healthCare.webp" alt="dev logo" />
                        </span>Medicine and Life Sciences</li>
                        <li><span>
                          <img src="/images/Business.webp" alt="dev logo" />
                        </span>Social Sciences</li>
                        <li><span>
                          <img src="/images/infoTech.webp" alt="dev logo" />
                        </span>Engineering and Technology</li>
                        <li><span>
                          <img src="/images/arts.webp" alt="dev logo" />
                        </span>Design</li>
                        <li><span>
                          <img src="/images/Consulting.webp" alt="dev logo" />
                        </span>Natural Sciences</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="car-pict">
                      <img src="/images/careerswork.webp" alt="dev logo" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="rs-partner">
              <div className="container">
                <div className="freedemo">
                  <div className="row">
                    <div className="col-md-12">
                      <h4>Why Study in Canada</h4>
                      <p>A country famed for its pioneering innovations, Canada ranks among the top 3 study abroad
                        destinations. Apart from the Group Eight Universities, the island nation houses some of the
                        leading academic institutions offering quality education across fields. Canada is the
                        origin for inventions like Wifi and Google Maps which the world now depends upon. Studying
                        under renowned experts and professionals, students can gain skills and grow abundantly in
                        their unique field of interest.</p>
                      <p>Studying in Canada guarantees high academic standards and globally recognised
                        qualifications with education administered by the Canadan Qualifications Framework (AQF).
                        From experiencing a serene environment and exploring the world’s largest coral reef,
                        studying in Canada is definitely a unique experience.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section className="faq" id="faqs">
              <div className="container">
                <h2>FAQs</h2>
                <div className="row">
                  <div className="col-md-6">

                    {/* start dummy */}
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                            aria-expanded="true" aria-controls="collapseOne">
                            How much does it cost to study in Canada?
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse Five" aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            The total cost of studying in Austat level of country are you lookralia varies across courses and universities. The average tuition fees for UG courses is $15,000 to $33,000 (INR 11,15,332- 24,53,731 and PG courses is $20,000 to $37,000 (INR 14,87,150- 27,51,153)..
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            How do you get PR in Canada?
                          </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            Points determine one’s eligibility for a PR visa. You must score at least 65 points under the Point’s Grid. The categories to achieve points include age, skills, education, experience, language, and sponsorships.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            How much does a student earn in Canada?
                          </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>Points determine one’s eligibility for a PR visa. You must score at least 65 points under the Point’s Grid. The categories to achieve points include age, skills, education, experience, language, and sponsorships.</strong>
                          </div>
                        </div>

                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFour">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                            aria-expanded="true" aria-controls="collapseFour">
                            Which is the best course to study in Canada?
                          </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                          data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <strong>Being the biggest technology hub, Canada is known for courses like Engineering, Data Science, and Electronics. Apart from these, other popular courses include Business Management, Medicine, Architecture, and Accounting.</strong>
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="headingFive">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive"
                            aria-expanded="true" aria-controls="collapseFive">
                            Which is the best university to study in Canada?
                          </button>
                        </h2>
                        <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive"
                          data-bs-parent="#accordiFivexample">
                          <div className="accordion-body">
                            <strong> The following are the top-ranked universities in Canada.</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end dummy */}



                  </div>
                  <div className="col-md-6">
                    <div className="faq-pict">
                      <img src="/images/faq.webp" alt="dev logo" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
      {/* Footer Start */}
      <Modal className="modal-container"
        show={showModal}
        onHide={() => close()}

        animation={true}
        bsSize="small">

        <Modal.Header closeButton>
          <Modal.Title>Student Login Form</Modal.Title>
        </Modal.Header>


        <div className="from-start" >
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
              <label className="form-label">Email </label>
              <input type="email" className="form-control " id="email"
                placeholder="Enter email" name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="error-msg"> {wrongUsername}</div>


            </div>
            <span className="error-msg">{emailError}</span>
            <div className="mb-3 mt-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control " id="uname"
                placeholder="Password" name="name"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="error-msg"> {wrongPassword}</div>
            </div>
            <span className="error-msg"> {passwordError}</span>
            <button type="submit" className="btn btn-website">Login</button>
          </form>

          {/* <a onClick={() => open()} >     Forgot your Password?</a> */}
          {/* <StudentForgotPass /> */}
          <p>Don't have an account? Click here to
          </p>

        </div>



      </Modal>
      {/* start */}
      <Modal className="modal-container enqblock"
        show={showModalEnquiry}
        onHide={() => closeEnquiry()}

        animation={true}
        bsSize="small" dialogClassName="modal-lg">

        <Modal.Header closeButton>
          <Modal.Title>Get Free Enquiry</Modal.Title>
        </Modal.Header>


        <div className="outside-iwinform">
          <div className="iwinform">
            <form className="iwin-home-form" onSubmit={handleEnquiry}>
              <div className="row">
                <div className="col-md-6">
                  <div id="iname" className="form-group">
                    <label>Name<span className="red">*</span></label>

                    <input id="name" type="text" name="nameasa" placeholder="Name"
                      className="form-control name" required
                      value={enquiryname}
                      onChange={(e) => setenquiryname(e.target.value)}
                    />
                  </div>
                  <div id="i-email" className="form-group">
                    <label>Email<span className="red">*</span></label>
                    <input id="email" type="email" name="emailasa" placeholder="Email"
                      className="form-control email" required
                      value={enquiryemail}
                      onChange={(e) => setenquiryemail(e.target.value)}
                    />
                    <div className="error-msg"> {enquiryemailError}</div>
                  </div>
                  <div id="iphone" className="form-group">
                    <label>Phone<span className="red">*</span></label>
                    <PhoneInput defaultCountry={"IN"}
                      placeholder="Enter phone number"
                      required
                      value={enquiryphone}
                      onChange={setenquiryphone} />


                    <div className="error-msg"> {enquiryphoneError}</div>
                  </div>
                  <div id="input-inquiry" className="form-group input-visa">
                    <label>Service Interested In<span className="red">*</span></label>
                    <select id="iwininquiry" name="inquiry" className="custom-select iwin-custom"
                      value={enquiryservice}
                      onChange={(e) => setenquiryservice(e.target.value)}
                      required>
                      <option value="">Select Your Choice</option>
                      <option value="IELTS Classes<">IELTS Classes</option>
                      <option value="PTE Classes">PTE Classes</option>
                      <option value="Study Visa">Study Visa</option>
                      <option value="Tourist Visa">Tourist Visa</option>
                      <option value="Visitor Visa">Visitor Visa</option>
                      <option value="Spouse Visa">Spouse Visa</option>
                      <option value="Business Visa">Business Visa</option>
                    </select>
                  </div>

                  <div id="input-destination" className="form-group study-destination">
                    <label>Country Interested In<span className="red">*</span></label>
                    <select id="iwindestination" name="inquiry" className="custom-select iwin-custom"

                      value={enquirycountry}
                      onChange={(e) => setenquirycountry(e.target.value)}
                      required>

                      <option value="">Your preferred study destination</option>
                      <option value="United States of America">United States of America</option>
                      <option value="Canada">Canada</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Dubai">Dubai</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Austria">Austria</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Finland">Finland</option>
                      <option value="Italy">Italy</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Spain">Spain</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Latvia">Latvia</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Poland">Poland</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="China">China</option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Vietnam">Vietnam</option>
                      <option value="Malta">Malta</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                  <div className="form-btns">
                    <input type="submit" className="btn btn-enquiry" defaultValue="Send Request" />
                  </div>

                </div>
                <div className="col-md-6">
                  <img src="/images/enquiry-girl.webp" alt="dev logo" />


                </div>
              </div>
            </form>
          </div>

        </div>


      </Modal>
      {/* end */}



    </div >
  )
}
export default Study
import { useRouter } from "next/router";
import axios from 'axios';
import 'react-phone-number-input/style.css'
import BookFree from '../../components/BookFree';
import Header from '../../components/Header';
import Image from 'next/image'
import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Link from 'next/link'
import EnquiryModal from '../../components/EnquiryModal';
import { Footer } from '../../components/Footer';
import Slider from "react-slick";
import parse from 'html-react-parser'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faStar, faGraduationCap, faCalendarCheck, faPhone,
    faEnvelope, faGlobe, faCheckCircle, faAngleDown, faAngleUp, faHistory, faAward

} from '@fortawesome/free-solid-svg-icons';
//sas
// import StudentForgotPass from './StudentForgotPass'
// import LoaderFrontend from './LoaderFrontend';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Modal, Button } from 'react-bootstrap';
export async function getServerSideProps(context) {

    const res = await axios.get(process.env.REACT_APP_SERVER_URL + 'completeUniDetail/' + context.params.slug)
    const res2 = await axios.get(process.env.REACT_APP_SERVER_URL + 'universitySimilar/' + context.params.slug)
    // var myresultsUniversity = data.universities

    //start faq
    const parseData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
    };
    var heavy_fruits = [];
    var questionResult = res.data.universities[0].universityFaqs;
    questionResult.forEach(function (message) {
        var abc = {
            "@type": "Question",
            "name": message.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": message.answer
            }

        }
        heavy_fruits.push(abc); // you push it to the array

    });
    parseData.mainEntity = heavy_fruits;
    //end faq
    //start for course schema
    var myuniversityName = res.data.universities[0].universityPrimaryInformation.name;
    var myuniversityWebsite = res.data.universities[0].universityPrimaryInformation.website;

    var courseResult = res.data.universities[0].universityCourses;
    var objhello = [];
    var i;
    if (courseResult.length >= 4) {
        for (i = 0; i < 4; i++) {
            const courseStructuredData = {
                "@context": "https://schema.org",
                "@type": "Course",
                "name": courseResult[i].courseName,
                "description": courseResult[i].description,
                "provider": {
                    "@type": "Organization",
                    "name": myuniversityName,
                    "sameAs": myuniversityWebsite
                }
            };
            objhello.push(courseStructuredData);
        }
    }
    else {
        for (i = 0; i < courseResult.length; i++) {
            const courseStructuredData = {
                "@context": "https://schema.org",
                "@type": "Course",
                "name": courseResult[i].courseName,
                "description": courseResult[i].description,
                "provider": {
                    "@type": "Organization",
                    "name": myuniversityName,
                    "sameAs": myuniversityWebsite
                }
            };
            objhello.push(courseStructuredData);
        }
    }
   
    //end for course schema
    return {

        props: {

            mydata: res.data.universities[0],
            parseData: parseData,
            objhello: objhello,
            similarUniversity: res2.data.universities
        },
    }

}

const MyschoolDetails = (pageProps) => {
    const router = useRouter();


    //start

    const [showModalforgot, setshowModalforgot] = useState(false);
    const [mounted, setMounted] = useState();
    const [myuniversityName, setmyuniversityName] = useState("");
    const [mycourseName, setmycourseName] = useState("");
    const [EmailExistError, setEmailExistError] = useState(false);
    const [resetEmail, setresetEmail] = useState("");
    const [data, setdata] = useState([]);
    const [universityId, setuniversityId] = useState([]);
    const [foundedYear, setfoundedYear] = useState("");
    const [loader, setmyloader] = useState("false");
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [showLoginSweetAlert, setshowLoginSweetAlert] = useState("0");
    const [mySetting, setmySetting] = useState("0");
    const [imageVideoShow, setimageVideoShow] = useState("1");
    const [FAQShow, setFAQShow] = useState("1");
    const [admissionShow, setadmissionShow] = useState("1");
    const [documentShow, setdocumentShow] = useState("1");
    const [showErrorSweetAlert, setshowErrorSweetAlert] = useState("0");
    const [showModal, setshowModal] = useState(false);
    const [universityEmail, setuniversityEmail] = useState("");
    const [QuestionSecond, setQuestionSecond] = useState("");
    const [articleStructuredData, setarticleStructuredData] = useState("");
    const [coureseStructuredData, setcoureseStructuredData] = useState("");
    const [completeCourseStructuredData, setcompleteCourseStructuredData] = useState("");

    const [unusedCourseSchema, setunusedCourseSchema] = useState(1);
    const [unusedFaqSchema, setunusedFaqSchema] = useState(1);



    const [elementsToRender, setelementsToRender] = useState("");
    // start for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setemailError] = useState("");
    const [passwordError, setpasswordError] = useState();
    const [wrongPassword, setwrongPassword] = useState("");
    const [wrongUsername, setwrongUsername] = useState("");
    // end for login
    const [rankingShow, setrankingShow] = useState("1");
    const [coursesNoValues, setcoursesNoValues] = useState("0");
    const [questionValues, setquestionValues] = useState([{
        question: "", answer: ""
    }])
    const [FormAdmissionValues, setFormAdmissionValues] = useState([{
        point: ""
    }])

    const [FormDocumentValues, setFormDocumentValues] = useState([{
        document: ""
    }])
    const [FormOverviewValues, setFormOverviewValues] = useState([{
        english: "", acceptanceRate: "", cgpa: "", course: "", courseNo: "", foundedYear: "", month: "",
        ranking: "", rate: "", year: ""
    }])
    const [FormPrimaryInformationValues, setFormPrimaryInformationValues] = useState([{
        website: "", country: "", phone: "", type: ""
    }])
    const [universityImageValues, setuniversityImageValues] = useState([{
        logo: "", coverPic: ""
    }])
    const [coursesValues, setcoursesValues] = useState([{
        courseName: "", duration: "", tuitionFee: "", studyField: "", currency: "", courseLevel: "", cgpa: "",
        eligibility: "", english: "", coursewebsite: "", description: "", exam: "", areaOfInterest: ""
    }])
    const [similarUniveristyValues, setsimilarUniveristyValues] = useState([{
        universityPrimaryInformation: "", universityOverview: "", universityImage: "", _id: "", slug: ""
    }])
    const [rankingValues, setrankingValues] = useState([])
    const [imageVideoValues, setimageVideoValues] = useState([])
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
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

    if (typeof window !== "undefined") {
        require("bootstrap/dist/js/bootstrap");
    }


    useEffect(() => {

        if (!router.isReady) return;

        const schoolDetails = router.query.slug;

        window.scrollTo(0, 0)
        function completeUniveristyPage() {
            setmyloader("true")
            //start for complete university detial

            //end for complete university detail
            //start for similar uiversity

            const url11 = process.env.REACT_APP_SERVER_URL + 'universitySimilar/' + schoolDetails;
            fetch(url11, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {

                    var myresultsUniversity = data.universities
                    setsimilarUniveristyValues(data.universities)
                    if (Object.keys(myresultsUniversity).length > 3) {
                        var universityLength = 3
                    }
                    else {
                        var universityLength = Object.keys(myresultsUniversity).length
                    }

                })


        }
        completeUniveristyPage();


    }, [router.isReady, router.query.slug])

    function openforgot() {
        setshowModalforgot(true)
    }
    function closeforgot() {
        setshowModalforgot(false)
    }
    var divStyle = {
        backgroundImage: 'url(' + pageProps.mydata.universityImage.coverPic + ')'
    }
    function open() {
        setshowModal(true)
    }
    function close() {
        setshowModal(false)
    }
    function handleClick() {
        if (down === "1") {
            setdown("0");
            setup("1")
        }
        else {
            setdown("1");
            setup("0")
        }
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
            setpasswordError("Please enter password");
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
    function handleApplyNow(universityID, courseID, session, applicationProgress, mycountry, universityName, courseName) {
        if (!localStorage.getItem("studentId")) {
            setshowModal(true)
        }
        else {
            setmyuniversityName(universityName)
            setmycourseName(courseName)

            var studentToken = localStorage.getItem("studentToken")
            setmyloader("true")
            const obj = {
                universityID: universityID,
                courseID: courseID,
                session: session,
                applicationProgress: applicationProgress,
                country: mycountry,
                universityName: universityName
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'student/orders', obj, { headers: { 'Authorization': studentToken } })
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        setshowSweetAlert("1")
                    }
                    else {
                        setshowErrorSweetAlert("1")
                    }
                })
                .catch(error => {

                });
        }
    }





    function onChangeresetEmail(e) {
        setresetEmail(e)
    }
    function handleforgotPasswordSubmit(event) {
        event.preventDefault();
        const obj1 = new FormData();
        obj1.append("email", resetEmail);
        const url4 = process.env.REACT_APP_SERVER_URL + 'student/forgotPassword';
        fetch(url4, {
            method: 'POST',
            body: obj1
        })
            .then(response => response.json())
            .then(data => {

                if (data.success === true) {
                    setshowSweetAlert("1")
                    setshowModalforgot(false)
                }
                if (data.success === false) {
                    setEmailExistError(data.messages)
                }
            })
    }
    //end
    return (
        <div className="application">
            <Head>
                <meta charSet="utf-8" />

                <title>
                    {pageProps.mydata.universityPrimaryInformation.name +" " +pageProps.mydata.universityPrimaryInformation.state  + " CourseMentor™"}
                </title>
                <meta name="description" content={pageProps.mydata.universityPrimaryInformation.name + " "+pageProps.mydata.universityPrimaryInformation.state + " " + pageProps.mydata.universityPrimaryInformation.country
                    + "-" +
                    "admissions process"
                    +
                    "- CourseMentor™. Save upto 1000's of $, Apply for next upcoming intakes now"
                }
                />
                <meta property="og:title" content= {pageProps.mydata.universityPrimaryInformation.name +" " +pageProps.mydata.universityPrimaryInformation.state  + " CourseMentor™"}></meta>
                <meta property="og:description"
                    content={pageProps.mydata.universityPrimaryInformation.name + " "+pageProps.mydata.universityPrimaryInformation.state + " " + pageProps.mydata.universityPrimaryInformation.country
                    + "-" +
                    "admissions process"
                    +
                    "- CourseMentor™. Save upto 1000's of $, Apply for next upcoming intakes now"
                }></meta>
                <meta property="og:image" content={pageProps.mydata.universityImage.coverPic}

                ></meta>
                  <link rel="icon"  href="/images/favicon.ico" />
                <link rel="canonical" href="https://abroad.coursementor.com/" />
                {/* start faq */}

                {/* end faq */}

                {/* <script type="application/ld+json">
                    {JSON.stringify(pageProps.parseData)}
                </script> */}
                <script type='application/ld+json' dangerouslySetInnerHTML={{
                    __html: JSON.stringify(pageProps.parseData)
                }}
                />
                <script type='application/ld+json' dangerouslySetInnerHTML={{
                    __html: JSON.stringify(pageProps.objhello)
                }}
                />
                {/* <script type="application/ld+json">
                    {JSON.stringify(pageProps.objhello)}
                </script> */}

            </Head>



            {/* {loader === "true" ?
                <LoaderFrontend />
                : null} */}
            {showSweetAlert === "1" ?
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={(value) => {
                        setshowSweetAlert("0")
                    }}
                >
                    You have applied successfully for
                    {" " + mycourseName + " "}
                    under this
                    {" " + myuniversityName + " "}
                    . Our experts team will follow up your application soon. Please check your registered email for regular updates.
                </SweetAlert>
                : null
            }
            {showLoginSweetAlert === "1" ?
                <SweetAlert
                    success
                    title="Success!"
                    onConfirm={(value) => {
                        setshowLoginSweetAlert("0")
                    }}
                >
                    You Have Login Successfully. Now You Can Apply For Course
                </SweetAlert>
                : null
            }
            {showErrorSweetAlert === "1" ?

                <SweetAlert
                    warning
                    title="Failure!"
                    onConfirm={(value) => {
                        setshowErrorSweetAlert("0")
                    }}
                >
                    Already Applied
                </SweetAlert>
                : null
            }
            <div className="main-content">
                {/*Full width header Start*/}
                <div className="full-width-header">
                    {/*Header Start*/}
                    <Header />
                </div>
            </div>
            <div className="defult-home">
                <div className="main-content">
                    <div className="rs-breadcrumbs img4 cover-pict" style={divStyle} >
                        <div className="breadcrumbs-inner text-center">
                            <h1 className="page-title">{pageProps.mydata.universityPrimaryInformation.name}</h1>
                            <ul>
                                <li title="Braintech - IT Solutions and Technology Startup HTML Template">
                                    <a className="active" >Home</a>
                                </li>
                                <li>University</li>
                            </ul>
                        </div>
                    </div>
                    <div className="rs-inner-blog pt-120 pb-120 md-pt-90 md-pb-90">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-4 col-md-12 ">
                                    <div className="widget-area">
                                        <div className="university-widget mb-50">
                                            <div className="cover"
                                            //  style={{
                                            //     height: "160px", }}
                                            >

                                                {/* <Image
    alt='Mountains'
    src= {pageProps.mydata.universityImage.coverPic}
    layout='fill'
    objectFit='contain'
  /> */}


                                                <img unoptimized={true} src=
                                                    {pageProps.mydata.universityImage.coverPic}
                                                    loading="lazy" className="univeristyCoverImage"
                                                // style={{
                                                //     height: "160px", }}
                                                />
                                            </div>
                                            <div className="univer-logo"><img unoptimized={true} src={pageProps.mydata.universityImage.logo} loading="lazy" /></div>
                                            <h4> {pageProps.mydata.universityPrimaryInformation.name}


                                            </h4>
                                            <p>{pageProps.mydata.universityPrimaryInformation.state + ", " + pageProps.mydata.universityPrimaryInformation.country}</p>
                                            <h6> {pageProps.mydata.universityPrimaryInformation.type} | Estd. {pageProps.mydata.universityOverview.foundedYear}</h6>
                                            <EnquiryModal />
                                        </div>
                                        <div className="recent-posts mb-50">
                                            <div className="widget-title">
                                                <h3 className="title">Get in Touch</h3>
                                            </div>
                                            <div className="recent-post-widget">
                                                <div className="post-img">
                                                    <span>
                                                        <FontAwesomeIcon icon={faPhone} className="touch-faicon" />
                                                    </span>
                                                </div>
                                                <div className="post-desc">
                                                    <span className="date">
                                                        Call Now
                                                    </span>
                                                    <a href="tel:4401915153000">{pageProps.mydata.universityPrimaryInformation.phone}</a>

                                                </div>
                                            </div>

                                            <div className="recent-post-widget">
                                                <div className="post-img">
                                                    <span>
                                                        <FontAwesomeIcon icon={faGlobe} className="touch-faicon" />
                                                    </span>
                                                </div>
                                                <div className="post-desc">
                                                    <span className="date">
                                                        <i className="fa fa-calendar"></i>
                                                        Website
                                                    </span>
                                                    <a href={pageProps.mydata.universityPrimaryInformation.website} rel="nofollow">{pageProps.mydata.universityPrimaryInformation.website}</a>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>
                                <div className="col-lg-8 pr-35 md-pr-15">
                                    <div className="row">
                                        <div className="col-lg-12 mb-50">
                                            <div className="blog-item">
                                                <ul>
                                                    <li><a href="#overview">Overview</a></li>
                                                    {rankingShow === "1" ? <li><a href="#ranking">Ranking</a></li>
                                                        : null
                                                    }

                                                    <li><a href="#courses-fees">Courses & Fees</a></li>
                                                    {admissionShow === "1" && documentShow === "1" ?

                                                        <li><a href="#admission-requirements">Admissions Requirements </a></li>
                                                        : null}
                                                    {imageVideoShow === "1" ?
                                                        <li><a href="#images-video"> Images/Video</a></li>
                                                        : null}
                                                    <li><a href="#courses"> Browse Courses</a></li>

                                                    {FAQShow === "1" ?
                                                        <li><a href="#faq">FAQ</a></li>
                                                        :
                                                        null}
                                                </ul>
                                                <div className="overviewblock">
                                                    <div className="overview-box blue-light">
                                                        <span className="icon">
                                                            {/* <i class="fa fa-graduation-cap" aria-hidden="true"></i> */}
                                                            <FontAwesomeIcon icon={faGraduationCap}
                                                                className="top-fa" />
                                                        </span>
                                                        <h3>{pageProps.mydata.universityOverview.courseNo}  +<br /><span>Courses</span></h3>
                                                    </div>
                                                    <div className="overview-box green-light">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faCalendarCheck} className="top-fa" /></span>
                                                        <h3>{pageProps.mydata.universityOverview.foundedYear} <br /><span>Founded year </span></h3>
                                                    </div>

                                                    <div className="overview-box ornage-light">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faStar} className="top-fa" />

                                                        </span>
                                                        <h3>{pageProps.mydata.universityOverview.ranking} <br /><span>Global Rankings</span></h3>
                                                    </div>
                                                    <div className="overview-box yellow-light">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faAward} className="top-fa" />
                                                            {/* fas fa-award */}
                                                        </span>
                                                        <h3>  {elementsToRender}<br /><span>English Proficiency</span></h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mb-50">
                                            <div className="blog-item" id="overview">
                                                <div className="blog-content">
                                                    <h3 className="blog-title"><a href="#">University Overview</a></h3>
                                                    <div className="blog-meta">
                                                        <h5>Founded year</h5>
                                                        <p>{pageProps.mydata.universityOverview.foundedYear}  </p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5>International Student Rate</h5>
                                                        <p>{pageProps.mydata.universityOverview.rate} </p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5>Popular Courses</h5>
                                                        <p>{pageProps.mydata.universityOverview.course}</p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5>No. of courses</h5>
                                                        <p>{pageProps.mydata.universityOverview.courseNo} </p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5>English Proficiency</h5>
                                                        <p>{elementsToRender}</p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5>CGPA</h5>
                                                        <p>{pageProps.mydata.universityOverview.cgpa} </p>
                                                    </div>
                                                    <div className="blog-meta">
                                                        <h5> Acceptance rate</h5>
                                                        <p>{pageProps.mydata.universityOverview.acceptanceRate}  %</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 mb50">
                                            <div className="cta_cta__3nhLf col-12">
                                                <div className="row">
                                                    <div className="col-9 p-0">
                                                        <h1 className="cta_text__1LaHh">AIl Course Finder </h1>
                                                        <h2 className="cta_subtext__1eM4M">See personalized recommendations basis your
                                                            profile and preferences from RMIT University & similar universities.
                                                        </h2>
                                                        <EnquiryModal />
                                                    </div>
                                                    <div className="col-3"><img unoptimized={true} className="cta_image__3Oih8" src="/images/Group1169.webp" loading="lazy" alt="" /></div>
                                                </div>
                                            </div>

                                        </div>
                                        {/* <div className="col-lg-12 mb-50">
                                            <div className="blog-item" id="courses-fees">
                                                <div className="blog-content">
                                                    <h3 className="blog-title"><a href="#">Courses & Fees</a></h3>
                                                    <div id="accordion">
                                                    {coursesValues.map((element, index) => (
                                                        <div key={index}>

                                                            <h5>   <a
                                                                data-bs-toggle="collapse" href={"#collapseCourse" + index}>
                                                                {element.courseName || ""}
                                                            </a>
                                                            </h5>
                                                            <div id={"collapseCourse" + index} className="collapse" data-bs-parent="#accordion">
                                                                <div className="blog-meta">
                                                                    <h5> Duration</h5>
                                                                    {element.duration}
                                                                </div>
                                                                <div className="blog-meta">
                                                                    <h5> Fee</h5>
                                                                    {element.currency} {" "}
                                                                    {element.tuitionFee}
                                                                </div>
                                                                <div className="blog-meta">

                                                                    <h5> CGPA</h5>
                                                                    {element.cgpa}

                                                                </div>
                                                                <div className="blog-meta">
                                                                    <h5>Eligibility</h5>
                                                                    {element.eligibility}
                                                                </div>
                                                                <div className="blog-meta">
                                                                    <h5>Course website</h5>
                                                                    {element.website}
                                                                </div>
                                                                <div className="blog-meta">
                                                                    <h5>Academic proficiency exam</h5>
                                                                    {element.exam}
                                                                </div>

                                                                <div className="blog-desc">
                                                                    <h5 className="mt-3">Course Description</h5>
                                                                    {element.description}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                        {rankingShow === "1" ?
                                            <div className="col-lg-12 mb-50">
                                                <div className="blog-item" id="ranking">
                                                    <div className="blog-content">
                                                        <h3 className="blog-title"><a >Ranking</a></h3>
                                                        <div className="blog-meta">

                                                            {pageProps.mydata.universityRankings.map((element, index) => (
                                                                <ul className="btm-cate" key={index}>

                                                                    <li>
                                                                        <div className="blog-date">
                                                                            <div className="globe-ranking">
                                                                                <div className="ratting">
                                                                                    <div className="author">
                                                                                        <span><FontAwesomeIcon icon={faStar} /> </span>
                                                                                        {element.rank}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="globle-content">
                                                                                    <div className="ag-name">
                                                                                        {/* <span><FontAwesomeIcon icon={faGlobe} /></span> */}
                                                                                        {element.agencyName}
                                                                                    </div>
                                                                                    <div className="ag-year">
                                                                                        {/* <span><FontAwesomeIcon icon={faCalendarCheck} />  </span> */}
                                                                                        {element.year}
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                    </li>

                                                                </ul>
                                                            ))}
                                                        </div><br />

                                                        <div className="raning-agency">
                                                            <h5>Ranking Agencies</h5>
                                                            <div className="row">
                                                                {pageProps.mydata.universityRankings.map((element, index) => (
                                                                    <div className="col-md-3" key={index}>
                                                                        <div className="ranking-img">
                                                                            <img unoptimized={true} src={element.certificate} loading="lazy" alt="" />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}


                                        <div className="col-lg-12 mb50">
                                            <div className="cta_cta__3nhLf col-12">
                                                <div className="row">
                                                    <div className="col-9 p-0">
                                                        <h1 className="cta_text__1LaHh">Start your journey</h1>
                                                        <h2 className="cta_subtext__1eM4M">Realise your study abroad dream</h2>
                                                        <EnquiryModal />
                                                    </div>
                                                    {/* <div className="col-3"><Image    unoptimized={true} className="cta_image__3Oih8" src="Group1169.webp" loading="lazy" alt="" /></div> */}
                                                </div>
                                            </div>

                                        </div>
                                        {admissionShow === "1" && documentShow === "1" ?
                                            <div className="col-lg-12 mb-50">
                                                <div className="blog-item" id="admission-requirements">
                                                    <div className="blog-content">
                                                        <h3 className="blog-title"><a href="#">Admissions Requirements </a></h3>
                                                        <div className="admission-list">
                                                            <ul className="nav nav-tabs" role="tablist">
                                                                <li className="nav-item">
                                                                    <a className="nav-link active" data-bs-toggle="tab"
                                                                        href="#home">Application</a>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <a className="nav-link" data-bs-toggle="tab" href="#menu1">Documents</a>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content">
                                                                <div id="home" className="container tab-pane active"><br />
                                                                    <h5>Application</h5>
                                                                    {pageProps.mydata.universityAdmissions.map((element, index) => (
                                                                        <div key={index}>
                                                                            <span>


                                                                            </span>{parse(element.point)}



                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div id="menu1" className="container tab-pane fade"><br />
                                                                    <h5>Documents</h5>
                                                                    {pageProps.mydata.universityDocuments.map((element, index) => (
                                                                        <div key={index}>
                                                                            <span>

                                                                            </span>{parse(element.document)}

                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null}
                                        {imageVideoShow === "1" ?
                                            <div className="col-lg-12 mb-50">
                                                <div className="blog-item" id="images-video">
                                                    <div className="blog-content">
                                                        <h3 className="blog-title"><a href="#">Images/Video </a></h3>
                                                        <div className="row" >
                                                            {pageProps.mydata.universityImageVideos.map((element, index) => {
                                                                var mylink = element.link
                                                                const myArray = mylink.split("=");
                                                                return (

                                                                    <div className="col-md-4" key={index}>
                                                                        <div className="blog-img mb-3">
                                                                            {element.type === "image" ?
                                                                                <a  rel="noreferrer noopener nofollow">
                                                                                    <img unoptimized={true} src={element.link} alt="image" loading="lazy" />
                                                                                </a>
                                                                                :
                                                                                <a  target="_blank" rel="noreferrer noopener nofollow" >
                                                                                    <iframe className='video'
                                                                                        title='Youtube player'
                                                                                        // rel="noreferrer noopener nofollow" 
                                                                                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                                                                                        src={'https://youtube.com/embed/' + myArray[1] + '?autoplay=0'}>
                                                                                    </iframe>
                                                                                </a>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }


                                        <div className="col-lg-12">
                                            <div className="blog-item" id="courses">
                                                <div className="blog-content">
                                                    <h3 className="blog-title">Browse Courses</h3>
                                                    <div className="row mb-3" >

                                                        {pageProps.mydata.universityCourses.map((element, index) => (
                                                            <>
                                                                {index < 4 ?
                                                                    <div className="col-sm-6 mb-4" key={index}>

                                                                        <div>
                                                                            <div className="subcourses_courseBox__3deGG">
                                                                                <div className="subcourses_program__3pkFj col-sm-12 p-0">
                                                                                    <img unoptimized={true} src="/images/project-management.webp" alt="" loading="lazy" />

                                                                                    <div><span className="subcourses_h-title__sLV10">{element.courseName}</span><span
                                                                                        className="subcourses_subHeading__zdEIg">{element.areaOfInterest}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="subcourses_line__T3g-V"></div>
                                                                                <div className="row align-items-center">
                                                                                    <div className="col-6 col-sm-4 clearfix">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">
                                                                                                {element.currency === "GBP" ?
                                                                                                    <>£</>
                                                                                                    :
                                                                                                    element.currency === "EUR" ?
                                                                                                        <>€</>
                                                                                                        :
                                                                                                        <>$</>

                                                                                                }
                                                                                                {element.tuitionFee}{" "}  {element.currency}
                                                                                            </h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Fee</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-6 col-sm-4">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">{element.duration} Month
                                                                                            </h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Duration</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-6 col-sm-4">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">{element.english}</h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Education</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-6 col-sm-4 mt-2">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">{element.courseLevel}</h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Course level</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-6 col-sm-4 mt-2">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">On Campus </h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Mode of Degree</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-6 col-sm-4 mt-2">
                                                                                        <div className="subcourses_details__3g8AB">
                                                                                            <h3 className="subcourses_c-desc__Dzhnk">{element.month}</h3>
                                                                                            <p className="subcourses_c-title__2MKAy">Intakes</p>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="col-sm-12">
                                                                                        <div className="subcourses_line__T3g-V">
                                                                                        </div>
                                                                                        {/* <ReadMore>{element.description}</ReadMore> */}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="text-right w-100">
                                                                         
                                                                                <button className="btn btn-primary  w-100" onClick={() => handleApplyNow(pageProps.mydata._id, element._id, element.month, "first", pageProps.mydata.universityPrimaryInformation.country, pageProps.mydata.universityPrimaryInformation.name, element.courseName)}>Apply Now
                                                                                    {/* <Image    unoptimized={true}
                                                                                        src="https://images.leverageedu.com/university/whitearrow.svg" loading="lazy" />
                                                                                */}
                                                                                </button>
                                                                            </div>
                                                                        </div>



                                                                    </div>
                                                                    :
                                                                    null
                                                                }
                                                            </>
                                                        ))}
                                                    </div>
                                                    {/* {coursesNoValues === 1 ? */}
                                                    <div>
                                                        {/* <Link href={'/schools/' + router.query.slug + '/courses'} className="nav-link btn-view-all" >View All Courses</Link> */}
                                                    </div>
                                                    {/* // : null} */}
                                                </div>
                                            </div>
                                        </div>
                                        <BookFree />
                                        {FAQShow === "1" ?
                                            <div className="col-lg-12 mb-3 mt-5">
                                                <div id="faq" className="blog-item">
                                                    <div className=" blog-content">
                                                        <h3 className="blog-title">FAQ</h3>
                                                        {pageProps.mydata.universityFaqs.map((element, index) => (
                                                            <div key={index}>
                                                                <div className="card">
                                                                    <a className="card-header  card-link" onClick={() => handleClick()}
                                                                        data-bs-toggle="collapse" href={"#collapsefaq" + index}>


                                                                        {element.question || ""}
                                                                    </a>
                                                                    <div id={"collapsefaq" + index} className="collapse" data-bs-parent="#accordion">
                                                                        <div className="card-body">
                                                                            {element.answer || ""}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            : null
                                        }
                                        <div className="col-lg-12 mb-5">
                                            <div id="Similar" className="blog-item">
                                                <div className="similar_fullbox__1qBJc  blog-content">
                                                    <h3 className="blog-title"><a href="#">Similar Universities</a></h3>
                                                   
                                                    <Slider {...settings}>
                                                        {pageProps.similarUniversity.map((element, index) =>
                                                        (
                                                            <>
                                                                <div className="col-md-4" key={index} >

                                                                    <div data-index="0" className="slick-slide slick-active slick-current"
                                                                        tabIndex="-1" aria-hidden="false">
                                                                        <div>
                                                                            <Link href={'/schools/' + element.universityPrimaryInformation.slug} target="_blank" >
                                                                                <a>
                                                                                    <div tabIndex="-1">
                                                                                        <div className="similar_box__2Lq08">
                                                                                            <img unoptimized={true} src={element.universityImage.coverPic} alt="university coverPik" loading="lazy" />

                                                                                            <div className="similar_footerText__2go-e w-100 row">
                                                                                                <h1 className="similar_unidata__1lxt7 col-10">

                                                                                                    {element.universityPrimaryInformation.name}

                                                                                                </h1>

                                                                                                <h2 className="similar_unidesc__10ic3"> {element.universityPrimaryInformation.name},  {element.universityPrimaryInformation.country}</h2>
                                                                                            </div>
                                                                                            <h2 className="similar_facts__1i5bJ"> {element.universityPrimaryInformation.type}
                                                                                                | Estd.{element.universityOverview.foundedYear}

                                                                                                | {element.universityOverview.courseNo}+ Courses
                                                                                            </h2>
                                                                                        </div>
                                                                                    </div>
                                                                                </a>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ))}
                                                    </Slider>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <BrowseCountry /> */}
                <Footer />

            </div >
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

                    {/* <a title="Password Chnage" onClick={() => openforgot()} >     Forgot your Password?</a> */}
                    {/* <StudentForgotPass /> */}
                    {/* <p>Don't have an account? Click here to
                        <Link to={'/StudentRegister'} className="" >
                            Register</Link></p> */}

                </div>



            </Modal>



            <Modal className="modal-container"
                show={showModalforgot}
                onHide={() => close()}

                animation={true}
            >

                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>


                <div className="modal-body">
                    <form onSubmit={handleforgotPasswordSubmit}>

                        <div className="mb-3 mt-3">
                            <label htmlFor="email">Email Address:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
                                value={resetEmail}
                                onChange={(e) => onChangeresetEmail(e.target.value)}
                                required
                            />

                            <div className="error-msg"> {EmailExistError}</div>

                        </div>


                        <button type="submit" className="btn btn-primary" >Send Password </button>
                    </form>
                </div>
            </Modal>
        </div >
    )
}





export default MyschoolDetails
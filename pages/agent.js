import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus, faTrash, faPen, faEye, faUser, faFile, faFileUpload, faUserTie,
  faCheck, faPaperPlane, faGraduationCap

} from '@fortawesome/free-solid-svg-icons';
// import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Header from '../components/Header';
import EnquiryModal from '../components/EnquiryModal';


import { AgentLoginForm } from '../components/AgentLoginForm';

export default function Myagent() {




  const [redirectToReferrer, setredirectToReferrer] = useState(false);
  // const [loginData, setLoginData] = useState(
  //   localStorage.getItem('loginData')
  //     ? JSON.parse(localStorage.getItem('loginData'))
  //     : null
  // );


  //u
  const handleFailure = (result) => {
  };

  const settings = {
    // dots: true,

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  useEffect(() => {

    window.scrollTo(0, 0)
  }, []);
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "url": "https://abroad.coursementor.com/",
    "logo": "https://abroad.coursementor.com/static/media/logo.c13e4ee987b9bffb1635.webp"
  };
  return (
    <div >
      <Head>
        <title>International Students Recruitment Partner Portal - CourseMentorâ„¢</title>
        <meta name="description" content="International Students Recruitment Partner Portal - Signup and Earn Commissions on Sending Applications - Transparent and Fast - CourseMentorâ„¢" />
        <link rel="icon"  href="/images/favicon.ico" />
      </Head>
<div className="main-content">

        <div className="full-width-header">

          <Header />

        </div>

        <div className="rs-banner style3 modify2">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6  order-last">
                <div className="banner-img">
                  <section className="Form-block">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          {/* <GoogleLogin

                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Log in with Google"
                      plugin_name='abc'
                      onSuccess={handleLogin}
                      onFailure={handleFailure}
                      cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                    <AgentLoginForm /> */}
                          <div>




                          </div>
                          <AgentLoginForm />
                        </div>
                      </div>
                    </div>

                  </section>
                  {/* end for student register */}


                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-content">
                  <h1 className="title"><span>The Easiest Way to </span><br /> Study Abroad</h1>
                  <p className="desc">
                    Discover programmes and schools, get matched with the best selections, and submit your applications quickly and conveniently. We'll help you every step of the journey, from research to admission to visas and arrival at your desired school!
                  </p>
                  <ul className="banner-btn">
                    <li>
                      <EnquiryModal />
                    </li>

                  </ul>
                </div>

              </div>
            </div>
          </div>
          <div className="rs-animation">

            <img src="/images/b4-dot-6.webp" alt="dev logo" layout="fill"
              loading="lazy" />

          </div>
        </div>

        <div className="rs-services style2 modify1 pt-50 pb-120 md-pt-80 md-pb-80">
          <div className="container">
            <div className="sec-title2 text-center mb-45">
              <span className="sub-text gold-color">We Are Best</span>
              <h2 className="title">
                Our Impact 
                
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 md-mb-30">
                <div className="flip-box-inner">
                  <div className="flip-box-wrap">
                    <div className="front-part">
                      <div className="front-content-part purple-bg">
                        <div className="front-icon-part">
                          <div className="icon-part">
                            <img src="/images/home-style6-6.webp" alt="dev logo" />


                          </div>
                        </div>
                        <div className="front-title-part">
                          <h3 className="title"><Link href="/students">Students
                            Helped </Link></h3>
                        </div>
                        <div className="front-desc-part">
                          <p>
                            200,000+</p>
                        </div>
                        <div className="front-btn-part">
                          <Link className="readon view-more" href="/students">View More</Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 md-mb-30">
                <div className="flip-box-inner">
                  <div className="flip-box-wrap">
                    <div className="front-part">
                      <div className="front-content-part gold-bg">
                        <div className="front-icon-part">
                          <div className="icon-part">
                            <img src="/images/home-icons-8.webp" alt="dev logo" />


                          </div>
                        </div>
                        <div className="front-title-part">
                          <h3 className="title"><Link href="/students">Student Source
                            Countries</Link></h3>
                        </div>
                        <div className="front-desc-part">
                          <p>
                            125+
                          </p>
                        </div>
                        <div className="front-btn-part">
                          <Link className="readon view-more" href="/students">View More</Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="flip-box-inner">
                  <div className="flip-box-wrap">
                    <div className="front-part">
                      <div className="front-content-part blue-bg">
                        <div className="front-icon-part">
                          <div className="icon-part">
                            <img src="/images/home-icons-9.webp" alt="dev logo" />

                          </div>
                        </div>
                        <div className="front-title-part">
                          <h3 className="title"><Link href="/students">Offer of
                            Admission Rate </Link></h3>
                        </div>
                        <div className="front-desc-part">
                          <p>
                            95%
                          </p>
                        </div>
                        <div className="front-btn-part">
                          <Link className="readon view-more" href="/students">View More</Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="rs-about style2 modify2 gray-color pt-120 pb-120 md-pt-80 md-pb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 md-mb-50">
                <div className="sec-title mb-30">
                  <div className="sub-text style4-bg">CourseMentor</div>
                  <h2 className="title pb-20">
                    Find and Apply to the Best Programs and Schools for You
                  </h2>
                  <p>While there's no cap on the number of schools you can apply to, some students, especially those from affluent backgrounds who want to go to a selective college, can go overboard, applying to more than 20 or 30 colleges</p>
                </div>

                <div className="rs-skillbar style1 home4">
                  <div className="cl-skill-bar">
                    <div className="btn-part mt-45">
                      <EnquiryModal />
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-lg-6 pl-65 md-pl-15">
                <div className="about-img">
                  <img src="/images/Expert.webp" alt="dev logo" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rs-services style3 modify1 pt-120 pb-120 md-pt-80 md-pb-80">
          <div className="container">
            <div className="sec-title2 text-center mb-45">
              <span className="sub-text gold-color">SKILLS</span>
              <h2 className="title title2">
                How It Works
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="services-item pink-light-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>

                        <FontAwesomeIcon className="frontend-faicon" icon={faUser} />

                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#">Check Your Eligibility</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        Complete a short survey and get matched to programs and schools.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="services-item blue2-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>
                        <FontAwesomeIcon className="frontend-faicon" icon={faFile} />


                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#"> Apply to Schools</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        Select a school and program, complete profile, pay fees, and submit documents.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-30">
                <div className="services-item paste2-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>

                        <FontAwesomeIcon className="frontend-faicon" icon={faCheck} />


                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#">Get Accepted</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        The schools review your application and an acceptance letter is issued.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 md-mb-30">
                <div className="services-item purple2-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>
                        <FontAwesomeIcon className="frontend-faicon" icon={faFile} />


                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#">Applies for Visa</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        Course Mentor experts guide the student through the visa application process.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 sm-mb-30">
                <div className="services-item cyan2-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>

                        <FontAwesomeIcon className="frontend-faicon" icon={faPaperPlane} />

                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#">Student Journey Begins</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        Book your flight, pack your bags, and start your adventure.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="services-item pink2-bg">
                  <div className="services-icon">
                    <div className="image-part">
                      <span>

                        <FontAwesomeIcon className="frontend-faicon" icon={faGraduationCap} />

                      </span>
                    </div>
                  </div>
                  <div className="services-content">
                    <div className="services-text">
                      <h3 className="title"><Link href="#">Learn From Industry Experts</Link></h3>
                    </div>
                    <div className="services-desc">
                      <p>
                        Learning top skills can bring an extra-ordinary outcome in a career.
                      </p>
                    </div>
                    <div className="services-button"><Link href="#">Read More</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rs-technology gray-color pt-50 pb-50 mt-50 mb-50">
          <div className="container">
            <div className="sec-title2 text-center mb-45">
              <span className="sub-text gold-color">Student</span>
              <h2 className="title title2">
                Trusted by Universities
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">

                      <img src="/images/pt-1.webp" alt="dev logo" />

                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">

                      <img src="/images/pt-2.webp" alt="dev logo" />

                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">
                      <img src="/images/pt-3.webp" alt="dev logo" />


                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">
                      <img src="/images/pt-4.webp" alt="dev logo" />


                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">
                      <img src="/images/pt-5.webp" alt="dev logo" />

                    </div>
                  </Link>
                </div>
              </div>
              <div className="col-lg-2 col-md-4 col-sm-4 col-6">
                <div className="technology-item">
                  <Link href="#">
                    <div className="logo-img">
                      <img src="/images/pt-6.webp" alt="dev logo" />

                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div className="btn-part mt-30">
                <EnquiryModal />
              </div>
            </div>
          </div>
        </div>


        <div className="rs-testimonial main-home style4 modify1 pt-120 pb-120 md-pt-80 md-pb-80">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="testi-img">
                  <img src="/images/testimonial.webp" alt="dev logo" />


                </div>
              </div>
              <div className="col-lg-6 md-pt-50 ">
                <div className="sec-title mb-50">
                  <div className="sub-text style4-bg left testi">Testimonials</div>
                  <h2 className="title pb-20">
                    What Our Students Have To Say
                  </h2>

                </div>
                <Slider {...settings}>
                  <div>
                    <div className="testi-item">
                      <div className="author-desc">
                        <div className="desc">

                          <img src="/images/quote2.webp" alt="dev logo" />

                          "I
                          had an excellent time learning about many topics. I had a little bit
                          of knowledge but never had the chance to study them deeply. Thank
                          You so much for valuable information. "</div>
                      </div>
                      <div className="testimonial-content">
                        <div className="author-img">
                          <img src="/images/tmh4.webp" alt="dev logo" />


                        </div>
                        <div className="author-part">
                          <Link className="name" href="#">Parteek sharma</Link>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="testi-item">
                      <div className="author-desc">
                        <div className="desc">

                          <img src="/images/quote2.webp" alt="dev logo" />

                          "
                          It's a great course. The starting can be a bit tough if you're not
                          from a programming background, but later, you start to understand
                          everything because they will explain everything step by step."</div>
                      </div>
                      <div className="testimonial-content">
                        <div className="author-img">
                          <img src="/images/tmh2.webp" alt="dev logo" />


                        </div>
                        <div className="author-part">
                          <Link className="name" href="#">Somya Saini</Link>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="testi-item">
                      <div className="author-desc">
                        <div className="desc">
                          <img src="/images/quote2.webp" alt="dev logo" />


                          "Based on such knowledge, we may understand several other
                          programming languages in a more in-depth way. They have such an easy
                          way of teaching. 5/5 rating great work keep it up"</div>
                      </div>
                      <div className="testimonial-content">
                        <div className="author-img">
                          <img src="/images/tmh3.webp" alt="dev logo" />


                        </div>
                        <div className="author-part">
                          <Link className="name" href="#">Imran Khan</Link>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="testi-item">
                      <div className="author-desc">
                        <div className="desc">
                          <img src="/images/quote2.webp" alt="dev logo" />



                          "I
                          had an excellent time learning about many topics. I had a little bit
                          of knowledge but never had the chance to study them deeply. Thank
                          You so much for valuable information. "</div>
                      </div>
                      <div className="testimonial-content">
                        <div className="author-img">
                          <img src="/images/tmh4.webp" alt="dev logo" />


                        </div>
                        <div className="author-part">
                          <Link className="name" href="#">Parteek sharma</Link>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div>

                  </div>
                  <div>
                    <div className="testi-item">
                      <div className="author-desc">
                        <div className="desc">

                          <img src="/images/quote2.webp" alt="dev logo" />

                          "
                          It's a great course. The starting can be a bit tough if you're not
                          from a programming background, but later, you start to understand
                          everything because they will explain everything step by step."</div>
                      </div>
                      <div className="testimonial-content">
                        <div className="author-img">
                          <img src="/images/tmh2.webp" alt="dev logo" />


                        </div>
                        <div className="author-part">
                          <Link className="name" href="#">Somya Saini</Link>

                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div id="rs-blog" className="rs-blog pt-10 pb-50 md-pt-80 md-pb-20">
        <div className="container">
          <div className="sec-title2 text-center mb-30">
            <span className="sub-text">Student</span>
            <h2 className="title testi-title">
              Featured Study Destinations
            </h2>
          </div>
          <div className="row rs-carousel owl-carousel" data-loop="true" data-items={3} data-margin={30} data-autoplay="true" data-hoverpause="true" data-autoplay-timeout={5000} data-smart-speed={800} data-dots="false" data-nav="false" data-nav-speed="false" data-center-mode="false" data-mobile-device={1} data-mobile-device-nav="false" data-mobile-device-dots="false" data-ipad-device={2} data-ipad-device-nav="false" data-ipad-device-dots="false" data-ipad-device2={2} data-ipad-device-nav2="false" data-ipad-device-dots2="false" data-md-device={3} data-md-device-nav="false" data-md-device-dots="false">
            <div className="col-md-3 blog-item">
              <div className="image-wrap">
                <Link href="/study-in-canada">
                  <img src="/images/canda.webp" alt="dev logo" />



                </Link>
                <ul className="post-categories">
                  <li><Link href="/study-in-canada">Canada</Link></li>
                </ul>
              </div>
              <div className="blog-content">
                <h3 className="blog-title"><Link href="#">Explore Canada</Link></h3>
                <p className="desc">Quality education at low cost. Work during study, post-study work permits, and pro-immigration policies. Diverse, safe, and inclusive.</p>
                <div className="blog-button"><Link href="/study-in-canada">Learn More</Link></div>
              </div>
            </div>
            <div className="col-md-3 blog-item">
              <div className="image-wrap">
                <Link href="/study-in-uk">
                  <img src="/images/united-kingdom.webp" alt="dev logo" />



                </Link>
                <ul className="post-categories">
                  <li><Link href="/study-in-uk"> United Kingdom</Link></li>
                </ul>
              </div>
              <div className="blog-content">
                <h3 className="blog-title"><Link href="/study-in-uk">Explore the United Kingdom</Link></h3>
                <p className="desc">World-class universities in the heart of Europe. Shorter study duration to fast-track your career and reduce costs. Options to work during study and after graduation.</p>
                <div className="blog-button"><Link href="/study-in-uk">Learn More</Link></div>
              </div>
            </div>
            <div className="col-md-3 blog-item">
              <div className="image-wrap">
                <Link href="/study-in-usa">
                  <img src="/images/united-state.webp" alt="dev logo" />


                </Link>
                <ul className="post-categories">
                  <li><Link href="/study-in-usa"> United States</Link></li>
                </ul>
              </div>
              <div className="blog-content">
                <h3 className="blog-title"><Link href="/study-in-usa">Explore the United States</Link></h3>
                <p className="desc">Globally renowned education from the highest-ranked universities and colleges. Chosen by over a million international students every year.</p>
                <div className="blog-button"><Link href="/study-in-usa">Learn More</Link></div>
              </div>
            </div>
            <div className="col-md-3 blog-item">
              <div className="image-wrap">
                <Link href="/study-in-australia">
                  <img src="/images/austrila.webp" alt="dev logo" />



                </Link>
                <ul className="post-categories">
                  <li><Link href="/study-in-australia">Australia</Link></li>
                </ul>
              </div>
              <div className="blog-content">
                <h3 className="blog-title"><Link href="/study-in-australia">Explore Australia</Link></h3>
                <p className="desc">Top-ranked education in a multicultural environment with breathtaking landscapes, beautiful beaches, and a growing economy.</p>
                <div className="blog-button"><Link href="/study-in-australia">Learn More</Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

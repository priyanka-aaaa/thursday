import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF, faGoogle, faTwitter, faFacebook,
    faPinterest, faInstagram, faLinkedinIn
  } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <footer id="rs-footer" className="rs-footer">

      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-md-6">
              <div className="footer-logo mb-30">
                <a href="https://coursementor.com/">
                  <img src="/imageslogo-white.webp" alt="" loading="lazy" /></a>
              </div>
              <div className="textwidget pb-30">
                <p>Get the full-stack career guidance, study abroad with the best university match & live mentoring platform that matches students with the right courses, mentors and job opportunities.<br/><a href="https://coursementor.com/book-study-abroad-counseling"> Talk to our Expert </a></p>

              </div>
              <ul className="footer-social md-mb-30">
                <li>
                  <a href="https://www.facebook.com/coursementors/" target="_blank" title='Facebook'><span>
                    <FontAwesomeIcon icon={faFacebook} />
                  </span></a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/company/coursementor-study-abroad/" target="_blank" title='Linkedin'><span>

                    <FontAwesomeIcon icon={faLinkedinIn} />
                  </span></a>
                </li>
                <li>
                  <a href="https://www.instagram.com/course_mentor/" target="_blank" title='Pinterest'><span>
                    <FontAwesomeIcon icon={faPinterest} />

                  </span></a>
                </li>
                <li>
                  <a href="https://in.pinterest.com/Thecoursementor/_created/" target="_blank" title='Instagram'><span>
                    <FontAwesomeIcon icon={faInstagram} />

                  </span></a>
                </li>
              </ul>
            </div>
            <div className="col-xl-2 col-md-6">
              <h3 className="widget-title">Exploring</h3>
              <ul className="site-map">
                <li> <a href="https://coursementor.com/" title='Home'>
                  Home</a></li>
                <li> <a href="https://coursementor.com/about-us" title='About Us'>
                  About Us</a></li>

                <li>  <a href="https://coursementor.com/contact-us" title='Contact Us'>
                  Contact Us </a></li>
                  <li>  <a href="https://coursementor.com/blog" title='Contact Us'>
                  Blog</a></li>
              </ul>
              {/* <p className="widget-desc">We denounce with righteous and in and dislike men who are so beguiled and demo realized.</p> */}
            </div>
            <div className="col-xl-2 col-md-6">
              <h3 className="widget-title">Study Abroad</h3>
              <ul className="site-map">
                <li> <Link href={'/study-in-australia'} >
                  Study in Australia</Link>   </li>
                <li><Link href={'/study-in-canada'} >
                  Study in Canada</Link></li>
                <li><Link href={'/study-in-uk'} >
                  Study in UK</Link></li>
                <li><Link href={'/study-in-usa'} >
                  Study in US</Link></li>

              </ul>
            </div>
            <div className="col-xl-2 col-md-6">
              <h3 className="widget-title">Tests</h3>
              <ul className="site-map">
                <li> <a href="https://coursementor.com/ielts">
                  IELTS</a>   </li>
                <li><a href="https://coursementor.com/gmat">
                  GMAT</a></li>
                <li><a href="https://coursementor.com/gre">
                  GRE</a></li>
                <li><a href="https://coursementor.com/sat">
                  SAT</a></li>

              </ul>
            </div>
            <div className="col-xl-3 col-md-12">
              <h3 className="widget-title">In Association with</h3>
              <a href='https://www.iwinvisa.com/'><img src="/images/i-win.webp" alt="" loading="lazy" /></a>
            </div>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row y-middle">

            <div className="col-lg-12">
              <div className="copyright">
                <p>©Copyright  2022 <a href="http://Coursementor.com/" title='main website'> Coursementor.com</a> All
                  rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

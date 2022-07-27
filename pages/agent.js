import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { AgentLoginForm } from '../components/AgentLoginForm';
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
const Agent = () => {

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
    <>okok</>
  )
}
export default Agent
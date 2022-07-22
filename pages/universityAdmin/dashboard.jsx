import React, { useState, useEffect } from "react";
import Application from '../../components/universityAdmin/profile/Application';
import CoursesFee from '../../components/universityAdmin/profile/CoursesFee';
import PrimaryInfo from '../../components/universityAdmin/profile/PrimaryInfo';
import Overview from '../../components/universityAdmin/profile/Overview';
import Ranking from '../../components/universityAdmin/profile/Ranking';
import ImageVideo from '../../components/universityAdmin/profile/ImageVideo';
import Scholarship from '../../components/universityAdmin/profile/Scholarship';
import Faq from '../../components/universityAdmin/profile/Faq';
import Document from '../../components/universityAdmin/profile/Document';
export default function Dashboard() {
   return (
        <div className="container">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">University/School </h1>
        </div>
        <div className="row">
            <div className="col-xl-12 ">
                <div id="accordion">
                    <PrimaryInfo />
                    <Overview />
                    <CoursesFee />
                    <Application />
                    <Document />
                    <Scholarship />
                    <Ranking />
                    <ImageVideo />
                    <Faq />
                </div>
            </div>
        </div>
    </div>
  );
}

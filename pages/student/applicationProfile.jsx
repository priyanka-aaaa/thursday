import React from "react";
import PersonalInfoProfile from '../../components/ApplicationProfile/PersonalInfoProfile';
import Studentsidebar from '../../components/Studentsidebar';
import Topsidebar from '../../components/Topsidebar';
import AddressProfile from '../../components/ApplicationProfile/AddressProfile';
import FamilyProfile from '../../components/ApplicationProfile/FamilyProfile';
import EducationProfile from '../../components/ApplicationProfile/EducationProfile';
import TestScoreProfile from '../../components/ApplicationProfile/TestScoreProfile';
import WorkExperienceProfile from '../../components/ApplicationProfile/WorkExperienceProfile';
import ExtraCurricultarActivityProfile from '../../components/ApplicationProfile/ExtraCurricultarActivityProfile';
import RecommendationProfile from '../../components/ApplicationProfile/RecommendationProfile';
// import '../../scss/studentApplicationProfile.scss';
export default function ApplicationProfile() {
    return (
        <div id="page-top">
            <div id="wrapper">

                <Studentsidebar />
                <Topsidebar />

                <div className="row">
                    <div className="col-xl-12 col-lg-7">
                        <div id="accordion">

                            <PersonalInfoProfile />
                            <AddressProfile />
                            <FamilyProfile />
                            <EducationProfile />
                            <TestScoreProfile />
                            <WorkExperienceProfile />
                            <ExtraCurricultarActivityProfile />
                            <RecommendationProfile />
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    );
}
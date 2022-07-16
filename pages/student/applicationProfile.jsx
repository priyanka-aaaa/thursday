import React from "react";
import PersonalInfoProfile from '../../components/ApplicationProfile/PersonalInfoProfile';
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
        <div className="container">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Application Profile </h1>
            </div>
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
        </div>
    );
}
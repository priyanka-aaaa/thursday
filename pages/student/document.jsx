import React from "react";
import EducationDocument from '../../components/Mydocument/EducationDocument'
import WorkExperienceDocument from '../../components/Mydocument/WorkExperienceDocument';
import RecommendationDocument from '../../components/Mydocument/RecommendationDocument';
import ExtraCurricularDocument from '../../components/Mydocument/ExtraCurricularDocument';
import OtherDocument from '../../components/Mydocument/OtherDocument';
import EnglishProficiencyDocument from '../../components/Mydocument/EnglishProficiencyDocument';
import IdentityDocument from '../../components/Mydocument/IdentityDocument';
import StudentTopbar from '../../components/StudentTopbar';
import StudentSidebar from '../../components/StudentSidebar';
import StudentLayout from '../../components/StudentLayout';
// import Header from '../components/Header';
// import '../../scss/studentdocument.scss';
export default function Document() {

    return (
        <>
            <StudentLayout />
            <div className="mainmain">
                <div className="container">
                    <div className=" align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">Application Documents</h1>
                        <p className="extension">File extensions supported .pdf, .doc, .docx, .jpeg, .jpg, .png</p>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <div id="accordion">
                                    <IdentityDocument />
                                    <EducationDocument />
                                    <WorkExperienceDocument />
                                    <EnglishProficiencyDocument />
                                    <ExtraCurricularDocument />
                                    <RecommendationDocument />
                                    <OtherDocument />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

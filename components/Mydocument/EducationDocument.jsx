import React, { useState, useEffect } from "react";
import SecondaryEducation from './SecondaryEducation';
import Image from 'next/image'
import Ug from './Ug';
import Pg from './Pg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp,faTrash
} from '@fortawesome/free-solid-svg-icons';
export default function EducationDocument() {
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
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
    return (
        <div>
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse2" onClick={() => handleClick()} >
                    <strong>2</strong> Education Documents
                    {down === "0" ?
                        null
                        :
                        <FontAwesomeIcon icon={faAngleDown}  className="sidebar-faicon"style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",

                        }} />
                    }
                    {up === "0" ?
                        null
                        :
                        <FontAwesomeIcon icon={faAngleUp} className="sidebar-faicon"   style={{
                            position: "absolute",
                            fontWeight: 900,
                            fontFamily: 'Font Awesome 5 Free',
                            marginRight: "0.1rem",
                            right: "16px",
                        }} />
                    }
                </a>
                <div id="collapse2" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        <div className="form form_doc">
                            <div className="form form_doc">
                                <SecondaryEducation />
                                <hr />
                                <Ug />
                                <hr />
                                <Pg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
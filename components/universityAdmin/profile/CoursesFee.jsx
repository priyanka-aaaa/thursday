import React, { useState, useEffect } from "react";
import Courses from '../Courses'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp
} from '@fortawesome/free-solid-svg-icons';
export default function CoursesFee() {
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
                <a className="card-header" data-bs-toggle="collapse" href="#collapse3" onClick={() => handleClick()}><strong>3</strong>
                    Courses & Fees
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
                <div id="collapse3" className="collapse" data-bs-parent="#accordion">
                    <Courses />
                </div>

            </div>
        </div>
    );
}

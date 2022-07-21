
import React, { useState, useEffect, Suspense } from "react";
import { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import axios from 'axios';
import Image from 'next/image'
// import LoaderFrontend from './LoaderFrontend';
import { Modal, Button } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input'
 const EnquiryModal=()=> {
    const [UniveristyValues, setUniveristyValues] = useState([{
        universityPrimaryInformation: "", universityOverview: "", universityImage: "", _id: "", slug: ""
    }])
    const [enquiryname, setenquiryname] = useState("");
    const [enquiryemail, setenquiryemail] = useState("");
    const [enquiryphone, setenquiryphone] = useState("");
    const [enquiryservice, setenquiryservice] = useState("");
    const [enquirycountry, setenquirycountry] = useState("");
    const [enquiryphoneError, setenquiryphoneError] = useState("");
    const [enquiryemailError, setenquiryemailError] = useState("");
    const [showModalEnquiry, setshowModalEnquiry] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [studentToken, setstudentToken] = useState();
    const [loader, setmyloader] = useState("false");
    useEffect(() => {
        window.scrollTo(0, 0)
        const url1 = process.env.REACT_APP_SERVER_URL + 'universityCountry/Australia';
        fetch(url1, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data1 => {
                var myresultsUniversity = data1.universities;

                setUniveristyValues(data1.universities)
               
            })
    }, [])
    function openEnquiry() {
        setenquiryemailError("")
        setshowModalEnquiry(true)
    }
    function closeEnquiry() {
        setshowModalEnquiry(false)
    }
    function handleEnquiry(event) {
        event.preventDefault();
        setenquiryemailError("")
        setenquiryphoneError("")
        if (isValidPhoneNumber(enquiryphone) === false) {
            setenquiryphoneError("Please enter correct phone number");
        }
        else {
            setmyloader("true")
            const obj = {
                name: enquiryname,
                email: enquiryemail,
                phone: enquiryphone,
                level: enquiryservice,
                study: enquirycountry
            };
            axios.post(process.env.REACT_APP_SERVER_URL + 'student/enquiry', obj)
                .then(function (res) {
                    setmyloader("false")
                    if (res.data.success === true) {
                        window.location.href = "https://coursementor.com/thankyou";
                        setshowModalEnquiry(false)
                        setshowSweetAlert("1")
                    }
                    else if (res.data.message === "Student already exist") {
                        setenquiryemailError("Email already exist");
                    }
                    else {
                    }
                })
                .catch(error => {
                });
        }
    }
  return (
    <> <a className="readon started" title="Free Enquiry" onClick={() => openEnquiry()}> Get Started</a>
    {/* start */}
    <Modal className="modal-container enqblock"
        show={showModalEnquiry}
        onHide={() => closeEnquiry()}
        animation={true}
        bsSize="small" dialogClassName="modal-lg">
        <Modal.Header closeButton>
            <Modal.Title>Get Free Enquiry</Modal.Title>
        </Modal.Header>
        <div className="outside-iwinform">
            <div className="iwinform">
                <form className="iwin-home-form" onSubmit={handleEnquiry}>
                    <div className="row">
                        <div className="col-md-6">
                            <div id="iname" className="form-group">
                                <label>Name<span className="red">*</span></label>
                                <input id="name" type="text" name="nameasa" placeholder="Name"
                                    className="form-control name" required
                                    value={enquiryname}
                                    onChange={(e) => setenquiryname(e.target.value)}
                                />
                            </div>
                            <div id="i-email" className="form-group">
                                <label>Email<span className="red">*</span></label>
                                <input id="email" type="email" name="emailasa" placeholder="Email"
                                    className="form-control email" required
                                    value={enquiryemail}
                                    onChange={(e) => setenquiryemail(e.target.value)}
                                />
                                <div className="error-msg"> {enquiryemailError}</div>
                            </div>
                            <div id="iphone" className="form-group">
                                <label>Phone<span className="red">*</span></label>
                                <PhoneInput defaultCountry={"IN"}
                                    placeholder="Enter phone number"
                                    required
                                    value={enquiryphone}
                                    onChange={setenquiryphone} />


                                <div className="error-msg"> {enquiryphoneError}</div>
                            </div>
                            <div id="input-inquiry" className="form-group input-visa">
                                <label>Service Interested In<span className="red">*</span></label>
                                <select id="iwininquiry" name="inquiry" className="custom-select iwin-custom"
                                    value={enquiryservice}
                                    onChange={(e) => setenquiryservice(e.target.value)}
                                    required>
                                    <option value="">Select Your Choice</option>
                                    <option value="IELTS Classes">IELTS Classes</option>
                                    <option value="PTE Classes">PTE Classes</option>
                                    <option value="Study Visa">Study Visa</option>
                                    <option value="Tourist Visa">Tourist Visa</option>
                                    <option value="Visitor Visa">Visitor Visa</option>
                                    <option value="Spouse Visa">Spouse Visa</option>
                                    <option value="Business Visa">Business Visa</option>
                                </select>
                            </div>
                            <div id="input-destination" className="form-group study-destination">
                                <label>Country Interested In<span className="red">*</span></label>
                                <select id="iwindestination" name="inquiry" className="custom-select iwin-custom"
                                    value={enquirycountry}
                                    onChange={(e) => setenquirycountry(e.target.value)}
                                    required>
                                    <option value="">Your preferred study destination</option>
                                    <option value="United States of America">United States of America</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Canada">Canada</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Dubai">Dubai</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Germany">Germany</option>
                                    <option value="France">France</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Finland">Finland</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="China">China</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Japan">Japan</option>
                                </select>
                            </div>
                            <div className="form-btns">
                                <input type="submit" className="btn btn-enquiry" defaultValue="Send Request" />
                            </div>
                        </div>
                        <div className="col-md-6">
                        <img src="/images/enquiry-girl.webp" alt="dev logo" />

                        
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </Modal></>
  )
}
export default EnquiryModal

import React, { useState, useEffect, Suspense } from "react";
import { isValidPhoneNumber } from 'react-phone-number-input'
import axios from 'axios';

const PhoneInput = React.lazy(() => import('react-phone-number-input'));
const SweetAlert = React.lazy(() => import('react-bootstrap-sweetalert'));

function BookFree(props) {
  const [showSweetAlert, setshowSweetAlert] = useState("0");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setnameError] = useState("");

  const [successMessage, setsuccessMessage] = useState("");
  const [activeClass, setactiveClass] = useState("btn btn-bachler active");
  const [activeValue, setactiveValue] = useState("");
  const [activeCountryClass, setactiveCountryClass] = useState("active");
  const [activeCountryValue, setactiveCountryValue] = useState("");
  const [activeValueError, setactiveValueError] = useState("");
  const [activeCountryValueError, setactiveCountryValueError] = useState("");



  const [phoneError, setphoneError] = useState("");
  const [loader, setmyloader] = useState("false");
 
  function handleRegisterFormSubmit(event) {
    setnameError("");
    setemailError("");
    setphoneError("");
    setactiveValueError("")
    setactiveCountryValueError("")
    event.preventDefault();
    
    if (activeValue === "") {
      setactiveValueError("Please choose study level")
    }
    else if (activeCountryValue === "") {
      setactiveCountryValueError("Please choose country")
    }
    else if (name === "") {
      setnameError("Please enter name");
    }
    else if (email === "") {
      setemailError("Please enter email");
    }
    else if (phone === "") {
      setphoneError("Please enter phone number");
    }
    else if (isValidPhoneNumber(phone) === false) {
      setphoneError("Please enter correct phone number");
    }
    else {
      setmyloader("true")

      const obj = {
        name: name,
        email: email,
        phone: phone,
        level:activeValue,
        study:activeCountryValue

      };
      axios.post(process.env.REACT_APP_SERVER_URL + 'student/counselor', obj)
        .then(function (res) {
          setmyloader("false")

          if (res.data.success === true) {
            setshowSweetAlert("1")
            setName("");
            setEmail("");
            setPhone("");

          }
          else if (res.data.message === "Student already exist") {
            setemailError("Email already exist");
          }
          else {

          }
        })
        .catch(error => {

        });
    }

  }
  function handleLevel(value) {
    setactiveClass("active");
    setactiveValue(value);
  }
  function handlecountry(value) {

    setactiveCountryClass("active");
    setactiveCountryValue(value);
  }
  return (
    <div className="rs-about bookingblock modify2 pt-50 pb-50 ">

      {loader === "true" ?

     <></>
        : null}
      {showSweetAlert === "1" ?
        <Suspense fallback={<div>Loading...</div>}>
          <SweetAlert
            success
            title="Success!"
            onConfirm={(value) => {
              setshowSweetAlert("0")
            }}
          >
         Thank you for sending a free counselling session request. Our visa experts team will contact you soon!! Please regular check your email for updates.
          </SweetAlert>
        </Suspense>
        : null
      }
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-8 md-mb-50">
            <form onSubmit={handleRegisterFormSubmit}>
              <div className='book-counseling'>
                <h4>Book a Free Counseling Session</h4>

                <div className="form-group">
                  <label htmlFor="name" className="">Name</label>
                  <input name="name" className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text" id="name" placeholder="Enter Your Name" required />
                  <div className="error-msg"> {nameError}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="mobile" className="">Email</label>
                  <input name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control" type="text" id="phone" placeholder="Enter Your Email" />
                  <div className="error-msg">{emailError}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="mobile" className="">Mobile</label>
                  <Suspense fallback={<div>Loading...</div>}>
                    <PhoneInput     defaultCountry={"IN"}
                      placeholder="Enter phone number"
                      required
                      value={phone}
                      onChange={setPhone} />
                  </Suspense>

                  <div className="error-msg"> {phoneError}</div>
                </div>

                <div className='tabblock'>
                  <h5>What level of study are you looking to go for?</h5>
                  <div className='btngroup'>
                    {activeValue === "Bachelor" ?
                      <a className={"btn btn-bachler " + activeClass} onClick={() => handleLevel("Bachelor")}

                        title="Bachelor's"> Bachelor's</a>
                      :
                      <a className="btn btn-bachler " onClick={() => handleLevel("Bachelor")}
                        title="Bachelor's"> Bachelor's</a>}
                    {activeValue === "Master" ?
                      <a className={"btn btn-bachler " + activeClass} onClick={() => handleLevel("Master")}
                        title="Master's"> Master's</a>
                      :
                      <a className="btn btn-bachler" onClick={() => handleLevel("Master")}
                        title="Master's"> Master's</a>}

                    <div className="error-msg">{activeValueError}</div>
                  </div>
                  <div className='choose-country'>
                    <h5>Which country are you planning to study in?</h5>

                    <div className="brows-count-list"><ul>
                      <li>
                        {activeCountryValue === "Australia" ?
                          <a className="active" onClick={() => handlecountry("Australia")}>Australia</a>
                          :
                          <a onClick={() => handlecountry("Australia")}>Australia</a>

                        }</li>
                      <li>
                        {activeCountryValue === "USA" ?
                          <a className="active" onClick={() => handlecountry("USA")}>USA</a> :
                          <a onClick={() => handlecountry("USA")}>USA</a>
                        }
                      </li>

                      <li>
                        {activeCountryValue === "UK" ?
                          <a className="active" onClick={() => handlecountry("UK")}>UK</a> :
                          <a onClick={() => handlecountry("UK")}>UK</a>}
                      </li>
                      <li>
                        {activeCountryValue === "New Zealand" ?
                          <a className="active" onClick={() => handlecountry("New Zealand")}>New Zealand</a>
                          : <a onClick={() => handlecountry("New Zealand")}>New Zealand</a>
                        }
                      </li>
                      <li>
                        {activeCountryValue === "Germany" ?
                          <a className="active" onClick={() => handlecountry("Germany")}>Germany</a>
                          : <a onClick={() => handlecountry("Germany")}>Germany</a>
                        }
                      </li>
                      <li>
                        {activeCountryValue === "Canada" ?
                          <a className="active" onClick={() => handlecountry("Canada")}>Canada </a>
                          : <a onClick={() => handlecountry("Canada")}>Canada </a>
                        }
                      </li>
                      <li>
                        {activeCountryValue === "Other" ?
                          <a className="active" onClick={() => handlecountry("Other")}>Other</a>
                          : <a onClick={() => handlecountry("Other")}>Other</a>}
                      </li>
                    </ul></div>
                  </div>
                  <div className="error-msg">{activeCountryValueError}</div>
                  <p>By submitting this form, you agree to the <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a></p>

                  {/* <a className="readon started" href="#">Submit</a> */}
                  <button type="submit" className="readon started" title="Submit form">Submit</button>
                </div>

              </div>
            </form>
          </div>
          <div className="col-lg-4 pl-65 md-pl-15">
            <div className="about-img girlpict">
              <img src="/images/counseling.webp" alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookFree;
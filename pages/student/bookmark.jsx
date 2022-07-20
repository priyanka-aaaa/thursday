import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentTopbar from '../../components/StudentTopbar';
import StudentSidebar from '../../components/StudentSidebar';
import Image from 'next/image'
import SweetAlert from 'react-bootstrap-sweetalert';
import Link from 'next/link'
import Loader from '../../components/Loader';
// import Loader from '../Home/Loader';
// import Link from 'next/link'
// import '../../scss/bookmark.scss';
export default function Bookmark() {
  const [deleteId, setdeleteId] = useState();
  const [mounted, setMounted] = useState();
  const [UniveristyId, setUniveristyId] = useState("");
  const [firstName, setfirstName] = useState("");
  const [data, setdata] = useState([]);
  const [successMessage, setsuccessMessage] = useState("");
  const [submitSuccess, setsubmitSuccess] = useState("0");
  const [showSweetAlert, setshowSweetAlert] = useState("0");
  const [showBookmark, setshowBookmark] = useState("0");
  const [loader, setmyloader] = useState("false");
  useEffect(() => {
    var studentId = localStorage.getItem('studentId');
    var mounted = localStorage.getItem("studentToken")
    setMounted(mounted)
    if (studentId !== null) {
      const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
      fetch(url, {
        method: 'GET',
        headers: { 'Authorization': mounted }
      })
        .then(response => response.json())
        .then(data => {
          setdata(data.studentBookmarks)
          var myresults = data.studentBookmarks
          if (Object.keys(myresults).length !== 0) {
            setshowBookmark("1")
          }
        })
    }
  }, [])
  function onHandleUnBookmark(value) {
    setdeleteId(value)
    setshowSweetAlert("1")
  }
  return (
    <div id="page-top">

      <div id="wrapper">
        <StudentSidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <StudentTopbar />
            <div className="container">
              <studentsidebar />
            
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                {showBookmark === "1" ?
                  <h1 className="h3 mb-0 text-gray-800">My Favourites</h1> : <h1 className="h3 mb-0 text-gray-800">No BookMarks Available</h1>}
              </div>
              {submitSuccess === 1 ? <div className="Show_success_message">
                <strong>Success!</strong> {successMessage}
              </div> : null}
              {loader === "true" ?
                <Loader />
                : null}
              {showSweetAlert === "1" ? <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes"
                confirmBtnBsStyle="danger"
                title="Are you sure to Remove from Favourites?"
                onConfirm={(value) => {
                  setmyloader("true")
                  setshowSweetAlert("0");
                  axios.delete(process.env.REACT_APP_SERVER_URL + 'student/bookmarks/' + deleteId, { headers: { 'Authorization': mounted } })
                    .then(function (res) {
                      if (res.data.success === true) {
                        setmyloader("false")
                        setsuccessMessage("Remove from Favourites")
                        setTimeout(() => setsubmitSuccess(""), 3000);
                        setsubmitSuccess(1)
                        const url = process.env.REACT_APP_SERVER_URL + 'student/bookmarks';
                        fetch(url, {
                          method: 'GET',
                          headers: { 'Authorization': mounted }
                        })
                          .then(response => response.json())
                          .then(data => {
                            setdata(data.studentBookmarks)
                            var myresults = data.studentBookmarks
                            if (Object.keys(myresults).length !== 0) {
                              setshowBookmark("1")
                            }
                          })
                      }
                    })
                    .catch(error => {
                    });
                }}
                onCancel={() =>
                  setshowSweetAlert("0")
                }
                focusCancelBtn  >
              </SweetAlert>
                : null
              }
              <div className="row">
                {showBookmark === "1" ?
                  <div className="col-xl-12 col-lg-7">
                    <div className="card shadow mb-4">
                      <div className="row">
                        {data.map((object, i) => {
                          return (
                            <div className="col-md-4" key={i}>
                              <div className="bookmark-block">
                                <span>
                                  <Link href={'/schools/' + object.slug} target="_blank" >
                                    <a> <img src={object.logo} alt="logo" /></a>
                                  </Link>
                                </span>
                                <div className="bool-markcontent">
                                  <Link href={'/schools/' + object.slug} target="_blank" >
                                    <a>       <h5>University</h5>
                                      <p>{object.name}</p></a>
                                  </Link>


                                  <p className="btn btn-outline-danger" onClick={() => onHandleUnBookmark(object.universityID)} >Remove from Favourites</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

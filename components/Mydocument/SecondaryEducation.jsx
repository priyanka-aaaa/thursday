import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
// import Loader from '../../Home/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
export default function SecondaryEducation() {



    const [TenthMarksheetValue, setTenthMarksheetValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [TwelvethMarksheetValue, setTwelvethMarksheetValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [UGMarksheetValue, setUGMarksheetValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [toogleValues, settoogleValues] = useState("true");
    const [heroFiles, setHeroFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [mounted, setMounted] = useState();
    const [myugDegree, setmyugDegree] = useState();
    const [myugConsolidate, setmyugConsolidate] = useState();
    const [myUGMarksheet, setmyUGMarksheet] = useState();
    const [textflag, settextflag] = useState("none");
    const [deleteId, setdeleteId] = useState();
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [completedHeading, setcompletedHeading] = useState("inline");
    const [loader, setmyloader] = useState("false");
    const [submitError, setsubmitError] = useState("0");

    useEffect(() => {
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        if (studentId !== null) {
            function DocumentAll() {
                const url = process.env.REACT_APP_SERVER_URL + 'student/documents';
                fetch(url, {
                    method: 'GET',
                    headers: { 'Authorization': mounted }
                })
                    .then(response => response.json())
                    .then(data => {
                        var completeResult = data.studentDocuments
                        var TenthMarksheetData = completeResult.filter((item) => item.documentName === "10th Marksheet");
                        if (Object.keys(TenthMarksheetData).length !== 0) {
                            setTenthMarksheetValue(TenthMarksheetData[0])
                        }
                        else {
                            setTenthMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var TwelvethMarksheetData = completeResult.filter((item) => item.documentName === "12th Marksheet");
                        if (Object.keys(TwelvethMarksheetData).length !== 0) {
                            setTwelvethMarksheetValue(TwelvethMarksheetData[0])
                        }
                        else {
                            setTwelvethMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                     
                        if (Object.keys(TenthMarksheetData).length !== 0 || Object.keys(TwelvethMarksheetData).length !== 0 ) {
                            settoogleValues("true")

                        } else {
                            settoogleValues("false")
                        }

                    })
            }
            DocumentAll()
        }
    }, [])
    function DocumentAll() {
        const url = process.env.REACT_APP_SERVER_URL + 'student/documents';
        fetch(url, {
            method: 'GET',
            headers: { 'Authorization': mounted }
        })
            .then(response => response.json())
            .then(data => {
                var completeResult = data.studentDocuments
                var TenthMarksheetData = completeResult.filter((item) => item.documentName === "10th Marksheet");
                if (Object.keys(TenthMarksheetData).length !== 0) {
                    setTenthMarksheetValue(TenthMarksheetData[0])
                }
                else {
                    setTenthMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var TwelvethMarksheetData = completeResult.filter((item) => item.documentName === "12th Marksheet");
                if (Object.keys(TwelvethMarksheetData).length !== 0) {
                    setTwelvethMarksheetValue(TwelvethMarksheetData[0])
                }
                else {
                    setTwelvethMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
             
                if (Object.keys(TenthMarksheetData).length !== 0 || Object.keys(TwelvethMarksheetData).length !== 0 ) {
                    settoogleValues("true")

                } else {
                    settoogleValues("false")
                }

            })
    }
    function ToggleButton() {
        if (textflag == "none") {
            settextflag("inline")
            setcompletedHeading("none")
        }
        else {
            settextflag("none")
            setcompletedHeading("inline")
        }
    }
    const handleCheckedClick = event => {

        if (event.target.checked === false) {
            settoogleValues("false")
        }
        else {
            settoogleValues("true")
        }
    }
    function onDeleteHandle(value) {

        setdeleteId(value)
        setshowSweetAlert("1")
    }
    return (
        <div className="card-body">
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            {submitSuccess === 1 ? <div className="Show_success_message">
                <strong></strong> {successMessage}
            </div> : null}
            {submitError === 1 ? <div className="Show_error_message">
                <strong></strong> File extension not supported
            </div> : null}
            {showSweetAlert === "1" ? <SweetAlert
                warning
                showCancel
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"

                title="Are you sure?"
                onConfirm={(value) => {
                    setshowSweetAlert("0");
                    setmyloader("true")
                    const obj5 = new FormData();
                    fetch(process.env.REACT_APP_SERVER_URL + 'student/documents/' + deleteId, {
                        method: 'delete',
                        body: obj5,
                        headers: { 'Authorization': mounted },
                    })
                        .then(response => response.json())
                        .then(data => {
                            setmyloader("false")
                            setsuccessMessage("Deleted Successfully")
                            setTimeout(() => setsubmitSuccess(""), 3000);
                            setsubmitSuccess(1)
                            DocumentAll()
                        })
                }}
                onCancel={() =>
                    setshowSweetAlert("0")
                }
                focusCancelBtn
            >
            </SweetAlert>
                : null
            }
            <div className="form form_doc">
                <div className="row pl-4 pr-4 mt-3">

          
                    {/* start dummy */}
                    {toogleValues === "true"
                        ? null : <>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-10" >

                                {toogleValues === "false" ?
                                    <p>I haven't completed or pursuing Secondary Education</p>
                                    : null
                                }

                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-2 text-right pr-0">
                                <label className="switch" title="Show UG course Document">
                                    {toogleValues === "true" ?
                                        <input type="checkbox" checked

                                            onChange={(e) => handleCheckedClick(e)} />
                                        :
                                        <input type="checkbox"

                                            onChange={(e) => handleCheckedClick(e)} />
                                    }

                                    {/* <input type="checkbox" /> */}
                                    <span className="slider round"
                                    ></span>
                                </label>
                            </div> </>
                    }
                    {/* end dummy */}
                </div>
             
                {toogleValues === "true" ?
                    <div >
                        <div className="upload_doc d-flex flex-wrap align-items-center row mt-3">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                <p className="pl-4 pr-4 pt-0 pb-0">10th Marksheet<span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {TenthMarksheetValue.documentName !== "" &&
                                    TenthMarksheetValue.documentName !== undefined ? <div>
                                    {TenthMarksheetValue.fileExtension === "docx" || TenthMarksheetValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + TenthMarksheetValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalTenthMarksheet">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(TenthMarksheetValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalTenthMarksheet" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">10th Marksheet</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {TenthMarksheetValue.fileExtension === "jpeg" || TenthMarksheetValue.fileExtension === "jpg" || TenthMarksheetValue.fileExtension === "png" ?
                                                    <img src={TenthMarksheetValue.file} alt="TwelvethMarksheet" />
                                                    : TenthMarksheetValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={TenthMarksheetValue.file} width="100%" height="500px"></iframe>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : <Dropzone onDrop={(acceptedFiles) => {
                                        setmyloader("true")
                                        var fileName = acceptedFiles[0].path;

                                        var fileExtension = fileName.split('.').pop();

                                        if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                            || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                        ) {

                                            const obj5 = new FormData();

                                            obj5.append("documentName", "10th Marksheet");
                                            obj5.append("file", acceptedFiles[0]);
                                            obj5.append("fileExtension", fileExtension);
                                            obj5.append("name", "");
                                            fetch(process.env.REACT_APP_SERVER_URL + 'student/documents', {
                                                method: 'post',
                                                body: obj5,
                                                headers: { 'Authorization': mounted },
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    setmyloader("false")
                                                    DocumentAll()
                                                })
                                        }
                                        else {
                                            setmyloader("false")
                                            setTimeout(() => setsubmitError(""), 3000);
                                            setsubmitError(1)
                                        }
                                        setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)

                                        })));
                                    }} name="heroImage" multiple={false}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div style={{ fontSize: ".8rem" }}>
                                                    Upload/Drag & Drop here
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                }

                            </div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-0 text-center">
                            </div>
                        </div>
                        <div className="upload_doc d-flex flex-wrap align-items-center row mt-3">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                <p className="pl-4 pr-4 pt-0 pb-0">12th Marksheet <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {TwelvethMarksheetValue.documentName !== "" &&
                                    TwelvethMarksheetValue.documentName !== undefined ? <div>
                                    {TwelvethMarksheetValue.fileExtension === "docx" || TwelvethMarksheetValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + TwelvethMarksheetValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalTwelvethMarksheet">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(TwelvethMarksheetValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalTwelvethMarksheet" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">12th Marksheet </h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {TwelvethMarksheetValue.fileExtension === "jpeg" || TwelvethMarksheetValue.fileExtension === "jpg" || TwelvethMarksheetValue.fileExtension === "png" ?
                                                    <img src={TwelvethMarksheetValue.file} alt="TwelvethMarksheet" />
                                                    : TwelvethMarksheetValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={TwelvethMarksheetValue.file} width="100%" height="500px"></iframe>
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                    : <Dropzone onDrop={(acceptedFiles) => {
                                        setmyloader("true")
                                        var fileName = acceptedFiles[0].path;

                                        var fileExtension = fileName.split('.').pop();

                                        if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                            || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                        ) {

                                            const obj5 = new FormData();

                                            obj5.append("documentName", "12th Marksheet");
                                            obj5.append("file", acceptedFiles[0]);
                                            obj5.append("fileExtension", fileExtension);
                                            obj5.append("name", "");
                                            fetch(process.env.REACT_APP_SERVER_URL + 'student/documents', {
                                                method: 'post',
                                                body: obj5,
                                                headers: { 'Authorization': mounted },
                                            })
                                                .then(response => response.json())
                                                .then(data => {
                                                    setmyloader("false")
                                                    DocumentAll()
                                                })
                                        }
                                        else {
                                            setmyloader("false")
                                            setTimeout(() => setsubmitError(""), 3000);
                                            setsubmitError(1)
                                        }
                                        setThumbnailFiles(acceptedFiles.map(file => Object.assign(file, {
                                            preview: URL.createObjectURL(file)

                                        })));
                                    }} name="heroImage" multiple={false}>
                                        {({ getRootProps, getInputProps }) => (
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <div style={{ fontSize: ".8rem" }}>
                                                    Upload/Drag & Drop here
                                                </div>
                                            </div>
                                        )}
                                    </Dropzone>
                                }

                            </div>
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-0 text-center">
                            </div>
                        </div>
                      
                    </div>
                    : null}
            </div>
        </div >
    );
}

import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image'
export default function Ug() {



    const [UGDegreeValue, setUGDegreeValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [UGConsolidatedValue, setUGConsolidatedValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
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
                        var UGDegreeData = completeResult.filter((item) => item.documentName === "UG Degree Certificate");
                        if (Object.keys(UGDegreeData).length !== 0) {
                            setUGDegreeValue(UGDegreeData[0])
                        }
                        else {
                            setUGDegreeValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var UGConsolidatedData = completeResult.filter((item) => item.documentName === "UG Consolidated Marksheet");
                        if (Object.keys(UGConsolidatedData).length !== 0) {
                            setUGConsolidatedValue(UGConsolidatedData[0])
                        }
                        else {
                            setUGConsolidatedValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var UGMarksheetData = completeResult.filter((item) => item.documentName === "UG Marksheet");
                        if (Object.keys(UGMarksheetData).length !== 0) {
                            setUGMarksheetValue(UGMarksheetData[0])
                        }
                        else {
                            setUGMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

                        }
                        if (Object.keys(UGDegreeData).length !== 0 || Object.keys(UGConsolidatedData).length !== 0 || Object.keys(UGMarksheetData).length !== 0) {
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
                var UGDegreeData = completeResult.filter((item) => item.documentName === "UG Degree Certificate");
                if (Object.keys(UGDegreeData).length !== 0) {
                    setUGDegreeValue(UGDegreeData[0])
                }
                else {
                    setUGDegreeValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var UGConsolidatedData = completeResult.filter((item) => item.documentName === "UG Consolidated Marksheet");
                if (Object.keys(UGConsolidatedData).length !== 0) {
                    setUGConsolidatedValue(UGConsolidatedData[0])
                }
                else {
                    setUGConsolidatedValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var UGMarksheetData = completeResult.filter((item) => item.documentName === "UG Marksheet");
                if (Object.keys(UGMarksheetData).length !== 0) {
                    setUGMarksheetValue(UGMarksheetData[0])
                }
                else {
                    setUGMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

                }
                if (Object.keys(UGDegreeData).length !== 0 || Object.keys(UGConsolidatedData).length !== 0 || Object.keys(UGMarksheetData).length !== 0) {
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
            {loader === "true" ?
                <Loader />
                : null}
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
                                    <p>I haven't completed or pursuing any UG course</p>
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
                                <p className="pl-4 pr-4 pt-0 pb-0">UG Degree Certificate <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {UGDegreeValue.documentName !== "" &&
                                    UGDegreeValue.documentName !== undefined ? <div>
                                    {UGDegreeValue.fileExtension === "docx" || UGDegreeValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + UGDegreeValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalUGDegree">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(UGDegreeValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalUGDegree" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">UG Degree</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {UGDegreeValue.fileExtension === "jpeg" || UGDegreeValue.fileExtension === "jpg" || UGDegreeValue.fileExtension === "png" ?
                                                    <img src={UGDegreeValue.file} alt="UGConsolidated" />
                                                    : UGDegreeValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={UGDegreeValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "UG Degree Certificate");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">UG Consolidated Marksheet  <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {UGConsolidatedValue.documentName !== "" &&
                                    UGConsolidatedValue.documentName !== undefined ? <div>
                                    {UGConsolidatedValue.fileExtension === "docx" || UGConsolidatedValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + UGConsolidatedValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalUGConsolidated">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(UGConsolidatedValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalUGConsolidated" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">UG Consolidated Marksheet</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {UGConsolidatedValue.fileExtension === "jpeg" || UGConsolidatedValue.fileExtension === "jpg" || UGConsolidatedValue.fileExtension === "png" ?
                                                    <img src={UGConsolidatedValue.file} alt="UGConsolidated" />
                                                    : UGConsolidatedValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={UGConsolidatedValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "UG Consolidated Marksheet");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">UG Marksheet <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {UGMarksheetValue.documentName !== "" &&
                                    UGMarksheetValue.documentName !== undefined ? <div>
                                    {UGMarksheetValue.fileExtension === "docx" || UGMarksheetValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + UGMarksheetValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalUGMarksheet">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(UGMarksheetValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalUGMarksheet" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">UGMarksheet</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {UGMarksheetValue.fileExtension === "jpeg" || UGMarksheetValue.fileExtension === "jpg" || UGMarksheetValue.fileExtension === "png" ?
                                                    <img src={UGMarksheetValue.file} alt="UGConsolidated" />
                                                    : UGMarksheetValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={UGMarksheetValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "UG Marksheet");
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

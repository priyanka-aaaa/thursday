import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Pg() {



    const [PGDegreeValue, setPGDegreeValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [PGConsolidatedValue, setPGConsolidatedValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [PGMarksheetValue, setPGMarksheetValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [toogleValues, settoogleValues] = useState("true");
    const [heroFiles, setHeroFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [mounted, setMounted] = useState();
    const [myugDegree, setmyugDegree] = useState();
    const [myugConsolidate, setmyugConsolidate] = useState();
    const [myPGMarksheet, setmyPGMarksheet] = useState();
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
                        var PGDegreeData = completeResult.filter((item) => item.documentName === "PG Degree Certificate");
                        if (Object.keys(PGDegreeData).length !== 0) {
                            setPGDegreeValue(PGDegreeData[0])
                        }
                        else {
                            setPGDegreeValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var PGConsolidatedData = completeResult.filter((item) => item.documentName === "PG Consolidated Marksheet");
                        if (Object.keys(PGConsolidatedData).length !== 0) {
                            setPGConsolidatedValue(PGConsolidatedData[0])
                        }
                        else {
                            setPGConsolidatedValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var PGMarksheetData = completeResult.filter((item) => item.documentName === "PG Marksheet");
                        if (Object.keys(PGMarksheetData).length !== 0) {
                            setPGMarksheetValue(PGMarksheetData[0])
                        }
                        else {
                            setPGMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

                        }
                        if (Object.keys(PGDegreeData).length !== 0 || Object.keys(PGConsolidatedData).length !== 0 || Object.keys(PGMarksheetData).length !== 0) {
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
                var PGDegreeData = completeResult.filter((item) => item.documentName === "PG Degree Certificate");
                if (Object.keys(PGDegreeData).length !== 0) {
                    setPGDegreeValue(PGDegreeData[0])
                }
                else {
                    setPGDegreeValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var PGConsolidatedData = completeResult.filter((item) => item.documentName === "PG Consolidated Marksheet");
                if (Object.keys(PGConsolidatedData).length !== 0) {
                    setPGConsolidatedValue(PGConsolidatedData[0])
                }
                else {
                    setPGConsolidatedValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var PGMarksheetData = completeResult.filter((item) => item.documentName === "PG Marksheet");
                if (Object.keys(PGMarksheetData).length !== 0) {
                    setPGMarksheetValue(PGMarksheetData[0])
                }
                else {
                    setPGMarksheetValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

                }
                if (Object.keys(PGDegreeData).length !== 0 || Object.keys(PGConsolidatedData).length !== 0 || Object.keys(PGMarksheetData).length !== 0) {
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
                                    <p>I haven't completed or pursuing any PG course</p>
                                    : null
                                }

                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-2 text-right pr-0">
                                <label className="switch" title="Show PG course Document">
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
                                <p className="pl-4 pr-4 pt-0 pb-0">PG Degree Certificate <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {PGDegreeValue.documentName !== "" &&
                                    PGDegreeValue.documentName !== undefined ? <div>
                                    {PGDegreeValue.fileExtension === "docx" || PGDegreeValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + PGDegreeValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPGDegree">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(PGDegreeValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPGDegree" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">PG Degree</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {PGDegreeValue.fileExtension === "jpeg" || PGDegreeValue.fileExtension === "jpg" || PGDegreeValue.fileExtension === "png" ?
                                                    <img src={PGDegreeValue.file} alt="PGConsolidated" />
                                                    : PGDegreeValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={PGDegreeValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "PG Degree Certificate");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">PG Consolidated Marksheet  <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {PGConsolidatedValue.documentName !== "" &&
                                    PGConsolidatedValue.documentName !== undefined ? <div>
                                    {PGConsolidatedValue.fileExtension === "docx" || PGConsolidatedValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + PGConsolidatedValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPGConsolidated">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(PGConsolidatedValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPGConsolidated" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">PG Consolidated Marksheet</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {PGConsolidatedValue.fileExtension === "jpeg" || PGConsolidatedValue.fileExtension === "jpg" || PGConsolidatedValue.fileExtension === "png" ?
                                                    <img src={PGConsolidatedValue.file} alt="PGConsolidated" />
                                                    : PGConsolidatedValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={PGConsolidatedValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "PG Consolidated Marksheet");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">PG Marksheet <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {PGMarksheetValue.documentName !== "" &&
                                    PGMarksheetValue.documentName !== undefined ? <div>
                                    {PGMarksheetValue.fileExtension === "docx" || PGMarksheetValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + PGMarksheetValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPGMarksheet">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(PGMarksheetValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPGMarksheet" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">PGMarksheet</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {PGMarksheetValue.fileExtension === "jpeg" || PGMarksheetValue.fileExtension === "jpg" || PGMarksheetValue.fileExtension === "png" ?
                                                    <img src={PGMarksheetValue.file} alt="PGConsolidated" />
                                                    : PGMarksheetValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={PGMarksheetValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "PG Marksheet");
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

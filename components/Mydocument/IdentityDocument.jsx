import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
// import Loader from '../../Home/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function IdentityDocument() {
    const [heroFiles, setHeroFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [passportValue, setpassportValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [passportBackValue, setpassportBackValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [cvValue, setcvValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);

    const [mounted, setMounted] = useState();
    const [deleteId, setdeleteId] = useState();
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [submitError, setsubmitError] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [loader, setmyloader] = useState("false");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    useEffect(() => {

        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        //start dummy

        //end dummy
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
                        var passportData = completeResult.filter((item) => item.documentName === "Passport Front");
                        if (Object.keys(passportData).length !== 0) {
                            setpassportValue(passportData[0])
                        }
                        else {
                            setpassportValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var passportBackData = completeResult.filter((item) => item.documentName === "Passport Back");
                        if (Object.keys(passportBackData).length !== 0) {
                            setpassportBackValue(passportBackData[0])
                        }
                        else {
                            setpassportBackValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                        }
                        var cvData = completeResult.filter((item) => item.documentName === "CV");
                        if (Object.keys(cvData).length !== 0) {
                            setcvValue(cvData[0])
                        }
                        else {
                            setcvValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

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
                var passportData = completeResult.filter((item) => item.documentName === "Passport Front");
                if (Object.keys(passportData).length !== 0) {
                    setpassportValue(passportData[0])
                }
                else {
                    setpassportValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var passportBackData = completeResult.filter((item) => item.documentName === "Passport Back");
                if (Object.keys(passportBackData).length !== 0) {
                    setpassportBackValue(passportBackData[0])
                }
                else {
                    setpassportBackValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                }
                var cvData = completeResult.filter((item) => item.documentName === "CV");
                if (Object.keys(cvData).length !== 0) {
                    setcvValue(cvData[0])
                }
                else {
                    setcvValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])

                }


            })
    }

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
  
    function onDeleteHandle(value) {

        setdeleteId(value)
        setshowSweetAlert("1")
    }
    return (
        <div className="card">
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            <a className="card-header" data-bs-toggle="collapse" href="#collapseOne" onClick={() => handleClick()} >
                <strong>1</strong>   Identity Documents
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
                    <FontAwesomeIcon icon={faAngleUp} style={{
                        position: "absolute",
                        fontWeight: 900,
                        fontFamily: 'Font Awesome 5 Free',
                        marginRight: "0.1rem",
                        right: "16px",
                    }} />
                }

            </a>
            <div id="collapseOne" className="collapse" data-bs-parent="#accordion">
                <div className="card-body">
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
                        <div className="upload_doc d-flex flex-wrap align-items-center row mt-3">
                            <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                <p className="pl-4 pr-4 pt-0 pb-0">Passport Front<span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {passportValue.documentName !== "" &&
                                    passportValue.documentName !== undefined ? <div>
                                    {passportValue.fileExtension === "docx" || passportValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + passportValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button  title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPassport1">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(passportValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPassport1" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Passport</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {passportValue.fileExtension === "jpeg" || passportValue.fileExtension === "jpg" || passportValue.fileExtension === "png" ?
                                                    <img src={passportValue.file} alt="passportback" />
                                                    : passportValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={passportValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "Passport Front");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">Passport Back <span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {passportBackValue.documentName !== "" &&
                                    passportBackValue.documentName !== undefined ? <div>
                                    {passportBackValue.fileExtension === "docx" || passportBackValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + passportBackValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button  title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPassport2">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(passportBackValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPassport2" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">Passport</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {passportBackValue.fileExtension === "jpeg" || passportBackValue.fileExtension === "jpg" || passportBackValue.fileExtension === "png" ?
                                                    <img src={passportBackValue.file} alt="passportback" />
                                                    : passportBackValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={passportBackValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "Passport Back");
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
                                <p className="pl-4 pr-4 pt-0 pb-0">CV<span className="text-danger">*</span></p>
                            </div>
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                {cvValue.documentName !== "" &&
                                    cvValue.documentName !== undefined ? <div>
                                    {cvValue.fileExtension === "docx" || cvValue.fileExtension === "doc" ?
                                        <a href={"https://coursementor.com/uploadApi/download.php?file=" + cvValue.file}
                                            title="view document" type="button" className="btn btn-outline-primary" >View
                                        </a>
                                        :
                                        <button  title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalPassport3">
                                            View
                                        </button>
                                    }
                                    <button title="Delete" type="button"
                                        onClick={() => onDeleteHandle(cvValue._id)}
                                        className="btn btn-outline-danger">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <div className="modal" id="myModalPassport3" >
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h4 className="modal-title">CV</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                {cvValue.fileExtension === "jpeg" || cvValue.fileExtension === "jpg" || cvValue.fileExtension === "png" ?
                                                    <img src={cvValue.file} alt="passportback" />
                                                    : cvValue.fileExtension === "pdf" ?
                                                        <div>
                                                            <iframe src={cvValue.file} width="100%" height="500px"></iframe>
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

                                            obj5.append("documentName", "CV");
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
                </div>
            </div>

        </div>
    );
}
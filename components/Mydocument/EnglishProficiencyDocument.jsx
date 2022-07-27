import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import Image from 'next/image'
// import Loader from '../../Home/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function EnglishProficiencyDocument() {
    const [englishProficiencyValue, setenglishProficiencyValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [toogleValues, settoogleValues] = useState("false");
    const [heroFiles, setHeroFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [mounted, setMounted] = useState();
    const [mymarksheet12, setmymarksheet12] = useState();
    const [myfile, setmyfile] = useState();
    const [test, settest] = useState();
    const [testtype, settesttype] = useState("none");
    const [submittest, setsubmittest] = useState("none");
    const [textflag, settextflag] = useState("none");
    const [submitError2, setsubmitError2] = useState("0");
    const [deleteId, setdeleteId] = useState();
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [completedHeading, setcompletedHeading] = useState("inline");
    const [englishProficiencyName, setenglishProficiencyName] = useState("inline");
    const [englishProficiencyIELTS, setenglishProficiencyIELTS] = useState("inline");
    const [englishProficiencyTOEFL, setenglishProficiencyTOEFL] = useState("inline");
    const [englishProficiencyPTE, setenglishProficiencyPTE] = useState("inline");
    const [englishProficiencyDuolingo, setenglishProficiencyDuolingo] = useState("inline");
    const [loader, setmyloader] = useState("false");
    const [submitError, setsubmitError] = useState("0");
    const [englishProficiencyExtenstion, setenglishProficiencyExtenstion] = useState(".jpg");
    const [englishProficiencyBackExtenstion, setenglishProficiencyBackExtenstion] = useState(".jpg");
    const [cvExtenstion, setcvExtenstion] = useState(".jpg");
    const [myenglishProficiencyDocx, setmyenglishProficiencyDocx] = useState("0");
    const [myenglishProficiencyBackDocx, setmyenglishProficiencyBackDocx] = useState("0");
    const [mycvDocx, setmycvDocx] = useState("0");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
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
                        var englishProficiencyData = completeResult.filter((item) => item.documentName === "English Proficiency");
                        if (Object.keys(englishProficiencyData).length !== 0) {
                            setenglishProficiencyValue(englishProficiencyData[0])
                            settoogleValues("true")
                        }
                        else {
                            setenglishProficiencyValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                            settoogleValues("false")
                        }
                    })
            }
            DocumentAll();
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
                var englishProficiencyData = completeResult.filter((item) => item.documentName === "English Proficiency");
                if (Object.keys(englishProficiencyData).length !== 0) {
                    setenglishProficiencyValue(englishProficiencyData[0])
                    settoogleValues("true")
                }
                else {
                    setenglishProficiencyValue([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }])
                    settoogleValues("false")
                }
            })
    }
    function onChangeIelts(e) {
        settest(e)
        setenglishProficiencyName("selected")
        setenglishProficiencyIELTS("selected")
        setenglishProficiencyTOEFL("")
        setenglishProficiencyPTE("")
        setenglishProficiencyDuolingo("")
    }
    function onChangeToefl(e) {
        settest(e)
        setenglishProficiencyName("selected")
        setenglishProficiencyIELTS("")
        setenglishProficiencyTOEFL("selected")
        setenglishProficiencyPTE("")
        setenglishProficiencyDuolingo("")
    }
    function onChangePte(e) {
        settest(e)
        setenglishProficiencyName("selected")
        setenglishProficiencyIELTS("")
        setenglishProficiencyTOEFL("")
        setenglishProficiencyPTE("selected")
        setenglishProficiencyDuolingo("")

    }
    function onChangeDuolingo(e) {
        settest(e)
        setenglishProficiencyIELTS("")
        setenglishProficiencyTOEFL("")
        setenglishProficiencyPTE("")
        setenglishProficiencyDuolingo("selected")
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
    function onDeletefileHandle(value) {
        setdeleteId(value)
        setshowSweetAlert("1")
    }
    function viewMyenglishProficiencyDocument() {
        setmyenglishProficiencyDocx("1")
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
        <div className="card">
            {/* {loader === "true" ?
                <Loader />
                : null} */}
            <a className="card-header" data-bs-toggle="collapse" href="#collapsefour" onClick={() => handleClick()}>
                <strong>4</strong>  English Proficiency Test Document

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
            <div id="collapsefour" className="collapse" data-bs-parent="#accordion">
                {submitSuccess === 1 ? <div className="Show_success_message">
                    <strong></strong> {successMessage}
                </div> : null}
                {submitError === 1 ? <div className="Show_error_message">
                    <strong></strong> File extension not supported
                </div> : null}
                {submitError2 === 1 ? <div className="Show_error_message">
                    <strong></strong> Please Select English Proficiency Test
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
                <div className="card-body">
                    <div className="form form_doc">
                        <div className="row pl-4 pr-4 mt-3">
                        {toogleValues == "true" ?
                            null
                            : <div className="row pl-4 pr-4 mt-3">
                                <div className="col-md-8">
                                    {toogleValues === "false" ?
                                        <p>I haven't done any extra curricular activites</p>
                                        : null
                                    }
                                </div>
                                <div className="col-md-4 text-right">
                                    <label className="switch3" title="Show Work Experience">
                                        {toogleValues === "true" ?
                                            <input type="checkbox" checked

                                                onChange={(e) => handleCheckedClick(e)} />
                                            :
                                            <input type="checkbox"

                                                onChange={(e) => handleCheckedClick(e)} />
                                        }

                                        <span className="slider round"

                                        ></span>
                                    </label>
                                </div>
                            </div>}
                        </div>
                        {toogleValues === "true" ?
                            <div>
                                <div className="upload_doc d-flex flex-wrap align-items-center row">
                                    <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" >
                                            {englishProficiencyValue.name === "" || englishProficiencyValue.name === undefined || englishProficiencyValue.name === "none" ?
                                                <div className="form-group">
                                                    <label>Please select English Proficiency Test <span className="text-danger">*</span>
                                                    </label>
                                                    <div role="group" className="doc_choice btn-group" >
                                                        <input type="hidden" />
                                                        <button type="button"
                                                            onClick={() => onChangeIelts("IELTS")}
                                                            className={englishProficiencyIELTS + " btn btn-secondary"} >IELTS</button>
                                                        <button type="button" onClick={() => onChangeToefl("TOEFL")} className={englishProficiencyTOEFL + " btn btn-secondary"}>TOEFL</button>
                                                        <button type="button" onClick={() => onChangePte("PTE")} className={englishProficiencyPTE + " btn btn-secondary"}>PTE</button>
                                                        <button type="button" onClick={() => onChangeDuolingo("Duolingo")} className={englishProficiencyDuolingo + " btn btn-secondary"}>Duolingo</button>
                                                    </div>
                                                </div>
                                                : englishProficiencyValue.name + " Score Card"}
                                        </div>
                                    </div>
                                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">

                                        {englishProficiencyValue.documentName !== "" &&
                                            englishProficiencyValue.documentName !== undefined ? <div>
                                            {englishProficiencyValue.fileExtension === "docx" || englishProficiencyValue.fileExtension === "doc" ?
                                                <a href={"https://coursementor.com/uploadApi/download.php?file=" + englishProficiencyValue.file}
                                                    title="view document" type="button" className="btn btn-outline-primary" >View
                                                </a>
                                                :
                                                <button title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#myModalenglishProficiency1">
                                                    View
                                                </button>
                                            }
                                            <button title="Delete" type="button"
                                                onClick={() => onDeleteHandle(englishProficiencyValue._id)}
                                                className="btn btn-outline-danger">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                            <div className="modal" id="myModalenglishProficiency1" >
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h4 className="modal-title">English Proficiency</h4>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>
                                                        {englishProficiencyValue.fileExtension === "jpeg" || englishProficiencyValue.fileExtension === "jpg" || englishProficiencyValue.fileExtension === "png" ?
                                                            <img src={englishProficiencyValue.file} alt="englishProficiencyback" />
                                                            : englishProficiencyValue.fileExtension === "pdf" ?
                                                                <div>
                                                                    <iframe src={englishProficiencyValue.file} width="100%" height="500px"></iframe>
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
                                                    if (test !== "" && test !== undefined) {
                                                    const obj5 = new FormData();

                                                    obj5.append("documentName", "English Proficiency");
                                                    obj5.append("file", acceptedFiles[0]);
                                                    obj5.append("fileExtension", fileExtension);
                                                    obj5.append("name", test);
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
                                                        setTimeout(() => setsubmitError2(""), 3000);
                                                        setsubmitError2(1)
                                                    }
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
                                </div>
                            </div> : null}
                    </div>
                </div>
            </div>
            {(englishProficiencyExtenstion === "docx" || englishProficiencyExtenstion === "doc") && myenglishProficiencyDocx === "1" ?
                <iframe src={myfile} className="DocsFrame"></iframe>
                : null
            }
        </div>
    );
}
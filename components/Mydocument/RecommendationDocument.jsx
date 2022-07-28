import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';

export default function RecommendationDocument() {
    const [formValues, setformValues] = useState([{
        companyName: '', document: "", _id: "null"
    }])
    const [formValue, setformValue] = useState([{ 'documentName': '', 'file': '', 'fileExtension': '', 'name': '' }]);
    const [experienceDocumentExist, setexperienceDocumentExist] = useState(0);
    const [toogleValues, settoogleValues] = useState("false");

    const [documentExtension, setdocumentExtension] = useState("");
    const [documentValue, setdocumentValue] = useState("");

    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [mounted, setMounted] = useState();
    const [name, setname] = useState("");

    const [companyName, setcompanyName] = useState("");
    const [mydocument, setmydocument] = useState();
    const [textflag, settextflag] = useState("none");
    const [deleteId, setdeleteId] = useState();
    const [submitError2, setsubmitError2] = useState("0");
    const [submitcompanyName, setsubmitcompanyName] = useState("none");
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [viewDetail, setviewDetail] = useState("none");
    const [document, setdocument] = useState("inline");

    const [showDeleteSweetAlert, setshowDeleteSweetAlert] = useState("0");

    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [completedHeading, setcompletedHeading] = useState("inline");
    const [loader, setmyloader] = useState("false");
    const [submitError, setsubmitError] = useState("0");
    const [passportExtenstion, setpassportExtenstion] = useState(".jpg");
    const [passportBackExtenstion, setpassportBackExtenstion] = useState(".jpg");
    const [cvExtenstion, setcvExtenstion] = useState(".jpg");
    const [myPassportDocx, setmyPassportDocx] = useState("0");
    const [myPassportBackDocx, setmyPassportBackDocx] = useState("0");
    const [mycvDocx, setmycvDocx] = useState("0");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    useEffect(() => {

        setmyPassportDocx("0")
        var studentId = localStorage.getItem('studentId');
        var mounted = localStorage.getItem("studentToken")
        setMounted(mounted)
        //start dummy
        function DocumentAll() {
            const url = process.env.REACT_APP_SERVER_URL + 'student/documents';
            fetch(url, {
                method: 'GET',
                headers: { 'Authorization': mounted }
            })
                .then(response => response.json())
                .then(data => {
                    var completeResult = data.studentDocuments
                    var workData = completeResult.filter((item) => item.documentName === "Recommendation");
                    if (Object.keys(workData).length !== 0) {
                        setformValue(workData)
                        settoogleValues("true")
                    }
                    else {
                        settoogleValues("false")
                        setformValue([{
                            'documentName': '', 'file': '', 'fileExtension': '', 'name': ''
                        }])
                    }

                })
        }
        DocumentAll();
        //end dummy
        
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
                var workData = completeResult.filter((item) => item.documentName === "Recommendation");
                if (Object.keys(workData).length !== 0) {
                    setformValue(workData)
                    settoogleValues("true")
                }
                else {
                    settoogleValues("false")
                    setformValue([{
                        'documentName': '', 'file': '', 'fileExtension': '', 'name': ''
                    }])
                }

            })
    }

    let handleChange = (i, e) => {

        let newFormValue = [...formValue];
        newFormValue[i][e.target.name] = e.target.value;
        setformValue(newFormValue);
    }
    let addFormFields = () => {
        setformValue([...formValue, {
            'documentName': '', 'file': '', 'fileExtension': '', 'name': ''
        }])
    }
    function onDeleteHandle(value) {

        setdeleteId(value)
        setshowSweetAlert("1")
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
    function viewMyPassportDocument(value) {

        // alert(docValue)
        // if (docValue != "") {
        //     setmyPassportDocx("1")
        // }
        setmyPassportDocx("1")

        setdocumentValue(value)
    }
  
    function onDeletefileHandle(value) {


        setdeleteId(value)
        setshowSweetAlert("1")
    }


    const handleCheckedClick = event => {

        if (event.target.checked === false) {
            settoogleValues("false")
        }
        else {
            settoogleValues("true")
        }

        if (event.target.checked === false && experienceDocumentExist === 1) {
            setshowDeleteSweetAlert("1")
        }


    }

    return (
        <div className="card">
            {loader === "true" ?
                <Loader />
                : null}
            <a className="card-header" data-bs-toggle="collapse" href="#collapse6" onClick={() => handleClick()}>
                <strong>6</strong>  Recommendation Document

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
            <div id="collapse6" className="collapse" data-bs-parent="#accordion">
                {submitSuccess === 1 ? <div className="Show_success_message">
                    <strong></strong> {successMessage}
                </div> : null}
                {submitError === 1 ? <div className="Show_error_message">
                    <strong></strong> File extension not supported
                </div> : null}
                {submitError2 === 1 ? <div className="Show_error_message">
                    <strong></strong> Please Enter Activity Name
                </div> : null}
                {showSweetAlert === "1" ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={(value) => {
                        setmyloader("true")
                        setshowSweetAlert("0");

                        fetch(process.env.REACT_APP_SERVER_URL + 'student/documents/' + deleteId, {
                            method: 'delete',
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
                    focusCancelBtn   >
                </SweetAlert>
                    : null
                }
                {showDeleteSweetAlert === "1" ? <SweetAlert
                    warning
                    showCancel
                    confirmBtnText="Yes, delete it!"
                    confirmBtnBsStyle="danger"
                    title="Are you sure?"
                    onConfirm={(value) => {
                        setmyloader("true")
                        setshowDeleteSweetAlert("0");

                        fetch(process.env.REACT_APP_SERVER_URL + 'student/expDocumentAll', {
                            method: 'delete',
                            headers: { 'Authorization': mounted },
                        })
                            .then(response => response.json())
                            .then(data => {
                                setmyloader("false")
                                setsuccessMessage("Deleted Successfully")
                                setTimeout(() => setsubmitSuccess(""), 3000);
                                setsubmitSuccess(1)
                             
                            })
                    }}
                    onCancel={() => {
                        setshowDeleteSweetAlert("0");
                        settoogleValues("true")
                    }
                    }
                    focusCancelBtn   >
                </SweetAlert>
                    : null
                }
                <div className="card-body">
                    <div className="form form_doc">
                        {toogleValues == "true" ?
                            null
                            : <div className="row pl-4 pr-4 mt-3">
                                <div className="col-md-8">
                                    {toogleValues === "false" ?
                                        <p>I don't have any recommender</p>
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
                        {toogleValues === "true" ?
                            <div>
                                <div className="row mt-3">
                                    {formValue.map((element, index) => (
                                        <div className="col-12 col-sm-12 col-md-12 col-lg-12" key={index}>
                                            <div className="form form_doc document">
                                                <div className="add-more">
                                                    <div className="upload_doc d-flex flex-wrap align-items-center row">
                                                        <div className="col-3 col-sm-3 col-md-3 col-lg-3">
                                                            <div className="from-group">
                                                                <label>Recommendation Name<span className="text-danger">*</span></label>
                                                                <input className="ant-input w-100 form-control"
                                                                    value={element.name || ""}

                                                                    onChange={e => handleChange(index, e)}
                                                                    name="name"
                                                                    placeholder="Enter Recommendation Name" type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-3 col-sm-3 col-md-3 col-lg-3 text-left">
                                                            <p>Upload Document</p>
                                                            {element.documentName !== "" &&
                                                                element.documentName !== undefined ? <div>
                                                                {element.fileExtension === "docx" || element.fileExtension === "doc" ?
                                                                    <a

                                                                        href={"https://coursementor.com/uploadApi/download.php?file=" + element.file}

                                                                        title="view document" type="button" className="btn btn-outline-primary" >View
                                                                    </a>
                                                                    :
                                                                    <a



                                                                        title="view document" type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target={"#myModalrecommendation" + index} >
                                                                        View
                                                                    </a>
                                                                }
                                                                <button title="Delete" type="button"
                                                                    onClick={() => onDeleteHandle(element._id)}
                                                                    className="btn btn-outline-danger">
                                                                    <FontAwesomeIcon icon={faTrash} />
                                                                </button>
                                                                <div className="modal" id={"myModalrecommendation" + index} >
                                                                    <div className="modal-dialog">
                                                                        <div className="modal-content">
                                                                            <div className="modal-header">
                                                                                <h4 className="modal-title">Passport</h4>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                            </div>
                                                                            {element.fileExtension === "jpeg" || element.fileExtension === "jpg" || element.fileExtension === "png" ?
                                                                                <img src={element.file} alt="passportback" />
                                                                                : element.fileExtension === "pdf" ?
                                                                                    <div>
                                                                                        <iframe src={element.file} width="100%" height="500px"></iframe>
                                                                                    </div>
                                                                                    : null
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {myPassportDocx === "1" ? <>
                                                                    <iframe src={documentValue} className="DocsFrame"></iframe></>
                                                                    : null
                                                                }
                                                            </div>
                                                                : <Dropzone onDrop={(acceptedFiles) => {
                                                                    setmyloader("true")
                                                                    var fileName = acceptedFiles[0].path;

                                                                    var fileExtension = fileName.split('.').pop();

                                                                    if (fileExtension === "pdf" || fileExtension === "doc" || fileExtension === "docx"
                                                                        || fileExtension === "jpeg" || fileExtension === "jpg" || fileExtension === "png"
                                                                    ) {
                                                                        setmyPassportDocx("0")
                                                                        if (element.name !== "" && element.name !== undefined) {
                                                                            const obj5 = new FormData();

                                                                            obj5.append("documentName", "Recommendation");
                                                                            obj5.append("file", acceptedFiles[0]);
                                                                            obj5.append("fileExtension", fileExtension);
                                                                            obj5.append("name", element.name);

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
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button title="Add New Test Score" type="button" className="btn btn-success mt-3" onClick={() => addFormFields()}>Add New</button>
                            </div>
                            : null}
                    </div>
                </div>
            </div>

        </div>
    );
}


import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Loader from '../../Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown, faAngleUp, faTrash
} from '@fortawesome/free-solid-svg-icons';
export default function ImageVideo() {

    const [videoLink, setvideoLink] = useState([]);

    const [universityId, setuniversityId] = useState([]);
    const [heroFiles, setHeroFiles] = useState([]);
    const [thumbnailFiles, setThumbnailFiles] = useState([]);
    const [mounted, setMounted] = useState();
    const [mylogo, setmylogo] = useState();
    const [mycoverPic, setmycoverPic] = useState();
    const [deleteId, setdeleteId] = useState();
    const [successMessage, setsuccessMessage] = useState("");
    const [submitSuccess, setsubmitSuccess] = useState("0");
    const [showSweetAlert, setshowSweetAlert] = useState("0");
    const [pikshowSweetAlert, setpikshowSweetAlert] = useState("0");
    const [down, setdown] = useState("1");
    const [up, setup] = useState("0");
    const [myimageVideo, setmyimageVideo] = useState([{
        link: "", type: "", youtubeId: ""
    }])
    const [loader, setmyloader] = useState("false");
    const [adminUniversityId, setadminUniversityId] = useState("");
    const [adminmounted, setadminmounted] = useState("");
    useEffect(() => {
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setadminUniversityId(adminUniversityId)
        var adminmounted = localStorage.getItem("adminToken")
        setadminmounted(adminmounted)
        if (adminUniversityId !== null) {
            fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/image', {
                method: 'get',
                headers: { 'Authorization': mounted },
            })
                .then(response => response.json())
                .then(data => {
                    setmylogo(data.universityImage.logo)
                    setmycoverPic(data.universityImage.coverPic)
                })
            fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/imageVideos ', {
                method: 'get',
                headers: { 'Authorization': mounted },
            })
                .then(response => response.json())
                .then(data => {

                    setmyimageVideo(data.universityImageVideos)
                })
        }
        var universityId = localStorage.getItem('universityId');
        var mounted = localStorage.getItem('universityToken');
        setMounted(mounted)
        setuniversityId(universityId)

    }, [])
    function handleFormSubmit(event) {
        event.preventDefault();
        var adminUniversityId = localStorage.getItem('adminUniversityId');
        setmyloader("true")
        const obj5 = new FormData();
        obj5.append("link", videoLink);
        obj5.append("type", "video");
        fetch(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/imageVideos', {
            method: 'post',
            body: obj5,
            headers: { 'Authorization': adminmounted },
        })
            .then(response => response.json())
            .then(data => {
                setmyloader("false")

                fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/imageVideos', {
                    method: 'get',
                    headers: { 'Authorization': adminmounted },
                })
                    .then(response => response.json())
                    .then(data => {

                        setmyimageVideo(data.universityImageVideos)
                    })
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
    function onDeletelogoHandle(value) {
        setdeleteId(value)
        setshowSweetAlert("1")
    }
    function onDeletecoverPikHandle(value) {
        setdeleteId(value)
        setpikshowSweetAlert("1")
    }
    let handleDeleteClick = (value) => {
        setshowSweetAlert("1")
        setdeleteId(value)
    }
    return (
        <div>
            <div className="card">
                <a className="card-header" data-bs-toggle="collapse" href="#collapse8" onClick={() => handleClick()}><strong>8</strong>
                    Images/Video
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
                <div id="collapse8" className="collapse" data-bs-parent="#accordion">
                    <div className="card-body">
                        {loader === "true" ?
                            <Loader />
                            : null}

                        {submitSuccess === 1 ? <div className="Show_success_message">
                            <strong></strong> {successMessage}
                        </div> : null}
                        {showSweetAlert === "1" ? <SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"
                            title="Are you sure?"
                            onConfirm={(value) => {
                                var adminUniversityId = localStorage.getItem('adminUniversityId');
                                setshowSweetAlert("0");
                                setmyloader("true")
                                fetch( process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/imageVideos/' + deleteId, {
                                    method: 'delete',
                                    headers: { 'Authorization': adminmounted },
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        setmyloader("false")
                                        setsuccessMessage("Deleted Successfully")
                                        setTimeout(() => setsubmitSuccess(""), 3000);
                                        setsubmitSuccess(1)
                                        fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/imageVideos', {
                                            method: 'get',
                                            headers: { 'Authorization': adminmounted },
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setmyimageVideo(data.universityImageVideos)
                                            })
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
                        {pikshowSweetAlert === "1" ? <SweetAlert
                            warning
                            showCancel
                            confirmBtnText="Yes, delete it!"
                            confirmBtnBsStyle="danger"

                            title="Are you sure?"
                            onConfirm={(value) => {
                                setpikshowSweetAlert("0");
                                setmyloader("true")
                                const obj6 = new FormData();
                                obj6.append(deleteId, "*");
                                fetch(
                                    process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/image', {
                                    method: 'put',
                                    body: obj6,
                                    headers: { 'Authorization': adminmounted },
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        setmyloader("false")
                                        setsuccessMessage("Deleted Successfully")
                                        setTimeout(() => setsubmitSuccess(""), 3000);
                                        setsubmitSuccess(1)
                                        fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/image', {
                                            method: 'get',
                                            headers: { 'Authorization': adminmounted },
                                        })
                                            .then(response => response.json())
                                            .then(data => {
                                                setmylogo(data.universityImage.logo)
                                                setmycoverPic(data.universityImage.coverPic)
                                            })
                                    })
                            }}
                            onCancel={() =>
                                setpikshowSweetAlert("0")
                            }
                            focusCancelBtn
                        >
                        </SweetAlert>
                            : null
                        }
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Logo(size 250*250px)</b></label><br />
                                    <div className="documentUpload ant-upload-picture-card-wrapper" >
                                        <div className="ant-upload-list ant-upload-list-picture-card">
                                        </div>
                                        <div className="upload_doc d-flex flex-wrap align-items-center row">
                                            {mylogo === "" || mylogo === "*" || mylogo === null || mylogo === undefined ?

                                                <Dropzone onDrop={(acceptedFiles) => {
                                                    var adminUniversityId = localStorage.getItem('adminUniversityId');
                                                    setmyloader("true")
                                                    const obj5 = new FormData();
                                                    obj5.append("logo", acceptedFiles[0]);
                                                    fetch(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/image', {
                                                        method: 'put',
                                                        body: obj5,
                                                        headers: { 'Authorization': adminmounted },
                                                    })
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            setmyloader("false")
                                                            fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/image', {
                                                                method: 'get',
                                                                headers: { 'Authorization': adminmounted },
                                                            })
                                                                .then(response => response.json())
                                                                .then(data => {
                                                                    setmylogo(data.universityImage.logo)
                                                                    setmycoverPic(data.universityImage.coverPic)

                                                                })
                                                        })
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
                                                :
                                                <div>
                                                    <div className="upload_doc d-flex flex-wrap align-items-center row mb-3">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">
                                                            <button type="button" className="btn btn-outline-primary btn-view" data-bs-toggle="modal" data-bs-target="#myModallogo">
                                                                View
                                                            </button>
                                                        </div>
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-0 text-center">
                                                            <button type="button" onClick={() => onDeletecoverPikHandle("logo")} className="btn btn-outline-danger">
                                                                <FontAwesomeIcon icon={faTrash} />

                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="modal" id="myModallogo">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h4 className="modal-title">logo </h4>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>

                                                                <img src={mylogo} alt="logoback" />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Cover Picture(size 1920*377px)</b></label><br />
                                    <div className="documentUpload ant-upload-picture-card-wrapper" >
                                        <div className="ant-upload-list ant-upload-list-picture-card">
                                        </div>
                                        <div className="upload_doc d-flex flex-wrap align-items-center row">
                                            {mycoverPic === "" || mycoverPic === "*" || mycoverPic === null || mycoverPic === undefined ?

                                                <Dropzone onDrop={(acceptedFiles) => {
                                                    var adminUniversityId = localStorage.getItem('adminUniversityId');
                                                    setmyloader("true")
                                                    const obj5 = new FormData();
                                                    obj5.append("coverPic", acceptedFiles[0]);
                                                    fetch(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/image', {
                                                        method: 'put',
                                                        body: obj5,
                                                        headers: { 'Authorization': adminmounted },
                                                    })
                                                        .then(response => response.json())
                                                        .then(data => {
                                                            setmyloader("false")
                                                            fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/image', {
                                                                method: 'get',
                                                                headers: { 'Authorization': adminmounted },
                                                            })
                                                                .then(response => response.json())
                                                                .then(data => {
                                                                    setmylogo(data.universityImage.logo)
                                                                    setmycoverPic(data.universityImage.coverPic)

                                                                })
                                                        })
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
                                                :
                                                <div>
                                                    <div className="upload_doc d-flex flex-wrap align-items-center row mb-3">
                                                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">
                                                            <button type="button" className="btn btn-outline-primary btn-view" data-bs-toggle="modal" data-bs-target="#myModalcoverPik">
                                                                View
                                                            </button>
                                                        </div>
                                                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 p-0 text-center">
                                                            <button type="button" onClick={() => onDeletecoverPikHandle("coverPic")} className="btn btn-outline-danger">
                                                                <FontAwesomeIcon icon={faTrash} />

                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="modal" id="myModalcoverPik">
                                                        <div className="modal-dialog">
                                                            <div className="modal-content">
                                                                <div className="modal-header">
                                                                    <h4 className="modal-title">Cover Picture </h4>
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                                </div>

                                                                <img src={mycoverPic} alt="logoback" />

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Images(size 600*600px)</b></label><br />
                                    <div className="documentUpload ant-upload-picture-card-wrapper" >
                                        <div className="ant-upload-list ant-upload-list-picture-card">
                                        </div>
                                        <div className="upload_doc d-flex flex-wrap align-items-center row">
                                            <Dropzone onDrop={(acceptedFiles) => {
                                                setmyloader("true")
                                                var adminUniversityId = localStorage.getItem('adminUniversityId');
                                                const obj5 = new FormData();
                                                obj5.append("link", acceptedFiles[0]);
                                                obj5.append("type", "image");
                                                fetch(process.env.REACT_APP_SERVER_URL + 'admin/universitys/' + adminUniversityId + '/imageVideos', {
                                                    method: 'post',
                                                    body: obj5,
                                                    headers: { 'Authorization': adminmounted },
                                                })
                                                    .then(response => response.json())
                                                    .then(data => {
                                                        setmyloader("false")

                                                        fetch(process.env.REACT_APP_SERVER_URL + 'university/' + adminUniversityId + '/imageVideos ', {
                                                            method: 'get',
                                                            headers: { 'Authorization': adminmounted },
                                                        })
                                                            .then(response => response.json())
                                                            .then(data => {

                                                                setmyimageVideo(data.universityImageVideos)
                                                            })
                                                    })
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label><b>Videos Link(size 600*600px)</b></label><br />
                                    <div className="documentUpload ant-upload-picture-card-wrapper" >
                                        <div className="ant-upload-list ant-upload-list-picture-card">
                                        </div>
                                        <form onSubmit={handleFormSubmit}>
                                            <div className="d-flex">
                                                <input type="text" className="form-control"

                                                    value={videoLink}
                                                    onChange={(e) => setvideoLink(e.target.value)}
                                                    placeholder="Video Link" />
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 ">
                            <div  >
                                <h5>All Images & Video</h5><br />
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Image/Video</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myimageVideo.map((element, index) => {
                                            var mylink = element.link
                                            const myArray = mylink.split("=");
                                            return (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        {element.type === "image" ?
                                                            <img style={{
                                                                width: "99px",
                                                                height: "68px"
                                                            }} src={element.link} alt="passportback" />
                                                            :

                                                            <>
                                                                <iframe className='video'
                                                                    title='Youtube player'
                                                                    sandbox='allow-forms allow-scripts'
                                                                    src={'https://youtube.com/embed/' + myArray[1] + '?autoplay=0'}>
                                                                </iframe>
                                                            </>
                                                        }
                                                    </td>
                                                    <td>
                                                        <button title="Delete" className="btn btn-danger btn-sm vbtn" onClick={() => handleDeleteClick(element._id)}>
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </button>

                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    );
}


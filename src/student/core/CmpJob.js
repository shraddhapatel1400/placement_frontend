import React,{useState,useEffect} from 'react';
import { API } from '../../backend';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { applyJob, editVacancy, isAuthenticatedS } from '../helper';
import { isAuthenticatedC } from '../../companyhr/helper';
import { useAlert } from "react-alert";
import {NotificationManager} from 'react-notifications';

const CmpJob = ({history}) => {

    const alert = useAlert();

    const [jobList, setJob] = useState([]);
    const [cmp, setCompany] = useState([]);
    const [applyJ, setApply] = useState([]);
    const [stud, setStud] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [quizscore, setQuizScore] = useState([]);

    const [value,setValue] = useState({
        isModalOpen: false
    });

    const [detail,setDetail] = useState({
        job : "",
        student : isAuthenticatedC() ? "" : isAuthenticatedS().user.id,
        body : "",
        resume : [],
        loading: false
    });

    const { id } = useParams();
    //const jo = jobList.filter(j => j.company == id).map(j=>j) 
    const {isModalOpen} = value;
    const {job, student, body, resume, loading} = detail;

    var today = new Date()

    const handleVacancy = (cid) => (event) => {
        event.preventDefault();
        var sum = 0;
        const l = quiz.filter(c=>c.company == id).map(q=>q.id)
        const a = applyJ.filter(a=>a.job === cid && a.student === student).map(a=>a.id);
        const sc = quizscore.filter(q=>q.student == isAuthenticatedS().user.id && l.includes(q.quiz)).map(s=>s.score)
        const cri = cmp.filter(c=>c.id == id).map(p=>p.criteria)

        sc.map((q)=>(
            sum = sum + parseInt(q)
        ))
        var tot = parseInt(((sum * 100)/(l.length)).toFixed(2))

        if (l.length > 0) {
            if (tot >= cri) {
                if (a != false) {
                    alert.show("You have already applied!!!")
                } else {
                    setValue({...value, isModalOpen:!isModalOpen});
                    setDetail({...detail, job:cid})
                }   
            } if (sc.length < 1) {
                alert.error("You have to give this aptitude test to apply!!!")
                history.push(`/quiz/${id}`)
            } if (tot < cri && sc.length >= 1) {
                alert.error("You have to Pass this aptitude test to apply!!!")
                history.push(`/quiz/${id}`)
            }
        } else {
            if (a != false) {
                alert.show("You have already applied!!!")
            } else {
                setValue({...value, isModalOpen:!isModalOpen});
                setDetail({...detail, job:id})
            }  
        }
    }

    const handleChangeRe = (name) => (event) => {
        console.log(event.target.files[0]);
        setDetail({ ...detail, [name]:event.target.files[0] })
    };

    const handleChange = (name) => (event) => {
        console.log(event.target.value)
        setDetail({ ...detail, [name]:event.target.value })
	};

    const handleClose = () => setValue({...value, isModalOpen:!isModalOpen});

    const submitJob = (event) => {
        event.preventDefault();
        const v = (jobList.filter(j=>j.id == job).map(j=>j.vacancy))-1;
            setDetail({...detail,loading:true});
            applyJob({job,student,body,resume})
            .then(data => {
                console.log("DATA", data);
                setDetail({
                    ...detail,
                    job : "",
                    student : "",
                    body : "",
                    resume : [],
                    loading: false
                });
                NotificationManager.success("","Job Request Sent!")
                setValue({ 
                    ...value, 
                    isModalOpen:!isModalOpen
                });
                editVacancy(job, v)
                .then(data => {
                    console.log("DATA", data);
                })
                .catch(e=>console.log(e))
            })
            .catch(e=>console.log(e))
    }

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response4 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response5 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
            const response6 = await fetch(`${API}quiz/quizscore/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            const data5 = await response5.json();
            const data6 = await response6.json();
            setCompany(data1);
            setJob(data2);
            setApply(data3);
            setStud(data4);
            setQuiz(data5);
            setQuizScore(data6);
        };
        fetchData();
    }, []);

    return (
        <div style={{minHeight:"777px"}}><br /><br />
            <div className="row mt-5">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="mb-5">
                        <div className="text-center">
                            <h1 className="text-secondary mb-4" style={{fontFamily:"fantasy"}}>Recent Post</h1>
                        </div><br />
                        {jobList.length > 0 ?
                            jobList.filter(j=>j.company === parseInt(id) && j.vacancy > 0).sort((a,b)=>new Date(a.deadline)-new Date(b.deadline)).reverse().map((j,i)=>(
                            <div className="row align-items-start job-item border-bottom pb-3 mb-3 pt-3" key={i}>
                                <div className="col-md-2">
                                    <img src={cmp.filter(c=>c.id===j.company).map(c=>c.logo)} alt="logo" className="img-fluid" />
                                </div>
                                <div className="col-md-5">
                                    <h3 className="text-dark">{j.requirement}</h3>
                                    <p className="meta"><i className="fa fa-university"></i>&nbsp;<strong>{cmp.filter(c=>c.id===j.company).map(c=>c.companyname)}</strong></p>
                                    <p className="meta"><i className="fa fa-map-marker"></i>&nbsp;{cmp.filter(c=>c.id===j.company).map(c=>c.location)}</p>
                                </div>
                                <div className="col-md-3 text-md-center">
                                        {j.jobtype === "Fulltime" ? <span className="badge badge-primary px-2 py-1 mb-3">{j.jobtype}</span> :
                                            (j.jobtype === "Parttime" ? <span className="badge badge-success px-2 py-1 mb-3">{j.jobtype}</span> :
                                            <span className="badge badge-warning px-2 py-1 mb-3">{j.jobtype}</span> )
                                        }
                                    <NotificationBadge count={parseInt(j.vacancy)} effect={Effect.SCALE}/>Remaining Vacancy<br />
                                    {(new Date(j.deadline).getTime()) >= today.getTime() ? <strong className="text-black">Deadline :
                                        {new Date(j.deadline).toDateString()}</strong> : 
                                        <strong className="text-danger">Overdue by {Math.round((today.getTime() - (new Date(j.deadline).getTime())) / (1000 * 3600 * 24))} days</strong>}
                                </div>
                                {isAuthenticatedC() ? "" :
                                <div className="col-md-2 text-md-center mt-4">
                                    <button className="btn btn-primary" onClick={handleVacancy(j.id)}>Apply Now</button>
                                    {stud.filter(s=>s.id == isAuthenticatedS().user.id).map((s)=>(
                                    <Modal isOpen={isModalOpen} toggle={handleClose} backdrop="static">
                                        <ModalHeader toggle={handleClose}>Are you sure <strong>{s.firstname+' '+s.lastname}</strong> you want to apply?</ModalHeader>
                                        <ModalBody className="text-center">
                                            {LoadingMess()}
                                            <p className="text-danger">* Please fill or read details carefully. *</p>
                                            <p>Your email is <strong>{s.email}</strong><br /></p>
                                            <p>With Contact number <strong>{s.phone ? s.phone : "You have not provided yet."}</strong><br /></p>
                                            <p>You are applying for <strong>{jobList.filter(j=>j.id===job).map(j=>j.requirement)}</strong> in&nbsp;
                                                <strong>{cmp.filter(c=>c.id===parseInt(id)).map(c=>c.companyname)}</strong><br /></p>
                                                <hr />
                                            <p><Link to="/resume/personal">Create new Resume!</Link><br/>or<br/>
                                            Upload PDF : <input type="file" accept="application/pdf" onChange={handleChangeRe("resume")} /></p>
                                            <p><textarea className="form-control form-control-user" onChange={handleChange("body")}
                                                placeholder="Describe Yourself If you want..." ></textarea></p>
                                            <hr />
                                            <br /><br />
                                            <p className="text-danger">* Note : Company HR will contact you with this email or phone.*</p>
                                            <p className="text-warning">If You have any problem with this email or contact 
                                                please go to your profile and change.</p> 
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button className="btn btn-secondary" onClick={handleClose}>Close</Button>
                                        <Button className="btn btn-info" onClick={submitJob}>Apply</Button>
                                        </ModalFooter>
                                    </Modal>
                                    ))}
                                </div>
                                }
                            </div>
                            ))
                        : <div><h4 className="text-center mt-3">No any current opening!!!</h4></div> }
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    );
}

export default CmpJob;
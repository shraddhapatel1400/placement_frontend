import React,{useState,useEffect} from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { API } from '../../backend';
import { confirmstd, isAuthenticatedC, confirm_mail, reject_mail } from '../helper';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';
import Inbox from './Inbox';
import Swal from 'sweetalert2';
import { editVacancy } from '../../student/helper'

const InboxDetails = () => {

    const [receive, setRe] = useState([]);
    const [job, setJob] = useState([]);
    const [student, setSt] = useState([]);
    const [value, setValue] = useState({
        isModalOpen1 : false,
        isModalOpen2 : false
    })

    /* const cid = isAuthenticatedC().user.id; */

    const handleClose1 = () => setValue({...value, isModalOpen1 : !isModalOpen1});
    const handleClose2 = () => setValue({...value, isModalOpen2 : !isModalOpen2});
    const {isModalOpen1, isModalOpen2} = value;

    const { id } = useParams();
    const history = useHistory();

    const onConfirmStudent = (sid,jid,cid) => (event) => {
        event.preventDefault();
        confirmstd(id,true)
        .then(data => {
            console.log("DATA", data);
            confirm_mail(sid,jid,cid)
            .then(data => {
                console.log("DATA", data);
            })
            .catch(e=>console.log(e));
            setValue({ 
                ...value, 
                isModalOpen1:!isModalOpen1
            });
            history.push("/cmpinbox");
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    const onRejectStudent = (sid,jid,cid) => (event) => {
        event.preventDefault();
        const v = parseInt(job.filter(j=>j.id == jid).map(j=>j.vacancy))+1
        confirmstd(id,false)
        .then(data => {
            console.log("DATA", data);
            reject_mail(sid,jid,cid)
            .then(data => {
                console.log("DATA", data);
            })
            .catch(e=>console.log(e));
            setValue({ 
                ...value, 
                isModalOpen2:!isModalOpen2
            });
            editVacancy(jid,v)
            .then((data)=>{
                console.log("DATA",data)
            })
            .catch(e=>console.log(e));
            history.push("/cmpinbox");
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    const opensweetalert = (sid) => {
        student.filter(s=>s.id==sid).map((s)=>(
            Swal.fire({
                title: "<h3 style='color:#cf9013;'>"+s.firstname+' '+s.lastname+"</h3>",
                html: "<span>Please Contact me at my <br />"+
                       "Email : <b>"+s.email+"</b> or <br />Contact No : <b>"+s.phone+"</b></span><hr />"+
                       "<img src='"+s.image+"' height='200px' />"
                      
            })
        ))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setSt(data1);
            setRe(data2);
            setJob(data3);
        };
        fetchData();
    }, []);


  return (
    <Inbox>
        <div className="row text-dark">
            <div className="col-sm-1"></div>
            <div className="col-sm-11">
                <h2>{job.filter(j=>j.id===parseInt(receive.filter(j=>j.id === parseInt(id)).map(j=>j.job))).map(j=>j.requirement)}</h2>
            </div>
        </div>
        <div className="row mt-2">
            <div className="col-sm-1 text-right"><i className="fa fa-user-circle-o fa-3x"></i></div>
            <div className="col-sm-3 text-left">
                <h5>{student.filter(s=>s.id===(receive.filter(j=>j.id === parseInt(id)).map(j=>j.student))).map(s=>s.email)}</h5>
                <p><strong>to</strong> {isAuthenticatedC().user.email}</p>
                <p><strong>from</strong> {student.filter(s=>s.id == (receive.filter(r=>r.id == id).map(r=>r.student))).map(s=>s.email)}
                    <span onClick={()=>opensweetalert(receive.filter(r=>r.id == id).map(r=>r.student))}> <i className="fa fa-info-circle"></i></span>
                </p>
            </div>
            <div className="col-sm-4"></div>
            <div className="col-sm-4">
                {new Date(receive.filter(j=>j.id === parseInt(id)).map(j=>j.applydate)).toDateString()
                +' '+new Date(receive.filter(j=>j.id === parseInt(id)).map(j=>j.applydate)).toLocaleTimeString()}
            </div>
        </div><hr />
        <div className="row">
            <div className="col-sm-1 text-right"><p>Message : </p></div>
            <div className="col-sm-8" style={{backgroundColor:"#f5f3ed",minHeight:"100px"}}>
                <span className="text-dark">{receive.filter(j=>j.id === parseInt(id)).map(j=>j.body)}</span>
            </div>
            <div className="col-sm-3"></div>
        </div><hr />
        <div className="row">
            <div className="col-sm-1 text-right"><p>Attachment </p></div>
            {/* <a href={receive.filter(j=>j.id === parseInt(id)).map(j=>j.resume)} target="_blank">PDF</a> */}
            <div className="col-sm-3">
                <div class="card" style={{width: "50px"}}>
                <a href={receive.filter(j=>j.id === parseInt(id)).map(j=>j.resume)} target="_blank">
                    <img class="card-img-top" src="/assets/images/pdf.png" alt="pdf" height="50px" /></a>
                    {/* <div class="card-body" style={{marginLeft:"65px"}}>
                        <button className="btn btn-secondary"><i className="fa fa-download"></i></button>&nbsp;&nbsp;
                        <button className="btn btn-secondary" </button> 
                        <p>{receive.filter(j=>j.id == id).map(j=>j.resume)}</p>
                    </div> */}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-sm-8"></div>
                {(receive.filter(j=>j.id === parseInt(id)).map(j=>j.status)[0]) == null ?
                <div className="col-sm-4">
                    <button className="btn btn-primary" onClick={handleClose1}>Confirm</button>&nbsp;&nbsp;&nbsp;
                        <Modal isOpen={isModalOpen1} toggle="" backdrop="static">
                            <ModalHeader toggle={handleClose1}>Are you sure you want to Confirm this student?</ModalHeader>
                            <ModalFooter>
                                <Button className="btn btn-secondary" onClick={handleClose1}>Cancel</Button>
                                <Button className="btn btn-info" 
                                    onClick={onConfirmStudent(student.filter(s=>s.id==(receive.filter(j=>j.id == id).map(j=>j.student))).map(s=>s.id),
                                        job.filter(j=>j.id == (receive.filter(j=>j.id == id).map(j=>j.job))).map(j=>j.id),
                                        isAuthenticatedC().user.id)}>Yes,Sure!</Button>
                            </ModalFooter>
                        </Modal>
                    <button className="btn btn-danger" onClick={handleClose2}>Reject</button>
                        <Modal isOpen={isModalOpen2} toggle="" backdrop="static">
                            <ModalHeader toggle={handleClose2}>Are you sure you want to Reject this student?</ModalHeader>
                            <ModalFooter>
                                <Button className="btn btn-secondary" onClick={handleClose2}>Cancel</Button>
                                <Button className="btn btn-danger" 
                                    onClick={onRejectStudent(student.filter(s=>s.id==(receive.filter(j=>j.id == id).map(j=>j.student))).map(s=>s.id),
                                        job.filter(j=>j.id == (receive.filter(j=>j.id == id).map(j=>j.job))).map(j=>j.id),
                                        isAuthenticatedC().user.id)}>Yes,Sure!</Button>
                            </ModalFooter>
                        </Modal>
                </div> : <h5 className="text-success">You already responded.</h5> }
        </div>
                        
    </Inbox>
  );
}

export default InboxDetails;
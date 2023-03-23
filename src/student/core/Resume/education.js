import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../../backend';
import { isAuthenticatedS, createStudentEdu, updateStudentEdu, deleteStudentEdu } from '../../helper';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Swal from 'sweetalert2';
import { useAlert } from "react-alert";

const Education = () => {

    const alert = useAlert();

    const [values, setValues] = useState({
        course : "",
        board : "",
        yearofpassing : "",
        ogpa : "",
        error: "",
        loading: false
    });

    const studentId = isAuthenticatedS().user.id;
    const [per,setper] = useState([]);
    const [count, setCount] = useState(0);
    const [education,setEdu] = useState([]);
    const history = useHistory();
    const { loading,error } = values;

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

    const submitEdu = (event) => {
        event.preventDefault();
        const cr = education.filter(e=>e.student == studentId).some(c=>c.course.toLowerCase()===per.course.toLowerCase())
        if (cr) {
            alert.show("This Course is already added!!!")  
        } else {
            if (ind >= 3) {
                alert.error("You can not add more than 3!!!")
            } else {
                setValues({ ...values, error: false, loading: true });
                createStudentEdu(per,studentId)
                .then(data => {
                    console.log("DATA", data);
                    if (!data.id) {
                        setValues({
                            ...values,
                            error : [data.course,data.board,data.yearofpassing,data.ogpa]
                        });
                    } else {
                        setValues({ ...values, error: false, loading: false });
                        Swal.fire({
                            icon : "success",
                            title: "<h3>Saved successfully!!!</h3>"
                        })
                    }
                })
                .catch(e=>console.log(e))
            }
        }
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updateStudentEdu(eid,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.course,data.board,data.yearofpassing,data.ogpa]
                });
            } else {
                setValues({ ...values, error: false, loading: false });
                setValue({ ...value, isModalOpen: !isModalOpen });
                window.location.reload();
            }
        })
        .catch(e=>console.log(e))
    }

    const handleDelete = (event) => {
        event.preventDefault();
        deleteStudentEdu(eid1)
        .then((data)=>{
            setValue({...value,isModalOpen1:!isModalOpen1,eid1:""})
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    const cnt = (event) => {
        event.preventDefault();
        ind >=3 ? alert.error("You can not add more than 3!!!") :
            setCount(count + 1);
    }

    const ind = education.filter(e=>e.student == studentId).length;
    const e = education.filter(e => e.student == studentId).map((e=>e.id));

    const [value,setValue] = useState({ isModalOpen: false, isModalOpen1: false, eid: "", eid1:"" });
    const {isModalOpen, isModalOpen1, eid, eid1} = value;

    const handleClose = () => setValue({...value, isModalOpen:!isModalOpen});
    const handleClose1 = () => setValue({...value, isModalOpen1:!isModalOpen1});

    const handleModal = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen:!isModalOpen, eid:eduid});
    }

    const handleModalDel = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen1:!isModalOpen1, eid1:eduid});
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/education/`,{method: "GET"});
            const data1 = await response1.json();
            setEdu(data1);
        };
        fetchData();
    }, []);


  return (
    <div>
        <section class="section" id="our-classes">
            <div class="content"><br />
                <div class="row" id="tabs">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-3">
                        <ul>
                            <li><Link to="/resume/personal"><i class="fa fa-user"></i> Personal Information</Link></li>
                            <li><Link to="/resume/summary"><i class="fa fa-info-circle"></i> Summary</Link></li>
                            <li><Link to="/resume/education"><i class="fa fa-graduation-cap"></i> Educational Qualification</Link></li>
                            <li><Link to="/resume/skill"><i class="fa fa-cogs"></i> Technical Skills</Link></li>
                            <li><Link to="/resume/project"><i class="fa fa-tasks"></i> Academic Projects</Link></li>
                            <li><Link to="/resume/preview"><i class="fa fa-eye"></i> Preview Resume</Link></li>
                        </ul>
                    </div>
                    <div class="col-lg-7">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/resume/personal">Personal Information</Link></li>
                                <li class="breadcrumb-item"><Link to="/resume/summary">Summary</Link></li>
                                <li class="breadcrumb-item active"><Link to="/resume/education">Educational Qualification</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-3'>
                                <h3>Educational Qualification</h3><br />
                                {ind < 3 ? <button className="btn btn-warning" style={{float:"right",marginRight:"35px"}} onClick={cnt}>Add <i class="fa fa-plus" aria-hidden="true"></i></button> : "" }
                                {count > 0 ? <button className="btn btn-danger" style={{float:"right",marginRight:"35px"}} onClick={() => setCount(count - 1)}>Remove <i class="fa fa-minus" aria-hidden="true"></i></button> : "" }
                                <h5>Your Highest Qualification</h5>
                                {LoadingMess()}
                                <form onSubmit={submitEdu}>
                                    <br /><br /><br />
                                    <div>
                                        <div className="row" style={{color:"tomato"}}>
                                            <div className="col-lg-1"></div>
                                            <div className="col-lg-2"><label>Course/Degree</label></div>
                                            <div className="col-lg-3"><label>Board/University</label></div>
                                            <div className="col-lg-2"><label>Year of Passing</label></div>
                                            <div className="col-lg-2"><label>Percentage</label></div>
                                        </div>
                                        {education.filter(e=>e.student===studentId).map((e,i)=> (
                                            <div className="row" key={i}>
                                                <div className="col-lg-1">
                                                    <NotificationBadge count={i+1} effect={Effect.SCALE}/>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div class="input-container">
                                                        <input type="text" defaultValue={e.course} readOnly />		
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div class="input-container">
                                                        <input type="text" defaultValue={e.board} readOnly />	
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div class="input-container">
                                                        <input type="number" max="2025" min="2013" defaultValue={e.yearofpassing} readOnly />	
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <div class="input-container">
                                                        <input type="text" defaultValue={e.ogpa} readOnly />
                                                    </div>
                                                </div>
                                                <div className="col-lg-1">
                                                    <label><button type="button" class="btn btn-warning float-right" onClick={handleModal(e.id)}>
                                                        <i className="fa fa-edit" />
                                                    </button></label>	
                                                </div>
                                                <div className="col-lg-1">	
                                                    <label><button type="button" class="btn btn-danger float-right" onClick={handleModalDel(e.id)}>
                                                        <i className="fa fa-trash" />
                                                    </button></label>	
                                                </div>
                                                <Modal isOpen={isModalOpen1} toggle={handleClose1} backdrop="static">
                                                    <ModalHeader toggle={handleClose1}>
                                                        Are you sure you want to delete <b>{education.filter(e=>e.id==eid1).map(e=>e.course)}</b> from your education?</ModalHeader>
                                                    <ModalFooter>
                                                        <Button className="btn btn-secondary" onClick={handleClose1}>Close</Button>
                                                        <Button className="btn btn-danger" onClick={handleDelete}>Yes! Sure</Button>
                                                    </ModalFooter>
                                                </Modal>
                                                <Modal isOpen={isModalOpen} toggle={handleClose} backdrop="static">
                                                    <ModalHeader toggle={handleClose}>Edit Education</ModalHeader>
                                                    <ModalBody className="text-center">
                                                        {LoadingMess()}
                                                        <form onSubmit={handleEdit}><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("course")} 
                                                                    defaultValue={education.filter(e=>e.id == eid).map(e=>e.course)} />
                                                                <label>Course/Degree</label>		
                                                                <span className="text-danger">{error[0]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("board")} 
                                                                    defaultValue={education.filter(e=>e.id == eid).map(e=>e.board)} />
                                                                <label>Board/University</label>		
                                                                <span className="text-danger">{error[1]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("yearofpassing")} 
                                                                    defaultValue={education.filter(e=>e.id == eid).map(e=>e.yearofpassing)} />
                                                                <label>Year of Passing</label>		
                                                                <span className="text-danger">{error[2]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("ogpa")} 
                                                                    defaultValue={education.filter(e=>e.id == eid).map(e=>e.ogpa)} />
                                                                <label>Percentage</label>		
                                                                <span className="text-danger">{error[3]}</span>	
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                    <Button className="btn btn-secondary" onClick={handleClose}>Close</Button>
                                                    <Button className="btn btn-info" onClick={handleEdit}>Save</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div>
                                        ))}
                                    </div>
                                    {[...Array(count)].map((e, i) => 
                                        <div className="row" key={i}>
                                            <div className="col-lg-3">
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("course")} required/>	
                                                    <span className="text-danger">{error[0]}</span>	
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("board")} required />
                                                    <span className="text-danger">{error[1]}</span>	
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div class="input-container">
                                                    <input type="number" onChange={handleChange("yearofpassing")} max="2025" min="2013" required />
                                                    <span className="text-danger">{error[2]}</span>	
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("ogpa")} required/>
                                                    <span className="text-danger">{error[3]}</span>	
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div class="input-container">
                                        <button type="button" className="btn btn-info" style={{float:"left"}}
                                            onClick={() => {history.push("/resume/summary")}} >Previous</button>&nbsp;&nbsp;&nbsp;
                                        {ind < 3 ? <button type="submit" className="btn btn-info">Save</button> : ""}&nbsp;&nbsp;&nbsp;
                                        <button type="button" className="btn btn-info"
                                            onClick={() => {history.push("/resume/skill")}} >Next</button>
                                    </div>
                                </form>
                            </article>
                        </section>
                    </div><div className="col-lg-1"></div>
                </div>
            </div>
        </section>
    </div>
  );
}
export default Education;
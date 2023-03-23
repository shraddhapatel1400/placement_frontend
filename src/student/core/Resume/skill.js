import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../../backend';
import { isAuthenticatedS, createStudentSkill, updateStudentSkill, deleteStudentSkill } from '../../helper';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Swal from 'sweetalert2';
import { useAlert } from "react-alert";

const Skill = () => {

    const alert = useAlert();

    const [values, setValues] = useState({
        skill : "",
        level : "",
        error: "",
        loading: false
    });

    const [per,setper] = useState([]);
    const [count, setCount] = useState(0);
    const [skill,setSkill] = useState([]);
    const studentId = isAuthenticatedS().user.id;
    const history = useHistory();
    const { loading, error } = values;

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const submitSkill = (event) => {
        event.preventDefault();
        const sk = skill.filter(e=>e.student == studentId).some(c=>c.skill.toLowerCase()===per.skill.toLowerCase())
        if (sk) {
            alert.show("This Skill is already added!!!")  
        } else {
            if (ind >= 6) {
                alert.error("You can not add more than 6!!!")
            } else {
                setValues({ ...values, error: false, loading: true });
                createStudentSkill(per,studentId)
                .then(data => {
                    console.log("DATA", data);
                    if (!data.id) {
                        setValues({
                            ...values,
                            error : [data.skill,data.level]
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
        updateStudentSkill(sid,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.skill,data.level]
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
        deleteStudentSkill(sid1)
        .then((data)=>{
            setValue({...value,isModalOpen1:!isModalOpen1,sid1:""})
            window.location.reload();
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

    const cnt = (event) => {
        event.preventDefault();
        ind >=6 ? alert.error("You can not add more than 6!!!") :
            setCount(count + 1);
    }
    
    const ind = skill.filter(e=>e.student == studentId).length;
    const s = skill.filter(e => e.student == studentId).map((e=>e.id));

    const [value,setValue] = useState({ isModalOpen: false, isModalOpen1:false, sid: "",sid1:"" });
    const {isModalOpen,isModalOpen1,sid1,sid} = value;

    const handleClose = () => setValue({...value, isModalOpen:!isModalOpen});
    const handleClose1 = () => setValue({...value, isModalOpen1:!isModalOpen1});

    const handleModal = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen:!isModalOpen, sid:eduid});
    }
    const handleModalDel = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen1:!isModalOpen1, sid1:eduid});
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/skills/`,{method: "GET"});
            const data1 = await response1.json();
            setSkill(data1);
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
                                <li class="breadcrumb-item"><Link to="/resume/education">Educational Qualification</Link></li>
                                <li class="breadcrumb-item active"><Link to="/resume/skill">Technical Skills</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-4'>
                                <h3>Technical Skills</h3><br />
                                {ind < 6 ? <button className="btn btn-warning" style={{float:"right",marginRight:"35px"}} onClick={cnt}>Add <i class="fa fa-plus" aria-hidden="true"></i></button> : "" }
                                {count>0 ? <button className="btn btn-danger" style={{float:"right",marginRight:"35px"}} onClick={() => setCount(count - 1)}>Remove <i class="fa fa-minus" aria-hidden="true"></i></button> : "" }
                                {LoadingMess()}
                                <form onSubmit={submitSkill}>
                                    <br />
                                    <div>
                                        <div className="row" style={{color:"tomato"}}>
                                            <div className="col-lg-1"></div>
                                            <div className="col-lg-6"><label>Skill</label></div>
                                            <div className="col-lg-5"><label>Level</label></div>
                                        </div>
                                        {skill.filter(e=>e.student===studentId).map((e,i)=> (
                                        <div className="row" key={i}>
                                            <div className="col-lg-1"><NotificationBadge count={i+1} effect={Effect.SCALE}/></div>
                                            <div className="col-lg-5">
                                                <div class="input-container">
                                                    <input type="text" defaultValue={e.skill} readOnly />		
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div class="input-container">
                                                    <input type="number" max="10" min="0" defaultValue={e.level} readOnly/>	
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
                                                    Are you sure you want to delete <b>{skill.filter(e=>e.id==sid1).map(e=>e.skill)}</b> from your Skill List?</ModalHeader>
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
                                                            <input type="text" onChange={handleChange("skill")} 
                                                                defaultValue={skill.filter(e=>e.id == sid).map(e=>e.skill)} />
                                                            <label>Skill</label>		
                                                            <span className="text-danger">{error[0]}</span>	
                                                        </div><br />
                                                        <div class="input-container">
                                                            <input type="text" onChange={handleChange("level")} 
                                                                defaultValue={skill.filter(e=>e.id == sid).map(e=>e.level)} />
                                                            <label>Level</label>		
                                                            <span className="text-danger">{error[1]}</span>	
                                                        </div><br />
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
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("skill")} />
                                                    <span className="text-danger">{error[0]}</span>	
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div class="input-container">
                                                    <input type="number" onChange={handleChange("level")} max="10" min="0" />
                                                    <span className="text-danger">{error[1]}</span>	
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div class="input-container">
                                        <button type="button" className="btn btn-info" style={{float:"left"}}
                                            onClick={() => {history.push("/resume/education")}} >Previous</button>&nbsp;&nbsp;&nbsp;
                                        {ind < 6 ? <button type="submit" className="btn btn-info">Save</button> : ""}&nbsp;&nbsp;&nbsp;
                                        <button type="button" className="btn btn-info"
                                            onClick={() => {history.push("/resume/project")}} >Next</button>
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

export default Skill;
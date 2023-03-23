import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../../backend';
import { isAuthenticatedS, createStudentProject, updateStudentProject, deleteStudentProject } from '../../helper';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Swal from 'sweetalert2';
import { useAlert } from "react-alert";


const Project = () => {

    const alert = useAlert();

    const [values, setValues] = useState({
        title : "",
        description : "",
        technology : "",
        database : "",
        error: "",
        loading: false
    });

    const studentId = isAuthenticatedS().user.id;
    const [per,setper] = useState([]);
    const [count, setCount] = useState(0);
    const [project,setProj] = useState([]);
    const history = useHistory();
    const { loading,error } = values;

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const submitProject = (event) => {
        event.preventDefault();
        if (ind >= 3) {
            alert.show("You can not add more than 3!!!")
        } else {
            setValues({ ...values, error: false, loading: true });
            createStudentProject(per,studentId)
            .then(data => {
                console.log("DATA", data);
                if (!data.id) {
                    setValues({
                        ...values,
                        error : [data.title,data.description,data.technology,data.database]
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

    const handleEdit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updateStudentProject(pid,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.title,data.description,data.technology,data.database]
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
        deleteStudentProject(pid1)
        .then((data)=>{
            setValue({...value,isModalOpen1:!isModalOpen1,pid1:""})
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

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/projects/`,{method: "GET"});
            const data1 = await response1.json();
            setProj(data1);
        };
        fetchData();
    }, []);

    const ind = project.filter(e=>e.student == studentId).length;
    const s = project.filter(e => e.student == studentId).map((e=>e.id));

    const [value,setValue] = useState({ isModalOpen: false,isModalOpen1:false, pid: "",pid1:"" });
    const {isModalOpen,isModalOpen1,pid1,pid} = value;

    const handleClose = () => setValue({...value, isModalOpen:!isModalOpen});
    const handleClose1 = () => setValue({...value, isModalOpen1:!isModalOpen1});

    const handleModal = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen:!isModalOpen, pid:eduid});
    }

    const handleModalDel = (eduid) => (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen1:!isModalOpen1, pid1:eduid});
    }

    const cnt = (event) => {
        event.preventDefault();
        ind >=3 ? alert("You can not add more than 3!!!") :
            setCount(count + 1);
    }

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
                                <li class="breadcrumb-item"><Link to="/resume/skill">Technical Skills</Link></li>
                                <li class="breadcrumb-item active"><Link to="/resume/project">Academic Projects</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-5'>
                                <h3>Academic Projects</h3><br />
                                {ind < 3 ? <button className="btn btn-warning" style={{float:"right",marginRight:"35px"}} onClick={cnt}>Add <i class="fa fa-plus" aria-hidden="true"></i></button> : ""}
                                {count>0 ? <button className="btn btn-danger" style={{float:"right",marginRight:"35px"}} onClick={() => setCount(count - 1)}>Remove <i class="fa fa-minus" aria-hidden="true"></i></button> : "" }
                                {LoadingMess()}
                                <form onSubmit={submitProject}>
                                    <br />
                                    {project.filter(e=>e.student===studentId).map((p,i)=> (
                                        <div key={i}>
                                            <div className="row">
                                                <div className="col-lg-1">
                                                    <div class="input-container"><NotificationBadge count={i+1} effect={Effect.SCALE}/></div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div class="input-container">
                                                        <span>Title</span>	
                                                        <input type="text" defaultValue={p.title} readOnly/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    <button type="button" class="btn btn-warning float-right" onClick={handleModal(p.id)}>
                                                        <i className="fa fa-edit" /> Edit
                                                    </button>
                                                </div>
                                                <div className="col-lg-2">
                                                    <button type="button" class="btn btn-danger float-right" onClick={handleModalDel(p.id)}>
                                                        <i className="fa fa-trash" /> Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-1"></div>
                                                <div className="col-lg-11">
                                                    <div class="input-container">
                                                        <span>Description</span>
                                                        <textarea cols="104" rows="3" defaultValue={p.description} readOnly></textarea>	
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-1"></div>
                                                <div className="col-lg-5">
                                                    <div class="input-container">
                                                        <span>Technology</span>	
                                                        <input type="text" defaultValue={p.technology} readOnly />	
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div class="input-container">
                                                        <span>Database</span>	
                                                        <input type="text" defaultValue={p.database} readOnly />
                                                    </div>
                                                </div>
                                                <Modal isOpen={isModalOpen1} toggle={handleClose1} backdrop="static">
                                                    <ModalHeader toggle={handleClose1}>
                                                        Are you sure you want to delete <b>{project.filter(e=>e.id==pid1).map(e=>e.title)}</b> from your Project List?</ModalHeader>
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
                                                                <input type="text" onChange={handleChange("title")} 
                                                                    defaultValue={project.filter(e=>e.id == pid).map(e=>e.title)} />
                                                                <label>Title</label>		
                                                                <span className="text-danger">{error[0]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <span>Description</span>
                                                                <textarea cols="60" rows="5" onChange={handleChange("description")}
                                                                    defaultValue={project.filter(e=>e.id == pid).map(e=>e.description)} ></textarea>		
                                                                <span className="text-danger">{error[1]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("technology")} 
                                                                    defaultValue={project.filter(e=>e.id == pid).map(e=>e.technology)} />
                                                                <label>Technology</label>		
                                                                <span className="text-danger">{error[2]}</span>	
                                                            </div><br />
                                                            <div class="input-container">
                                                                <input type="text" onChange={handleChange("database")} 
                                                                    defaultValue={project.filter(e=>e.id == pid).map(e=>e.database)} />
                                                                <label>Database</label>		
                                                                <span className="text-danger">{error[3]}</span>	
                                                            </div>
                                                        </form>
                                                    </ModalBody>
                                                    <ModalFooter>
                                                    <Button className="btn btn-secondary" onClick={handleClose}>Close</Button>
                                                    <Button className="btn btn-info" onClick={handleEdit}>Save</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </div><br/><br/>
                                        </div>
                                    ))}
                                    {[...Array(count)].map((e, i) => 
                                        <div className="row" key={i}>
                                            <div class="input-container">
                                                <input type="text" onChange={handleChange("title")} />
                                                <label>Title *</label>		
                                                <span className="text-danger">{error[0]}</span>	
                                            </div>
                                            <div class="input-container">
                                                <textarea name="description" id="" cols="125" rows="3" onChange={handleChange("description")} placeholder="Project Description"></textarea>	
                                                <span className="text-danger">{error[1]}</span>	
                                            </div>
                                            <div class="input-container">
                                                <input type="text" onChange={handleChange("technology")} />
                                                <label>Technology *</label>	
                                                <span className="text-danger">{error[2]}</span>		
                                            </div>
                                            <div class="input-container">
                                                <input type="text" onChange={handleChange("database")} />
                                                <label>Database *</label>		
                                                <span className="text-danger">{error[3]}</span>	
                                            </div>
                                        </div>
                                    )}
                                    <div class="input-container">
                                        <button type="button" className="btn btn-info" style={{float:"left"}}
                                            onClick={() => {history.push("/resume/skill")}} >Previous</button>&nbsp;&nbsp;&nbsp;
                                        {ind < 3 ? <button type="submit" className="btn btn-info">Save</button> : "" }&nbsp;&nbsp;&nbsp;
                                        <button type="button" className="btn btn-info"
                                            onClick={() => {history.push("/resume/preview")}} >Next</button>
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

export default Project;

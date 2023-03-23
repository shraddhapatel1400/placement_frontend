import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../../backend';
import { createStudentSum, isAuthenticatedS, updateStudentSum } from '../../helper';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import Swal from 'sweetalert2';

const Summary = () => {
    const [sum,setSum] = useState([]);
    const [values, setValues] = useState({
        objective: "",
        position : "",
        experience : "",
        error: "",
        loading: false
    });
    const [per,setper] = useState([]);
    
    const [value,setValue] = useState({ isModalOpen: false });
    const {isModalOpen} = value;
    const handleClose = () => setValue({...value, isModalOpen:!isModalOpen});

    const handleModal = (event) => {
        event.preventDefault();
        setValue({...value, isModalOpen:!isModalOpen});
    }

    const { objective, loading, error } = values;

    const studentId = isAuthenticatedS().user.id;
    const summ = sum.filter(c => c.student === studentId).map((s=>s));
    const history = useHistory();
    const s = sum.filter(c => c.student === studentId).map((s=>s.id));

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const submitSum = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        createStudentSum(per,studentId)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.position,data.experience,data.objective]
                })
            } else {
                setValues({ ...values, error: false, loading: false });
                Swal.fire({
                    icon : "success",
                    title: "<h3>Saved successfully!!!</h3>"
                })
                history.push('/resume/education')
            }
        })
        .catch(e=>console.log(e))
    }

    const handleEdit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updateStudentSum(s,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.position,data.experience,data.objective]
                });
            } else {
                setValues({ ...values, error: false, loading: false });
                window.location.reload();
                setValue({ ...value, isModalOpen: !isModalOpen });
            }
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
            const response1 = await fetch(`${API}student/job/`,{method: "GET"});
            const data1 = await response1.json();
            setSum(data1);
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
                                <li class="breadcrumb-item active"><Link to="/resume/summary">Summary</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-2'>
                                <h3>Summary
                                    {s!=false ? <button type="button" class="btn btn-light float-right" onClick={handleModal}>
                                        <i className="fa fa-edit" /> Edit
                                    </button> : ""}</h3><br />
                                    <Modal isOpen={isModalOpen} toggle={handleClose} backdrop="static">
                                        <ModalHeader toggle={handleClose}>Edit Summary</ModalHeader>
                                        <ModalBody className="text-center">
                                            {LoadingMess()}
                                            <form onSubmit={handleEdit}>
                                                <label style={{color:"black",float:"left"}}>Career Objective</label>
                                                <div class="input-container">
                                                    <textarea name="objective" id="" cols="60" rows="3" onChange={handleChange("objective")} defaultValue={summ.map(s=>s.objective)}></textarea>	
                                                    <span className="text-danger">{error[2]}</span>	
                                                </div><br />
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("position")} defaultValue={summ.map(s=>s.position)} />
                                                    <label>Position</label>		
                                                    <span className="text-danger">{error[0]}</span>	
                                                </div><br />
                                                <div class="input-container">
                                                    <input type="text" onChange={handleChange("experience")} defaultValue={summ.map(s=>s.experience)} />
                                                    <label>Experience</label>		
                                                    <span className="text-danger">{error[1]}</span>	
                                                </div>
                                            </form>
                                        </ModalBody>
                                        <ModalFooter>
                                        <Button className="btn btn-secondary" onClick={handleClose}>Close</Button>
                                        <Button className="btn btn-info" onClick={handleEdit}>Save</Button>
                                        </ModalFooter>
                                    </Modal>
                                {LoadingMess()}
                                {s!=false ? 
                                    <form>
                                        <label style={{color:"tomato"}}>Career Objective</label>
                                        <div class="input-container">
                                            <textarea name="objective" id="" cols="110" rows="3" defaultValue={summ.map(s=>s.objective)} disabled></textarea>	
                                        </div><br />
                                        <label style={{color:"tomato"}}>Position</label>
                                        <div class="input-container">
                                            <input type="text" name="position" defaultValue={summ.map(s=>s.position)} disabled />
                                        </div><br />
                                        <label style={{color:"tomato"}}>Experience</label>
                                        <div class="input-container">
                                            <input type="text" name="experience" defaultValue={summ.map(s=>s.experience)} disabled />	
                                        </div><br />
                                        <div class="input-container">
                                            <button type="button" className="btn btn-info" style={{float:"left"}}
                                                onClick={() => {history.push("/resume/personal")}} >Previous</button>&nbsp;&nbsp;&nbsp;
                                            <button type="button" className="btn btn-info"
                                                onClick={() => {history.push("/resume/education")}} >Next</button>
                                        </div>
                                    </form>
                                     :
                                    <form onSubmit={submitSum}>
                                        <label style={{color:"black"}}>Career Objective</label>
                                        <div class="input-container">
                                            <textarea name="objective" id="" cols="125" rows="3" onChange={handleChange("objective")} defaultValue={summ.map(s=>s.objective)} ></textarea>
                                            <span className="text-danger">{error[2]}</span>		
                                        </div><br />
                                        <div class="input-container">
                                            <input type="text" onChange={handleChange("position")} defaultValue={summ.map(s=>s.position)} />
                                            <label>Position</label>		
                                            <span className="text-danger">{error[0]}</span>	
                                        </div><br />
                                        <div class="input-container">
                                            <input type="text" onChange={handleChange("experience")} defaultValue={summ.map(s=>s.experience)} />
                                            <label>Experience</label>		
                                            <span className="text-danger">{error[1]}</span>	
                                        </div><br />
                                        <div class="input-container">
                                            <button type="button" className="btn btn-info" style={{float:"left"}}
                                                onClick={() => {history.push("/resume/personal")}} >Previous</button>&nbsp;&nbsp;&nbsp;
                                            <button type="submit" className="btn btn-info">Save</button>&nbsp;&nbsp;&nbsp;
                                            <button type="button" className="btn btn-info"
                                                onClick={() => {history.push("/resume/education")}} >Next</button>
                                        </div>
                                    </form>
                                }
                            </article>
                        </section>
                    </div><div className="col-lg-1"></div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Summary;
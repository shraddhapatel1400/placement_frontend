import React,{useState,useEffect} from 'react';
import Select from 'react-select';  
import { createjob, editjob, isAuthenticatedC } from '../helper/index';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { API } from '../../backend';
import { withRouter } from 'react-router-dom';
import {NotificationManager} from 'react-notifications';

const CreateJob = () => {
    const [job, setJob] = useState([]);
    
    const [ed,setEd] = useState([]);

    const [values, setValues] = useState({
        requirement: "",
        vacancy: "",
        jobtype: "",
        deadline: "",
        error: "",
        err : "",
        success: false,
        loading: false,
        edit : false,
        editId : ""
    });

    const { requirement, vacancy, jobtype, deadline, error,err,edit,editId, loading } = values;
    
    const company = isAuthenticatedC().user.id;
    const today = new Date()

    const handleChange = (name) =>
    (event) => {
        var eDate = new Date(event.target.value);
        var today = new Date()
        if (name === 'deadline') {
            if (eDate <= today ) {
                setValues({ ...values, err: "Deadline must be greater than today!!!" })
            } else {
                setValues({ ...values, error: false,err:false, [name]: event.target.value });
                setEd({...ed,[name]: event.target.value})
            }
        } else {
            setValues({ ...values, error: false,err:false, [name]: event.target.value });
            setEd({...ed,[name]: event.target.value})
        }
    };
    
    const handleChangeType = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.value });
      setEd({...ed,[name]: event.value})
      console.log(event.value)
	};
    
	const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        createjob({company,requirement,vacancy,jobtype,deadline})
        .then(data => {
            console.log("DATA", data)
            if (data.id) {
                setValues({
                    ...values,
                    requirement: "",
                    vacancy: "",
                    jobtype: "",
                    deadline: "",
                    didRedirect: true,
                    error: false,
                });
                NotificationManager.success("",'New job created Successfully!')
            } else {
                NotificationManager.error("",'Please fix this errors.')
                setValues({
                    ...values,
                    loading: false,
                    error: [data.requirement,data.vacancy,data.jobtype,data.deadline],
                });
            }
        })
        .catch(e=>console.log(e)) 
    }

    const handleDelete = (id) => (event) =>{
        event.preventDefault();
        fetch(`${API}companyhr/companyJob/${id}/`,{method: "DELETE"})
        .then((response) => {
            window.location.reload();
            NotificationManager.error("","Job Deleted Successfully!")
            return response.json();
        })
        .catch((err) => console.log(err));
    };
    
    const handleEdit = (id) => (event) =>{
        event.preventDefault();
        setValues({...values,edit:!edit,editId:id})
    };

    const onSubmitEdit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const id = JSON.stringify(editId)
        editjob(id,ed)
        .then(data => {
            console.log("DATA", data);
            setValues({ 
                ...values, 
                requirement: "",
                vacancy: "",
                jobtype: "",
                deadline: "",
                error: "",
                err : "",
                success: false,
                loading: false,
                edit : false,
                editId : ""
            });
            NotificationManager.success("","Saved Changes Successfully!")
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            setJob(data1);
        };
        fetchData();
    }, []);

    const options = [
        { value: "Fulltime", label: "Full Time" },
        { value: "Parttime", label: "Part Time" },
        { value: "Internship", label: "Internship" }
    ];

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

	const jobForm = () => {
		return(
            <div style={{minHeight:"777px"}}>
                <br /><br /><br /><br /><br />
                <div style={{marginLeft:"100px",marginRight:"100px"}}>
                    <div className="row">
                        {edit ? 
                            <div className="col-lg-5">
                                <div class="text-center">
                                    <h1 class="text-info mb-4" style={{fontFamily:"fantasy"}}>Edit Job</h1>
                                </div>
                                <div class="row justify-content-center">
                                    <div class="col-xl-10 col-lg-12 col-md-12">
                                        <div class="card o-hidden border-0 shadow-lg my-5">
                                        <div class="card-body p-0">
                                            <div class="row">
                                            <div class="col-lg-12">
                                                <div class="p-5">
                                                {LoadingMess()}
                                                {job.filter(c=>c.id === editId).map((j)=>(
                                                <form class="user">
                                                    <div class="form-group">
                                                        <input type="text" class="form-control form-control-user" id="jobtitle" 
                                                            defaultValue={j.requirement} onChange={handleChange("requirement")}  />
                                                        <span className="text-danger">{error[0]}</span>
                                                    </div>
                                                    <div class="form-group">
                                                        <input type="number" class="form-control form-control-user" id="vacancy" min="0" max="30"
                                                        defaultValue={j.vacancy} onChange={handleChange("vacancy")} />
                                                        <span className="text-danger">{error[1]}</span>
                                                    </div>
                                                    <div class="form-group">
                                                        <Select options={options} onChange={handleChangeType("jobtype")}
                                                            class="form-control form-control-user"
                                                            placeholder={j.jobtype}
                                                            styles={{   menu: provided => ({ ...provided, zIndex: 9999 })   }} 
                                                        />
                                                        <span className="text-danger">{error[2]}</span>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-3 mb-3 mb-sm-0 mt-3 text-right">Deadline</div>
                                                        <div class="col-sm-9 mb-3 mb-sm-0">
                                                        <input type="date" class="form-control form-control-user" id="deadline" 
                                                            placeholder="Deadline" onChange={handleChange("deadline")}  />
                                                            <span className="text-info">Current: {j.deadline}</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-danger">{err ? err : "" }</span>
                                                    <button class="btn btn-primary btn-user btn-block" onClick={onSubmitEdit}>Save</button>
                                                    <button class="btn btn-danger btn-user btn-block" onClick={handleEdit}>Cancel</button>
                                                </form>
                                                ))}
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> :
                        <div className="col-lg-5">
                            <div class="text-center">
                                <h1 class="text-info mb-4" style={{fontFamily:"fantasy"}}>Create New Job</h1>
                            </div>
                            <div class="row justify-content-center">
                            <div class="col-xl-10 col-lg-12 col-md-12">
                                <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                    <div class="col-lg-12">
                                        <div class="p-5">
                                        {LoadingMess()}
                                        <form class="user">
                                            <div class="form-group">
                                                <input type="text" class="form-control form-control-user" id="jobtitle" 
                                                    placeholder="Job Title" value={requirement} onChange={handleChange("requirement")}  />
                                                <span className="text-danger">{error[0]}</span>
                                            </div>
                                            <div class="form-group">
                                                <input type="number" class="form-control form-control-user" id="vacancy" min="0" max="30"
                                                placeholder="Vacancy" value={vacancy} onChange={handleChange("vacancy")} />
                                                <span className="text-danger">{error[1]}</span>
                                            </div>
                                            <div class="form-group">
                                                <Select options={options} onChange={handleChangeType("jobtype")}
                                                    placeholder="Select Job Type..."  class="form-control form-control-user"
                                                    styles={{   menu: provided => ({ ...provided, zIndex: 9999 })   }} 
                                                />
                                                <span className="text-danger">{error[2]}</span>
                                            </div>
                                            <div class="form-group row">
                                                <div class="col-sm-3 mb-3 mb-sm-0 mt-3 text-right">Deadline</div>
                                                <div class="col-sm-9 mb-3 mb-sm-0">
                                                <input type="date" class="form-control form-control-user" id="deadline" 
                                                    placeholder="Deadline" value={deadline} onChange={handleChange("deadline")}  />
                                                </div>
                                            </div>
                                            <span className="text-danger">{err ? err : "" }</span>
                                            <button class="btn btn-primary btn-user btn-block" onClick={onSubmit}>Create Job</button>
                                        </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        }
                        <div className="col-lg-6">
                            <div class="mb-5">
                                <div class="text-center">
                                    <h1 class="text-secondary mb-4" style={{fontFamily:"fantasy"}}>Recent Post</h1>
                                </div><br />
                                {job.filter(j=>j.company===company).length > 0 ?
                                    job.filter(j=>j.company===company).sort((a,b)=>new Date(a.deadline)-new Date(b.deadline)).reverse().map((j,i)=>(
                                    <div class="row align-items-start job-item border-bottom pb-3 mb-3 pt-3" key={i}>
                                        <div class="col-md-6">
                                            {j.jobtype === "Fulltime" ? <span class="badge badge-primary px-2 py-1 mb-3">{j.jobtype}</span> :
                                                (j.jobtype === "Parttime" ? <span class="badge badge-success px-2 py-1 mb-3">{j.jobtype}</span> :
                                                <span class="badge badge-warning px-2 py-1 mb-3">{j.jobtype}</span> )
                                            }
                                            <h4 className="text-info">{j.requirement}</h4>
                                        </div>
                                        <div class="col-md-3 text-md-center">
                                            <p><NotificationBadge count={j.vacancy} effect={Effect.SCALE}/>Remaining Vacancy</p>
                                            {(new Date(j.deadline).getTime()) >= today.getTime() ? <strong className="text-black">Deadline :&nbsp;
                                            {new Date(j.deadline).toDateString()}</strong> : 
                                            <strong className="text-danger">Overdue by {Math.round((today.getTime() - (new Date(j.deadline).getTime())) / (1000 * 3600 * 24))} days</strong>}
                                        </div>
                                        <div className="col-md-1"></div>
                                        <div class="col-md-1">
                                            <button className="btn btn-info" onClick={handleEdit(j.id)}>Edit</button> 
                                        </div>
                                        <div class="col-md-1">
                                            <button className="btn btn-danger" onClick={handleDelete(j.id)}>Delete</button>
                                        </div>
                                    </div>
                                    ))
                                : <div><h4 className="text-center mt-3">No any current opening!!!</h4></div> }
                            </div>
                        </div>
                    </div> 
                </div>  
            </div>
		);
	}
  return (
    <div>
        {jobForm()}
    </div>
  );
}

export default withRouter(CreateJob);
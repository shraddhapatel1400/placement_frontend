import React, {useState,useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { API } from '../../../backend';
import { updateStudent, isAuthenticatedS } from '../../helper';
import Swal from 'sweetalert2';

const Person = () => {
    const [personal, setPersonal] = useState([]);
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        image: [],
        error: "",
        loading: false
    });

    const { loading, error } = values;

    const [per,setper] = useState([]);

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const handleChangePhoto = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.files[0]})
        console.log(event.target.files[0])
    };

    const submitPersonal = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updateStudent(studentId,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.firstname,data.lastname,data.email,data.phone]
                });
            } else {
                setValues({ ...values, error: false, loading: false });
                Swal.fire({
                    icon : "success",
                    title: "<h3>Saved successfully!!!</h3>"
                })
                history.push('/resume/summary')
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

    const studentId = isAuthenticatedS().user.id;
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const data1 = await response1.json();
            setPersonal(data1);
        };
        fetchData();
    }, []);

  return (
    <div>
        <section className="section" id="our-classes">
            <div className="content"><br />
                <div className="row" id="tabs">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-3">
                        <ul>
                            <li><Link to="/resume/personal"><i className="fa fa-user"></i> Personal Information</Link></li>
                            <li><Link to="/resume/summary"><i className="fa fa-info-circle"></i> Summary</Link></li>
                            <li><Link to="/resume/education"><i className="fa fa-graduation-cap"></i> Educational Qualification</Link></li>
                            <li><Link to="/resume/skill"><i className="fa fa-cogs"></i> Technical Skills</Link></li>
                            <li><Link to="/resume/project"><i className="fa fa-tasks"></i> Academic Projects</Link></li>
                            <li><Link to="/resume/preview"><i className="fa fa-eye"></i> Preview Resume</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-7">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active"><Link to="/resume/personal">Personal Information</Link></li>
                            </ol>
                        </nav>
                        <section className='tabs-content' style={{width: "100%"}}>
                            
                            <article id='tabs-1'>
                                <h3>Personal Information</h3><br />
                                {LoadingMess()}
                                <form onSubmit={submitPersonal}>
                                    {personal.filter(s=>s.id == isAuthenticatedS().user.id).map((s,i)=>(
                                        <div key={i}>
                                            <div className="input-container">
                                                <input defaultValue={s.firstname} type="text" onChange={handleChange("firstname")} />
                                                <label style={{color:"tomato"}}>First Name</label>	
                                                <span className="text-danger">{error[0]}</span>	
                                            </div><br />
                                            <div className="input-container">
                                                <input type="text" defaultValue={s.lastname} onChange={handleChange("lastname")} />
                                                <label style={{color:"tomato"}}>Last Name</label>
                                                <span className="text-danger">{error[1]}</span>			
                                            </div><br />
                                            <div className="input-container">
                                                <input type="mail" defaultValue={s.email} onChange={handleChange("email")} />
                                                <label style={{color:"tomato"}}>Email</label>		
                                                <span className="text-danger">{error[2]}</span>	
                                            </div><br />
                                            <div className="input-container">
                                                <input type="text" defaultValue={s.phone} onChange={handleChange("phone")} />
                                                <label style={{color:"tomato"}}>Contact no</label>	
                                                <span className="text-danger">{error[3]}</span>		
                                            </div><br />
                                            <div className="input-container">
                                                <input type="text" defaultValue={s.address} onChange={handleChange("address")} />
                                                <label style={{color:"tomato"}}>Address</label>		
                                            </div><br />
                                            <div className="input-container">
                                                <span className="text-info">Current : {s.image}</span>
                                                <input type="file" name="photo" accept="image/png, image/jpeg" onChange={handleChangePhoto("image")}/>
                                                <label style={{color:"tomato"}}>Upload Photo</label>
                                            </div><br />
                                            <div className="input-container">
                                                <button type="submit" className="btn btn-info" style={{justifyContent: "center"}}>Save</button>&nbsp;&nbsp;&nbsp;
                                                <button type="button" className="btn btn-info"
                                                    onClick={() => {history.push("/resume/summary")}} >Next</button>
                                            </div> 
                                        </div>
                                    ))}
                                </form>
                            </article><br />
                        </section>
                    </div><div className="col-lg-1"></div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Person;
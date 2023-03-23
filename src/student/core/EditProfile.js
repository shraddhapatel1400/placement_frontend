import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { isAuthenticatedS, updateStudent } from '../helper';

const EProfileS = ({history}) => {

    const [student, setStudent] = useState([]);
    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        pdf: [],
        image: [],
        error: "",
        loading: false
    });

    const { loading, error } = values;
    const [per,setper] = useState([]);
    const id = isAuthenticatedS().user.id;

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updateStudent(id,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.firstname,data.lastname,data.email,data.phone]
                })
            } else {
                setValues({ ...values, error: false, loading: false });
                history.push('/profiles');
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
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const data1 = await response1.json();
            setStudent(data1);
        };
        fetchData();
    }, []);

  return (
    <section class="section" id="features">
        <article className="card-body mx-auto" style={{width: "900px"}}>
            <div class="section-heading">
                <h2>Edit Profile</h2>
                <img src="assets/images/line-dec.png" alt="waves" />    
            </div>
            <form>
                {LoadingMess()}
                {student.filter(c=>c.id == isAuthenticatedS().user.id).map((c,i)=>(
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your FirstName"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input defaultValue={c.firstname} className="form-control" placeholder="First name" type="text" required onChange={handleChange("firstname")} />
                            <span className="text-danger">{error[0]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your LastName"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input defaultValue={c.lastname} className="form-control" placeholder="Last name" type="text" required onChange={handleChange("lastname")} />
                            <span className="text-danger">{error[1]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Email"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input defaultValue={c.email} className="form-control" placeholder="Email address" type="email" required onChange={handleChange("email")} />
                            <span className="text-danger">{error[2]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Address"> <i className="fa fa-address-card"></i> </span>
                            </div>
                            <textarea defaultValue={c.address} className="form-control" placeholder="Address" type="text" onChange={handleChange("address")} />
                        </div>
                    </div>   
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Phone"> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input defaultValue={c.phone} className="form-control" placeholder="Phone" type="text" onChange={handleChange("phone")} />
                            <span className="text-danger">{error[3]}</span>	
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Resume"> <i className="fa fa-file"></i> </span>
                                <input defaultValue="" className="form-control" type="file" onChange={handleChangePhoto("pdf")} />
                            </div>
                            <span style={{fontSize:"13px",color:"slateblue"}}><strong>Current : </strong>{c.pdf ? c.pdf : "No resume"}</span>
                        </div>  
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Profile"> <i className="fa fa-image"></i> </span>
                                <input defaultValue="" className="form-control" type="file" onChange={handleChangePhoto("image")} />
                            </div>
                            <span style={{fontSize:"13px",color:"slateblue"}}><strong>Current : </strong>{c.image}</span>
                        </div>  
                    </div> 
                </div>
                ))}
                <div className="row"> 
                    <div className="col-lg-12">                              
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block" onClick={handleSubmit}>Save</button>
                        </div>  
                    </div>      
                </div>    
            </form>
                                                                        
        </article>
    </section>
  );
}

export default EProfileS;
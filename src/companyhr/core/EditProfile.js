import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { editProfile, isAuthenticatedC } from '../helper';

const EProfileC = ({history}) => {

    const [company, setCompany] = useState([]);
    const [values, setValues] = useState({
        fullname: "",
        email: "",
        phone: "",
        companyname: "",
        location: "",
        logo: [],
        error: "",
        loading: false
    });

    const { loading, error } = values;
    const [per,setper] = useState([]);
    const id = isAuthenticatedC().user.id;

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
        editProfile(id,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.fullname,data.email,data.companyname,data.location,data.phone]
                })
            } else {
                setValues({ ...values, error: false, loading: false });
                history.push('/profilec');
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
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            setCompany(data1);
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
                {company.filter(c=>c.id == isAuthenticatedC().user.id).map((c,i)=>(
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Name"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input defaultValue={c.fullname} className="form-control" placeholder="Full name" type="text" required onChange={handleChange("fullname")} />
                            <span className="text-danger">{error[0]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Email"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input defaultValue={c.email} className="form-control" placeholder="Email address" type="email" required onChange={handleChange("email")} />
                            <span className="text-danger">{error[1]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Contact No."> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input defaultValue={c.phone} className="form-control" placeholder="Phone number" type="text" onChange={handleChange("phone")} />
                            <span className="text-danger">{error[4]}</span>
                        </div> 
                    </div>   
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Company Name"> <i className="fa fa-building"></i> </span>
                            </div>
                            <input defaultValue={c.companyname} className="form-control" placeholder="Company Name" type="text" onChange={handleChange("companyname")} />
                            <span className="text-danger">{error[2]}</span>
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Company Location"> <i className="fa fa-map-marker"></i> </span>
                            </div>
                            <input defaultValue={c.location} className="form-control" placeholder="Company Location" type="text" onChange={handleChange("location")} />
                            <span className="text-danger">{error[3]}</span>
                        </div>  
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Company Logo"> <i className="fa fa-image"></i> </span>
                            </div>
                            <input defaultValue="" className="form-control" type="file" onChange={handleChangePhoto("logo")} />
                            <span style={{fontSize:"13px",color:"slateblue"}}><strong>Current : </strong>{c.logo}</span>
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

export default EProfileC;
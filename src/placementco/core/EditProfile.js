import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { isAuthenticatedP,updatePlacement } from '../helper';

const EProfileP = ({history}) => {

    const [placement, setPlacement] = useState([]);

    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        error: "",
        loading: false
    });

    const { loading, error } = values;
    const [per,setper] = useState([]);
    const id = isAuthenticatedP().user.id;

    const handleChange = (name) =>
    (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
        setper({...per,[name]: event.target.value})
        console.log(event.target.value)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        updatePlacement(id,per)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.name,data.email,data.phone]
                })
            } else {
                setValues({ ...values, error: false, loading: false });
                history.push('/profilep');
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
            const response1 = await fetch(`${API}placementco/`,{method: "GET"});
            const data1 = await response1.json();
            setPlacement(data1);
        };
        fetchData();
    }, []);

  return (
    <section class="section" id="features" style={{minHeight:"620px"}}>
        <article className="card-body mx-auto" style={{width: "900px"}}>
            <div class="section-heading">
                <h2>Edit Profile</h2>
                <img src="assets/images/line-dec.png" alt="waves" />    
            </div>
            <form>
                {LoadingMess()}
                {placement.filter(c=>c.id == isAuthenticatedP().user.id).map((c,i)=>(
                <div className="row">
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Name"> <i className="fa fa-user"></i> </span>
                            </div>
                            <input defaultValue={c.name} className="form-control" placeholder="Full name" type="text" required onChange={handleChange("name")} />
                            <span className="text-danger">{error[0]}</span>	
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Email"> <i className="fa fa-envelope"></i> </span>
                            </div>
                            <input defaultValue={c.email} className="form-control" placeholder="Email address" type="email" required onChange={handleChange("email")} />
                            <span className="text-danger">{error[1]}</span>	
                        </div> 
                    </div>   
                    <div className="col-lg-6">
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Contact No."> <i className="fa fa-phone"></i> </span>
                            </div>
                            <input defaultValue={c.phone} className="form-control" placeholder="Phone number" type="text" onChange={handleChange("phone")} />
                            <span className="text-danger">{error[2]}</span>	
                        </div> 
                        <div className="form-group input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" data-toggle="tooltip" data-placement="bottom" title="Your Address"> <i className="fa fa-address-card"></i> </span>
                            </div>
                            <textarea defaultValue={c.address} className="form-control" placeholder="Address" type="text" onChange={handleChange("address")} />
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

export default EProfileP;
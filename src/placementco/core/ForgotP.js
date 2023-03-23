import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../../backend';
import { updatePlacement } from '../helper';

const ForgotP = () => {
    const [user, setUser] = useState([]);

    const [values, setValues] = useState({
        email: "",
        password: "",
        repassword: "",
        error1: "",
        error2: "",
        error3 : "",
        success: false,
        loading: false,
        didRedirect : false
    });

    const { email, password, repassword, error1, error2, error3, loading, success, didRedirect } = values;


    const handleChange = (name) =>
    (event) => {
      setValues({ ...values,[name]: event.target.value });
      console.log([name]+'/'+ event.target.value)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var em = user.some(s=>s.email == email)
        var mailformat = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        if (email.match(mailformat)) {
            if (em) {
                var e = user.filter(s=>s.email == email).map(s=>s.id)
                setValues({...values, error1:""})
                if (password != '') {
                    if (repassword != '') {
                        if (password == repassword) {
                            setValues({...values, error1: "", error2: "", error3:"", loading:true})
                            updatePlacement(e,{password})
                            .then((data)=>{
                                console.log("DATA",data)
                                if (!data.id) {
                                    setValues({...values, error2:data.password, error3:data.password})
                                } else {
                                    setValues({
                                        ...values,
                                        email: "",
                                        password: "",
                                        repassword: "",
                                        error1: "",
                                        error2: "",
                                        error3 : "",
                                        success: false,
                                        loading: false,
                                        didRedirect: true
                                    })
                                }
                            })
                            .catch(e=>console.log(e))
                        } else {
                            setValues({...values, error3:"Password not match!"})
                        }
                    } else {
                        setValues({...values, error2:"", error3:"This field may not be blank!"})
                    }
                } else {
                    setValues({...values,error1:"", error2:"This field may not be blank!"})
                }
                /*  */
            } else {
                setValues({...values, error1:"Email not match!"})
            }
        } else {
            setValues({...values, error1:"Please enter valid Email!"})
        }
    }

    const performRedirect = () => {
        if (didRedirect) {
            return (<Redirect to="/signinp" />)
        }   
    };

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}placementco/`,{method: "GET"});
            const data1 = await response1.json();
            setUser(data1);
        };
        fetchData();
    }, []);

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

  return (
    <div className="container" style={{height:"950px", width:"500px",marginTop:"80px"}}>
            <br /><br />
            <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div className="row">
                <div className="col-lg-12">
                    <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Forgot Password!</h1>
                    </div>
                    {LoadingMess()}
                    {performRedirect()}
                    <form className="user">
                        <div className="form-group">
                            <input type="email" className="form-control form-control-user" id="email" 
                                required placeholder="Enter your email" value={email} onChange={handleChange("email")} />
                                
                            <span className="text-danger">{error1}</span>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-user" id="newpassword" 
                                required placeholder="Enter New Password" value={password} onChange={handleChange("password")} />
                            <span className="text-danger">{error2}</span>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-user" id="repassword" 
                                required placeholder="Repeat your Password" value={repassword} onChange={handleChange("repassword")} />
                            <span className="text-danger">{error3}</span>
                        </div>
                        <button className="btn btn-primary btn-user btn-block" onClick={handleSubmit}>Save</button>
                    </form>
                    <hr />
                    <div className="text-center">
                        <Link className="small" to="/signinp">
                            Get Ready to Re-Login!
                        </Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
  );
}

export default ForgotP;
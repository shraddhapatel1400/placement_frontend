import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { Link, Redirect } from 'react-router-dom';
import { authenticate, isAuthenticatedC, signincm } from '../helper';
import {NotificationManager} from 'react-notifications';

const Login = () => {

    const [company, setCompany] = useState([]);
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });

    const { email, password, error, loading, didRedirect } = values;

    const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const cmp = company.filter(c=>c.email==email).map(c=>c.status)

        if (email == '' && password == '') {
            setValues({
                ...values,
                error: true,
            });
        } else {
        if (cmp == 1) {
            setValues({ ...values, error: false, loading: true });
            signincm({email, password})
            .then(data => {
                console.log("DATA", data)
                if (data.token) {
                    authenticate(data, () => {
                        console.log("TOKEN ADDED");
                        setValues({
                            ...values,
                            didRedirect: true,
                            error: false,
                        });
                        
                    });
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        error: data.error,
                    });
                }
            })
            .catch(e=>console.log(e))
        } else if (cmp == 0) {
            NotificationManager.error("Sorry! You are rejected. Please contact to placement cell if any doubt.");
            setValues({ ...values, email:"", password:""});
        } else {
            NotificationManager.warning("Please wait till you have been invited/reject");
            setValues({ ...values, email:"", password:""});
        }
        }
    }
    const performRedirect = () => {
        if (isAuthenticatedC()) {
          return (<Redirect to="/homec" />)
        }
    };

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }
    
    const errorMessage = () => {
        return(
            <div className="alert" style={{ display: error ? "" : "none" }}>
                {/* <span className="closebtn" onclick={!error}>&times;</span> */} 
                <strong>Opps!</strong>  You entered invalid Email or Password!!!
            </div>
        )
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
        <div className="container" style={{height:"777px"}}>
                <br /><br /><br /><br /><br />
            <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                    <div className="col-lg-6 d-none d-lg-block" style={{backgroundImage:"url('./assets/images/log.jpg')"}}></div>
                    <div className="col-lg-6">
                        <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back! Company HR</h1>
                        </div>
                        {LoadingMess()}
                        {errorMessage()}
                        {performRedirect(didRedirect)}
                        <form className="user">
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" 
                                    placeholder="Enter Email Address..." value={email} onChange={handleChange("email")}  />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control form-control-user" id="exampleInputPassword" 
                                placeholder="Password" value={password} onChange={handleChange("password")} />
                            </div>
                            <button className="btn btn-primary btn-user btn-block" onClick={onSubmit}>Login</button>
                        </form>
                        <hr/>
                        <div className="text-center">
                            <Link className="small" to="/forgotc">Forgot Password?</Link>
                        </div>
                        <div className="text-center">
                            <Link className="small" to="/signupc">Create an Account!</Link>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default Login;
import React,{useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../../backend';
import { authenticate, isAuthenticatedS, signins } from '../helper/index';
import {NotificationManager} from 'react-notifications';

const Login = () => {

    const [student, setStudent] = useState([]);
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
        const stud = student.filter(s=>s.email==email).map(s=>s.status)

        if (email == '' && password == '') {
            setValues({
                ...values,
                error: true,
            });
        } else {
        if (stud == 1) {
            setValues({ ...values, error: false, loading: true });
            signins({email, password})
            .then(data => {
                console.log("DATA", data)
                if (data.token) {
                    //let sessionToken = data.token;
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
        } else if (stud == 0) {
            NotificationManager.error("Sorry! You are rejected. Please contact to placement cell if any doubt.");
            setValues({ ...values, email:"", password:""});
        } else {
            NotificationManager.warning("Please wait till you have been approved/reject");
            setValues({ ...values, email:"", password:""});
        }
        }
    }

    const performRedirect = () => {
        if (isAuthenticatedS()) {
          return (<Redirect to="/homes" />)
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
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const data1 = await response1.json();
            setStudent(data1);
        };
        fetchData();
    }, []);

	const signinForm = () => {
		return(
            <div className="container" style={{height:"777px"}}>
                <br /><br /><br /><br /><br />
            <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-9">
                <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">
                    <div className="row">
                    <div className="col-lg-6 d-none d-lg-block" style={{backgroundImage:"url('./assets/images/1.jpg')"}}></div>
                    <div className="col-lg-6">
                        <div className="p-5">
                        <div className="text-center">
                            <h1 className="h4 text-gray-900 mb-4">Welcome Back! Student</h1>
                        </div>
                        {LoadingMess()}
                        {errorMessage()}
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
                            <Link className="small" to="/forgot">Forgot Password?</Link>
                        </div>
                        <div className="text-center">
                            <Link className="small" to="/signups">Create an Account!</Link>
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
  return (
    <div>
        {signinForm()}
        {performRedirect(didRedirect)}
    </div>
  );
}

export default Login;
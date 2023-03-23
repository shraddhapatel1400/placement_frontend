import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticatedS, signups } from '../helper/index';
import {NotificationManager} from 'react-notifications';
import Alert from 'react-s-alert';

const Register = () => {
	const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        semester: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });

    const { firstname, lastname, email, password, semester, error, loading, didRedirect, success } = values;

    const handleChange = (name) =>
    (event) => {
	  setValues({ ...values, error: false, [name]: event.target.value });
	};
	
	const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signups({firstname, lastname, email, password, semester})
        .then((data) => {
            console.log("DATA", data);
            if (data.email === email) {
              setValues({
                ...values,
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                semester: "",
                error: "",
                success: true,
                didRedirect: true
              });
              NotificationManager.success("",'Registration Successful!!!');
            } else {
                Alert.error('Please fix this all errors!!!', {
                    position: 'bottom-left',
                    effect: 'slide',
                    beep: 'http://s-alert-demo.meteorapp.com/beep.mp3'
                  });
              setValues({
                ...values,
                error: [data.firstname,data.lastname,data.email,data.password,data.semester],
                success: false,
                loading: false,
              });
            }
        })
        .catch((e) => console.log(e));
      };

    const performRedirect = () => {
        if (isAuthenticatedS()) {
          return (<Redirect to="/" />)
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
    
    const successMessage = () => {
        return(
            <div className="alert success" style={{ display: success ? "" : "none" }}>
                Account created successfully!!! Please wait till you have been approved/reject.
            </div>
        )
    }

	const signupForm = () => {
		return(
            <div className="container" style={{height:"950px"}}>
            <br /><br />
            <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
                <div className="row">
                <div className="col-lg-5 d-none d-lg-block" style={{backgroundImage:"url('./assets/images/std1.png')"}}></div>
                <div className="col-lg-7">
                    <div className="p-5">
                    <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Registration for Student!</h1>
                    </div>
                    {LoadingMess()}
                    {successMessage()}
                    
                    {performRedirect(didRedirect)}
                    <form className="user">
                        <div className="form-group row">
                            <div className="col-sm-6 mb-3 mb-sm-0">
                                <input type="text" className="form-control form-control-user" id="firstname" 
                                    placeholder="First Name" value={firstname} onChange={handleChange("firstname")} />
                                <span className="text-danger">{error[0]}</span>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control form-control-user" id="lastname" 
                                    placeholder="Last Name" value={lastname} onChange={handleChange("lastname")} />
                                <span className="text-danger">{error[1]}</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control form-control-user" id="email" 
                                placeholder="email" value={email} onChange={handleChange("email")} />
                            <span className="text-danger">{error[2]}</span>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control form-control-user" id="Password" 
                                placeholder="Password" value={password} onChange={handleChange("password")} />
                            <span className="text-danger">{error[3]}</span>
                        </div>
                        <button className="btn btn-primary btn-user btn-block" onClick={onSubmit}>Register Account</button>
                    </form>
                    <hr />
                    <div className="text-center">
                        <Link className="small" to="/signins">Already have an account? Login!</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
		)
	}
  return (
    <div>
        {signupForm()}
        {performRedirect(didRedirect)}
    </div>
  );
}

export default Register;
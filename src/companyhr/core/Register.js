import React,{useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticatedC, signupcm } from '../helper';
import ImageUploader from 'react-images-upload';
import {NotificationManager} from 'react-notifications';
import Alert from 'react-s-alert';

const Register = () => {

    const [values, setValues] = useState({
        fullname: "",
        email: "",
        password: "",
        companyname: "",
        logo: [],
        location: "",
        phone: "",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    });

    const { fullname, email, password, companyname, logo, location, phone, error, loading, didRedirect, success } = values;

    const handleChange = (name) =>
    (event) => {
      setValues({ ...values, error: false, [name]: event.target.value });
    };

    const onChangePicture = (name) =>
    (event) => {
        console.log(event[0])
        setValues({ ...values ,error: false,[name] : event[0]});
    };
    
    const onSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signupcm({fullname, email, password, companyname, logo, location, phone})
        .then((data) => {
            console.log("DATA", data);
            if (data.email === email) {
              setValues({
                ...values,
                fullname: "",
                email: "",
                password: "",
                companyname: "",
                logo: [],
                location: "",
                phone: "",
                error: "",
                success: true,
                didRedirect: true
              });
              NotificationManager.success("",'Registration Successfully!');
            } else {
                Alert.error('Please fix this all errors!!!', {
                    position: 'bottom-left',
                    effect: 'slide',
                    beep: 'http://s-alert-demo.meteorapp.com/beep.mp3'
                  });
              setValues({
                ...values,
                error: [data.fullname,data.email,data.password,data.companyname,data.logo,data.location,data.phone],
                success: false,
                loading: false,
              });
            }
        })
        .catch((e) => console.log(e));
      };

    const performRedirect = () => {
        if (isAuthenticatedC()) {
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
                {/* <span className="closebtn" onclick={!error}>&times;</span> */} 
                Account created successfully!!! Please wait till you have been invited/reject.
            </div>
        )
    }

    return (
        <div class="container" style={{minHeight:"1050px"}}>
            <br /><br />
            <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
                <div class="row">
                <div class="col-lg-5 d-none d-lg-block" style={{backgroundImage:"url('./assets/images/form-wizard.jpg')"}}></div>
                <div class="col-lg-7">
                    <div class="p-5">
                    <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Registration for Company HR!</h1>
                    </div>
                    {LoadingMess()}
                    {successMessage()}
                    
                    {performRedirect(didRedirect)}
                    <form class="user">
                        <div class="form-group">
                            <input type="text" class="form-control form-control-user" id="FullName" 
                                placeholder="Full Name" value={fullname} onChange={handleChange("fullname")} />
                            <span className="text-danger">{error[0]}</span>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6 mb-3 mb-sm-0">
                                <input type="email" class="form-control form-control-user" id="Email" 
                                    placeholder="Email Address" value={email} onChange={handleChange("email")} />
                                <span className="text-danger">{error[1]}</span>
                            </div>
                            <div class="col-sm-6">
                                <input type="password" class="form-control form-control-user" id="Password" 
                                    placeholder="Password" value={password} onChange={handleChange("password")} />
                                <span className="text-danger">{error[2]}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control form-control-user" id="cmpName" 
                                placeholder="Company Name" value={companyname} onChange={handleChange("companyname")} />
                            <span className="text-danger">{error[3]}</span>
                        </div>
                        <div class="form-group">
                            <ImageUploader
                                withPreview="true"
                                withIcon={false}
                                value={logo}
                                onChange={onChangePicture("logo")}
                                imgExtension={[".jpg", ".jpeg", ".png"]}
                                maxFileSize={5242880}
                                singleImage="true"
                                buttonText="Choose Company logo"
                            />
                            {/* <input type="file" name="photo" accept="image/png, image/jpeg" onChange={onChangePicture("logo")}/> */}
                            <span className="text-danger">{error[4]}</span>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control form-control-user" id="location" 
                                placeholder="Company Location" value={location} onChange={handleChange("location")} />
                            <span className="text-danger">{error[5]}</span>
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control form-control-user" id="phone" maxLength="10"
                                placeholder="Contact No." value={phone} onChange={handleChange("phone")} />
                            <span className="text-danger">{error[6]}</span>
                        </div>
                        <button class="btn btn-primary btn-user btn-block" onClick={onSubmit}>Register Account</button>
                    </form>
                    <hr />
                    <div class="text-center">
                        <Link class="small" to="/signinc">Already have an account? Login!</Link>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

        </div>
    );
}

export default Register;
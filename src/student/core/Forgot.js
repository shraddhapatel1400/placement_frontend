import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { API } from '../../backend';
import { resetPass, reset_password, sendMessage, signouts } from '../helper';
import Select from 'react-select';  

const Forgot = ({history}) => {
    const [user, setUser] = useState([]);

    const [values, setValues] = useState({
        email: "",
        phone : "",
        password: "",
        error2: "",
        error3: "",
        error4: "",
        eorp : "",
        otp : "",
        p : false,
        pwd : false,
        success: false,
        success1: false,
        loading: false,
        didRedirect : false
    });

    const [val, setVal] = useState({
        error:"",
        loading1: false,
        success2: false
    })

    const options = [
        {value: "e",label: "Email ID"},
        {value: "p",label: "Contact No"},
    ]

    const { error, loading1, success2 } = val;
    const { email, phone, password, pwd, eorp, p, otp, error2, error3, error4, loading, success, success1, didRedirect } = values;

    const handleOpt = (event) => {
        console.log(event.value)
        setValues({...values,eorp:event.value});
    }

    const handleChange = (name) =>
    (event) => {
      setValues({ ...values,[name]: event.target.value });
      console.log([name]+'/'+ event.target.value)
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var mailformat = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
        if (email.match(mailformat)) {
            setVal({...val,loading1:true});
            reset_password({email})
            .then((data)=>{
                console.log("DATA",data)
                setVal({ ...val,error:"", loading1: false, success2: data.success });
            })
            .catch(e=>console.log(e))
        } else {
            setVal({...val, error: "Please enter valid Email!"});
        }
        
        /* const id = user.filter(s=>s.email === email).map(s=>s.id)
        setValues({...values, error1:"",loading1:true})
        if (eorp == "e" && email != "") {
            var mailformat = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
            if (email.match(mailformat)) {
                setValues({ ...values,error1:"", loading1: true });
                reset_password({email})
                .then((data)=>{
                    console.log("DATA",data)
                    setValues({ ...values,error1:"", loading1: false });
                })
                .catch(e=>console.log(e))
            } else {
                setValues({ ...values, error1: "Please enter valid Email!"});
            }
        } else {
            setValues({ ...values, error1: "This field id required."});
        } */

        setValues({ ...values, loading: true });
        if (eorp == "p" && phone != "") {
            sendMessage({phone})
            .then((data)=>{
                console.log("DATA",data)
                setValues({ ...values, p: true, loading: false, success: data.success });
            })
        } else {
            setValues({ ...values, error2: "This field id required."});
        }
        
    }

    const checkOTP = (event) => {
        event.preventDefault();
        setValues({ ...values, error1: "", error2: "",error3:"", loading: true});
        sendMessage({otp})
        .then((data)=>{
            console.log("DATA",data)
            if (data.error) {
                setValues({...values, error3: data.error})
            } else if (data.success) {
                setValues({...values, error3:"", success1: data.success, pwd: true})
            }
        })
        .catch(e=>console.log(e))
    }

    const handlePassword = (event) => {
        event.preventDefault();
        var sid = user.filter(s=>s.phone == phone).map(s=>s.id)
        setValues({ ...values, error1: "", error2: "",error3:"", error4:"", loading: true});
        resetPass(sid,password)
            .then(data => {
                console.log("DATA", data);
                if (data.id) {
                    setValues({
                    ...values,
                    email: "",
                    phone: "",
                    password: "",
                    error1: "",
                    error2: "",
                    error3: "",
                    error4: "",
                    pwd: false,
                    eorp: "",
                    p: false,
                    otp : "",
                    loading : false,
                    success: true,
                    didRedirect: true
                    });
                } else {
                    setValues({
                    ...values,
                    error4: [data.password],
                    success: false,
                    loading: false,
                    });
                }
            })
            .catch(e=>console.log(e))
    }

    const performRedirect = () => {
        if (didRedirect) {
            return (<Redirect to="/signins" />)
        }   
    };

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
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
    const LoadingMess1 = () => {
        return(
            loading1 && (<div className="text-center">
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
                    {LoadingMess1()}
                    {performRedirect()}
                    <form className="user">
                        <div className="form-group">
                            <Select options={options} class="form-control form-control-user" 
                            placeholder="Select..." onChange={handleOpt} /> 
                        </div>
                        {eorp == "e" ?
                        <div>
                            <div className="form-group">
                                <input type="email" className="form-control form-control-user" id="email" 
                                    required placeholder="Enter your email" value={email} onChange={handleChange("email")} />
                                <span className="text-danger">{error}</span>
                                <span className="text-success">{success2}</span>
                            </div>
                            <button className="btn btn-primary btn-user btn-block" onClick={handleSubmit}>Save</button>
                        </div> : (eorp == "p" ?
                        <div>
                            <div className="form-group">
                                <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control form-control-user" id="phone" 
                                    required placeholder="Enter mobile number" value={phone} onChange={handleChange("phone")} />
                                <span className="text-danger">{error2}</span>
                                <span className="text-success">{success}</span>
                            </div>
                            {p ? <div>
                                    <div className="form-group">
                                        <input type="password" className="form-control form-control-user" id="otp" 
                                            required placeholder="Enter OTP" value={otp} onChange={handleChange("otp")} />
                                        <span className="text-danger">{error3}</span>
                                        <span className="text-success">{success1}</span>
                                    </div>
                                    {pwd ? <div>
                                                <div className="form-group">
                                                    <input type="password" className="form-control form-control-user" id="password" 
                                                        required placeholder="Enter New Password" value={password} onChange={handleChange("password")} />
                                                    <span className="text-danger">{error4}</span>
                                                    <span className="text-success"></span>
                                                </div>
                                                <button className="btn btn-primary btn-user btn-block" onClick={handlePassword}>Submit</button>
                                            </div> : 
                                    <button className="btn btn-primary btn-user btn-block" onClick={checkOTP}>Submit</button>}
                                </div> :
                                <button className="btn btn-primary btn-user btn-block" onClick={handleSubmit}>Save</button>
                            }
                        </div>
                        : ""
                        )}
                    </form>
                    <hr />
                    <div className="text-center">
                        <Link className="small" to="/signins">
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

export default Forgot;
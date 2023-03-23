import React, { useState } from 'react';
import { createFeedback } from './helper';
import {NotificationManager} from 'react-notifications';

const Contact = () => {

    const [values,setValues] = useState({
        name : "",
        email : "",
        subject : "",
        message : "",
        error : "",
        loading : false
    });

    const { name,email,subject,message,error,loading } = values;

    const handleChange = (name) => (event) => {
        setValues({...values, [name] : event.target.value})
        console.log([name] +'/'+ event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values,loading :true,error:false });
        createFeedback({name,email,subject,message})
        .then((data)=>{
            console.log("DATA",data)
            if (!data.id) {
                setValues({
                    ...values,
                    error : [data.name,data.email,data.subject,data.message],
                    loading : false
                })
            } else {
                setValues({
                    ...values,
                    name : "",
                    email : "",
                    subject : "",
                    message : "",
                    error : "",
                    loading : false
                });
                NotificationManager.success("We will contact you shortly. Thanks! For visiting Career Club.",'Your message sent successfully!!!');
            }
        })
    }

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

  return (
    <div>
        <section class="section section-bg" id="call-to-action" style={{backgroundImage: "url(assets/images/banner-image-1-1920x500.jpg)"}}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <div class="cta-content">
                            <br />
                            <br />
                            <h2>Feel free to <em>Contact Us</em></h2>
                            <p>College of Agricultural Information Technology, Anand Agricultural University, Anand.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="features">
            <div class="container">
                <div class="row text-center">

                    <div class="col-md-4">
                        <div class="icon1">
                            <i class="fa fa-phone"></i>
                        </div>
                        <h6><a href="tel:+91-2692-263123">+91-2692-263123<br />+91-2692-263124</a></h6>
                    </div>

                    <div class="col-md-4">
                        <div class="icon1">
                            <i class="fa fa-envelope"></i>
                        </div>
                        <h5><a href="mailto:dit@aau.in">dit@aau.in</a></h5>
                    </div>

                    <div class="col-md-4">
                        <div class="icon1">
                            <i class="fa fa-map-marker"></i>
                        </div>
                        <h6><a href="https://www.google.com/maps/place/College+of+Agricultural+Information+Technology/@22.5337134,72.9679137,17z/data=!3m1!4b1!4m5!3m4!1s0x395e4c3faaaaaaab:0xcf7918e63be0d79c!8m2!3d22.5337134!4d72.9701024" target="_blank"> 
                            Anand Agricultural University, Anand-388110, Gujarat (INDIA).</a></h6>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" id="contact-us" style={{marginTop: "0"}}>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <div id="map">
                        <iframe src="http://www.aau.in/college-menu/703" 
                          width="100%" height="735px" frameborder="0" style={{border:"0"}} allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-xs-12">
                        <div class="contact-form section-bg" style={{backgroundImage: "url(assets/images/contact-1-720x480.jpg)"}}>
                            <form id="contact">
                                {LoadingMess()}
                                <div class="form-group row">
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input name="name" type="text" id="name" placeholder="Your Name*" required=""
                                        onChange={handleChange("name")} value={name} className="form-control form-control-user" />
                                        <span className="text-danger">{error[0]}</span>
                                    </div>
                                    <div class="col-sm-6 mb-3 mb-sm-0">
                                        <input name="email" type="text" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your Email*"
                                        required="" onChange={handleChange("email")} value={email} className="form-control form-control-user" />
                                        <span className="text-danger">{error[1]}</span>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input name="subject" type="text" id="subject" placeholder="Subject" 
                                    onChange={handleChange("subject")} value={subject} className="form-control form-control-user" />
                                    <span className="text-danger">{error[2]}</span>
                                </div>
                                <div className="form-group">
                                    <textarea name="message" rows="6" id="message" placeholder="Message" 
                                    required="" onChange={handleChange("message")} value={message}  className="form-control form-control-user" ></textarea>
                                    <span className="text-danger">{error[3]}</span>
                                </div>
                                <button id="form-submit" class="main-button" onClick={handleSubmit}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    </div>
  );
}

export default Contact;
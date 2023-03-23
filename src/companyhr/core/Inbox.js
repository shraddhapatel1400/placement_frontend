import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { send_mail } from '../helper';
import {NotificationManager} from 'react-notifications';

const Inbox = ({ children }) => {

    const [val,setVal] = useState({
        isModalOpen : false
    });

    const [values,setValues] = useState({
        email : "",
        subject : "",
        message : "",
        image : [],
        error1 : "",
        error2 : "", 
        loading : ""
    });

    const {email,subject,message,image,error1,error2,loading} = values;

    const {isModalOpen} = val;

    const handleClose = () => setVal({...val, isModalOpen : !isModalOpen});
    const handleChat = () =>{
        setVal({...val, isModalOpen:!isModalOpen});
    }

    const handleChange = (name) => (event) => {
        setValues({...values,[name] : event.target.value});
    }

    const handleChangePhoto = (name) => (event) => {
        setValues({...values,[name] : event.target.files[0]});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email != "" && image != "") {
            setValues({...values,loading:true,error1:"",error2:""})
            send_mail({email,subject,message,image})
            .then((data)=>{
                console.log("DATA",data)
                setValues({
                    ...values,
                    email : "",
                    subject : "",
                    message : "",
                    image:[],
                    error1:"",
                    error2:"",
                    loading:false
                });
                setVal({...val,isModalOpen:!isModalOpen});
                NotificationManager.success("",'Message Sent!')
            })
            .catch(e=>console.log(e))   
        } else {
            if (email == "") {
                setValues({...values,error1:"This field is required"})
            } if (image == "") {
                setValues({...values,error2:"This field is required"})
            }
        }
    }

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary text-center"></span>
                <p>Loading...</p>
            </div>)
        );
    }

  return (
    <div style={{marginTop:"80px"}}>
        <div class="content" style={{minHeight:"650px"}}>
        {/* <div style={{float:"right",marginTop:"580px",width:"80px",height:"80px",backgroundColor:"green",borderRadius:"50%",position:"fixed"}}>
            <span onClick={handleChat}><i className="fa fa-comments-o" style={{fontSize:"50px",marginLeft:"15px",marginTop:"15px",color:"white"}}></i></span>
        </div> */}
            <br /><br />
        <div class="row">
            <div class="col-md-12">
                <div class="grid email">
                    <div class="grid-body">
                        <div class="row">
                            <div class="col-md-2">
                                <span class="btn btn-block btn-warning" data-toggle="modal" data-target="#compose-modal" 
                                    onClick={handleChat}>
                                    <i class="fa fa-pencil"></i>&nbsp;&nbsp;NEW MESSAGE</span>
                                <hr />
                                <div>
                                    <ul class="nav nav-pills nav-stacked">
                                        <li class="nav-item active"><Link to="/cmpinbox" className="nav-link"><h5><strong><i class="fa fa-inbox"></i> Inbox </strong></h5></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-10">                                
                                {children}
                            </div>
                            <Modal isOpen={isModalOpen} toggle="" backdrop="static">
                                <ModalHeader toggle={handleClose}><h4><i class="fa fa-envelope"></i> Compose New Message</h4></ModalHeader>
                                <form>
                                    <ModalBody>
                                    {LoadingMess()}
                                        <div class="form-group">
                                            <input name="to" type="email" required onChange={handleChange("email")} class="form-control"  placeholder="To" />
                                            <span className="text-danger">{error1}</span>
                                        </div>
                                        <div class="form-group">
                                            <input name="subject" type="text" onChange={handleChange("subject")} class="form-control" placeholder="Subject" />
                                        </div>
                                        <div class="form-group">
                                            <textarea name="message" id="email_message" onChange={handleChange("message")} class="form-control" placeholder="Message" style={{height: "120px"}}></textarea>
                                        </div>
                                        <div class="form-group">
                                            <input type="file" name="attachment" onChange={handleChangePhoto("image")}  required/>
                                            <span className="text-danger">{error2}</span>
                                        </div>
                                    </ModalBody>
                                </form>
                                <ModalFooter>
                                    <Button className="btn btn-secondary" onClick={handleClose}>Discard</Button>
                                    <Button className="btn btn-info pull-right" onClick={handleSubmit}><i class="fa fa-envelope"></i> Send Message</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
}

export default Inbox;
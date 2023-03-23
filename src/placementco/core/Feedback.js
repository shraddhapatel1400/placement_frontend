import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { sendMess } from '../helper';
import {NotificationManager} from 'react-notifications';

const Feedback = () => {

    const [feedback,setFeedback] = useState([]);

    const [val,setVal] = useState({
        isModalOpen : false,
        email : "",
        message : "",
        loading:false,
        error:""
    })

    const {isModalOpen,email,message,loading,error} = val;

    const handleClose = () => setVal({...val, isModalOpen : !isModalOpen});

    const handleReply = (id) => (event) => {
        event.preventDefault();
        setVal({...val,email:id,isModalOpen:!isModalOpen})
    }

    const handleChange = (event) => {
        setVal({...val,message:event.target.value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setVal({...val,loading:true,error:false})
        var em = feedback.filter(f=>f.id == email).map(f=>f.email)
        if (message == '') {
            setVal({...val,loading:false,error:"This field may not be blank!"})
        } else {
            sendMess({em,message})
            .then((data)=>{
                console.log("DATA",data)
                if (data.success) {
                    setVal({...val,loading:false,email:"",message:"",isModalOpen:!isModalOpen});
                    NotificationManager.success("","Message Sent!")
                }
            })
        }
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
            const response1 = await fetch(`${API}feedback/feedback/`,{method: "GET"});
            const data1 = await response1.json();
            setFeedback(data1);
        };
        fetchData();
    }, []);

  return (
    <div>
        <section class="section" id="features">
        <div class="container" style={{marginTop:"80px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">People Review</h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  <tbody> 
                    {feedback.map((f,i)=>(
                        <tr key={i}>
                        <td>{i+1}</td> 
                        <td>{f.name}</td>
                        <td>{f.email}</td>
                        <td>{f.subject}</td>
                        <td>{f.message}</td>
                        <td>{new Date(f.created_at).toDateString()}</td>
                        <td><button className="btn btn-success" onClick={handleReply(f.id)}>Reply</button></td>
                            <Modal isOpen={isModalOpen} toggle="" backdrop="static">
                                <ModalHeader toggle={handleClose}><h4><i class="fa fa-envelope"></i> Compose Message</h4></ModalHeader>
                                <form>
                                    {LoadingMess()}
                                    <ModalBody>
                                        <div class="form-group">
                                            <input name="to" type="email" readOnly defaultValue={feedback.filter(f=>f.id==email).map(f=>f.email)} class="form-control" />
                                            <span className="text-danger"></span>
                                        </div>
                                        <div class="form-group">
                                            <textarea name="message" id="email_message" onChange="" class="form-control" 
                                            placeholder="Message" style={{height: "120px"}} onChange={handleChange}></textarea>
                                            <span className="text-danger">{error ? error : ""}</span>
                                        </div>
                                    </ModalBody>
                                </form>
                                <ModalFooter>
                                    <Button className="btn btn-secondary" onClick={handleClose}>Discard</Button>
                                    <Button className="btn btn-info pull-right" onClick={handleSubmit}><i class="fa fa-envelope"></i> Send Message</Button>
                                </ModalFooter>
                            </Modal>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
        </div>
    </section>
    
    </div>
  );
}

export default Feedback;
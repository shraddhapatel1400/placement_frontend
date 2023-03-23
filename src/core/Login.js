import React,{useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

const Login = () => {
    const [show, setShow] = useState(true);
    

    const handleClose = () => setShow(false);
    
    return (
        <div style={{height:"1000px"}}><br /><br /><br />
        <Modal isOpen={show} toggle="true" backdrop="static" size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <ModalHeader toggle={handleClose}>Please select to login yourself...</ModalHeader>
            <ModalBody>
                <h4>I'm ...</h4><br />
                <div className="row">
                    <div className="col-lg-4">
                        <Link to='/signins'>
                            <div class="card" style={{width: "220px"}}>
                                <img class="card-img-top" src="/assets/images/student1.png" alt="pdf" height="180px" />
                                <span className="text-center text-dark"><b>Student</b></span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to='/signinc'>
                            <div class="card" style={{width: "220px"}}>
                                <img class="card-img-top" src="/assets/images/cmp.jfif" alt="pdf" height="180px" />
                                <span className="text-center text-dark"><b>Company HR</b></span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-4">
                        <Link to='/signinp'>
                            <div class="card" style={{width: "220px"}}>
                                <img class="card-img-top" src="/assets/images/placement.png" alt="pdf" height="180px" />
                                <span className="text-center text-dark"><b>Placement Officer</b></span>
                            </div>
                        </Link>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
            <Button className="btn btn-secondary" onClick={handleClose}>Close</Button>
            </ModalFooter>
        </Modal>
        </div>
    );
}
export default withRouter(Login);
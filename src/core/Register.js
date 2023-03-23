import React,{useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';

const Register = () => {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    
    return (
        <div style={{height:"1000px"}}><br /><br /><br />
        <Modal isOpen={show} toggle="true" backdrop="static" size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <ModalHeader toggle={handleClose}>Please select to register yourself...</ModalHeader>
            <ModalBody>
                <h4>I'm ...</h4><br />
                <div className="row">
                    <div className="col-lg-6">
                        <Link to='/signups'>
                            <div class="card" style={{width: "200px"}}>
                                <img class="card-img-top" src="/assets/images/student1.png" alt="pdf" height="150px" />
                                <span className="text-center text-dark"><b>Student</b></span>
                            </div>
                        </Link>
                    </div>
                    <div className="col-lg-6">
                        <Link to='/signupc'>
                            <div class="card" style={{width: "200px"}}>
                                <img class="card-img-top" src="/assets/images/cmp.jfif" alt="pdf" height="150px" />
                                <span className="text-center text-dark"><b>Company HR</b></span>
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
export default withRouter(Register);
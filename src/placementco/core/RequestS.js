import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { updateStudent } from '../helper';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const RequestS = () => {

    const [student, setStudent] = useState([]);

    const handleApprove = (id) => (event) => {
        event.preventDefault();
        updateStudent(id,1)
        .then(data => {
            console.log("DATA", data);
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    const handleReject = (id) => (event) => {
        event.preventDefault();
        updateStudent(id,0)
        .then(data => {
            console.log("DATA", data);
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const data1 = await response1.json();
            setStudent(data1);
        };
        fetchData();
    }, []);

  return (
    <div style={{marginTop:"80px",minHeight:"650px",marginLeft:"50px",marginRight:"50px"}}>
        <br />
        <div className="row">
            <div className="col-lg-7">
                <div class="card shadow mb-4" style={{height:"620px",overflow:"auto"}}>
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-danger">
                            <NotificationBadge count={student.filter(s=>s.status == -1).length} effect={Effect.SCALE}/>Student Requests
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"blueviolet"}} className="text-center">
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th></th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.filter(s=>s.status == -1).map((s,i)=>(
                                    <tr key={i}>
                                    <td>{i+1}</td> 
                                    <td>{s.firstname} {s.lastname}</td>
                                    <td>{s.email}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={handleApprove(s.id)}>Aprove</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={handleReject(s.id)}>Reject</button>
                                    </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5">
                <div class="card shadow mb-4" style={{height:"300px",overflow:"auto"}}>
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-danger">
                            <NotificationBadge count={student.filter(s=>s.status == 1).length} effect={Effect.SCALE}/>Approved Student
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"blueviolet"}} className="text-center">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.filter(s=>s.status == 1).map((s,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td> 
                                        <td>{s.firstname} {s.lastname}</td>
                                        <td>{s.email}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={handleReject(s.id)}>Reject</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="card shadow mb-4" style={{height:"300px",overflow:"auto"}}>
                    <div class="card-header py-3">
                        <h6 class="m-0 font-weight-bold text-danger">
                            <NotificationBadge count={student.filter(s=>s.status == 0).length} effect={Effect.SCALE}/>Rejected Student
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"blueviolet"}} className="text-center">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {student.filter(s=>s.status == 0).map((s,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td> 
                                        <td>{s.firstname} {s.lastname}</td>
                                        <td>{s.email}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={handleApprove(s.id)}>Aprove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div><br />
    </div>
  );
}
export default RequestS;
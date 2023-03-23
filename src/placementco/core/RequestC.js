import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { updateCompany } from '../helper';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const RequestC = () => {

    const [company, setCompany] = useState([]);

    const handleApprove = (id) => (event) => {
        event.preventDefault();
        updateCompany(id,1)
        .then(data => {
            console.log("DATA", data);
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    const handleReject = (id) => (event) => {
        event.preventDefault();
        updateCompany(id,0)
        .then(data => {
            console.log("DATA", data);
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            setCompany(data1);
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
                        <h6 class="m-0 font-weight-bold text-success">
                            <NotificationBadge count={company.filter(s=>s.status == -1).length} effect={Effect.SCALE}/>Company HR Requests
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"yellowgreen"}} className="text-center">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company Name</th>
                                    <th>Location</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {company.filter(s=>s.status == -1).map((c,i)=>(
                                    <tr key={i}>
                                    <td>{i+1}</td> 
                                    <td>{c.fullname}</td>
                                    <td>{c.email}</td>
                                    <td>{c.companyname}</td>
                                    <td>{c.location}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={handleApprove(c.id)}>Aprove</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={handleReject(c.id)}>Reject</button>
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
                        <h6 class="m-0 font-weight-bold text-success">
                            <NotificationBadge count={company.filter(s=>s.status == 1).length} effect={Effect.SCALE}/>Approved Company
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"yellowgreen"}} className="text-center">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company Name</th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {company.filter(c=>c.status == 1).map((c,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td> 
                                        <td>{c.fullname}</td>
                                        <td>{c.email}</td>
                                        <td>{c.companyname}</td>
                                        <td>{c.location}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={handleReject(c.id)}>Reject</button>
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
                        <h6 class="m-0 font-weight-bold text-success">
                            <NotificationBadge count={company.filter(s=>s.status == 0).length} effect={Effect.SCALE}/>Rejected Company
                        </h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                            <thead>
                                <tr style={{fontWeight:"bold",color:"yellowgreen"}} className="text-center">
                                    <th></th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Company Name</th>
                                    <th>Location</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {company.filter(c=>c.status == 0).map((c,i)=>(
                                    <tr key={i}>
                                        <td>{i+1}</td> 
                                        <td>{c.fullname}</td>
                                        <td>{c.email}</td>
                                        <td>{c.companyname}</td>
                                        <td>{c.location}</td>
                                        <td>
                                            <button className="btn btn-info" onClick={handleApprove(c.id)}>Aprove</button>
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
export default RequestC;
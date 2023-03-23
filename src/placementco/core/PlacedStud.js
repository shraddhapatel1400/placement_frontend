import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { API } from '../../backend';

const PlacedStud = () => {
    const [student, setStudent] = useState([]);
    const [apply, setApply] = useState([]);
    const [job, setJob] = useState([]);
    const [company, setCompany] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const response4 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            setStudent(data1);
            setApply(data2);
            setJob(data3);
            setCompany(data4);
        };
        fetchData();
    }, []);

  return (
    <div class="container" style={{marginTop:"80px",minHeight:"777px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                <div className="row">
                  <div className="col-lg-6">Selected Student</div>
                  <div className="col-lg-4"></div>
                  <div className="col-lg-2">
                    <ReactHTMLTableToExcel  
                        className="btn btn-success"  
                        table="placedStudent"  
                        filename="PlacedStudent"  
                        sheet="Sheet"  
                        buttonText="Download (.xlsx)" /> 
                  </div>
                </div>
              </h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="placedStudent" width="100%" cellspacing="0">
                  <thead>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Resume</th>
                      <th>Position</th>
                      <th>Company</th>
                      <th>Approved Date</th>
                    </tr>
                  </thead>
                  <tbody>
                      {apply.filter(s=>s.status == "true").map((a,i)=>(
                          <tr key={i}>
                            <td>{i+1}</td> 
                            <td>{student.filter(s=>s.id == a.student).map(s=>s.firstname+' '+s.lastname)}</td>
                            <td>{student.filter(s=>s.id == a.student).map(s=>s.email)}</td>
                            {/* <td>
                                <img src={student.filter(s=>s.id == a.student).map(s=>s.image) ? 
                                    student.filter(s=>s.id == a.student).map(s=>s.image) : 
                                        "https://bootdey.com/img/Content/avatar/avatar7.png"} height="70px" />
                            </td> */}
                            <td>{student.filter(s=>s.id == a.student).map(s=>s.phone) ? 
                                 student.filter(s=>s.id == a.student).map(s=>s.phone) : "-"}</td>
                            <td>{student.filter(s=>s.id == a.student).map(s=>s.pdf) ? 
                                <a href={student.filter(s=>s.id == a.student).map(s=>s.pdf)} target="_blank">Click me!</a> : "No Resume Found"}</td>
                            <td>{job.filter(j=>j.id == a.job).map(j=>j.requirement)}</td>
                            <td>{company.filter(c=>c.id == (job.filter(j=>j.id == a.job).map(j=>j.company))).map(c=>c.companyname)}</td>
                            <td>{new Date(a.updated_at).toDateString()}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
        </div>
  );
}

export default PlacedStud;
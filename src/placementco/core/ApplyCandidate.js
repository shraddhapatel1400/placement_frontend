import React, { useEffect, useState } from 'react';
import { API } from '../../backend';

const ApplyCandidate = () => {

    const [student, setStudent] = useState([]);
    const [apply, setApply] = useState([]);
    const [job, setJob] = useState([]);

    const [search,setSearch] = useState([]);
    const handleSearch = (event) => {
      const st = student.map(s=>s.firstname)
      const startsWith = st.filter((s) => s.toLowerCase().startsWith((event.target.value).toLowerCase()));
      setSearch(startsWith) 
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setStudent(data1);
            setApply(data2);
            setJob(data3);
        };
        fetchData();
    }, []);

  return (
    <div class="container" style={{marginTop:"80px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                <div className="row">
                  <div className="col-lg-6">Applied Candidate</div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-4">
                    <input type="text" class="form-control form-control-user" id="criteria" onChange={handleSearch}
                      placeholder="Search Student..." />
                  </div>
                </div>
              </h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Student Name</th>
                      <th>Applied Job</th>
                      <th>Body</th>
                      <th>Resume</th>
                      <th>Apply Date</th>
                      <th>Approval/Rejection</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Student Name</th>
                      <th>Applied Job</th>
                      <th>Body</th>
                      <th>Resume</th>
                      <th>Apply Date</th>
                      <th>Approval/Rejection</th>
                    </tr>
                  </tfoot>
                  <tbody>
                      {search.length > 0 ?  search.map((se,id)=>(
                        apply.filter(s=>s.student == (student.filter(j=>j.firstname == search[id]).map(j=>j.id))).map((a,i)=>(
                          <tr key={id}>
                            <td>{id+1}</td> 
                            <td>{student.filter(s=>s.id == a.student).map(s=>s.firstname+' '+s.lastname)}</td>
                            <td>{job.filter(j=>j.id == a.job).map(j=>j.requirement)}</td>
                            <td>{a.body ? a.body : "-"}</td>
                            <td>{a.resume ? <a href={a.resume} target="_blank">Click me!</a> : "No Resume Found"}</td>
                            <td>{new Date(a.applydate).toLocaleString()}</td>
                            <td>{a.status ? (a.status == "true" ? "Approve" : "Reject") : "Pending"}</td>
                        </tr>
                        ))
                      )) :
                      apply.map((a,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td> 
                          <td>{student.filter(s=>s.id == a.student).map(s=>s.firstname+' '+s.lastname)}</td>
                          <td>{job.filter(j=>j.id == a.job).map(j=>j.requirement)}</td>
                          <td>{a.body ? a.body : "-"}</td>
                          <td>{a.resume ? <a href={a.resume} target="_blank">Click me!</a> : "No Resume Found"}</td>
                          <td>{new Date(a.applydate).toLocaleString()}</td>
                          <td>{a.status ? (a.status == "true" ? "Approve" : "Reject") : "Pending"}</td>
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
export default ApplyCandidate;
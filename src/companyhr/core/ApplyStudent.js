import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../backend';
import { isAuthenticatedC } from '../helper';
import Select from 'react-select'; 
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const ApplyStudent = () => {

    const [student, setStudent] = useState([]);
    const [apply, setApply] = useState([]);
    const [job, setJob] = useState([]);

    const [val, setVal] = useState({
      acc : false,
      re : false
    })

    const j = job.filter(j=>j.company == isAuthenticatedC().user.id).map(j=>j.id)
    const a = apply.map(a=>a.job)

    const {acc,re} = val;

    const options = [
      {value : "a", label : "Accepted"},
      {value : "r", label : "Rejected"}
    ]

    const handleSearch = (event) => {
      console.log(event.value)
      if (event.value == "a") {
        setVal({...val,acc:true,re:false});
      } if (event.value == "r") {
        setVal({...val,re:true,acc:false});
      }
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
    <div class="container" style={{marginTop:"80px",minHeight:"650px"}}>
        <br />
        {apply.length > 0 ?
          <div class="card shadow mb-4">
            <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-danger">
                <div className="row">
                  <div className="col-lg-6">Applied Student</div>
                  <div className="col-lg-2">
                  <ReactHTMLTableToExcel  
                        className="btn btn-success"  
                        table="AcReTable"  
                        filename="Applied Student"  
                        sheet="Sheet"  
                        buttonText="Download (.xlsx)" /> 
                  </div>
                  <div className="col-lg-4">
                    <Select options={options} class="form-control form-control-user" 
                      placeholder="Select Student..." onChange={handleSearch} /> 
                  </div>
                </div>
              </h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="AcReTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Position</th>
                      <th>Student Name</th>
                      <th>Email</th>
                      <th>Apply Date</th>
                      <th>Status</th>   
                      <th>Response Date</th>                  
                    </tr>
                  </thead>
                  <tbody>
                      {acc ? 
                        apply.filter(a=>a.status == "true" &&  j.includes(a.job)).map((ap,i)=>(
                          <tr>
                            <td>{i+1}</td>
                            <td>{job.filter(j=>j.id == ap.job).map(j=>j.requirement)}</td>
                            <td>{student.filter(s=>s.id == ap.student).map(s=>s.firstname+' '+s.lastname)}</td>
                            <td>{student.filter(s=>s.id == ap.student).map(s=>s.email)}</td>
                            <td>{new Date(ap.applydate).toLocaleString()}</td>
                            <td className="text-success">Accepted</td>
                            <td>{new Date(ap.updated_at).toLocaleString()}</td>
                          </tr>
                        )).sort((a,b)=>a-b) : ( re ? 
                          apply.filter(a=>a.status == "false" &&  j.includes(a.job)).map((ap,i)=>(
                            <tr>
                              <td>{i+1}</td>
                              <td>{job.filter(j=>j.id == ap.job).map(j=>j.requirement)}</td>
                              <td>{student.filter(s=>s.id == ap.student).map(s=>s.firstname+' '+s.lastname)}</td>
                              <td>{student.filter(s=>s.id == ap.student).map(s=>s.email)}</td>
                              <td>{new Date(ap.applydate).toLocaleString()}</td>
                              <td className="text-danger">Rejected</td>
                              <td>{new Date(ap.updated_at).toLocaleString()}</td>
                            </tr>
                          )).sort((a,b)=>a-b) : 
                        apply.filter(a=>j.includes(a.job)).map((ap,i)=>(
                          <tr>
                            <td>{i+1}</td>
                            <td>{job.filter(j=>j.id == ap.job).map(j=>j.requirement)}</td>
                            <td>{student.filter(s=>s.id == ap.student).map(s=>s.firstname+' '+s.lastname)}</td>
                            <td>{student.filter(s=>s.id == ap.student).map(s=>s.email)}</td>
                            <td>{new Date(ap.applydate).toLocaleString()}</td>
                            {ap.status ? 
                              (ap.status == "true" ? <td className="text-success">Accepted</td> 
                                : <td className="text-danger">Rejected</td>) : <td className="text-info">Pending</td>}
                            <td>{new Date(ap.updated_at).toLocaleString()}</td>
                          </tr>
                        )).sort((a,b)=> a-b))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        : <h4 className="text-center"><br />No any student as of now!</h4> }
        </div>
  );
}
export default ApplyStudent;

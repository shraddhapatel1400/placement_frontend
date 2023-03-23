import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import Select from 'react-select';  

const Job = () => {

    const [company, setCompany] = useState([]);
    const [job, setJob] = useState([]);

    const [searchc,setSearchc] = useState([]);
    const [se,setSe] = useState(false);

    const [searchj,setSearchj] = useState([]);

    const handleSearchc = (event) => {
      setSearchc(event.value)
      setSe(true)
      console.log(event.value)
    }

    const handleSearchj = (event) => {
      setSearchj(event.value)
      console.log(event.value)
    }

    const handleReset = (event) => {
      event.preventDefault();
      window.location.reload()
    }

    let options = company.map(function (c) {
      return { value: c.id, label: c.companyname };
    })

    let options1 = job.filter(j=>j.company == searchc).map(function (j) {
      return { value: j.id, label: j.requirement };
    })
  

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            setCompany(data1);
            setJob(data2);
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
                  <div className="col-lg-5">Available Jobs</div>
                  <div className="col-lg-1">
                    <button className="btn btn-warning" onClick={handleReset}>Reset</button>
                  </div>
                  <div className="col-lg-3">
                    <Select options={options} class="form-control form-control-user" 
                      placeholder="Select Company..." onChange={handleSearchc} /> 
                  </div>
                  <div className="col-lg-3">
                    <Select options={options1} class="form-control form-control-user" 
                      placeholder="Select Job..." onChange={handleSearchj} /> 
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
                      <th>Company Name</th>
                      <th>Jobs</th>
                      <th>Vacancy</th>
                      <th>Job Type</th>
                      <th>Deadline</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Company Name</th>
                      <th>Jobs</th>
                      <th>Vacancy</th>
                      <th>Job Type</th>
                      <th>Deadline</th>
                    </tr>
                  </tfoot>
                  <tbody>
                      {se ? 
                        job.filter(j=>j.company == searchc && j.id == searchj).map((j,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{company.filter(c=>c.id == j.company).map(c=>c.companyname)}</td>
                          <td>{j.requirement}</td>
                          <td>{j.vacancy}</td>
                          <td>{j.jobtype}</td>
                          <td>{new Date(j.deadline).toDateString()}</td>
                        </tr>
                      )) : 
                      job.map((j,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{company.filter(c=>c.id == j.company).map(c=>c.companyname)}</td>
                          <td>{j.requirement}</td>
                          <td>{j.vacancy}</td>
                          <td>{j.jobtype}</td>
                          <td>{new Date(j.deadline).toDateString()}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
        </div>
  );
}

export default Job;
import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { deleteStudent } from '../helper';

const Student = () => {
    const [student, setStudent] = useState([]);

    const handleDelete = (id) => (event) => {
      event.preventDefault();
      deleteStudent(id)
      .then((data)=>{
        console.log("Delete Successfully")
        window.location.reload();
      })
      .catch(e=>console.log(e))
    }

    const [search,setSearch] = useState([]);

    const handleSearch = (event) => {
      const st = student.map(s=>s.firstname)
      const startsWith = st.filter((s) => s.toLowerCase().startsWith((event.target.value).toLowerCase()));
      setSearch(startsWith) 
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
    <div class="container" style={{marginTop:"80px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                <div className="row">
                  <div className="col-lg-6">Registered Student</div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-4">
                    <input type="text" class="form-control form-control-user" id="criteria" onChange={handleSearch}
                      placeholder="Search Student by name..." />
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Image</th>
                      <th>Contact No</th>
                      <th>Resume</th>
                      <th>Joining Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Image</th>
                      <th>Contact No</th>
                      <th>Resume</th>
                      <th>Joining Date</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  <tbody>
                      {search.length > 0 ?  search.map((se,id)=>(
                        student.filter(s=>s.firstname == search[id]).map((s,i)=>(
                          <tr key={id}>
                            <td>{id+1}</td> 
                            <td>{s.firstname} {s.lastname}</td>
                            <td>{s.email}</td>
                            <td><img src={s.image ? s.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} height="70px" /></td>
                            <td>{s.phone ? s.phone : "-"}</td>
                            <td>{s.pdf ? <a href={s.pdf} target="_blank">Click me!</a> : "No Resume Found"}</td>
                            <td>{new Date(s.created_at).toDateString()}</td>
                            <td><button className="btn btn-danger" onClick={handleDelete(s.id)}>Delete</button></td>
                          </tr>
                        ))
                       )) :
                        student.map((s,i)=>(
                          <tr key={i}>
                            <td>{i+1}</td> 
                            <td>{s.firstname} {s.lastname}</td>
                            <td>{s.email}</td>
                            <td><img src={s.image ? s.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} height="70px" /></td>
                            <td>{s.phone ? s.phone : "-"}</td>
                            <td>{s.pdf ? <a href={s.pdf} target="_blank">Click me!</a> : "No Resume Found"}</td>
                            <td>{new Date(s.created_at).toDateString()}</td>
                            <td><button className="btn btn-danger" onClick={handleDelete(s.id)}>Delete</button></td>
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

export default Student;
import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { deleteCompany, invite_mail } from '../helper';

const Companies = () => {

    const [company, setCompany] = useState([]);

    const handleDelete = (id) => (event) => {
      event.preventDefault();
      deleteCompany(id)
      .then((data)=>{
        console.log("Delete Successfully")
        window.location.reload();
      })
      .catch(e=>console.log(e))
    }

    const [search,setSearch] = useState([]);
    const handleSearch = (event) => {
      const st = company.map(s=>s.companyname)
      const startsWith = st.filter((s) => s.toLowerCase().startsWith((event.target.value).toLowerCase()));
      setSearch(startsWith) 
    }

    const [val, setVal] = useState({
      email : "",
      error : "",
      loading : false,
      success : ""
    });
    
    const {email,error,loading,success} = val
    
    const handleChange = (event) => {
      console.log(event.target.value)
      setVal({...val, email : event.target.value})
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      var mailformat = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
      if (email.match(mailformat)) {
        if (company.some(c=>c.email == email)) {
          setVal({...val, error : "This Company is already registered."})
        } else {
          setVal({...val, error:false, loading:true});
          invite_mail(val)
          .then((data)=>{
            console.log("DATA",data)
            setVal({...val, error:false, loading:false, success:data.success});
          })
          .catch(e=>console.log(e))
        }
      } else {
        setVal({...val, error : "Please enter valid email."})
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
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            setCompany(data1);
        };
        fetchData();
    }, []);

  return (
    <div class="container" style={{marginTop:"80px"}}>
        <br />
          <div className="row justify-content-center">
                <div class="col-xl-6 col-lg-12 col-md-12">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="p-3">
                                    {LoadingMess()}
                                        <div class="form-group row">
                                            <div className="col-sm-4"><label htmlFor="company" style={{float:"right",marginTop:"5px"}}>Invite Company : </label></div>
                                            <div className="col-sm-6">
                                                <input type="email" class="form-control form-control-user" id="company" value={email}
                                                    placeholder="Enter Email Address..."  onChange={handleChange} />
                                                <span className="text-danger">{error}</span>
                                                <span className="text-success">{success}</span>
                                            </div>
                                            <div className="col-sm-2">
                                              <button className="btn btn-info" onClick={handleSubmit}>Send</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                <div className="row">
                  <div className="col-lg-6">Hiring Companies</div>
                  <div className="col-lg-2"></div>
                  <div className="col-lg-4">
                    <input type="text" class="form-control form-control-user" id="criteria" onChange={handleSearch}
                      placeholder="Search Company by name..." />
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
                      <th>Logo</th>
                      <th>Company Name</th>
                      <th>HR Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Location</th>
                      <th>Joining Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Logo</th>
                      <th>Company Name</th>
                      <th>HR Name</th>
                      <th>Email</th>
                      <th>Contact No</th>
                      <th>Location</th>
                      <th>Joining Date</th>
                      <th></th>
                    </tr>
                  </tfoot>
                  <tbody>
                      {search.length > 0 ?  search.map((se,id)=>(
                        company.filter(s=>s.companyname == search[id]).map((c,i)=>(
                          <tr key={id}>
                            <td>{id+1}</td>
                            <td><img src={c.logo} height="70px" /></td>
                            <td>{c.companyname}</td>
                            <td>{c.fullname}</td>
                            <td>{c.email}</td>
                            <td>{c.phone}</td>
                            <td>{c.location}</td>
                            <td>{new Date(c.created_at).toDateString()}</td>
                            <td><button className="btn btn-danger" onClick={handleDelete(c.id)}>Delete</button></td>
                          </tr>
                        ))
                       )) :
                       company.map((c,i)=>(
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td><img src={c.logo} height="70px" /></td>
                          <td>{c.companyname}</td>
                          <td>{c.fullname}</td>
                          <td>{c.email}</td>
                          <td>{c.phone}</td>
                          <td>{c.location}</td>
                          <td>{new Date(c.created_at).toDateString()}</td>
                          <td><button className="btn btn-danger" onClick={handleDelete(c.id)}>Delete</button></td>
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

export default Companies;
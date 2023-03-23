import React, { useEffect, useState } from 'react';
import { API } from '../backend';
import Select from 'react-select';  

const StudentList = () => {

  const [student, setStudent] = useState([]);

  const options = [
    { value: "all", label: "All Student" },
    { value: "2017", label: "Batch 2017" }
  ];

  const [val,setVal] = useState({
    a : true,
    b : false
  });
  const [search,setSearch] = useState([]);

  const handleChange = (event) => {
    if (event.value == "2017") {
      setVal({...val,b:true,a:false});
    } else {
      setVal({...val,a:true,b:false});
    }
  }

  const handleSearch = (event) => {
    const st = student.map(s=>s.firstname)
    const startsWith = st.filter((s) => s.toLowerCase().startsWith((event.target.value).toLowerCase()));
    setSearch(startsWith) 
  }
  const {a,b} = val

  useEffect(() => {
    const fetchData = async () => {
        const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
        const data1 = await response1.json();
        setStudent(data1);
    };
    fetchData();
  }, []);

  return (
    <div>
      <section class="section section-bg" id="call-to-action" style={{backgroundImage: "url(assets/images/banner-image-1-1920x500.jpg)"}}>
          <div class="container">
              <div class="row">
                  <div class="col-lg-10 offset-lg-1">
                      <div class="cta-content">
                          <br />
                          <br />
                          <h2>See <em>Students</em></h2>
                          <p>See Student of college of AIT Batch 2017 & other registered.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <section class="section" id="trainers">
        <div class="container"><br />
          <div class="row justify-content-center">
            <div class="col-xl-3 col-lg-12 col-md-12"></div>
            <div class="col-xl-3 col-lg-12 col-md-12">
              <Select options={options} class="form-control form-control-user" 
              placeholder="Select Batch..." onChange={handleChange} /> 
            </div> 
            <div class="col-xl-2 col-lg-12 col-md-12"></div>
            <div class="col-xl-3 col-lg-12 col-md-12">
              <div class="form-group row">
                  <input type="text" class="form-control form-control-user" id="criteria" onChange={handleSearch}
                    placeholder="Search Student..." />
              </div>
            </div>   
          </div><br /><br />
        <div className="row">
          {b ? (search.length > 0 ? search.map((se,id)=>(
            student.filter(s=>s.firstname == search[id] && s.status == 1).map((s,i)=>(
              <div className="col-lg-4" key={i}>
              <div class="card promoting-card">
                <div class="card-body d-flex flex-row">
                  <img src={s.image ? s.image : "https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"} class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
                  <div>
                    <h4 class="card-title font-weight-bold mb-2">{s.firstname+' '+s.lastname}</h4>
                    <p class="card-text"><strong>Join at </strong>{s.created_at}</p>
                  </div>
                </div>
                <div class="view overlay">
                  <div class="flip-card">
                  {s.pdf ? 
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h5 style={{marginTop:"10px",color:"tomato"}}>Hover me to see my Resume</h5> 
                      </div>
                      <div class="flip-card-back">
                        <h3 style={{marginTop:"10px"}}>
                          <div className="row">
                          <div className="col-lg-4"></div>
                            <div className="col-lg-4">
                              <a href={s.pdf} target="_blank"><i className="fa fa-download"></i></a>
                            </div>
                          </div>
                        </h3> 
                      </div>
                    </div>
                    : 
                    <div class="flip-card-inner">
                      <div class="flip-card-front" style={{backgroundColor:"yellowgreen"}}>
                        <h5 style={{marginTop:"10px",color:"black"}}>I don't have Resume</h5> 
                      </div>
                      <div class="flip-card-back" style={{backgroundColor:"yellowgreen"}}>
                        <span style={{color:"black",fontSize:"35px"}}>&#128542;</span> 
                      </div>
                    </div>
                  }
                  </div>
                </div>
                <div class="card-body">
                  <div class="collapse-content">
                    <p><i className="fa fa-envelope"></i> {s.email}</p>
                    <p><i className="fa fa-phone"></i> {s.phone ? s.phone : "Not Provided yet."}</p>
                  </div>
                </div>
              </div><br />
            </div>
          )))) : student.filter(s=>s.status == 1).map((s,i)=>(
            <div className="col-lg-4" key={i}>
                  <div class="card promoting-card">
                    <div class="card-body d-flex flex-row">
                      <img src={s.image ? s.image : "https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"} class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
                      <div>
                        <h4 class="card-title font-weight-bold mb-2">{s.firstname+' '+s.lastname}</h4>
                        <p class="card-text"><strong>Join at </strong>{s.created_at}</p>
                      </div>
                    </div>
                    <div class="view overlay">
                      <div class="flip-card">
                      {s.pdf ? 
                        <div class="flip-card-inner">
                          <div class="flip-card-front">
                            <h5 style={{marginTop:"10px",color:"tomato"}}>Hover me to see my Resume</h5> 
                          </div>
                          <div class="flip-card-back">
                            <h3 style={{marginTop:"10px"}}>
                              <div className="row">
                              <div className="col-lg-4"></div>
                                <div className="col-lg-4">
                                  <a href={s.pdf} target="_blank"><i className="fa fa-download"></i></a>
                                </div>
                              </div>
                            </h3> 
                          </div>
                        </div>
                        : 
                        <div class="flip-card-inner">
                          <div class="flip-card-front" style={{backgroundColor:"yellowgreen"}}>
                            <h5 style={{marginTop:"10px",color:"black"}}>I don't have Resume</h5> 
                          </div>
                          <div class="flip-card-back" style={{backgroundColor:"yellowgreen"}}>
                            <span style={{color:"black",fontSize:"35px"}}>&#128542;</span> 
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="collapse-content">
                        <p><i className="fa fa-envelope"></i> {s.email}</p>
                        <p><i className="fa fa-phone"></i> {s.phone ? s.phone : "Not Provided yet."}</p>
                      </div>
                    </div>
                  </div><br />
                </div>
          ))) : (search.length > 0 ? search.map((se,id)=>(
            student.filter(s=>s.firstname == search[id]).map((s,i)=>(
              <div className="col-lg-4" key={i}>
              <div class="card promoting-card">
                <div class="card-body d-flex flex-row">
                  <img src={s.image ? s.image : "https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"} class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
                  <div>
                    <h4 class="card-title font-weight-bold mb-2">{s.firstname+' '+s.lastname}</h4>
                    <p class="card-text"><strong>Join at </strong>{s.created_at}</p>
                  </div>
                </div>
                <div class="view overlay">
                  <div class="flip-card">
                  {s.pdf ? 
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <h5 style={{marginTop:"10px",color:"tomato"}}>Hover me to see my Resume</h5> 
                      </div>
                      <div class="flip-card-back">
                        <h3 style={{marginTop:"10px"}}>
                          <div className="row">
                          <div className="col-lg-4"></div>
                            <div className="col-lg-4">
                              <a href={s.pdf} target="_blank"><i className="fa fa-download"></i></a>
                            </div>
                          </div>
                        </h3> 
                      </div>
                    </div>
                    : 
                    <div class="flip-card-inner">
                      <div class="flip-card-front" style={{backgroundColor:"yellowgreen"}}>
                        <h5 style={{marginTop:"10px",color:"black"}}>I don't have Resume</h5> 
                      </div>
                      <div class="flip-card-back" style={{backgroundColor:"yellowgreen"}}>
                        <span style={{color:"black",fontSize:"35px"}}>&#128542;</span> 
                      </div>
                    </div>
                  }
                  </div>
                </div>
                <div class="card-body">
                  <div class="collapse-content">
                    <p><i className="fa fa-envelope"></i> {s.email}</p>
                    <p><i className="fa fa-phone"></i> {s.phone ? s.phone : "Not Provided yet."}</p>
                  </div>
                </div>
              </div><br />
            </div>
          )))) : student.map((s,i)=>(
            <div className="col-lg-4" key={i}>
                  <div class="card promoting-card">
                    <div class="card-body d-flex flex-row">
                      <img src={s.image ? s.image : "https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg"} class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
                      <div>
                        <h4 class="card-title font-weight-bold mb-2">{s.firstname+' '+s.lastname}</h4>
                        <p class="card-text"><strong>Join at </strong>{s.created_at}</p>
                      </div>
                    </div>
                    <div class="view overlay">
                      <div class="flip-card">
                      {s.pdf ? 
                        <div class="flip-card-inner">
                          <div class="flip-card-front">
                            <h5 style={{marginTop:"10px",color:"tomato"}}>Hover me to see my Resume</h5> 
                          </div>
                          <div class="flip-card-back">
                            <h3 style={{marginTop:"10px"}}>
                              <div className="row">
                              <div className="col-lg-4"></div>
                                <div className="col-lg-4">
                                  <a href={s.pdf} target="_blank"><i className="fa fa-download"></i></a>
                                </div>
                              </div>
                            </h3> 
                          </div>
                        </div>
                        : 
                        <div class="flip-card-inner">
                          <div class="flip-card-front" style={{backgroundColor:"yellowgreen"}}>
                            <h5 style={{marginTop:"10px",color:"black"}}>I don't have Resume</h5> 
                          </div>
                          <div class="flip-card-back" style={{backgroundColor:"yellowgreen"}}>
                            <span style={{color:"black",fontSize:"35px"}}>&#128542;</span> 
                          </div>
                        </div>
                      }
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="collapse-content">
                        <p><i className="fa fa-envelope"></i> {s.email}</p>
                        <p><i className="fa fa-phone"></i> {s.phone ? s.phone : "Not Provided yet."}</p>
                      </div>
                    </div>
                  </div><br />
                </div>
          )))}
        </div>
      </div>
      </section>
    </div>
  );
}

export default StudentList;
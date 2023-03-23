import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { API } from '../../backend';
import { isAuthenticatedC } from '../../companyhr/helper'
import { isAuthenticatedP } from '../../placementco/helper';
import { isAuthenticatedS } from '../helper';
import Swal from 'sweetalert2';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const Company = () => {

    const [company, setCompany] = useState([]);
    const [cmpJob, setCmpJob] = useState([]);
    const [search,setSearch] = useState([]);

    const [ex, setEx] = useState({
        all : false
    });

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            setCompany(data1);
            setCmpJob(data2);
        };
        fetchData();
    }, []);

    const {all} = ex;/* 
    const today = new Date()
    const a = new Date(cmpJob.filter(j=>j.company == "1" && j.vacancy > 0).map(c=>c.deadline)) */
    
    const handleSearch = (event) => {
        const st = company.map(s=>s.companyname)
        const startsWith = st.filter((s) => s.toLowerCase().startsWith((event.target.value).toLowerCase()));
        setSearch(startsWith) 
    }
    console.log(search)
    const handleAll = (event) => {
        event.preventDefault();
        setEx({ ...ex, all : !all});
    }

    const onSweetalert = (id) => (event) => {
        event.preventDefault();
        Swal.fire({
            title: "<h3><strong>"+company.filter(cm=>cm.id == id).map(cm=>cm.companyname)+"</strong></h3>",
            html: "<img src='"+company.filter(cm=>cm.id == id).map(cm=>cm.logo)+"' height='200px' /><br />"+
                    "<b>"+cmpJob.filter(j=>j.company == id).map((c,i)=>( 
                    "<br /><span>"+c.requirement+"</span>"))+"</b>"
        })
    }

  return (
    <div>
        <section class="section section-bg" id="call-to-action" style={{backgroundImage: "url(assets/images/banner-image-1-1920x500.jpg)"}}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <div class="cta-content">
                            <br />
                            <br/>
                            <h2>Feature <em>Companies</em></h2>
                            <p>A company can choose best employee for their organization.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="section" id="trainers">
            <div className="container">
                {!isAuthenticatedS() && !isAuthenticatedC() && !isAuthenticatedP() ?
                <Carousel responsive={responsive} slidesToSlide={2}>
                {company.map((c,i)=>(
                    <div className="trainer-item" key={i}>
                        <div className="image-thumb">
                            <img src={c.logo} alt="" height="150px"/>
                        </div>
                        <div className="down-content">
                            <br />
                            <h4><strong>{c.companyname}</strong></h4>
                            <p><i className="fa fa-user"></i> {c.fullname}</p>
                            <p><i className="fa fa-envelope"></i> {c.email}</p>
                            <p><i className="fa fa-phone"></i> {c.phone}</p>
                            <p><i className="fa fa-map-marker"></i> {c.location}</p>
                            {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                <p className="text-danger"><Link to={`/recentjob/`}><i className="fa fa-user"></i>  
                                 &nbsp;{cmpJob.filter(j=>j.company === c.id && j.vacancy > 0).length} open position</Link>
                                 &nbsp; <span onClick={onSweetalert(c.id)}><i className="fa fa-eye text-dark"></i></span>
                                </p> 
                                : <p className="text-danger"><br />No any current openings<br /></p>
                            }
                        </div>
                    </div>
                ))}
                </Carousel> :
                all ? 
                    <div> 
                        <div class="form-group row">
                            <input type="text" class="form-control form-control-user" id="criteria" onChange={handleSearch}
                            placeholder="Search Company by name..." />
                        </div>
                        <span style={{textDecoration:"underline",color:"blue"}} onClick={handleAll}><i className="fa fa-arrow-left"></i> Back</span>
                        <div className="row">
                        {isAuthenticatedC() ?
                            search.length > 0 ? search.map((s,id)=>(
                                (company.filter(c=>c.id != isAuthenticatedC().user.id && c.companyname == search[id]).map((c,i)=>(
                                    <div className="col-lg-4" key={i}>
                                        <div className="trainer-item">
                                            <div className="image-thumb">
                                                <img src={c.logo} alt="" height="200px" />
                                            </div>
                                            <div className="down-content">
                                                <br />
                                                <h4><strong>{c.companyname}</strong></h4>
                                                <p><i className="fa fa-user"></i> {c.fullname}</p>
                                                <p><i className="fa fa-envelope"></i> {c.email}</p>
                                                <p><i className="fa fa-phone"></i> {c.phone}</p>
                                                <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                                {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                                    <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  {cmpJob.filter(j=>j.company == c.id && j.vacancy > 0).length} open position</Link></p> 
                                                    : <p className="text-danger">No any current openings</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )))
                            )) : (company.filter(c=>c.id != isAuthenticatedC().user.id).map((c,i)=>(
                                <div className="col-lg-4" key={i}>
                                    <div className="trainer-item">
                                        <div className="image-thumb">
                                            <img src={c.logo} alt="" height="200px" />
                                        </div>
                                        <div className="down-content">
                                            <br />
                                            <h4><strong>{c.companyname}</strong></h4>
                                            <p><i className="fa fa-user"></i> {c.fullname}</p>
                                            <p><i className="fa fa-envelope"></i> {c.email}</p>
                                            <p><i className="fa fa-phone"></i> {c.phone}</p>
                                            <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                            {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                                <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  {cmpJob.filter(j=>j.company == c.id && j.vacancy > 0).length} open position</Link></p> 
                                                : <p className="text-danger">No any current openings</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )))                                
                            : search.length > 0 ? search.map((s,id)=>(
                                (company.filter(c=>c.companyname == search[id]).map((c,i)=>(
                                    <div className="col-lg-4" key={i}>
                                        <div className="trainer-item">
                                            <div className="image-thumb">
                                                <img src={c.logo} alt="" height="200px" />
                                            </div>
                                            <div className="down-content">
                                                <br />
                                                <h4><strong>{c.companyname}</strong></h4>
                                                <p><i className="fa fa-user"></i> {c.fullname}</p>
                                                <p><i className="fa fa-envelope"></i> {c.email}</p>
                                                <p><i className="fa fa-phone"></i> {c.phone}</p>
                                                <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                                {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                                    <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  {cmpJob.filter(j=>j.company === c.id && j.vacancy > 0).length} open position</Link></p> 
                                                    : <p className="text-danger">No any current openings</p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ))) : 
                            (company.map((c,i)=>(
                            <div className="col-lg-4" key={i}>
                                <div className="trainer-item">
                                    <div className="image-thumb">
                                        <img src={c.logo} alt="" height="200px" />
                                    </div>
                                    <div className="down-content">
                                        <br />
                                        <h4><strong>{c.companyname}</strong></h4>
                                        <p><i className="fa fa-user"></i> {c.fullname}</p>
                                        <p><i className="fa fa-envelope"></i> {c.email}</p>
                                        <p><i className="fa fa-phone"></i> {c.phone}</p>
                                        <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                        {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                            <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  {cmpJob.filter(j=>j.company === c.id && j.vacancy > 0).length} open position</Link></p> 
                                            : <p className="text-danger">No any current openings</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        )))}
                        </div>
                    </div> : 
                    <div>
                        <span style={{textDecoration:"underline",color:"blue"}} onClick={handleAll}>View All <i className="fa fa-arrow-right"></i></span>
                        <Carousel responsive={responsive} slidesToSlide={2}>
                            {isAuthenticatedC() ?
                                company.filter(c=>c.id != isAuthenticatedC().user.id).map((c,i)=>(
                                    <div className="trainer-item" key={i}>
                                        <div className="image-thumb">
                                            <img src={c.logo} alt="" height="150px"/>
                                        </div>
                                        <div className="down-content">
                                            <br />
                                            <h4><strong>{c.companyname}</strong></h4>
                                            <p><i className="fa fa-user"></i> {c.fullname}</p>
                                            <p><i className="fa fa-envelope"></i> {c.email}</p>
                                            <p><i className="fa fa-phone"></i> {c.phone}</p>
                                            <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                            {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                                <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  
                                                &nbsp;{cmpJob.filter(j=>j.company === c.id && j.vacancy > 0).length} open position</Link></p> 
                                                : <p className="text-danger">No any current openings</p>
                                            }
                                        </div>
                                    </div>
                                ))
                            : company.map((c,i)=>(
                                <div className="trainer-item" key={i}>
                                    <div className="image-thumb">
                                        <img src={c.logo} alt="" height="150px"/>
                                    </div>
                                    <div className="down-content">
                                        <br />
                                        <h4><strong>{c.companyname}</strong></h4>
                                        <p><i className="fa fa-user"></i> {c.fullname}</p>
                                        <p><i className="fa fa-envelope"></i> {c.email}</p>
                                        <p><i className="fa fa-phone"></i> {c.phone}</p>
                                        <p><i className="fa fa-map-marker"></i> {c.location}</p>
                                        {cmpJob.filter(j=>j.company === c.id).length > 0 ?
                                            <p className="text-danger"><Link to={`/recentjob/${c.id}`}><i className="fa fa-user"></i>  
                                             &nbsp;{cmpJob.filter(j=>j.company === c.id && j.vacancy > 0).length} open position</Link></p> 
                                            : <p className="text-danger">No any current openings</p>
                                        }
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div> }
            </div>
        </section>
    </div>
  );
}

export default Company;

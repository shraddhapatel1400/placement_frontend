import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../backend';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

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

const HomeS = () => {

    const [company, setCompany] = useState([]);
    const [job, setJob] = useState([]);

    const [search,setSearch] = useState([]);
    const handleSearch = (event) => {
      const st = job.map(s=>s.requirement)
      const startsWith = st.filter((s) => s.toLowerCase().includes((event.target.value).toLowerCase()));
      if (startsWith != '' && event.target.value != '') {
        setSearch(startsWith)
      } else {
        setSearch(false)
      }
    }
    console.log(search)

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
    <div>
        <section class="section" id="trainers">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        <div class="section-heading">
                            <h2>Newly Registered<em> Company</em></h2>
                            <img src="assets/images/line-dec.png" alt="waves" />
                        </div>
                    </div>
                </div>   
                <div className="row">
                    {company.map((c,i)=>(
                    <div className="col-lg-4" key={i}>
                        <div class="card promoting-card">
                            <div class="card-body d-flex flex-row">
                                <img src={c.logo} class="rounded-circle mr-3" height="50px" width="50px" alt="avatar" />
                                <div>
                                    <h5 class="card-title font-weight-bold mb-2">{c.companyname}</h5>
                                    <p class="card-text"><strong>Join at </strong>{new Date(c.created_at).toDateString()}</p>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="collapse-content">
                                    <p><i className="fa fa-user"> {c.fullname} (HR)</i> </p>
                                    <p><i className="fa fa-envelope"> {c.email}</i> </p>
                                    <p><i className="fa fa-phone"> {c.phone}</i></p>
                                    <p><i className="fa fa-map-marker"> {c.location}</i></p>
                                </div>
                            </div>
                        </div><br />
                    </div>
                    )).reverse().slice(0,3)}
                </div>
                <div class="main-button text-center">
                    <Link to='/company'>Read More</Link>
                </div>
                <div class="row">
                    <div class="col-lg-6 offset-lg-3">
                        <div class="section-heading">
                            <h2>Available<em> Jobs</em></h2>
                            <img src="assets/images/line-dec.png" alt="waves" />
                        </div>
                    </div>
                </div> 
                <div>                
                <Carousel responsive={responsive} slidesToSlide={2}>
                    {/* {search.length > 0 ? search.map((se,id)=>(
                    job.filter(j=>j.requirement == se).map((j,i)=>(
                        <div className="trainer-item" key={i}>
                            <div className="down-content">
                                <br />
                                <h4><strong>{j.requirement}</strong></h4>
                                <p><i className="fa fa-university"></i> {company.filter(c=>c.id == j.company).map(c=>c.companyname)}</p>
                                {j.jobtype === "Fulltime" ? <p className="badge badge-primary px-2 py-1 mb-3 text-light">{j.jobtype}</p> :
                                    (j.jobtype === "Parttime" ? <p className="badge badge-success px-2 py-1 mb-3 text-light">{j.jobtype}</p> :
                                    <p className="badge badge-warning px-2 py-1 mb-3 text-light">{j.jobtype}</p> )
                                }
                                <p><NotificationBadge count={parseInt(j.vacancy)} effect={Effect.SCALE}/></p>Remaining vacancy
                                <p></p>
                                <p><strong>Deadline : </strong>{j.deadline}
                                    {new Date(j.deadline).getTime() >= new Date().getTime() ? "" : <mark>Overdue</mark>}
                                </p>                            
                            </div>
                        </div>
                    ))
                    ))
                : */}
                {job.map((j,i)=>(
                    <div className="trainer-item" key={i}>
                        <div className="down-content">
                            <br />
                            <h4><strong>{j.requirement}</strong></h4>
                            <p><i className="fa fa-university"></i> {company.filter(c=>c.id == j.company).map(c=>c.companyname)}</p>
                            {j.jobtype === "Fulltime" ? <p className="badge badge-primary px-2 py-1 mb-3 text-light">{j.jobtype}</p> :
                                (j.jobtype === "Parttime" ? <p className="badge badge-success px-2 py-1 mb-3 text-light">{j.jobtype}</p> :
                                <p className="badge badge-warning px-2 py-1 mb-3 text-light">{j.jobtype}</p> )
                            }
                            <p><NotificationBadge count={parseInt(j.vacancy)} effect={Effect.SCALE}/></p>Remaining vacancy
                            <p></p>
                            <p><strong>Deadline : </strong>{j.deadline}
                                {new Date(j.deadline).getTime() >= new Date().getTime() ? "" : <mark>Overdue</mark>}
                            </p>                            
                        </div>
                    </div>
                )).reverse()
                }</Carousel>
                </div>
            </div>
        </section>      
    </div>
  );
}

export default HomeS;
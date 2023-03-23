import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { API } from '../backend';


const Home = () => {

    const [student, setStudent] = useState([]);
    const [company, setCompany] = useState([]);
    const [technology, setTechnology] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response3 = await fetch(`${API}feedback/technology/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setStudent(data1);
            setCompany(data2);
            setTechnology(data3);
        };
        fetchData();
    }, []);


  return (
    <div>
            { /* <!-- ***** Main Banner Area Start ***** --> */}
            <div className="main-banner" id="top">
                <video autoPlay muted loop id="bg-video">
                    <source src="/assets/images/video.mp4" type="video/mp4" />
                </video>

                <div className="video-overlay header-text">
                    <div className="caption">
                        <h6>
                            <img src="/assets/images/aau.jpg" alt="" height="80px" width="100px" />&nbsp;&nbsp;&nbsp;
                            Welcome to College of Agricultural Information Technology&nbsp;&nbsp;&nbsp;
                            <img src="/assets/images/cait.jpg" alt="" height="80px" width="100px" />
                        </h6>
                        <h2>Find the perfect <em>Job</em></h2>
                        <div className="main-button">
                            <Link to="/contact">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /><br /><br />
        
            <section className="section" id="trainers">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="trainer-item">
                                <div className="image-thumb">
                                    <img src="assets/images/homestudent.jfif" alt="" height="250px"/>
                                </div>
                                <div className="down-content">
                                    <span></span>
                                    <h4 className="text-center" style={{fontFamily:"initial"}}>Registered Student</h4>
                                    <NotificationBadge count={student.length} effect={Effect.SCALE} style={{fontSize:"20px"}} />
                                    <ul className="social-icons"  className="text-center">
                                        <li><Link to='/homestud'>+ View More</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="trainer-item">
                                <div className="image-thumb">
                                    <img src="assets/images/blog-image-2-940x460.jpg" alt="" height="250px" />
                                </div>
                                <div className="down-content">
                                    <span></span>
                                    <h4 className="text-center" style={{fontFamily:"initial"}}>Registered Companies</h4>
                                    <NotificationBadge count={company.length} effect={Effect.SCALE} style={{fontSize:"20px"}} />
                                    <ul className="social-icons"  className="text-center">
                                        <li><Link to='/company'>+ View More</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="trainer-item">
                                <div className="image-thumb">
                                    <img src="assets/images/technology.jpg" alt="" height="250px" />
                                </div>
                                <div className="down-content">
                                    <span></span>
                                    <h4 className="text-center" style={{fontFamily:"initial"}}>Technology we studied</h4>
                                    <NotificationBadge count={technology.length} effect={Effect.SCALE} style={{fontSize:"20px"}} />
                                    <ul className="social-icons"  className="text-center">
                                        <li><Link to='/hometech'>+ View More</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- ***** Call to Action End ***** --> */}
            <br /><br /><br />
    </div>
  );
}

export default Home;
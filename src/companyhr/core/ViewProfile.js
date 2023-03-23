import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { isAuthenticatedC } from '../helper';

const ProfileC = ({history}) => {

    const [company, setCompany] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            setCompany(data1);
        };
        fetchData();
    }, []);

  return (
    <section class="section about-section gray-bg" id="about" style={{minHeight:"700px"}}>
        <br /><br /><br /><br /><br />
            <div class="container">
                <div class="row align-items-center flex-row-reverse">
                    <div class="col-lg-6">
                        {company.filter(c=>c.id == isAuthenticatedC().user.id).map((c,i)=>(
                        <div class="about-text go-to" key={i}>
                            <h3 class="dark-color">About Me
                                <button type="button" class="btn btn-light" data-toggle="tooltip" data-placement="bottom" title="Edit Profile" onClick={()=>{history.push('/eprofilec')}}><i className="fa fa-edit" /></button>
                            </h3><br />
                            <h6 class="theme-color lead">Name : {c.fullname}</h6>
                            <div class="row about-list">
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Email</label>
                                        <p>{c.email}</p>
                                    </div>
                                    <div class="media">
                                        <label>Contact</label>
                                        <p>{c.phone}</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="media">
                                        <label>Company</label>
                                        <p>{c.companyname}</p>
                                    </div>
                                    <div class="media">
                                        <label>Location</label>
                                        <p>{c.location}</p>
                                    </div>
                                    <div class="media">
                                        <label>Logo</label>
                                        <p><img src={c.logo} height="50px" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div class="col-lg-6">
                        <div class="about-avatar">
                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" title="" alt="" />
                        </div>
                    </div>
                </div>
                <div class="counter">
                    <div class="row">
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="500" data-speed="500"><i className="fa fa-facebook-f" /></h6>
                                <p class="m-0px font-w-600"><a href="https://www.facebook.com/">Facebook</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="150" data-speed="150"><i className="fa fa-linkedin" /></h6>
                                <p class="m-0px font-w-600"><a href="https://www.linkedin.com/home">LinkedIn</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="850" data-speed="850"><i className="fa fa-instagram" /></h6>
                                <p class="m-0px font-w-600"><a href="https://www.instagram.com/accounts/login/?hl=en">Instagram</a></p>
                            </div>
                        </div>
                        <div class="col-6 col-lg-3">
                            <div class="count-data text-center">
                                <h6 class="count h2" data-to="190" data-speed="190"><i className="fa fa-twitter" /></h6>
                                <p class="m-0px font-w-600"><a href="https://twitter.com/login?lang=en">Twitter</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  );
}

export default ProfileC;
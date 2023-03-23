import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { API } from '../../backend';

const Home = () => {

    const [student, setStudent] = useState([]);
    const [company, setCompany] = useState([]);
    const [job, setJob] = useState([]);
    const [apply, setApply] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}student/personal`,{method: "GET"});
            const response4 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            setCompany(data1);
            setJob(data2);
            setStudent(data3);
            setApply(data4);
        };
        fetchData();
    }, []);

  return (
    <section class="section" id="features" style={{minHeight:"700px"}}>
        <div class="container">
            <div class="row text-center">
                <div class="col-lg-12">
                    <div class="section-heading">
                        <h2>Welcome to <em> Career Club </em></h2>
                        <img src="assets/images/line-dec.png" alt="waves" />
                        
                    </div>
                </div>

                <div class="col-md-2">
                    <div class="icon">
                        <i class="fa fa-user"><NotificationBadge count={student.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/student'>Registered Students</Link></h5>
                </div>

                <div class="col-md-2">
                    <div class="icon">
                        <i class="fa fa-building"><NotificationBadge count={company.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/companies'>Hiring Companies</Link></h5>
                </div>

                <div class="col-md-4">
                    <div class="icon">
                        <i class="fa fa-users"><NotificationBadge count={apply.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/applyCan'>Applied Candidates</Link></h5>
                </div>

                <div class="col-md-2">
                    <div class="icon">
                        <i class="fa fa-ils"><NotificationBadge count={job.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/jobs'>Available Jobs</Link></h5>
                </div>

                <div class="col-md-2">
                    <div class="icon">
                        <i class="fa fa-users"><NotificationBadge count={apply.filter(a=>a.status == "true").length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/placestud'>Selected Students</Link></h5>
                </div>

                {/* <div class="col-md-2">
                    <div class="icon">
                        <i class="fa fa-question"><NotificationBadge count={student.filter(a=>a.score >= 0).length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/viewquiz'>Quiz Result</Link></h5>
                </div> */}
            
            </div>
        </div>
    </section>
  );
}
export default Home;
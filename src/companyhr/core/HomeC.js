import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import { API } from '../../backend';
import { isAuthenticatedC } from '../helper'

const HomeC = () => {

    const [job, setJob] = useState([]);
    const [apply, setApply] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [quizscore, setScore] = useState([]);

    const j = job.filter(j=>j.company == isAuthenticatedC().user.id).map(j=>j.id)
    const q = quiz.filter(j=>j.company == isAuthenticatedC().user.id).map(j=>j.id)
    const a = apply.map(a=>a.job)

    var matches = [];
    for (var i = 0; i < a.length; i++) {
        for (var ji = 0; ji < j.length; ji++) {
            if ( a[i] === j[ji] ) 
                matches.push( a[i] );
        }
    }

    const s = quizscore.filter(j=>q.includes(j.quiz)).map(j=>j.student)
    const unique = [...new Set(s)];

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
            const response4 = await fetch(`${API}quiz/quizscore/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            setJob(data1);
            setApply(data2);
            setQuiz(data3);
            setScore(data4);
        };
        fetchData();
    }, []);

  return (
    <section class="section" id="features" style={{minHeight:"630px"}}>
        <div class="container">
            <div class="row text-center">
                <div class="col-lg-12">
                    <div class="section-heading">
                        <h2>Welcome to <em> Career Club </em></h2>
                        <img src="assets/images/line-dec.png" alt="waves" />
                        
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="icon">
                        <i class="fa fa-ils">
                            <NotificationBadge count={j.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/createjob'>Available Jobs</Link></h5>
                </div>

                <div class="col-md-3">
                    <div class="icon">
                        <i class="fa fa-users">
                            <NotificationBadge count={matches.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/applystud'>Applied Candidates</Link></h5>
                </div>

                <div class="col-md-3">
                    <div class="icon">
                        <i class="fa fa-question-circle-o">
                            <NotificationBadge count={q.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/createquiz'>Aptitude Test</Link></h5>
                </div>

                <div class="col-md-3">
                    <div class="icon">
                        <i class="fa fa-list-alt">
                            <NotificationBadge count={unique.length} effect={Effect.SCALE} style={{fontSize:"20px"}} /></i>
                    </div><br />
                    <h5><Link to='/quizresult'>Show Result</Link></h5>
                </div>
            </div>
        </div>
    </section>
  );
}
export default HomeC;
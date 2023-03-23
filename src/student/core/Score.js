import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';

const Score = () => {
    const [student, setStudent] = useState([]);
    const [company, setCompany] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [quizscore,setScore] = useState([]);

    const c = quiz.map(q=>q.company)
    const unique = [...new Set(c)];

    const [per, setPer] = useState({
      total : ""
    });
    const {total} = per;

    const myFunc = (id) => (event) => {
      event.preventDefault();
      setPer({...per, total: ""})
      const qu = quiz.filter(q=>q.company == id).map(q=>q.id)
      const sc = quizscore.filter(s=>s.student == isAuthenticatedS().user.id && qu.includes(s.quiz)).map(s=>s.score)
      var sum = 0;

      sc.map((q)=>(
        sum = sum + parseInt(q)
      ))
      var len = quiz.filter(q=>q.company == id).length
      var sclen = quizscore.filter(s=>s.student == isAuthenticatedS().user.id && qu.includes(s.quiz)).length
      var tot = ((sum * 100)/len).toFixed(2)

      if (sclen == len) {
        setPer({...per, total: tot})
      }
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
            const response3 = await fetch(`${API}quiz/quizscore/`,{method: "GET"});
            const response4 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            setStudent(data1);
            setQuiz(data2);
            setScore(data3);
            setCompany(data4);
        };
        fetchData();
    }, []);

  return (
    <div class="container" style={{marginTop:"80px",minHeight:"700px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                Available Aptitude test
              </h6>
            </div>
            <div class="card-body">
                <div class="row justify-content-center">
                    {unique.map((t,i)=>(
                    <div class="col-lg-3" key={i}>
                        <div class="card o-hidden border-0 shadow-lg my-5">
                            <div class="card-body p-0">
                            <div class="flip-card1" onMouseEnter={myFunc(t)}>
                                <div class="flip-card-inner">
                                <div class="flip-card-front">
                                    <img src={company.filter(c=>c.id == t).map(c=>c.logo)} alt="Technology" style={{height:"250px", width:"100%"}} />
                                </div>
                                <div class="flip-card-back"><br />
                                    <h3 style={{marginTop:"50px"}}>{company.filter(c=>c.id == t).map(c=>c.companyname)}</h3> 
                                    <p style={{fontFamily:"cursive",fontSize:"15pt",color:"sienna"}}><strong>
                                      {total ? total+" %" : <p>You aptitude is not complete yet! <br />
                                        <Link to={{pathname: `/quiz/${t}`}}>Click here</Link> </p> 
                                      }</strong><br />
                                    </p> 
                                </div>
                                </div>
                            </div>
                            </div>            
                        </div>
                    </div>
                    ))}
                </div>
            </div>
          </div>
        
        </div>
  );
}

export default Score;
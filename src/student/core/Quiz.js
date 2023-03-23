import React, { useEffect, useState } from 'react';
import { API } from '../../backend';
import { isAuthenticatedS, applyquiz } from '../helper'
import Swal from 'sweetalert2';
import Alert from 'react-s-alert';
import { useParams } from 'react-router-dom';

const Quiz = () =>{

  const [quizList,setQuiz] = useState([]);
  const [company,setCompany] = useState([]);
  const [quizscore,setQuizScore] = useState([]);

  const { id } = useParams();
  const qu = quizList.filter(q=>q.company == id).map(q=>q.id)
  const quizC = quizList.filter(c=>c.company == id).length
  const sc = quizscore.filter(s=>s.student == isAuthenticatedS().user.id && qu.includes(s.quiz)).length

  const [values, setValues] = useState({
    quiz : "",
    student : isAuthenticatedS().user.id,
    answer : "",
    score : ""
  });

  const handleChange = (name) => (event) => {
    var ans = quizList.filter(q=>q.id == name).map(q=>q.answer)
    if (event.target.value == ans) {
      setValues({ ...values,quiz: name, answer: event.target.value, score:1 });
    } else {
      setValues({ ...values,quiz: name, answer: event.target.value, score:0 });
    }
    console.log([name]+'/'+event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    applyquiz(values)
    .then((data)=>{
      console.log("DATA",data);
      setValues({
        ...values,
        quiz : "",
        student : "",
        answer : "",
        score : ""
      });
      window.location.reload();
    })
    .catch(e=>console.log(e))
  }

  const handleFinal = (event) => {
    event.preventDefault();
    var sum = 0;
    var cri = company.filter(c=>c.id==id).map(p=>p.criteria);

    quizscore.filter(q=>q.student == isAuthenticatedS().user.id && qu.includes(q.quiz)).map((q)=>(
      sum = sum + parseInt(q.score)
    ))

    var tot = ((sum * 100)/(quizList.filter(q=>q.company == id).length)).toFixed(2)
    if (tot < cri) {
      Alert.error('You are Failed!!!', {
        position: 'top-left',
        effect: 'slide'
      });
      Swal.fire({
        title: "<h3>Oops!</h3>",
        html: "<b>You are Failed!!!</b><br /><span>You got <b>"+tot+ "%.</b> <br />" +
               "You have to get at least <b>"+cri+"</b>% to pass in this test."
      });
    } else {
      Alert.success('You are Pass!!!', {
        position: 'top-left',
        effect: 'slide'
      });
      Swal.fire({
        title: "<h3>Congratulations!</h3>",
        html: "<b>You are Pass!!!</b><br /><span>You got "+tot+ "%. <br />" 
      });
    }
  }

  const ql = quizList.filter(q=>q.company == id).map(q=>q.id)
  const qscore = quizscore.filter(q=>q.student == isAuthenticatedS().user.id).map(q=>q.quiz)
  const qlist = ql.filter(function(n) { return qscore.indexOf(n) == -1;})

  useEffect(() => {
    const fetchData = async () => {
        const response1 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
        const response2 = await fetch(`${API}companyhr/company/`,{method: "GET"});
        const response3 = await fetch(`${API}quiz/quizscore/`,{method: "GET"});
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        setQuiz(data1);
        setCompany(data2);
        setQuizScore(data3);
    };
    fetchData();
  }, []);

  return (
    <div>
      <section class="section section-bg" id="call-to-action" style={{backgroundImage:"url('/assets/images/job-image-1-1200x600.jpg')"}}>
        <div class="container">
            <div class="row">
                <div class="col-lg-10 offset-lg-1">
                    <div class="cta-content">
                        <h2 className="text-warning">{company.filter(c=>c.id == id).map(c=>c.companyname)}</h2>
                        <h2>Aptitude <em>Test</em></h2>
                        <p>This will helps you to know your eligibility criteria.</p>
                    </div>
                </div>
            </div>
        </div>
      </section>
      <section class="section" id="trainers">
        <div className="row justify-content-center">
          <div class="col-xl-3 col-lg-12 col-md-12">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  {quizscore.filter(q=>q.student == isAuthenticatedS().user.id && qu.includes(q.quiz)).map((q,i)=>(
                    <div class="col-lg-12" key={i}>
                      <div class="p-3">
                        <span>{q.score == 1 ? <i className="fa fa-check"></i> : <i className="fa fa-close"></i>}
                          &nbsp;{i+1}. {quizList.filter(ql=>ql.id == q.quiz && ql.company == id).map(ql=>ql.question)}
                        </span><br />
                        <span>
                          {q.score == 1 ? <span className="text-success">{q.answer}</span> : <span className="text-danger">{q.answer}</span>}
                        </span>
                      </div>
                    </div>   
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-5 col-lg-12 col-md-12">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="p-3">
                    {quizscore.some(qs=>qs.student == isAuthenticatedS().user.id && quizscore.filter(qs=>qs.student == isAuthenticatedS().user.id).length == quizList.length) ? 
                    <div>
                      <div class="border">
                        <div class="question bg-white p-3 border-bottom">
                            <div class="d-flex flex-row justify-content-between align-items-center mcq">
                                <h4>MCQ Quiz</h4>
                            </div>
                        </div><br/>
                        <span className="text-success" style={{marginLeft:"200px"}}>You already responded.</span>
                      </div><br />
                      <button class="btn btn-primary border-success btn-success" onClick={handleFinal}>View Score</button>
                    </div>
                    : 
                    <div>
                      <div class="border">
                        <div class="question bg-white p-3 border-bottom">
                            <div class="d-flex flex-row justify-content-between align-items-center mcq">
                                <h4>MCQ Quiz</h4><span>(Total Q. {quizList.filter(q=>q.company == id).length})</span>
                            </div>
                        </div>
                        {qscore.length > 0 ? 
                            qlist.map((q,i)=>(
                                  <div class="question bg-white p-3 border-bottom" key={i}>
                                    <div class="d-flex flex-row align-items-center question-title">
                                        <h3 class="text-danger">Q{i+1}.</h3>
                                        <h5 class="mt-1 ml-2"> {quizList.filter(ql=>ql.id == q).map(ql=>ql.question)}</h5>
                                    </div>
                                    <div class="ans ml-2">
                                        <label class="radio"> <input type="radio" name="options" onClick={handleChange(q)} 
                                          value={quizList.filter(ql=>ql.id == q).map(ql=>ql.option1)} /> <span>{quizList.filter(ql=>ql.id == q).map(ql=>ql.option1)}</span>
                                        </label>
                                    </div>
                                    <div class="ans ml-2">
                                        <label class="radio"> <input type="radio" name="options" onClick={handleChange(q)} 
                                        value={quizList.filter(ql=>ql.id == q).map(ql=>ql.option2)} /> <span>{quizList.filter(ql=>ql.id == q).map(ql=>ql.option2)}</span>
                                        </label>
                                    </div>
                                    <div class="ans ml-2">
                                        <label class="radio"> <input type="radio" name="options" onClick={handleChange(q)}  
                                        value={quizList.filter(ql=>ql.id == q).map(ql=>ql.option3)} /> <span>{quizList.filter(ql=>ql.id == q).map(ql=>ql.option3)}</span>
                                        </label>
                                    </div>
                                    <div class="ans ml-2">
                                        <label class="radio"> <input type="radio" name="options" onClick={handleChange(q)} 
                                        value={quizList.filter(ql=>ql.id == q).map(ql=>ql.option4)} /> <span>{quizList.filter(ql=>ql.id == q).map(ql=>ql.option4)}</span>
                                        </label>
                                    </div>
                                    <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white">
                                      <button class="btn btn-primary border-success btn-success" onClick={handleSubmit}>Save</button>
                                    </div>
                                  </div>                         
                          )) : quizList.filter(q=>q.company == id).map((q,i)=>(
                          <div class="question bg-white p-3 border-bottom" key={i}>
                            <div class="d-flex flex-row align-items-center question-title">
                                <h3 class="text-danger">Q{i+1}.</h3>
                                <h5 class="mt-1 ml-2"> {q.question}</h5>
                            </div>
                            <div class="ans ml-2">
                                <label class="radio"> <input type="radio" name="options" onClick={handleChange(q.id)} 
                                  value={q.option1} /> <span>{q.option1}</span>
                                </label>
                            </div>
                            <div class="ans ml-2">
                                <label class="radio"> <input type="radio" name="options" onClick={handleChange(q.id)} 
                                value={q.option2} /> <span>{q.option2}</span>
                                </label>
                            </div>
                            <div class="ans ml-2">
                                <label class="radio"> <input type="radio" name="options" onClick={handleChange(q.id)} 
                                value={q.option3} /> <span>{q.option3}</span>
                                </label>
                            </div>
                            <div class="ans ml-2">
                                <label class="radio"> <input type="radio" name="options" onClick={handleChange(q.id)} 
                                value={q.option4} /> <span>{q.option4}</span>
                                </label>
                            </div>
                            <div class="d-flex flex-row justify-content-between align-items-center p-2 bg-white">
                              <button class="btn btn-primary border-success btn-success" onClick={handleSubmit}>Save</button>
                            </div>
                        </div> 
                      ))
                      }
                      </div><br />{quizC == sc ? 
                      <button class="btn btn-primary border-success btn-success" onClick={handleFinal}>Get Score</button> : ""}
                      </div>
                    }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Quiz;

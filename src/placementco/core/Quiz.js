import React, { useEffect, useState } from 'react';
import { API } from '../../backend';

const QuizP = () => {
  const [student, setStudent] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [quizscore, setScore] = useState([]);

  var pers={};

  const len = quiz.map(q=>q.id).length
  const q = quiz.map(q=>q.id)
  const s = quizscore.filter(j=>q.includes(j.quiz)).map(j=>j.student)
  const unique = [...new Set(s)];

  unique.forEach((u) => {
    var sum = 0;
    quizscore.filter(qi=>qi.student == u && q.includes(qi.quiz)).map((q)=>(
      sum = sum + parseInt(q.score)
    ))
    var tot = (sum * 100/len).toFixed(2);
    var per = Object.assign({}, pers)
    per[u] = tot;
    pers = per;
  });

  console.log(pers);

    useEffect(() => {
      const fetchData = async () => {
          const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
          const response2 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
          const response3 = await fetch(`${API}quiz/quizscore/`,{method: "GET"});
          const data1 = await response1.json();
          const data2 = await response2.json();
          const data3 = await response3.json();
          setStudent(data1);
          setQuiz(data2);
          setScore(data3);
      };
      fetchData();
  }, []);

  return (
    <div class="container" style={{marginTop:"80px"}}>
        <br />
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-danger">
                Quiz Result
              </h6>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                  <thead>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Image</th>
                      <th>Contact No</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr style={{fontWeight:"bold",color:"blueviolet"}}>
                      <th></th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Image</th>
                      <th>Contact No</th>
                    </tr>
                  </tfoot>
                  <tbody>
                      {unique.map((u,ii)=>(
                        student.filter(s=>s.id == u).map((s)=>(
                          <tr key={ii}>
                            <td>{ii+1}</td> 
                            <td>{s.firstname} {s.lastname}</td>
                            <td>{s.email}</td>
                            <td className="text-center"><img src={s.image ? s.image : "https://bootdey.com/img/Content/avatar/avatar7.png"} height="70px" /></td>
                            <td>{s.phone ? s.phone : "-"}</td>
                          </tr>
                        ))
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        
        </div>
  );
}

export default QuizP;
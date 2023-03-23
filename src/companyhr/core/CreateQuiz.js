import React, { useState, useEffect } from 'react';
import Select from 'react-select';  
import { API } from '../../backend';
import { createQuiz, isAuthenticatedC, editProfile, editQuiz } from '../helper';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';

const CreateQuiz = () => {

    const id = isAuthenticatedC().user.id 

    const [quiz,setQuiz] = useState([]);
    const [company,setCmp] = useState([]);
    const [per1,setPer1] = useState([]);

    const [values, setValues] = useState({
        question: "",
        company: id,
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    });

    const [per,setPer] = useState({
        criteria : ""
    });

    const [val,setVal] = useState({
        loading1 : false,
        loading : false,
        error : false,
        criteria : "",
        edit : false,
        eid : ""
    })

    const { question, option1, option2, option3, option4, answer } = values;
    const { loading1,loading, error, edit,eid } = val;

    const handleChange = (name) =>
    (event) => {
      setValues({ ...values, [name]: event.target.value });
    };

    const handleChangeEdit = (name) =>
    (event) => {
      setPer1({ ...per1, [name]: event.target.value });
      console.log([name]+' / '+event.target.value )
    };

    const handleCriteria = (name) => (event) => {
        setPer({ ...per, [name] : event.target.value });
        console.log([name]+'/'+event.target.value)
    };

    const handleCriteriaSubmit = (event) => {
        event.preventDefault();
        setVal({ ...val, loading1:true, error:false });
        editProfile(id,per)
        .then(data => {
            console.log("DATA", data);
            setPer({...per,criteria:""});
            setVal({...val,loading1:false});
            window.location.reload();
        })
        .catch(e=>console.log(e))
    }

    /* const handleChangeEdit = (name) =>
    (event) => {
      setPer({ ...per, [name]: event.target.value });
    };

    const handleAnswerEdit = (event) => {
        setPer({ ...values, "answer": event.value });
    }

    const handleEdit = (id) => (event) => {
        event.preventDefault();
        setVal({ ...val, edit:!edit, eId:id })
    } */

    const handleAnswer = (event) => {
        setValues({ ...values, "answer": event.value });
    }

    const handleAnswerEdit = (event) => {
        setPer1({ ...per1, "answer": event.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setVal({ ...val, loading:true, error:false });
        createQuiz(values)
        .then(data => {
            console.log("DATA", data);
            if (!data.id) {
                setVal({
                    ...val,
                    error : [data.question,data.option1,data.option2,data.option3,data.option4,data.answer]
                })
            } else {
                setValues({ 
                    ...values,
                    question: "",
                    option1: "",
                    option2: "",
                    option3: "",
                    option4: "",
                    answer: ""
                });
                setVal({...val,loading:false});
                window.location.reload();
            }
        })
        .catch(e=>console.log(e))
    }

    const handleEdit = (id) => (event) => {
        event.preventDefault();
        setVal({...val, edit:true, eid:id})
    }

    const handleEditSubmit = (event) => {
        event.preventDefault();
        console.log(JSON.stringify(per1))
        editQuiz(eid,per1)
        .then((data)=>{
            console.log("DATA",data)
            if (data.id) {
                setPer1({...per1, eid:"", edit:false});
                window.location.reload();
            } else {
                setVal({...val, 
                    error:[data.question,data.option1,data.option2,data.option3,data.option4,data.answer] 
                })
            }
        })
        .catch(e=>console.log(e))
    }

    const handleDelete = (id) => (event) => {
        event.preventDefault();
        fetch(`${API}quiz/quizhome/${id}/`,{method: "DELETE"})
        .then((response) => {
            window.location.reload();
            return response.json();
        })
        .catch((err) => console.log(err));
    }

    const options = [
        { value: option1, label: option1 },
        { value: option2, label: option2 },
        { value: option3, label: option3 },
        { value: option4, label: option4 }
    ];

    var opt = quiz.filter(q=>q.id == eid).map(q=>q)
    const options1 = [
        { value: opt.map(q=>q.option1), label: opt.map(q=>q.option1) },
        { value: opt.map(q=>q.option2), label: opt.map(q=>q.option2) },
        { value: opt.map(q=>q.option3), label: opt.map(q=>q.option3) },
        { value: opt.map(q=>q.option4), label: opt.map(q=>q.option4) }
    ];

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

    const LoadingMess1 = () => {
        return(
            loading1 && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}quiz/quizhome/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            setQuiz(data1);
            setCmp(data2)
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
                            <br/>
                            <h2>Create <em>Quiz</em></h2>
                            <p>Create Quiz for student to know eligibility criteria.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="trainers">
            <div className="row justify-content-center">
                <div class="col-xl-4 col-lg-12 col-md-12">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="p-3">
                                        {LoadingMess1()}
                                        <div class="form-group row">
                                            <div className="col-sm-6"><label htmlFor="criteria" style={{float:"right",marginTop:"5px"}}>Set Eligibility Criteria : </label></div>
                                            <div className="col-sm-5">
                                                <input type="number" class="form-control form-control-user" id="criteria" onChange={handleCriteria("criteria")}
                                                    placeholder={(company.filter(c=>c.id==id).map(p=>p.criteria))+"%"}  min="0" max="100" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12 text-center">
                                                <button className="btn btn-info" onClick={handleCriteriaSubmit}>Set</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-xl-3 col-lg-12 col-md-12">
                    <div class="card o-hidden border-0 shadow-lg my-5">
                        <div class="card-body p-0">
                            <div class="row">
                            {quiz.filter(c=>c.company == id).map((q,i)=>(
                                <div class="col-lg-12">
                                    <div class="quiz" key={i}>
                                        <NotificationBadge count={i+1} effect={Effect.SCALE} /> {q.question}<br />
                                        <button className="btn btn-info" onClick={handleEdit(q.id)}>Edit</button>&nbsp;&nbsp;
                                        <button className="btn btn-danger" onClick={handleDelete(q.id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="col-xl-7 col-lg-12 col-md-12">
                    <div class="card o-hidden border-0 shadow-lg my-5" style={{height:"900px"}}>
                    <div class="card-body p-0">
                        <div class="row">
                        <div class="col-lg-12">
                            {edit ? 
                            <div class="p-5">
                                {LoadingMess()}
                                {quiz.filter(q=>q.id == eid).map((q,i)=>(
                                <form class="user">
                                    <div class="form-group row">
                                        <div className="col-sm-1"></div>
                                        <div className="col-sm-1"><label htmlFor="question" style={{float:"right",marginTop:"35px"}}>Question</label></div>
                                        <div className="col-sm-10">
                                            <textarea class="form-control form-control-user" id="question" onChange={handleChangeEdit("question")}
                                                placeholder="Type your question..." defaultValue={q.question} ></textarea>
                                            <span className="text-danger">{error[0]}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div className="col-sm-2"><label htmlFor="option1" style={{float:"right",marginTop:"5px"}}>Option A</label></div>
                                        <div className="col-sm-10">
                                            <input type="text" class="form-control form-control-user" id="option1" onChange={handleChangeEdit("option1")}
                                                placeholder="Option A" defaultValue={q.option1} />
                                            <span className="text-danger">{error[1]}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div className="col-sm-2"><label htmlFor="option2" style={{float:"right",marginTop:"5px"}}>Option B</label></div>
                                        <div className="col-sm-10">
                                            <input type="text" class="form-control form-control-user" id="option2" onChange={handleChangeEdit("option2")}
                                                placeholder="Option B" defaultValue={q.option2} />
                                            <span className="text-danger">{error[2]}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div className="col-sm-2"><label htmlFor="option3" style={{float:"right",marginTop:"5px"}}>Option C</label></div>
                                        <div className="col-sm-10">
                                            <input type="text" class="form-control form-control-user" id="option3" onChange={handleChangeEdit("option3")}
                                                placeholder="Option C" defaultValue={q.option3} />
                                            <span className="text-danger">{error[3]}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div className="col-sm-2"><label htmlFor="option4" style={{float:"right",marginTop:"5px"}}>Option D</label></div>
                                        <div className="col-sm-10">
                                            <input type="text" class="form-control form-control-user" id="option4" onChange={handleChangeEdit("option4")}
                                                placeholder="Option D" defaultValue={q.option4} />
                                            <span className="text-danger">{error[4]}</span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div className="col-sm-2"><label htmlFor="answer" style={{float:"right",marginTop:"5px"}}>Answer</label></div>
                                        <div className="col-sm-10">
                                            <Select options={options1} onChange={handleAnswerEdit}
                                                class="form-control form-control-user"
                                                placeholder={q.answer}
                                            />
                                            <span className="text-danger">{error[5]}</span>
                                        </div>
                                    </div>
                                    <span className="text-danger"></span>
                                    <button class="btn btn-primary btn-user btn-block" onClick={handleEditSubmit}>Save</button>
                                </form>
                                ))}
                            </div>
                            :
                            <div class="p-5">
                                {LoadingMess()}
                                    <form class="user">
                                        <div class="form-group row">
                                            <div className="col-sm-1"></div>
                                            <div className="col-sm-1"><label htmlFor="question" style={{float:"right",marginTop:"35px"}}>Question</label></div>
                                            <div className="col-sm-10">
                                                <textarea class="form-control form-control-user" id="question" onChange={handleChange("question")}
                                                    placeholder="Type your question..."  ></textarea>
                                                <span className="text-danger">{error[0]}</span>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"><label htmlFor="option1" style={{float:"right",marginTop:"5px"}}>Option A</label></div>
                                            <div className="col-sm-10">
                                                <input type="text" class="form-control form-control-user" id="option1" onChange={handleChange("option1")}
                                                    placeholder="Option A"  />
                                                <span className="text-danger">{error[1]}</span>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"><label htmlFor="option2" style={{float:"right",marginTop:"5px"}}>Option B</label></div>
                                            <div className="col-sm-10">
                                                <input type="text" class="form-control form-control-user" id="option2" onChange={handleChange("option2")}
                                                    placeholder="Option B"  />
                                                <span className="text-danger">{error[2]}</span>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"><label htmlFor="option3" style={{float:"right",marginTop:"5px"}}>Option C</label></div>
                                            <div className="col-sm-10">
                                                <input type="text" class="form-control form-control-user" id="option3" onChange={handleChange("option3")}
                                                    placeholder="Option C"  />
                                                <span className="text-danger">{error[3]}</span>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"><label htmlFor="option4" style={{float:"right",marginTop:"5px"}}>Option D</label></div>
                                            <div className="col-sm-10">
                                                <input type="text" class="form-control form-control-user" id="option4" onChange={handleChange("option4")}
                                                    placeholder="Option D"  />
                                                <span className="text-danger">{error[4]}</span>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div className="col-sm-2"><label htmlFor="answer" style={{float:"right",marginTop:"5px"}}>Answer</label></div>
                                            <div className="col-sm-10">
                                                <Select options={options} onChange={handleAnswer}
                                                    class="form-control form-control-user"
                                                    placeholder="Correct Answer..."
                                                />
                                                <span className="text-danger">{error[5]}</span>
                                            </div>
                                        </div>
                                        <span className="text-danger"></span>
                                        <button class="btn btn-primary btn-user btn-block" onClick={handleSubmit}>Save</button>
                                    </form>
                            </div>
                        }
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

export default CreateQuiz;
import React, {useState,useEffect} from 'react';
import { API } from '../../../backend';
import { isAuthenticatedS } from '../../helper';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Link } from 'react-router-dom';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const Ex = () => {
    const [personal, setPersonal] = useState([]);
    const [summary, setSum] = useState([]);
    const [education, setEdu] = useState([]);
    const [skill, setSkill] = useState([]);
    const [project, setProj] = useState([]);
    
    const studentId = isAuthenticatedS().user.id;
    const sumId = summary.filter(s => s.student === studentId);
      
    const submitPdf = (event) => {
        event.preventDefault();
        html2canvas(document.querySelector("#cv"),{allowTaint:true, useCORS: true}).then(canvas => {
            document.body.appendChild(canvas)
        });
        const input = document.getElementById('cv');
        html2canvas(input,{allowTaint:true,useCORS: true})
        .then((canvas) => {
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 210; 
            var pageHeight = 295;  
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var doc = new jsPDF();
            var position = 0;

            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            }
            doc.save(`${personal.firstname} ${personal.lastname}.pdf`);  
        });
    }

    const submitJpg = (event) => {
        event.preventDefault();
        html2canvas(document.querySelector("#cv"),{allowTaint:true, useCORS: true}).then(canvas => {
            document.body.appendChild(canvas)
        });
        const input = document.getElementById('cv');
        html2canvas(input,{allowTaint:true,useCORS: true})
        .then((canvas) => {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/jpg');
            a.download = `${personal.firstname} ${personal.lastname}.jpg`;
            a.click();
        })
        ;
    }

    const submitPng = (event) => {
        event.preventDefault();
        html2canvas(document.querySelector("#cv"),{allowTaint:true, useCORS: true}).then(canvas => {
            document.body.appendChild(canvas)
        });
        const input = document.getElementById('cv');
        html2canvas(input,{allowTaint:true,useCORS: true})
        .then((canvas) => {
            var a = document.createElement('a');
            a.href = canvas.toDataURL('image/png');
            a.download = `${personal.firstname} ${personal.lastname}.png`;
            a.click();
        })
        ;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/${studentId}/`,{method: "GET"});
            const response2 = await fetch(`${API}student/job/`,{method: "GET"});
            const response3 = await fetch(`${API}student/education/`,{method: "GET"});
            const response4 = await fetch(`${API}student/skills/`,{method: "GET"});
            const response5 = await fetch(`${API}student/projects/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            const data4 = await response4.json();
            const data5 = await response5.json();
            setPersonal(data1);
            setSum(data2);
            setEdu(data3);
            setSkill(data4);
            setProj(data5);
        };
        fetchData();
    }, []);
    
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return (
    <div>
        <section class="section" id="our-classes">
            <div class="content"><br />
                <div class="row" id="tabs">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-3">
                        <ul>
                            <li><Link to="/resume/personal"><i class="fa fa-user"></i> Personal Information</Link></li>
                            <li><Link to="/resume/summary"><i class="fa fa-info-circle"></i> Summary</Link></li>
                            <li><Link to="/resume/education"><i class="fa fa-graduation-cap"></i> Educational Qualification</Link></li>
                            <li><Link to="/resume/skill"><i class="fa fa-cogs"></i> Technical Skills</Link></li>
                            <li><Link to="/resume/project"><i class="fa fa-tasks"></i> Academic Projects</Link></li>
                            <li><Link to="/resume/preview"><i class="fa fa-eye"></i> Preview Resume</Link></li>
                            <li><Link to="/resume/upload"><i class="fa fa-download"></i> Upload Resume</Link></li>
                        </ul>
                    </div>
                    <div class="col-lg-7">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><Link to="/resume/personal">Personal Information</Link></li>
                                <li class="breadcrumb-item"><Link to="/resume/summary">Summary</Link></li>
                                <li class="breadcrumb-item"><Link to="/resume/education">Educational Qualification</Link></li>
                                <li class="breadcrumb-item"><Link to="/resume/skill">Technical Skills</Link></li>
                                <li class="breadcrumb-item"><Link to="/resume/project">Academic Projects</Link></li>
                                <li class="breadcrumb-item active"><Link to="/resume/preview">Preview Resume</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-6'>
                            <h3>Resume Preview</h3>
                                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret color="primary" size="lg"><i class="fa fa-download"></i> Download</DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={submitPdf}>PDF(Recommended)</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem onClick={submitPng}>PNG(High Quality)</DropdownItem>
                                        <DropdownItem onClick={submitJpg}>JPG</DropdownItem>
                                    </DropdownMenu>
                                </ButtonDropdown>
                                <div id="cv" style={{boxShadow: "0px 0px 15px rgba(0,0,0,0.1)"}}>
                                    <div class="mainDetails">
                                        <div className="row">
                                            <div className="col-lg-3">
                                                <div id="headshot">
                                                    <img src={personal.image} alt={personal.firstname} />
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div id="name">
                                                    <h1>{personal.firstname} {personal.lastname}</h1><br />
                                                    <h4>{sumId.map(s=>s.position)}</h4>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div id="contactDetails" style={{marginLeft:"0px"}}>
                                                    <ul>
                                                        <li><i class="fa fa-envelope" aria-hidden="true"></i> {personal.email}</li>
                                                        <li><i class="fa fa-phone" aria-hidden="true"></i> {personal.phone}</li>
                                                        <li><i class="fa fa-address-card" aria-hidden="true"></i> {personal.address}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="clear"></div>
                                    </div> 
                                    <div id="mainArea">
                                        <section>
                                            <article>
                                                <div class="sectionTitle">
                                                    <h1>Career Objective</h1>
                                                </div>
                                                <div class="sectionContent">
                                                    <p>{sumId.map(s=>s.objective)}</p>
                                                </div>
                                            </article>
                                            <div class="clear"></div>
                                        </section><br />

                                        <section>
                                            <div class="sectionTitle">
                                                <h1>Education</h1>
                                            </div>
                                            <div class="sectionContent">
                                                <div className="row">
                                                    <div className="col-lg-3"><h6>Course/Degree</h6></div>
                                                    <div className="col-lg-3"><h6>Board/University</h6></div>
                                                    <div className="col-lg-3"><h6>Year of Passing</h6></div>
                                                    <div className="col-lg-3"><h6>Percentage</h6></div>
                                                </div>
                                                {education.filter(e=>e.student===studentId).map((e,i)=>(
                                                    <article>
                                                        <div className="row" key={i}>
                                                            <div className="col-lg-3"><p1>{e.course}</p1></div>
                                                            <div className="col-lg-3"><p1>{e.board}</p1></div>
                                                            <div className="col-lg-3"><p1>{e.yearofpassing}</p1></div>
                                                            <div className="col-lg-3"><p1>{e.ogpa}</p1></div>
                                                        </div>
                                                    </article>
                                                ))}
                                            </div>
                                            <div class="clear"></div>
                                        </section><br />

                                        <section>
                                            <div class="sectionTitle">
                                                <h1>Body Mesurements</h1>
                                            </div>
                                            <div class="sectionContent">
                                                <div className="row">
                                                    <div className="col-lg-3"><h6>Weight</h6></div>
                                                    <div className="col-lg-3"><h6>Height</h6></div>
                                                </div>
                                                
                                                    <article>
                                                        <div className="row">
                                                            <div className="col-lg-3"><p1>71.8</p1></div>
                                                            <div className="col-lg-3"><p1>5.8</p1></div>
                                                            
                                                        </div>
                                                    </article>
                                          
                                            </div>
                                            <div class="clear"></div>
                                        </section><br />

                                        <section>
                                            <div class="sectionTitle">
                                                <h1>Key Skills</h1>
                                            </div>
                                            <div class="sectionContent">
                                                <div class="row">
                                                    {skill.filter(s=>s.student===studentId).map((s,i)=>(
                                                        <div class="col-md-6" key={i}>
                                                            <div class="progress-container progress-primary"><span class="progress-badge">{s.skill}</span>
                                                                <div class="progress">
                                                                    <div class="progress-bar progress-bar-primary" data-aos="progress-full" data-aos-offset="10" data-aos-duration="2000" 
                                                                        role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="10" style={{width: s.level*10+"%"}}></div>
                                                                        <span class="progress-value">{s.level*10}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </section><br />

                                        {/* <section>
                                            <div class="sectionTitle">
                                                <h1>Experience</h1>
                                            </div>
                                            <div class="sectionContent">
                                                <div class="row">
                                                    <article>
                                                        <h2>2 Months</h2>
                                                        <p></p>
                                                    </article>
                                                </div>
                                            </div>
                                            <div class="clear"></div>
                                        </section><br /> */}
                                        
                                        <section>
                                            <div class="sectionTitle">
                                                    <h1>Experience</h1>
                                            </div>
                                            <div class="sectionContent">
                                                
                                                    <article>
                                                        <h2>Fitness Trainer</h2>
                                                        <p class="subDetails">2 months</p>
                                                        <p>Laksh Prime Fitness, nr. Townhall.</p>
                                                    </article>
                                     
                                            </div>
                                            <div class="clear"></div>
                                        </section>                 
                                        
                                    </div>
                                </div>
                            </article>
                        </section>
                    </div><div className="col-lg-1"></div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default Ex;
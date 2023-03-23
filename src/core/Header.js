import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticatedC, signoutc } from '../companyhr/helper';
import { isAuthenticatedP, signoutp } from '../placementco/helper';
import { isAuthenticatedS, signouts } from '../student/helper';
import { NavDropdown } from 'react-bootstrap';
import { API } from '../backend';
import { Wave } from 'react-animated-text';

const currentTab = (history,path) => {
  if (history.location.pathname === path){
      return {color: "#ed563b"}
  } else {
      return {color: ""}
  }
}

const Header = ({history}) => {

    const [student, setStudent] = useState([]);
    const [placementco, setPlacement] = useState([]);
    const [companyhr, setHR] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const response3 = await fetch(`${API}placementco/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setStudent(data1);
            setHR(data2);
            setPlacement(data3);
        };
        fetchData();
    }, []);

  return (
    <div>
        {/* <!-- ***** Header Area Start ***** --> */}
            <header className="header-area header-sticky"> 
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                {/* <!-- ***** Logo Start ***** --> */}
                                <Link className="logo" to="/">Career Club</Link>
                                {/* <!-- ***** Logo End ***** -->
                                <!-- ***** Menu Start ***** --> */}
                                <ul className="nav">
                                    {!isAuthenticatedS() && !isAuthenticatedC() && !isAuthenticatedP() && (
                                        <Fragment>
                                            <li><Link style={currentTab(history, "/")} to="/"><i className="fa fa-home"></i> HOME</Link></li>
                                            {/* <NavDropdown title={<span className="text-dark">Available</span>} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to ="/homestud" style={{color:"black",fontSize:"16px"}}>Students</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/company" style={{color:"black",fontSize:"16px"}}>Companies</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/hometech" style={{color:"black",fontSize:"16px"}}>Technologies</Link></NavDropdown.Item>
                                            </NavDropdown> */}
                                            <li><Link style={currentTab(history, "/syllabus")} to="/syllabus"><i className="fa fa-book"></i> Syllabus</Link></li>
                                            <li><Link style={currentTab(history, "/about")} to="/about"><i className="fa fa-info-circle"></i> ABOUT</Link></li>
                                            <li><Link style={currentTab(history, "/contact")} to="/contact"><i className="fa fa-phone"></i> CONTACT</Link></li> 
                                            <li><Link style={currentTab(history, "/signup")} to="/signup"><i className="fa fa-user-plus"></i> REGISTER</Link></li> 
                                            <li><Link style={currentTab(history, "/signin")} to="/signin"><i className="fa fa-sign-in"></i> LOGIN</Link></li> 
                                        </Fragment>
                                    )}
                                    {isAuthenticatedS() && (
                                        <Fragment>
                                            <li><Link style={currentTab(history, "/homes")} to="/homes"><i className="fa fa-home"></i> HOME</Link></li>
                                            <li><Link style={currentTab(history, "/resume/personal")} to="/resume/personal"><i className="fa fa-file"></i> Resume Builder</Link></li>
                                            <li><Link style={currentTab(history, "/company")} to="/company"><i className="fa fa-building"></i> Hiring Companies</Link></li>
                                            <li><Link style={currentTab(history, "/result")} to="/result"><i className="fa fa-list-alt"></i> Show Aptitude</Link></li>
                                            <li><Link style={currentTab(history, "/stdinbox")} to="/stdinbox"><i className="fa fa-inbox"></i> Inbox</Link></li>
                                            <NavDropdown title={<strong className="text-dark">
                                                {student.filter(s=>s.id == isAuthenticatedS().user.id).map(s=>s.firstname+' '+s.lastname)}</strong>} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to ="/profiles" style={{color:"black",fontSize:"16px"}}><i className="fa fa-user-circle"></i> View Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/eprofiles" style={{color:"black",fontSize:"16px"}}><i className="fa fa-edit"></i> Edit Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span style={{color:"black",fontSize:"16px"}} onClick={() => {signouts(() => {history.push("/"); 
                                                        window.location.reload();})}}><strong><i className="fa fa-sign-out"></i> Logout</strong></span> 
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Fragment>
                                    )}
                                    {isAuthenticatedC() && (
                                        <Fragment>
                                            <li><Link style={currentTab(history, "/homec")} to="/homec"><i className="fa fa-home"></i> HOME</Link></li>
                                            <li><Link style={currentTab(history, "/company")} to="/company"><i className="fa fa-users"></i> See Others</Link></li>
                                            <li><Link style={currentTab(history, "/createjob")} to="/createjob"><i className="fa fa-tasks"></i> Create Job</Link></li>
                                            <li><Link style={currentTab(history, "/createquiz")} to="/createquiz"><i className="fa fa-question-circle-o"></i> Create Quiz</Link></li>
                                            <li><Link style={currentTab(history, "/cmpinbox")} to="/cmpinbox"><i className="fa fa-inbox"></i> Inbox</Link></li>
                                            <NavDropdown title={<strong className="text-dark">
                                                {companyhr.filter(c=>c.id == isAuthenticatedC().user.id).map(c=>c.fullname)}</strong>} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to ="/profilec" style={{color:"black",fontSize:"16px"}}><i className="fa fa-user-circle"></i> View Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/eprofilec" style={{color:"black",fontSize:"16px"}}><i className="fa fa-edit"></i> Edit Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span style={{color:"black",fontSize:"16px"}} onClick={() => {signoutc(() => {history.push("/"); 
                                                        window.location.reload();})}}><strong><i className="fa fa-sign-out"></i> Logout</strong></span> 
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Fragment>
                                    )}
                                    {isAuthenticatedP() && (
                                        <Fragment>
                                            <li><Link style={currentTab(history, "/homep")} to="/homep"><i className="fa fa-home"></i> HOME</Link></li>
                                            {/* <li><Link style={currentTab(history, "/estimate")} to="/estimate">Estimate</Link></li> */}
                                            
                                            <li><Link style={currentTab(history, "/technology")} to="/technology"><i className="fa fa-microchip"></i> Technology</Link></li>
                                            <NavDropdown title={<span className="text-dark"><i className="fa fa-paper-plane"></i> Requests</span>} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to ="/requests" style={{color:"black",fontSize:"16px"}}><i className="fa fa-graduation-cap"></i> Students</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/requestc" style={{color:"black",fontSize:"16px"}}><i className="fa fa-users"></i> Company</Link></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item><Link to ="/requestf" style={{color:"black",fontSize:"16px"}}><i className="fa fa-comments"></i> User Review</Link></NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title={<strong className="text-dark">{placementco.filter(p=>p.id == isAuthenticatedP().user.id).map(p=>p.name)}</strong>} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to ="/profilep" style={{color:"black",fontSize:"16px"}}><i className="fa fa-user-circle"></i> View Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to ="/eprofilep" style={{color:"black",fontSize:"16px"}}><i className="fa fa-edit"></i> Edit Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span style={{color:"black",fontSize:"16px"}} onClick={() => {signoutp(() => {history.push("/"); 
                                                        window.location.reload();})}}><strong><i className="fa fa-sign-out"></i> Logout</strong></span> 
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Fragment>
                                    )}
                                    <li></li><li></li><li></li>
                                    {isAuthenticatedS() ? 
                                        <mark style={{transform:"rotate(40deg)",borderRadius:"10px",backgroundColor:"lightsalmon",fontSize:"15px"}}>
                                            <strong><li style={{marginTop:"5px"}}><Wave text="Student" effect="stretch" effectChange={2.2} /></li></strong>
                                        </mark> :
                                        (isAuthenticatedP() ? 
                                            <mark style={{transform:"rotate(25deg)",borderRadius:"10px",backgroundColor:"lightsalmon",fontSize:"13px"}}>
                                                <strong><li style={{marginTop:"5px"}}><Wave text="Placement Officer" effect="stretch" effectChange={2.2} /> </li></strong>
                                            </mark> :
                                            isAuthenticatedC() ? 
                                            <mark style={{transform:"rotate(25deg)",borderRadius:"10px",backgroundColor:"lightsalmon",fontSize:"14px"}}>
                                                <strong><li style={{marginTop:"5px"}}><Wave text="Company HR" effect="stretch" effectChange={2.2} /></li></strong>
                                            </mark> 
                                            : "") 
                                    }
                                        
                                </ul>        
                                <div className='menu-trigger'>
                                    <span>Menu</span>
                                </div>
                                {/* <!-- ***** Menu End ***** --> */}
                            </nav>
                        </div>
                    </div>
            </header>
            {/* <!-- ***** Header Area End ***** --> */}
    </div>
  );
}

export default withRouter(Header);
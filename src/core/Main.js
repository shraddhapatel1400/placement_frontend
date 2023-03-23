import React from 'react';
import { Route, withRouter } from "react-router-dom";

import CreateJob from '../companyhr/core/CreateJob';
import Inboxcmp from '../companyhr/core/Inboxcmp';
import InboxDetails from '../companyhr/core/InboxDetail';
import ProfileC from '../companyhr/core/ViewProfile';
import EProfileC from '../companyhr/core/EditProfile';
import HomeC from '../companyhr/core/HomeC';
import ApplyStudent from '../companyhr/core/ApplyStudent';
import ForgotC from '../companyhr/core/ForgotC';

import Company from '../student/core/Companies';
import CmpJob from '../student/core/CmpJob';
import InboxS from '../student/core/InboxS';
import Education from '../student/core/Resume/education';
import Person from '../student/core/Resume/personal';
import Preview from '../student/core/Resume/preview';
import Project from '../student/core/Resume/project';
import Skill from '../student/core/Resume/skill';
import Summary from '../student/core/Resume/summary';
import SentS from '../student/core/SentS';
import Forgot from '../student/core/Forgot';
import ProfileS from '../student/core/ViewProfile';
import EProfileS from '../student/core/EditProfile';
import Upload from '../student/core/Resume/upload';
import Quiz from '../student/core/Quiz';
import PrivateRoutes from "../student/helper/PrivateRoutes";
import StudentDashboard from "../student/core/CmpJob";
import ForgotEmail from '../student/core/ForgotEmail';
import HomeS from '../student/core/HomeS';
import Notification from '../student/core/Notification';

import HomeP from '../placementco/core/Home';
import Student from '../placementco/core/Student';
import Companies from '../placementco/core/Company';
import ForgotP from '../placementco/core/ForgotP';
import ApplyCandidate from '../placementco/core/ApplyCandidate';
import ProfileP from '../placementco/core/ViewProfile';
import EProfileP from '../placementco/core/EditProfile';
import RequestS from '../placementco/core/RequestS';
import RequestC from '../placementco/core/RequestC';
import Job from '../placementco/core/Job';
import PlacedStud from '../placementco/core/PlacedStud';
import Estimate from '../placementco/core/Estimate';
import Technology from '../placementco/core/Technology';
import Feedback from '../placementco/core/Feedback';
import QuizP from '../placementco/core/Quiz';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import About from './About';
import Contact from './Contact';
import Syllabus from './Syllabus';
import StudentList from './StudentList';
import TechnologyList from './TechnologyList';

import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import CreateQuiz from '../companyhr/core/CreateQuiz';
import Score from '../student/core/Score';
import QuizResult from '../companyhr/core/QuizResult';


const Main = () => {
  return (
    <div style={{minHeight:"777px;"}}>
      <Alert stack={{limit: 3}} />
      <NotificationContainer/>
        {/* Core Pages */}
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Register} />
        <Route exact path="/signin" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/syllabus" component={Syllabus} />
        <Route exact path="/homestud" component={StudentList} />
        <Route exact path="/hometech" component={TechnologyList} />

        {/* Company Pages */}
        <Route exact path="/createjob" component={CreateJob} />
        <Route exact path="/cmpinbox" component={Inboxcmp} />
        <Route exact path="/inboxdet/:id" component={InboxDetails} />
        <Route exact path="/forgotc" component={ForgotC} />
        <Route exact path="/profilec" component={ProfileC} />
        <Route exact path="/eprofilec" component={EProfileC} />
        <Route exact path="/homec" component={HomeC} />
        <Route exact path="/applystud" component={ApplyStudent} />
        <Route exact path="/createquiz" component={CreateQuiz} />
        <Route exact path="/quizresult" component={QuizResult} />

        {/* Student Pages */}
        <Route exact path="/homes" component={HomeS} />
        <Route exact path="/resume/personal" component={Person} />
        <Route exact path="/resume/summary" component={Summary} />
        <Route exact path="/resume/education" component={Education} />
        <Route exact path="/resume/skill" component={Skill} />
        <Route exact path="/resume/project" component={Project} />
        <Route exact path="/resume/preview" component={Preview} />
        <Route exact path="/resume/upload" component={Upload} />
        <Route exact path="/company" component={Company} />
        <Route exact path="/recentjob/:id" component={CmpJob} />
        <Route exact path="/stdinbox" component={InboxS} />
        <Route exact path="/stdsent" component={SentS} />
        <Route exact path="/forgot" component={Forgot} />
        <Route exact path="/forgotemail" component={ForgotEmail} />
        <Route exact path="/profiles" component={ProfileS} />
        <Route exact path="/eprofiles" component={EProfileS} />
        <Route exact path="/quiz/:id" component={Quiz} />
        <Route exact path="/result" component={Score} />

        {/* Admin Pages */}
        <Route exact path="/homep" component={HomeP} />
        <Route exact path="/student" component={Student} />
        <Route exact path="/companies" component={Companies} />
        <Route exact path="/jobs" component={Job} />
        <Route exact path="/viewquiz" component={QuizP} />
        <Route exact path="/placestud" component={PlacedStud} />
        <Route exact path="/applyCan" component={ApplyCandidate} />
        <Route exact path="/forgotp" component={ForgotP} />
        <Route exact path="/profilep" component={ProfileP} />
        <Route exact path="/eprofilep" component={EProfileP} />
        <Route exact path="/requests" component={RequestS} />
        <Route exact path="/requestc" component={RequestC} />
        <Route exact path="/requestf" component={Feedback} />
        <Route exact path="/estimate" component={Estimate} />
        <Route exact path="/technology" component={Technology} />

        <PrivateRoutes path="/recentjob" exact component={StudentDashboard} />
    </div>
  );
}

export default withRouter(Main);
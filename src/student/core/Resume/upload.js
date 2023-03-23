import React, {useState,useEffect} from 'react';
import { API } from '../../../backend';
import { isAuthenticatedS, updateStudent } from '../../helper';
import { Link } from 'react-router-dom';

const Upload = ({history}) => {

    const [values, setValues] = useState({ pdf : [] });

    const [val,setVal] = useState({loading: false});
    const {loading} = val

    const onChangePicture = (name) =>
    (event) => {
        console.log(event.target.files[0])
        setValues({ ...values ,[name] : event.target.files[0]});
    };
    
    const studentId = isAuthenticatedS().user.id;

    const onSubmit = (event) => {
        event.preventDefault();
        setVal({ ...val, loading:true });
        updateStudent(studentId,values)
        .then((data)=>{
            console.log("DATA",data);
            setValues({ ...values, pdf : [] });
            setVal({ ...val, loading:false });
            history.push('/profiles')
        }).catch(e=>console.log(e))
    }

    const LoadingMess = () => {
        return(
            loading && (<div className="text-center">
                <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
                <p>Loading...</p>
            </div>)
        );
    }

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
                                <li class="breadcrumb-item"><Link to="/resume/preview">Preview Resume</Link></li>
                                <li class="breadcrumb-item active"><Link to="/resume/upload">Upload Resume</Link></li>
                            </ol>
                        </nav>
                        <section class='tabs-content' style={{width: "100%"}}>
                            <article id='tabs-6'>
                                <h3>Upload Resume</h3><br /><br /><br />
                                    <h5>Upload your resume</h5>
                                    <div class="card text-center" style={{width: "100%",borderColor:"yellowgreen",border:"solid"}}>
                                        {LoadingMess()}
                                        <div class="card-header text-success">
                                            <input type="file" name="pdf" 
                                                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                                                        text/plain, application/pdf, image/*" onChange={onChangePicture("pdf")} />
                                        </div>
                                        <div class="card-body">
                                            <button className="btn btn-info" onClick={onSubmit}><i className="fa fa-upload"></i> Upload</button>
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

export default Upload;
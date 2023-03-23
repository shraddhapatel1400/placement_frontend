import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../backend';
import { isAuthenticatedC } from '../helper';
import Inbox from './Inbox';

const Inboxcmp = () => {
    const [receive, setRe] = useState([]);
    const [job, setJob] = useState([]);
    const [student, setSt] = useState([]);

    const cid = isAuthenticatedC().user.id
    const j = job.filter(j=>j.company == cid).map(j=>j.id)
    const app = receive.map(j=>j.job)
    const a = j.filter(a => app.includes(a))

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}student/personal/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setSt(data1);
            setRe(data2);
            setJob(data3);
        };
        fetchData();
    }, []);

  return (
    <Inbox>
        <div class="padding"></div>
        <div class="table-responsive"><h4 className="text-info">Inbox</h4>
            <table class="table">
                <tbody>
                    {a.length > 0 ? 
                        a.map((r)=>(
                            receive.filter(ar=>ar.job==r).sort((a,b)=>new Date(a.applydate)-new Date(b.applydate)).reverse().map((s,i)=>(
                                <tr key={i}>
                                    <td class="action">
                                        {s.status == "true" ? 
                                            <i class="fa fa-check-circle" style={{color:"green"}}> Accepted</i> :
                                                (s.status == "false" ? 
                                                <i class="fa fa-window-close" style={{color:"red"}}> Rejected</i> : 
                                                    <i class="fa fa-clock-o" style={{color:"skyblue"}}> Pending</i>)}
                                    </td>
                                    <td class="name">
                                        {student.filter(st=>st.id==s.student).map(st=>st.firstname+' '+st.lastname)}
                                    </td>
                                    <td class="subject"><Link to={`/inboxdet/${s.id}`}>
                                        <strong>{job.filter(ar=>ar.id==s.job).map(a=>a.requirement)}</strong> - {s.body}
                                    </Link></td>
                                    <td class="time">
                                        {new Date(s.applydate).toDateString()+' '+new Date(s.applydate).toLocaleTimeString()}&nbsp;
                                        {new Date(s.applydate).toLocaleString() < new Date(job.filter(ar=>ar.id==s.job).map(a=>a.deadline)).toLocaleString() ?
                                            "" : <strong className="text-danger">Overdue by&nbsp;
                                            {Math.round((new Date(s.applydate).getTime() - new Date(job.filter(ar=>ar.id==s.job).map(a=>a.deadline)).getTime()) / (1000 * 3600 * 24))} days</strong>
                                        }
                                    </td>
                                </tr> 
                            ))
                    ))
                     : <tr><td className="text-center">You have no any request as of now!</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </Inbox>
  );
}
export default Inboxcmp;
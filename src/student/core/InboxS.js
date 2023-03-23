import React,{useState,useEffect} from 'react';
/* import { Link } from 'react-router-dom'; */
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';
import Inbox from './Inbox';

const InboxS = () => {

    const [receive, setRe] = useState([]);
    const [job, setJob] = useState([]);
    const [cmp, setCompany] = useState([]);

    const sid = isAuthenticatedS().user.id;

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await fetch(`${API}companyhr/applyJob/`,{method: "GET"});
            const response2 = await fetch(`${API}companyhr/companyJob/`,{method: "GET"});
            const response3 = await fetch(`${API}companyhr/company/`,{method: "GET"});
            const data1 = await response1.json();
            const data2 = await response2.json();
            const data3 = await response3.json();
            setRe(data1);
            setJob(data2);
            setCompany(data3);
        };
        fetchData();
    }, []);

  return (
    <Inbox>
        <div>                                
            <div class="padding"></div>
            <div class="table-responsive"><h4 className="text-info">Inbox</h4>
                <table class="table">
                    <tbody>
                        {receive.filter(j=>j.student == sid && j.status!=null).length > 0 ? 
                            receive.filter(j=>j.student==sid && j.status=="true").map((r,i)=>(
                                <tr key={i} style={{color:"green"}}>
                                    <td></td>
                                    <td>Congratulations!! You are selected for {job.filter(j=>j.id==r.job).map(j=>j.requirement)} at&nbsp;
                                        {cmp.filter(c=>c.id == (job.filter(j=>j.id==r.job).map(j=>j.company))).map(c=>c.companyname)}</td>
                                    <td>
                                        {new Date(r.updated_at).toDateString()+' '+new Date(r.updated_at).toLocaleTimeString()}
                                    </td>
                                </tr>   
                            ))
                            : <tr><td className="text-center">You have no any response as of now!</td></tr>
                        }
                            {receive.filter(j=>j.student==sid && j.status=="false").map((r,i)=>(
                                <tr key={i} style={{color:"red"}}>
                                    <td></td>
                                    <td>Sorry!! You are rejected for {job.filter(j=>j.id==r.job).map(j=>j.requirement)} at&nbsp;
                                        {cmp.filter(c=>c.id == (job.filter(j=>j.id==r.job).map(j=>j.company))).map(c=>c.companyname)}</td>
                                    <td>{new Date(r.updated_at).toDateString()+' '+new Date(r.updated_at).toLocaleTimeString()}</td>
                                </tr>   
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </Inbox>
  );
}
export default InboxS;
import React,{useState,useEffect} from 'react';
import { API } from '../../backend';
import { isAuthenticatedS } from '../helper';
import Inbox from './Inbox';
import Swal from 'sweetalert2';
import { Badge } from 'reactstrap';

const SentS = () => {
    const [receive, setRe] = useState([]);
    const [job, setJob] = useState([]);
    const [cmp, setCompany] = useState([]);

    const sid = isAuthenticatedS().user.id;

    const opensweetalert = (cid) => {
        cmp.filter(c=>c.id==cid).map((c)=>(
            Swal.fire({
                title: "<h3 style='font-family:Jazz LET, fantasy;'>"+c.companyname+"</h3>",
                html: "<span><b>"+c.fullname+"</b> is the HR of <b>"+c.companyname+"</b><br />"+
                       "Feel Free to Contact with her/him at <br />Email : <b>"+c.email+"</b> or <br />Contact No : <b>"+c.phone+"</b></span><hr />"+
                       "<img src='"+c.logo+"' height='200px' />"
                      
            })
        ))        
    }

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
        <div class="padding"></div>
        <div class="table-responsive"><h4 className="text-primary">Sent Message</h4>
            <table class="table">
                <tbody>
                    {receive.filter(j=>j.student===sid).length > 0 ? 
                        receive.filter(j=>j.student===sid).map((r,i)=>(
                            <tr key={i} style={{color:"gray"}}>
                                <td>{i+1}</td>
                                {console.log(r.job)}
                                <td>You are applying for {job.filter(j=>j.id==r.job).map(j=>j.requirement)} at&nbsp;
                                    {cmp.filter(c=>c.id == (job.filter(j=>j.id==r.job).map(j=>j.company))).map(c=>c.companyname)}&nbsp;
                                    <span style={{color:"black"}} onClick={()=>opensweetalert(job.filter(j=>j.id==r.job).map(j=>j.company))}>
                                        <i className="fa fa-info-circle"></i>
                                    </span></td>
                                <td>
                                    {new Date(r.applydate).toDateString()+' '+new Date(r.applydate).toLocaleTimeString()}&nbsp;
                                    {new Date(r.applydate).toLocaleString() > (job.filter(j=>j.id==r.job).map(j=>j.deadline)).toLocaleString() ?
                                        "" : <Badge color="danger">Overdue</Badge>
                                    }
                                </td>
                            </tr>   
                        ))
                        : <tr><td className="text-center">You have no any request as of now!</td></tr>
                    }
                </tbody>
            </table>
        </div>
    </Inbox>
  );
}

export default SentS;

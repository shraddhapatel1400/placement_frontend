import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function Estimate() {
  return (
    <div style={{minHeight:"700px"}}>
        <br /><br /><br /><br /><br />
        <div className="row">
            <div className="col-lg-6" style={{height:"400px"}}>
                <PieChart
                    data={[
                        { title: 'One', value: 10, color: '#E38627' },
                        { title: 'Two', value: 15, color: '#C13C37' },
                        { title: 'Three', value: 20, color: '#6A2135' },
                    ]}
                    label={(props) => { return props.dataEntry.title;}}
                />
            </div>
        </div>
       
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { API } from '../backend';

const TechnologyList = () => {

  const [technology, setTechnology] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response1 = await fetch(`${API}feedback/technology/`,{method: "GET"});
        const data1 = await response1.json();
        setTechnology(data1);
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
                          <br />
                          <h2>Tends <em>&</em> Technology</h2>
                          <p>"Once a new technology rolls over you, if you're not part of the steamroller, you're part of the road."</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      
      <section class="section" id="trainers">
        <div class="container"><br />
          <div class="row justify-content-center">
            {technology.map((t,i)=>(
              <div class="col-lg-3" key={i}>
                  <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                      <div class="flip-card1">
                        <div class="flip-card-inner">
                          <div class="flip-card-front">
                            <img src={t.image ? t.image : "/assets/images/null.jpg"} alt="Technology" style={{height:"250px", width:"100%"}} />
                          </div>
                          <div class="flip-card-back"><br />
                            <h3>{t.name}</h3> 
                            <p>{t.description}</p> 
                          </div>
                        </div>
                      </div>
                    </div>            
                  </div>
              </div>
            ))}
            </div>
        </div>
      </section>
    </div>
  );
}

export default TechnologyList;
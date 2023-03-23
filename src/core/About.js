import React from 'react';

const About = () => {
  return (
    <div>
        <section class="section section-bg" id="call-to-action" style={{backgroundImage: "url(assets/images/banner-image-1-1920x500.jpg)"}}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <div class="cta-content">
                            <br />
                            <br />
                            <h2>Learn more <em>About Us</em></h2>
                            <p> “Great vision without great people is irrelevant.”</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="our-classes">
            <div class="container">
                <br />
                <br />
                <br />
                <div class="row" id="tabs">
                    <div class="col-lg-4">
                        <ul>
                            <li><a href='#tabs-1'><i class="fa fa-soccer-ball-o"></i> Our Goals</a></li>
                        </ul>
                    </div>
                    <div class="col-lg-8">
                        <section class='tabs-content'>
                            <article id='tabs-1'>
                                <img src="assets/images/about-image-1-940x460.jpg" alt="" />
                                <h4 className="pt-5">Our Goals</h4>
                                <p className="text-justify" style={{fontSize:"17px"}}>An online recruitment system is a service that automates a company’s recruiting needs by getting volumes of employment applications over the internet.</p>

                                <p className="text-justify" style={{fontSize:"17px"}}>The beauty of online recruitment solutions lies in its accessibility and ease of use. Anywhere on the globe, designated individuals are able to receive 
                                    process and keep a record of CV’s within a web-based information power house.</p>

                                <p className="text-justify" style={{fontSize:"17px"}}>The implementation of an online recruitment solution allows a company to easily streamline the different processes involved. The recruiters have 
                                    different tools to assess candidates who have submitted CV’s and filled out various application forms. On top of this, candidates benefit by receiving
                                    a list of favourable keywords to pinpoint applications or CV’s that can be mostly used for matching relevant job categories. While using such an advanced solution, 
                                    you need to consider your entire organizations’ requirements that may include candidate testing, online application submission and assessment to get the most 
                                    applicable solution to organize a thorough recruiting process.</p>
                            </article>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}

export default About;
import React from 'react';

const Syllabus = () => {
  return (
    <div>
        <section class="section section-bg" id="call-to-action" style={{backgroundImage: "url(assets/images/banner-image-1-1920x500.jpg)"}}>
            <div class="container">
                <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                        <div class="cta-content">
                            <br />
                            <br />
                            <h2>Our <em>Syllabus</em></h2>
                            <p>Syllabus of the Batch 2017.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="section" id="our-classes">
            <div class="container"><br /><br /><br />
                <img src="/assets/images/syllabus.png" alt="" width="100%" />
            </div>
        </section>
    </div>
  );
}

export default Syllabus;
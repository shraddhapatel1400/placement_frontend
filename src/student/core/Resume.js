import React from 'react';
import Education from './Resume/education';
import Person from './Resume/personal';
import Preview from './Resume/preview';
import Project from './Resume/project';
import Skill from './Resume/skill';
import Summary from './Resume/summary';

const Resume = () => {
    return(
        <div>
            <section class="section" id="our-classes">
                <div class="content"><br />
                    <div class="row" id="tabs">
                        <div class="col-lg-1"></div>
                        <div class="col-lg-3">
                            <ul>
                                <li><a href='#tabs-1'><i class="fa fa-user"></i> Personal Information</a></li>
                                <li><a href='#tabs-2'><i class="fa fa-info-circle"></i> Summary</a></li>
                                <li><a href='#tabs-3'><i class="fa fa-graduation-cap"></i> Educational Qualification</a></li>
                                <li><a href='#tabs-4'><i class="fa fa-cogs"></i> Technical Skills</a></li>
                                <li><a href='#tabs-5'><i class="fa fa-tasks"></i> Academic Projects</a></li>
                                <li><a href='#tabs-6'><i class="fa fa-print"></i> Preview Resume</a></li>
                            </ul>
                        </div>
                        <div class="col-lg-7">
                            <section class='tabs-content' style={{width: "100%"}}>
                                <article id='tabs-1'>
                                    <Person />
                                </article><br />
                                <article id='tabs-2'>
                                    <Summary />
                                </article><br/>
                                <article id='tabs-3'>
                                    <Education />
                                </article><br />
                                <article id='tabs-4'>
                                    <Skill />
                                </article><br />
                                <article id='tabs-5'>
                                    <Project />
                                </article><br />
                                <article id='tabs-6'>
                                    <Preview />
                                </article>
                            </section>
                        </div><div className="col-lg-1"></div>
                    </div>
                </div>
        </section>
    </div>
    );
}

export default Resume;
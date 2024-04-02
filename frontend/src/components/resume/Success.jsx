import React from 'react';
import './Success.css'; // Import CSS file for additional styling
import {useTheme} from '../../Context/ThemeContext'

const Success = ({
  name,
  email,
  phone,
  linkedin,
  github,
  skills,
  exp1_org,
  exp1_pos,
  exp1_dur,
  exp1_desc,
  exp2_org,
  exp2_pos,
  exp2_dur,
  exp2_desc,
  proj1_title,
  proj1_link,
  proj1_desc,
  proj2_title,
  proj2_link,
  proj2_desc,
  edu1_school,
  edu1_qualification,
  edu1_year,
  edu1_desc,
  edu2_school,
  edu2_qualification,
  edu2_year,
  edu2_desc,
  extra_1,
  extra_2,
}) => {
  const {theme} = useTheme();
  return (
    <div className={`success-card animated bounceIn ${theme=== 'dark' ? '#333': '#fff'}`}>
      <div className="card-body text-center pt-5 pb-5">
        <h2>Hang Tight while your Resume Downloads!</h2>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-6">
              <h1 className="name">
                <b>{name}</b>
              </h1>
              <p className="lead email">
                <strong>Email:</strong> {email}
              </p>
              <p className="lead">
                <strong>Contact:</strong> (+92)
                {phone}
              </p>
              <p className="lead">
                <strong>LinkedIn:</strong> {linkedin}
              </p>
              <p className="lead">
                <strong>Github:</strong> {github}
              </p>
            </div>
          </div>

          <hr />
          <div className="skills-section">
            <h3>
              <b>Skills</b>
            </h3>
            <p className="lead">{skills}</p>
          </div>

          <div className="experience-section">
            <h3>
              <b>Experience</b>
            </h3>
            <div className="experience-details">
              <p className="lead">
                <b>
                  {exp1_org}, {exp1_pos}
                </b>{' '}
                ({exp1_dur})
              </p>
              <p className="exp-description">{exp1_desc}</p>
            </div>
            <div className="experience-details">
              <p className="lead">
                <b>
                  {exp2_org}, {exp2_pos}
                </b>{' '}
                ({exp2_dur})
              </p>
              <p className="exp-description">{exp2_desc}</p>
            </div>
          </div>

          <div className="projects-section">
            <h3>
              <b>Projects</b>
            </h3>
            <div className="project-details">
              <p className="lead">
                <b>{proj1_title}</b>({proj1_link})
              </p>
              <p className="proj-description">{proj1_desc}</p>
            </div>
            <div className="project-details">
              <p className="lead">
                <b>{proj2_title}</b> ({proj2_link})
              </p>
              <p className="proj-description">{proj2_desc}</p>
            </div>
          </div>

          <div className="education-section">
            <h3>
              <b>Education</b>
            </h3>
            <div className="education-details">
              <p className="lead">
                <b>{edu1_school}</b> ({edu1_qualification}, {edu1_year})
              </p>
              <p className="edu-description">{edu1_desc}</p>
            </div>
            <div className="education-details">
              <p className="lead">
                <b>{edu2_school}</b> ({edu2_qualification}, {edu2_year})
              </p>
              <p className="edu-description">{edu2_desc}</p>
            </div>
          </div>

          <div className="extra-section">
            <h3>
              <b>Extra-Curriculars/Activities</b>
            </h3>
            <ul>
              <li>
                <p className="lead">
                  <b>Languages: </b>
                  {extra_1}{' '}
                </p>
              </li>
              <li>
                <p className="lead">
                  <b>Hobbies: </b>
                  {extra_2}{' '}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;

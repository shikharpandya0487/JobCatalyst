import React, { useEffect, useState } from 'react';
import './Success.css'; // Import CSS file for additional styling
import axios from 'axios';
import {useTheme} from '../../Context/ThemeContext'

const Success = () => {

  const {theme} = useTheme();
  const [data,setData]=useState([]);


  useEffect(() => {
    const fetchData = async () => {
      let userId = localStorage.getItem("userId");
        const url = `http://localhost:5000/api/resume/get-resume/${userId}`
        try {
            const response = await axios.get(url);
            if (response.data) {
                setData(response.data.data);
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        }
    };
    fetchData();
  }, []);



return (
  <div className={`success-card animated bounceIn ${theme === 'dark' ? '#333' : '#fff'}`}>
    <div className="card-body text-center pt-5 pb-5">
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-6">
            <h1 className="name">
              <b>{data.name}</b>
            </h1>
            <p className="lead email">
              <strong>Email:</strong> {data.email}
            </p>
            <p className="lead">
              <strong>Contact:</strong> (+91) {data.phone}
            </p>
            <p className="lead">
              <strong>LinkedIn:</strong> {data.linkedin}
            </p>
            <p className="lead">
              <strong>Github:</strong> {data.github}
            </p>
          </div>
        </div>

        <hr />
        <div className="skills-section">
          <h3>
            <b>Skills</b>
          </h3>
          <p className="lead">{data.skills}</p>
        </div>

        <div className="experience-section">
          <h3>
            <b>Experience</b>
          </h3>
          <div className="experience-details">
            <p className="lead">
              <b>{data.exp1_org}, {data.exp1_pos}</b> ({data.exp1_dur})
            </p>
            <p className="exp-description">{data.exp1_desc}</p>
          </div>
          <div className="experience-details">
            <p className="lead">
              <b>{data.exp2_org}, {data.exp2_pos}</b> ({data.exp2_dur})
            </p>
            <p className="exp-description">{data.exp2_desc}</p>
          </div>
        </div>

        <div className="projects-section">
          <h3>
            <b>Projects</b>
          </h3>
          <div className="project-details">
            <p className="lead">
              <b>{data.proj1_title}</b> ({data.proj1_link})
            </p>
            <p className="proj-description">{data.proj1_desc}</p>
          </div>
          <div className="project-details">
            <p className="lead">
              <b>{data.proj2_title}</b> ({data.proj2_link})
            </p>
            <p className="proj-description">{data.proj2_desc}</p>
          </div>
        </div>

        <div className="education-section">
          <h3>
            <b>Education</b>
          </h3>
          <div className="education-details">
            <p className="lead">
              <b>{data.edu1_school}</b> ({data.edu1_qualification}, {data.edu1_year})
            </p>
            <p className="edu-description">{data.edu1_desc}</p>
          </div>
          <div className="education-details">
            <p className="lead">
              <b>{data.edu2_school}</b> ({data.edu2_qualification}, {data.edu2_year})
            </p>
            <p className="edu-description">{data.edu2_desc}</p>
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
                {data.extra_1}
              </p>
            </li>
            <li>
              <p className="lead">
                <b>Hobbies: </b>
                {data.extra_2}
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
import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

const Project = ({ formData, setFormData }) => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <form>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="project1"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Name of Project:
          </label>
          <input
            type="text"
            id="project1"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your project title here"
            value={formData.proj1_title}
            onChange={(e) => {
              setFormData({ ...formData, proj1_title: e.target.value });
            }}
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="project1Link"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Link to project:
          </label>
          <input
            type="text"
            id="project1Link"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Give the project link here"
            value={formData.proj1_link}
            onChange={(e) => {
              setFormData({ ...formData, proj1_link: e.target.value });
            }}
          />
        </div>
        <div className="col-12 w-full p-1 flex items-center">
          <label
            htmlFor="project1Desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Description:
          </label>
          <textarea
            id="project1Desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter a short description of your project here"
            value={formData.proj1_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="project2"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Second Project Name:
          </label>
          <input
            type="text"
            id="project2"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your project title here"
            value={formData.proj2_title}
            onChange={(e) => {
              setFormData({ ...formData, proj2_title: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="project2Link"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Link to project:
          </label>
          <input
            type="text"
            id="project2Link"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Give the project link here"
            value={formData.proj2_link}
            onChange={(e) => {
              setFormData({ ...formData, proj2_link: e.target.value });
            }}
          />
        </div>

        <div className="col-12 w-full p-1 flex items-center">
          <label
            htmlFor="project2Desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Description:
          </label>
          <textarea
            id="project2Desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter a short description of your project here"
            value={formData.proj2_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Project;

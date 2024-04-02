import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

const Education = ({ formData, setFormData }) => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <form>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu1_school"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            First Institute Name:
          </label>
          <input
            type="text"
            id="edu1_school"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your first institute name"
            value={formData.edu1_school}
            onChange={(e) => {
              setFormData({ ...formData, edu1_school: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu1_year"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Year you graduated:
          </label>
          <input
            type="text"
            id="edu1_year"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your graduation year"
            value={formData.edu1_year}
            onChange={(e) => {
              setFormData({ ...formData, edu1_year: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu1_qualification"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Degree you pursued:
          </label>
          <input
            type="text"
            id="edu1_qualification"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your degree"
            value={formData.edu1_qualification}
            onChange={(e) => {
              setFormData({ ...formData, edu1_qualification: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu1_desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Enter a short description:
          </label>
          <textarea
            id="edu1_desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="XYZ"
            value={formData.edu1_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu2_school"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Second Institute name:
          </label>
          <input
            type="text"
            id="edu2_school"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your second institute name"
            value={formData.edu2_school}
            onChange={(e) => {
              setFormData({ ...formData, edu2_school: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu2_year"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Year you graduated:
          </label>
          <input
            type="text"
            id="edu2_year"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your year you graduated from your second institute name"
            value={formData.edu2_year}
            onChange={(e) => {
              setFormData({ ...formData, edu2_year: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu2_qualification"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Degree you pursued:
          </label>
          <input
            type="text"
            id="edu2_qualification"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your degree from second institution"
            value={formData.edu2_qualification}
            onChange={(e) => {
              setFormData({ ...formData, edu2_qualification: e.target.value });
            }}
          />
        </div>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="edu2_desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Enter a short description:
          </label>
          <textarea
            id="edu2_desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="XYZ"
            value={formData.edu2_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Education;

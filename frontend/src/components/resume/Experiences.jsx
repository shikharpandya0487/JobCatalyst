import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

const Experiences = ({ formData, setFormData }) => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <form>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp1_org"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Your first company name:
          </label>
          <input
            type="text"
            id="exp1_org"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your first company name you worked for"
            value={formData.exp1_org}
            onChange={(e) => {
              setFormData({ ...formData, exp1_org: e.target.value });
            }}
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp1_pos"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Your designation:
          </label>
          <input
            type="text"
            id="exp1_pos"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your designation on company"
            value={formData.exp1_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp1_pos: e.target.value });
            }}
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp1_dur"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Years you worked there for:
          </label>
          <input
            type="text"
            id="exp1_dur"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="How many years you worked there for"
            value={formData.exp1_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp1_dur: e.target.value });
            }}
          />
        </div>

        <div className="col-12 w-full p-1 flex items-center">
          <label
            htmlFor="exp1_desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Job description:
          </label>
          <textarea
            id="exp1_desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your Job description here"
            value={formData.exp1_desc}
            onChange={(e) => {
              setFormData({ ...formData, exp1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp2_org"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Second Company name:
          </label>
          <input
            type="text"
            id="exp2_org"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your Second Company name"
            value={formData.exp2_org}
            onChange={(e) => {
              setFormData({ ...formData, exp2_org: e.target.value });
            }}
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp2_pos"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Your designation:
          </label>
          <input
            type="text"
            id="exp2_pos"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your designation on the company"
            value={formData.exp2_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp2_pos: e.target.value });
            }}
          />
        </div>

        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="exp2_dur"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Years you worked there:
          </label>
          <input
            type="text"
            id="exp2_dur"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="How many years you worked there?"
            value={formData.exp2_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp2_dur: e.target.value });
            }}
          />
        </div>

        <div className="col-12 w-full p-1 flex items-center">
          <label
            htmlFor="exp2_desc"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Job description:
          </label>
          <textarea
            id="exp2_desc"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your job description here"
            value={formData.exp2_desc}
            onChange={(e) => {
              setFormData({ ...formData, exp2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Experiences;

import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

const Extras = ({ formData, setFormData }) => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#fff' : '#333' }}>
      <form>
        <h4 className="font-semibold">Languages you can speak</h4>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="languages"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Languages:
          </label>
          <input
            type="text"
            id="languages"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter the languages you can speak"
            value={formData.extra_1}
            onChange={(e) => {
              setFormData({ ...formData, extra_1: e.target.value });
            }}
          />
        </div>

        <hr />
        <h4>Things you like to do:</h4>
        <div className="w-full p-1 flex items-center">
          <label
            htmlFor="hobbies"
            className={`font-light text-center text-${theme === 'dark' ? 'white' : 'black'} text-xl font-serif w-1/4 px-2`}
          >
            Hobbies:
          </label>
          <input
            type="text"
            id="hobbies"
            className={`rounded-md input-field bg-${theme === 'dark' ? 'black' : 'white'} p-1 w-3/4 hover:cursor-pointer mr-2`}
            placeholder="Enter your hobbies"
            value={formData.extra_2}
            onChange={(e) => {
              setFormData({ ...formData, extra_2: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Extras;

import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import {useTheme} from '../../Context/ThemeContext';
const ApplyJob = () => {
    const {theme} = useTheme(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    address: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to an API
    console.log(formData);
  };

  return (
    <div className='w-screen h-screen'
    style={{
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
        <Navbar/>
        <h1 className="text-4xl font-semibold  mb-4 text-center">Apply for Job</h1>
    <div className="max-w-md mx-auto p-4 bg-white  rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" className=" text-black w-full bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:bg-gray-300" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" className=" text-black w-full bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:bg-gray-300" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="contactNo" className="block mb-1">Contact Number</label>
          <input type="tel" id="contactNo" name="contactNo" placeholder="Enter your contact number" className=" text-black w-full bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:bg-gray-300" value={formData.contactNo} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">Address</label>
          <input type="text" id="address" name="address" placeholder="Enter your address" className=" text-black w-full bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:bg-gray-300" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Short Description</label>
          <textarea id="description" name="description" placeholder="Enter a short description" className=" text-black w-full bg-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 transition duration-300 ease-in-out hover:bg-gray-300 h-24" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Apply</button>
      </form>
    </div>

    </div>
  );
};

export default ApplyJob;

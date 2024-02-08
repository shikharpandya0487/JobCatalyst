import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function SalaryPage() {
    const [companies] = useState([
        { name: 'Company A', logo: '/Comapny logo.jpg', salary: '$100,000', employees: 500 },
        { name: 'Company B', logo: '/Comapny logo.jpg', salary: '$90,000',  employees: 300 },
        { name: 'Company C', logo: '/Comapny logo.jpg', salary: '$110,000', employees: 700 },
        { name: 'Company D', logo: '/Comapny logo.jpg', salary: '$300000',  employees:400},
        { name: 'Company E', logo: '/Comapny logo.jpg', salary: '$893401',  employees: 500 },
        { name: 'Company F', logo: '/Comapny logo.jpg', salary: '$80000',   employees: 500 },
        { name: 'Company G', logo: '/Comapny logo.jpg', salary: '$230000',  employees: 500 },
        { name: 'Company H', logo: '/Comapny logo.jpg', salary: '$9000202', employees: 500 },
    ]);

    // Sort companies by salary (descending order)
    companies.sort((a, b) => parseFloat(b.salary.replace(/\$|,/g, '')) - parseFloat(a.salary.replace(/\$|,/g, '')));

    return (
        <div>
            <Navbar/>
            <div className="container mx-auto p-4">
           <h1 className="text-4xl text-center mb-6 mt-4">Salaries</h1>
         <div className="flex justify-center mb-6">
             <input type="text" className="search-input px-3 py-2 border border-gray-500 rounded-l-md focus:outline-none" placeholder="Your Job Title" />
              <button className="search-button px-1 py-2 bg-green-600 text-white rounded-r-md hover:bg-green-600 focus:outline-none">Search</button>
         </div>
    <div className="flex gap-20">
        <div className="companies w-full sm:w-2/3">
            {companies.map(company => (
                <div key={company.name} className="company bg-gray-200 rounded-2xl shadow-md md:h-30 lg:h-40 w-full sm:w-400px md:w-600px mb-6 flex relative">
                    <img src={company.logo} alt={`logo`} className="w-1/5 h-30 rounded-l-xl" />
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="text-center">
                            <div className="company-name text-2xl font-semibold mt-0">{company.name}</div>
                            <div className="company-salary text-green-500 text-2xl mt-2">{company.salary}</div>
                            <div className="text-gray-500 text-2xl mt-2">{company.employees} employees hired</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="sidebar flex flex-col w-full sm:w-1/3">
            <div className="highest-salary bg-gray-200 rounded-2xl shadow-md p-4 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Highest Salaries</h2>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-900">
                    <li >Director Salaries</li>
                    <li>Managing Director Salaries</li>
                    <li>Sales Director Salaries</li>
                    <li>Data Scientist</li>
                    <li>Sales Director Salaries</li>
                    <li>Trader Salaries</li>
                    <li>Management Consultant</li>
                    <li>Machine Learning Experts</li>
                    <li>Artificial Intelligence Engineer</li>
                    <li>IT Manager</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4 mt-4">Popular Salaries</h2>
                <ul className="list-disc pl-6 mb-4 text-lg text-gray-900">
                    <li >Machine learning Salaries</li>
                    <li>Business Analyst Salaries</li>
                    <li>Assistant Professor Salaries</li>
                    <li>Data Scientist</li>
                    <li>devops Engineer Salaries</li>
                    <li>Data Analyst Salaries</li>
                    <li>Junior Engineer Salaries</li>
                    <li>Digital Marketing Salaries</li>
                    <li>Artificial Intelligence Engineer</li>
                </ul>
                <h2 className="text-2xl font-semibold mb-4 mt-4">Salary Advice</h2>
                <ul className="list-disc pl-6 mb-4 text-lg  text-gray-900">
                    <li >Compare Your salary</li>
                    <li>Top Paying Jobs</li>
                    <li>Asking for a Raise</li>
                    <li>Salary Negotiations</li>
                    <li>Top Paying Companies</li>
                </ul>
               
                </div>
            </div>
        </div>
    </div>
  </div>
);
}

export default SalaryPage;

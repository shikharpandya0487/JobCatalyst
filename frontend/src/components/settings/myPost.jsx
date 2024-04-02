import React from 'react';
import { useTheme } from '../../Context/ThemeContext';

const MyPost = () => {
  const { theme } = useTheme();
  
  const data2 = [
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description: "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "Rejection Experience : INTERVIEW",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: "Salary Offer: 2L/MONTH",
      description: "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
    {
      title: "SDE INTERVIEW Experience : Apple",
      company: "Apple",
      position: " Position: SDE1",
      location: " Location: Pune",
      jobType: " job Type: Full Time",
      salary: " Salary Offer: 2L/MONTH",
      description: "looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ",
      tags: ["Tag1", "Tag2"],
      image: "",
      posted: " Posted: 1 Hour ago",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-row-3 gap-4">
      {data2.map((item, index) => (
        <div key={index} className=" shadow-md rounded-md p-2"
          style={{
            backgroundColor: theme === "dark" ? "#333" : "#fff",
            color: theme === "dark" ? "#fff" : "#333",
          }}
        >
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p>{item.company}</p>
          <p>{item.position}</p>
          <p>{item.location}</p>
          <p>{item.jobType}</p>
          <p>{item.salary}</p>
          <p>{item.description}</p>
          <div className="flex flex-wrap">
            {item.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-2">{tag}</span>
            ))}
          </div>
          <p>{item.posted}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPost;


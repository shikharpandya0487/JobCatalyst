import React,{useState} from 'react'


const JobPosting = ({
    title,
    company,
    position,
    location,
    jobType,
    salary,
    description,
    tags,
    image,
    posted,
  }) => {
    const [expanded,setExpanded] = useState(false);
    const toggle = () => {
      setExpanded(!expanded);
    };
    return (
      <div className="bg-pink-50  rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <img src={image} alt={company} className="w-12 h-12 mr-4" />
          <div>
          <p className="text-gray-700 text-sm select-none">{posted}</p>
            <h3 className="text-2xl font-normal pt-2">{title}</h3>
          </div>
          <div className="pl-10 pr-10">
                
                <p className="text-gray-900 font-medium">{salary}</p>
              </div>
        </div>
        <div className="mb-4">
    <h4 className="text-lg font-medium">Description:</h4>
    <p className="text-gray-700 ">
      {expanded ? description : description.slice(0, 250) + '...'}
      {expanded && description.length > 250 && (
        <span>
          {"  "}
          <a className="text-blue-500 cursor-pointer" onClick={toggle}>
             Read less
          </a>
        </span>
      )}
    </p>
    {!expanded && description.length > 250 && (
      <a className="text-blue-500 cursor-pointer" onClick={toggle}>
        Read more
      </a>
    )}
  </div>
  <div className="mb-4">
    <div className="flex flex-wrap ">
      {tags.map((tag, index) => (
        <span key={index} className="flex items-center">
          <button className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-xs text-center">
            {tag}
          </button>
          {index % 2 === 1 && <br /> }
        </span>
      ))}
    </div>
  </div>
        <div className="mb-4">
        <p className="text-gray-700 select-none">{position}</p>
        <p className="text-gray-700 ">{location}</p>
        <p className="text-gray-700 select-none">{jobType}</p>
        </div>
      </div>
    );
  };

export default JobPosting

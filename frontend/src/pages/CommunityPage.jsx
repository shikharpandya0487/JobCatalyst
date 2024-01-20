import React,{useState} from 'react';
import Navbar from '../components/Navbar';

const CommunityPage = () => {
  const data = [
    {
      title: 'SDE INTERVIEW Experience : Apple',
      company: 'Apple',
      position: ' Position: SDE1',
      location: ' Location: Pune',
      jobType: ' job Type: Full Time',
      salary: ' Salary Offer: 2L/MONTH',
      description: 'looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ',
      tags: ['Tag1','Tag2'],
      image: '',
      posted: ' Posted: 1 Hour ago',
    },
    {
      title: 'Rejection Experience : INTERVIEW',
      company: 'Apple',
      position: ' Position: SDE1',
      location: ' Location: Pune',
      jobType: ' job Type: Full Time',
      salary: 'Salary Offer: 2L/MONTH',
      description: 'looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ',
      tags: ['Tag1','Tag2'],
      image: '',
      posted: ' Posted: 1 Hour ago',
    },
    {
      title: 'SDE INTERVIEW Experience : Apple',
      company: 'Apple',
      position: ' Position: SDE1',
      location: ' Location: Pune',
      jobType: ' job Type: Full Time',
      salary: ' Salary Offer: 2L/MONTH',
      description: 'looking to work long-term with a determined video editor who has experience in talking head Youtube videos.Please attach your top 3 talking head edits to the cover letter ,and i will take a look .For the budget I pay anywhere from 5-12/minutes of footage ,depending on the depth of editing You must speak good English and complete video edits withim 48-72 hours ',
      tags: ['Tag1','Tag2'],
      image: '',
      posted: ' Posted: 1 Hour ago',
    },
  ];
  const stories = [
    {
      p1: '!! Person Bagged 1.5Cr job in Visa',
      p2: '!! Person Bagged 1.45Cr job in Business',
      p3: '!! Person Bagged 55.5LPA in Microsoft',
    },
  ];
  const spotlight = [
    {
      s1: '!! Google Claim to have best Job Experience',
      s2: '!! Microsoft hire 20 year old intern at 1.51p/m',
      s3: '!! Person Bagged 55.5LPA in Microsoft'
    },
   

    
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div>
        <hr className=" border-t-2 border-gray-400" />
      </div>
      <div className="w-full max-w-[1000px] h-[60px] left-[56%] -translate-x-1/2 top-[100px] absolute bg-white rounded-[15px] border border-black border-opacity-40">
 <img className="w-[20px] h-[20px] left-[20px] top-[50%] -translate-y-1/2 absolute" src="https://via.placeholder.com/33x35" />
 <div className="w-[600px] h-[30px] left-[10%] top-[50%] -translate-y-1/2 absolute bg-zinc-100 rounded-xl" />
 <div className="left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2 absolute opacity-50 text-black text-[18px] font-normal font-['Inter']">Search Interview Experience</div>
</div>
      <div className="flex pt-6 pl-6 rounded-5xl ">
        <aside className="bg-gray-200 pt-4 rounded-3xl px-4 w-1/4 pr-4 overflow-y-auto ">
          <section className="mb-8">
            <div className="rounded-2xl bg-pink-50 ">
            <h2 className="text-lg text-center font-normal mb-3">Success Stories</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {stories.map((item, index) => (
                <Stories
                  key={index}
                  p1={item.p1}
                  p2={item.p2}
                  p3={item.p3}
                />
              ))}
            </div>
          </section>

          <section className="mb-8">
          <div className="rounded-2xl bg-pink-50 ">
            <h2 className="text-lg text-center font-normal mb-3">Employers Spotlight</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 ">
              {spotlight.map((item, index) => (
                <EmployerSpotlight
                  key={index}
                  s1={item.s1}
                  s2={item.s2}
                  s3={item.s3}
                />
              ))}
            </div>
          </section>
        </aside>


      <main className="container  px-4 py-5 pt-20" >
        <div className="grid-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">  
          {data.map((item, index) => (
            <JobPosting
              key={index}
              title={item.title}
              company={item.company}
              position={item.position}
              location={item.location}
              jobType={item.jobType}
              salary={item.salary}
              description={item.description}
              tags={item.tags}
              image={item.image}
              posted={item.posted}
            />
          ))}
          </div>
      </main>
    </div>
   </div>
  );
};

const Stories = ({
  p1,
  p2,
  p3,
}) => {
  return (
    <div className="bg-pink-50 shadow-md rounded-2xl p-4 mb-4">
      <div className="flex items-center mb-4"></div>
      <div>
        <p className="text-gray-800">{p1}</p>
        <p className="text-gray-800">{p2}</p>
        <p className="text-gray-800">{p3}</p>
      </div>
    </div>
  );
};

const EmployerSpotlight = ({
  s1,
  s2,
  s3,
}) => {
  return (
    <div className="bg-pink-50 shadow-md rounded-2xl p-4 mb-4">
      <div className="flex items-center mb-4"></div>
      <div>
        <p className="text-gray-800">{s1}</p>
        <p className="text-gray-800">{s2}</p>
        <p className="text-gray-800">{s3}</p>
      </div>
    </div>
  );
};

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
      <div className="flex items-center mb-4">
        <img src={image} alt={company} className="w-12 h-12 mr-4" />
        <div>
        <p className="text-gray-700 text-sm">{posted}</p>
          <h3 className="text-2xl font-normal pt-2">{title}</h3>
        </div>
        <div className="pl-10 pr-10">
              
              <p className="text-gray-900 font-medium">{salary}</p>
            </div>
      </div>
      <div className="mb-4">
  <h4 className="text-lg font-medium">Description:</h4>
  <p className="text-gray-700">
    {expanded ? description : description.slice(0, 250) + '...'}
    {expanded && description.length > 250 && (
      <span>
        {' '}
        Remaining content is here when expanded. 
        <a className="text-blue-500" onClick={toggle}>
           Read less
        </a>
      </span>
    )}
  </p>
  {!expanded && description.length > 250 && (
    <a className="text-blue-500" onClick={toggle}>
      Read more
    </a>
  )}
</div>
<div className="mb-4">
  <div className="flex flex-wrap ">
    {tags.map((tag, index) => (
      <span key={index} className="flex items-center">
        <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-xs text-center">
          {tag}
        </span>
        {index % 2 === 1 && <br /> }
      </span>
    ))}
  </div>
</div>
      <div className="mb-4">
      <p className="text-gray-700">{position}</p>
      <p className="text-gray-700">{location}</p>
      <p className="text-gray-700">{jobType}</p>
      </div>
    </div>
  );
};

export default CommunityPage;
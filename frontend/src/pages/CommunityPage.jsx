import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import moment from 'moment';
import Stories from '../components/Stories';
import JobPosting from '../components/JobPosting';
import EmployerSpotlight from '../components/EmployerSpotlight';

const CommunityPage = () => {

  const [data, setData] = useState([]);
  const [search,setSearch] = useState('');


  //DISPLAYING DATA ON COMMUNITY PAGE 
  useEffect(() => {
      const fetchData = async () => {
          const url = 'http://localhost:5000/api/post/get-posts';
          try {
              const response = await axios.get(url);
              if (response.data.post) {
                  console.log(response.data.post);
                  setData(response.data.post);
              }
          } catch (error) {
              console.error(error);
              alert("Server error");
          }
      };
      fetchData();
  }, []);
  
  
  
  
//search product on the basis of title 
const handleSearch = async () => {
    const url = `http://localhost:5000/api/post/search?search=${search}`;
    try {
        const response = await axios.get(url);
        console.log(response.data.post);
        
        if (response.data.post.length !== 0) {
            setData(response.data.post);
        } else {
            alert("No result found");
        }
        setSearch('');
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
};



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
       {/* search bar */}
      <div>
        <button onClick={handleSearch}> search</button>
        <input placeholder='search' className="w-full max-w-[1000px] h-[60px] left-[56%] -translate-x-1/2 top-[100px] absolute bg-white rounded-[15px] border border-black border-opacity-40" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      
        {/* <img className="w-[20px] h-[20px] left-[20px] top-[50%] -translate-y-1/2 absolute" src="https://via.placeholder.com/33x35" /> */}
        {/* <div className="w-[600px] h-[30px] left-[10%] top-[50%] -translate-y-1/2 absolute bg-zinc-100 rounded-xl" /> */}
        {/* <div className="left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2 absolute opacity-50 text-black text-[18px] font-normal font-['Inter']">Search Interview Experience</div> */}
      
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
                jobType={item.jobtype}
                salary={item.salary}
                description={item.description}
                tags={item.tag}
                // image={item.image}
                posted={moment(item.createdAt).fromNow()}
                postedBy={item.postedBy.username}
                id={item._id}
                post={item}
              />
            ))}

          </div>
        </main>
      </div>
    </div>
  );
};

export default CommunityPage;
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import moment from 'moment';
import Stories from '../../components/community/Stories';
import JobPosting from '../../components/community/JobPosting';
import EmployerSpotlight from '../../components/community/EmployerSpotlight';
 

const CommunityPage = () => {

  const [data, setData] = useState([]);
  const [search,setSearch] = useState('');
  const [stories,setStories] = useState([]);
  const [refresh,setRefresh] = useState(false);
   

  //DISPLAYING DATA ON COMMUNITY PAGE 
  useEffect(() => {
      const fetchData = async () => {
          const url = 'http://localhost:5000/api/post/get-posts'
          try {
              const response = await axios.get(url);
              if (response.data.post) {
                  console.log(response.data);
                  setData(response.data.post);
                  setStories(response.data.post);
              }
          } catch (error) {
              console.error(error);
              alert("Server error");
          }
      };
      fetchData();
  }, [refresh]);
  
  
  

  const handleReaction = () => {
    setRefresh(!refresh);
    console.log("Reaction button clicked");
  };


  
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

  const spotlight = [
    {
      s1: '!! Google Claim to have best Job Experience',
      s2: '!! Microsoft hire 20 year old intern at 1.51p/m',
      s3: '!! Person Bagged 55.5LPA in Microsoft'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-l from-blue-50 via-white to-blue-50 ">
      <Navbar />
       {/* search bar */}
      <div className='flex gap-0 w-full justify-center items-center pt-2 p-2'>
        <input placeholder='search' className=" bg-slate-100 border-1 border-black p-2 rounded-l-xl opacity-85" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <button  className=" flex items-center justify-center bg-blue-400 p-2 rounded-r-xl border-1 border-r-black border-t-black border-b-black hover:bg-blue-100 transition-shadow" onClick={handleSearch}> <img src="Search.png" className='w-1/2' alt="" /></button>
      </div>
      {/* <SearchBar/> */}
      

     
      
        {/* <img className="w-[20px] h-[20px] left-[20px] top-[50%] -translate-y-1/2 absolute" src="https://via.placeholder.com/33x35" /> */}
        {/* <div className="w-[600px] h-[30px] left-[10%] top-[50%] -translate-y-1/2 absolute bg-zinc-100 rounded-xl" /> */}
        {/* <div className="left-[50%] -translate-x-1/2 top-[50%] -translate-y-1/2 absolute opacity-50 text-black text-[18px] font-normal font-['Inter']">Search Interview Experience</div> */}
      
      <div className="flex pt-6 pl-6 rounded-5xl ">
        <div className="bg-gradient-to-r from-orangeCustom via-white to-orangeCustom pt-4 rounded-3xl px-4 w-1/4 pr-4 h-fit ">
          <section className="mb-8 flex flex-col justify-center items-center gap-2 p-1">
            <div className="rounded-2xl p-1 bg-gradient-to-r from-blue-50 via-slate-300 to-blue-50 ">
              <h2 className="text-3xl text-center font-semibold mb-3 text-slate-900">Success Stories</h2>
            </div>
            <div className="flex flex-col ">
            {stories.sort((a, b) => b.salary - a.salary).slice(0, 3).map((item, index) => (
                <Stories
                  key={index}
                  title={item.title}
                  company={item.company}
                  position={item.position}
                  location={item.location}
                  jobType={item.jobtype}
                  salary={item.salary}
                  description={item.description}
                  tags={item.tag}
                  image={item.imgPath}
                  posted={moment(item.createdAt).fromNow()}
                  postedBy={item.postedBy?.username}
                  id={item._id}
                  post={item}
                  onReaction={handleReaction} 
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
        </div>


        <div className="container p-1 " >
          <div className="flex flex-col items-center justify-evenly gap-2 p-1 rounded-xl">
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
                image={item.imgPath}
                posted={moment(item.createdAt).fromNow()}
                postedBy={item.postedBy?.username}
                id={item._id}
                post={item}
                onReaction={handleReaction} 
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import JobPosting from './JobPosting';


const DisplayData = () => {

  const { id } = useParams();
  const [data,setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const url = `http://localhost:5000/api/post/get-post/${id}`;
          const response = await axios.get(url);
          setData(response.data);
        } catch (error) {
          console.log("server err", error);
        }
      };
    fetchData();
  }, []);


  return (
    <div>
        <div>
            <JobPosting title={data.title}
                company={data.company}
                position={data.position}
                location={data.location}
                jobType={data.jobtype}
                salary={data.salary}
                description={data.description}
                tags={data.tag}
                image={data.imgPath}
                posted={moment(data.createdAt).fromNow()}
                postedBy={data.postedBy?.username}
                id={data._id}
                post={data} />
        </div>
        
    </div>
  )
}

export default DisplayData

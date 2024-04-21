import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import { useTheme } from '../../Context/ThemeContext';
import {
  Box,
  Button,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react';

const AddPost = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [jobtype, setJobtype] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [video, setVideo] = useState([]);

  const handleApi = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', video);
    formData.append('company', company);
    formData.append('title', title);
    formData.append('position', position);
    formData.append('location', location);
    formData.append('jobtype', jobtype);
    formData.append('salary', salary);
    formData.append('description', description);
    formData.append('tag', tag);

    const headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };

    const url = 'https://jobcatalyst.onrender.com/api/post/create-post';
    axios({
      method: 'post',
      url: url,
      data: formData,
      headers: headers,
    })
      .then((res) => {
        navigate('/community');
      })
      .catch((err) => {
        console.log('Error in the add post handler', err);
      });
  };

  console.log(theme,setJobtype(null))

  return (
    <Box
      className='max-w-screen mx-auto min-h-screen dark:bg-slate-500 bg-slate-300'
      style={{backgroundColor:(theme==='dark')?"gray":"lightgray",color:(theme==='dark')?"white":"black"}}
    >
    
      <Navbar />
      <Box className='flex justify-center w-[100%] gap-2 p-4 min-h-fit'
      style={{backgroundColor:(theme==='dark')?"gray":"cream",color:(theme==='dark')?"white":"black"}}>
        <Box className='w-1/2 p-2 bg-white rounded-md md:rounded-lg'>
          <Text className='pt-2 pb-10 text-3xl md:text-5xl text-black text-center'>
            Add Post
          </Text>
          <form onSubmit={handleApi} className='flex flex-col justify-center'>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Name:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Enter your Name'
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Title:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Enter the title for your Post'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Profession:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Enter the position'
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Location:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Enter your location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Salary:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Enter your salary'
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </Box>
            <Box className='w-full p-1 flex justify-evenly items-center'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Description:
              </Text>
              <Textarea
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                Tag:
              </Text>
              <Input
                type='text'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                placeholder='Use #'
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </Box>
            <Box className='w-full p-1'>
              <Text className='text-black text-xl text-center font-light font-serif w-1/4'>
                File:
              </Text>
              <Input
                type='file'
                className='input-field bg-gray-100 rounded-md p-1 w-3/4 hover:cursor-pointer'
                onChange={(e) => setVideo(e.target.files[0])}
              />
            </Box>
            <Button
              className='px-6 py-2 w-200px mt-4 text-lg text-white bg-blue-500 rounded-lg'
              onClick={handleApi}
            >
              Add
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default AddPost;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Spinner,
  Text,
  useToast,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import moment from 'moment';
import Stories from '../../components/community/Stories';
import JobPosting from '../../components/community/JobPosting';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const CommunityPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(2); 

  const toast=useToast()
  // Fetching data on community page load
  useEffect(() => {
    const fetchData = async (page = 1) => {
      setLoadingPosts(true);
      const url = `https://jobcatalyst.onrender.com/api/post/get-posts?page=${page}&limit=${pageSize}`;
      try {
        const response = await axios.get(url);
        if (response.data.post) {
          console.log(response.data);
          setData(response.data.post);
          setTotalPages(response.data.totalPages); 
          setStories(response.data.post);
          toast({
            title: "Community Posts Loaded",
            description: "Successfully loaded community posts",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.error(error);
        toast({
          title: "Error Occurred!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        alert('Server error');
      } finally {
        setLoadingPosts(false);
        setLoadingStories(false);
      }
    };
    fetchData(currentPage);
  }, [refresh,toast,currentPage,pageSize]);

  const handleReaction = () => {
    setRefresh(!refresh);
    console.log('Reaction button clicked');
  };

  // Search for posts based on title
  const handleSearch = async () => {
    setLoadingPosts(true);
    const url = `https://jobcatalyst.onrender.com/api/post/search?search=${search}`;
    try {
      const response = await axios.get(url);
      console.log(response.data.post);

      if (response.data.post.length !== 0) {
        setData(response.data.post);
      } else {
        alert('No result found');
      }
      setSearch('');
      setIsSearch(true);
    } catch (error) {
      console.error(error);
      alert('Server error');
    } finally {
      setLoadingPosts(false);
    }
  };

  const closeSearch = () => {
    setIsSearch(false);
    setRefresh(!refresh);
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <Box minH="100vh" bgGradient="linear(to-l, blue.50, white, blue.50)">
      <Navbar />
      <Flex justify="center" align="center" pt={4}>
        <Input
          placeholder="Search"
          bg="gray.100"
          border="1px"
          borderColor="black"
          p={2}
          borderRadius="xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          width="30%" // Adjust width of the input field as needed
        />
        <Button
          onClick={handleSearch}
          bg="blue.400"
          borderRadius="xl"
          ml={2}
          _hover={{ bg: 'blue.100' }}
        >
          Search
        </Button>
      </Flex>
      {isSearch && (
        <Box textAlign="center" mt={4}>
          <Text>Search results</Text>
          <Button onClick={closeSearch}>Close Search results</Button>
        </Box>
      )}
      <Flex pt={6} pl={6} rounded="5xl" flexDirection={{ base: 'column', md: 'row' }} className='gap-2 w-screen'>
        <Box
          bgGradient="linear(to-r, orange.300, white, orange.300)"
          pt={4}
          rounded="3xl"
          px={4}
          className='w-1/4'
          pr={4}
          h="fit-content"
          mb={{ base: 6, md: 0 }}
        >
          <Box mb={8} textAlign="center" className='w-full'>
            <Heading size="lg" mb={3} textColor="slate.900">
              Success Stories
            </Heading>
            {loadingStories ? (
              <Spinner size="xl" />
            ) : (
              stories
                .sort((a, b) => b.salary - a.salary)
                .slice(0, 3)
                .map((item, index) => (
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
                  />
                ))
            )}
          </Box>
        </Box>

        
          <Box className='w-3/4 flex gap-2 p-1 flex-col justify-start items-start'>
          <Flex justify="space-between" align="center" mt={4} w="100%">
            <HStack spacing={4} className='flex justify-evenly items-center gap-2'>
              <IconButton
                icon={<ChevronLeftIcon/>}
                onClick={() => handlePageChange('prev')}
                isDisabled={currentPage === 1}
                aria-label="Previous Page"
              />
              <Text>
                Page {currentPage} of {totalPages}
              </Text>
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={() => handlePageChange('next')}
                isDisabled={currentPage === totalPages}
                aria-label="Next Page"
              />
            </HStack>
           </Flex>
            {loadingPosts ? (
              <Spinner size="xl" />
            ) : (
              data.map((item, index) => 
                
                (                   
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
                  postedById={item.postedBy?._id}
                  id={item._id}
                  post={item}
                  onReaction={handleReaction}
                  className="w-full"
                />
              )
            )
            )}
           
          </Box>
       
      </Flex>
    </Box>
  );
};

export default CommunityPage;

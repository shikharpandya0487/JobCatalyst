import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Input,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import moment from 'moment';
import Stories from '../../components/community/Stories';
import JobPosting from '../../components/community/JobPosting';

const CommunityPage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [stories, setStories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isSearch, setIsearch] = useState(false);
  const [loadingStories, setLoadingStories] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Displaying data on community page
  useEffect(() => {
    const fetchData = async () => {
      setLoadingPosts(true);
      const url = 'http://localhost:5000/api/post/get-posts';
      try {
        const response = await axios.get(url);
        if (response.data.post) {
          console.log(response.data);
          setData(response.data.post);
          setStories(response.data.post);
        }
      } catch (error) {
        console.error(error);
        alert('Server error');
      } finally {
        setLoadingPosts(false);
        setLoadingStories(false);
      }
    };
    fetchData();
  }, [refresh]);

  const handleReaction = () => {
    setRefresh(!refresh);
    console.log('Reaction button clicked');
  };

  // Search product on the basis of title
  const handleSearch = async () => {
    setLoadingPosts(true);
    const url = `http://localhost:5000/api/post/search?search=${search}`;
    try {
      const response = await axios.get(url);
      console.log(response.data.post);

      if (response.data.post.length !== 0) {
        setData(response.data.post);
      } else {
        alert('No result found');
      }
      setSearch('');
      setIsearch(true);
    } catch (error) {
      console.error(error);
      alert('Server error');
    } finally {
      setLoadingPosts(false);
    }
  };

  const closeSearch = () => {
    setIsearch(false);
    setRefresh(!refresh);
  };

  return (
    <Box minH="100vh" bgGradient="linear(to-l, blue.50, white, blue.50)">
      <Navbar />
      <Flex justify="evenly" className="w-1/2" align="center" pt={4}>
        <Input
          placeholder="search"
          bg="gray.100"
          border="1px"
          borderColor="black"
          p={2}
          borderRadius="xl"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
      <Flex pt={6} pl={6} rounded="5xl" className="w-full">
        <Box
          bgGradient="linear(to-r, orange.300, white, orange.300)"
          pt={4}
          rounded="3xl"
          px={4}
          w="25%"
          pr={4}
          h="fit-content"
        >
          <Box mb={8} textAlign="center">
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

        <Container p={3} flex="2" className="w-fit">
          <Flex flexDirection="column" alignItems="center" gap={4} className='w-full'>
            {loadingPosts ? (
              <Spinner size="xl" />
            ) : (
              data.map((item, index) => (
                <JobPosting
                  className="w-[800px]"
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
              ))
            )}
          </Flex>
        </Container>
      </Flex>
    </Box>
  );
};

export default CommunityPage;

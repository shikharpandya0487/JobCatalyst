import React, { useEffect, useState } from 'react';
import { Box, Flex, Input, Button, Heading, Text, Spinner } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import axios from 'axios';
import ListUser from '../../components/ListUsers/ListUser';
import { ChatState } from '../../UserContext';

const SearchPeople = () => {
  const { user } = ChatState();
  const [formData, setFormData] = useState({
    username: "",
    profession: "",
    skill: "",
    location: "",
  });

  const [searchResult, setSearchResult] = useState([]);
  const [selectedUser,setSelectedUser]=useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };



  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(`http://localhost:5000/api/people/search`, {
        params: formData,
        ...config,
      });
      console.log('Search results:', response.data.users);
      setSearchResult(response.data.users);
    } catch (error) {
      console.log(error);
      setSelectedUser({})
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(`http://localhost:5000/api/people/search`, {
          params: formData,
          ...config,
        });
        console.log('Search results:', response.data.users);
        setSearchResult(response.data.users);
        if(formData.location==="" && formData.username==="" && formData.profession==="" && formData.skill==="" )
          {
            setSelectedUser({})
            setSearchResult([])
          }
      } catch (error) {
        console.log(error);
        setSearchResult([])
        setSelectedUser({})
      }
    };
    
 
    fetchData();
  }, [formData, user.token]);

  const handleSearch= (user)=>{
    console.log("User ",user)
    setSelectedUser(JSON.stringify(user))
  }


  return (
    <>
      <Navbar />
      <Flex direction="column" justify="start" align="center" gap="2" h="100vh" w="100%">
        <Box border="1px" borderColor="black" p="2" w="full" justify="center">
          <Flex w="full" gap="1" align="center">
            <Heading as="label" htmlFor="search" w="1/2">
              Search people
            </Heading>
            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="name">
                Name
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="profession">
                Profession
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="skill">
                Skill
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="skill"
                value={formData.skill}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction="column" gap="1" p="1" justify="center" align="center">
              <Text as="label" htmlFor="location">
                Location
              </Text>
              <Input
                type="text"
                p="2"
                borderRadius="xl"
                borderColor="red.500"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Flex>

            <Button
              p="2"
              bg="gray.800"
              color="lightBlue"
              fontWeight="semibold"
              borderRadius="lg"
              _hover={{ color: 'white', backgroundColor: "red" }}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Flex>
        </Box>
        {searchResult.length > 0 && searchResult.map((user) => (
          <ListUser key={user._id} user={user} handleFunction={()=>handleSearch(user)} />
        ))}

      
        <Box>
          {

            
          }
        </Box>

        




      </Flex>
    </>
  );
};

export default SearchPeople;

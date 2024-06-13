import React, { useState } from 'react';
import axios from 'axios';
import { IoPersonCircleSharp } from "react-icons/io5";
import { FaRegThumbsUp, FaThumbsUp, FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHandsClapping } from "react-icons/fa6";
import { PiHandsClapping } from "react-icons/pi";
import Comments2 from '../Comments/Comments2';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  List,
  ListItem,
  Text,
  Image,
  Spinner,
  Box
} from "@chakra-ui/react";
import { ChatState } from '../../UserContext';

const MediaDisplay = ({ url }) => {
  const isVideo = url.endsWith('.mp4');

  return isVideo ? (
    <video className='w-3/4 h-3/6' controls>
      <source src={url} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  ) : (
    <img className='w-3/4 rounded-md' src={url} alt="Media" />
  );
};

const JobPosting = ({
  title,
  description,
  tags,
  image,
  posted,
  postedBy,
  postedById,
  id,
  post,
  onReaction
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const { user } = ChatState();

  const userId = localStorage.getItem('userId');

  const handleReaction = async (reactionType) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
    };

    // URLs for different reactions
    const urls = {
      like: {
        add: 'https://jobcatalyst.onrender.com/api/post/like-post',
        remove: 'https://jobcatalyst.onrender.com/api/post/dislike-post'
      },
      heart: {
        add: 'https://jobcatalyst.onrender.com/api/post/heart-post',
        remove: 'https://jobcatalyst.onrender.com/api/post/unheart-post'
      },
      congrats: {
        add: 'https://jobcatalyst.onrender.com/api/post/cong-post',
        remove: 'https://jobcatalyst.onrender.com/api/post/discong-post'
      }
    };

    // Check the current state of each reaction
    const reactions = {
      like: post.likes.includes(userId),
      heart: post.heart.includes(userId),
      congrats: post.congrats.includes(userId)
    };

    // Prepare the payload
    const data = { postId: id };

    // Handle the removal of existing reactions
    for (const [type, active] of Object.entries(reactions)) {
      if (active && type !== reactionType) {
        await axios.put(urls[type].remove, data, { headers });
      }
    }

    // Add or remove the new reaction
    if (reactions[reactionType]) {
      await axios.put(urls[reactionType].remove, data, { headers });
    } else {
      await axios.put(urls[reactionType].add, data, { headers });
    }

    // Trigger the reaction update
    onReaction();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Perform search query here
    axios.get(`https://jobcatalyst.onrender.com/api/user/search?query=${event.target.value}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((err) => {
        console.log("Error fetching search results", err);
      });
  };

  const handleShareToUser = (userId) => {
    // Share post logic
    axios.post('https://jobcatalyst.onrender.com/api/post/share', { postId: id, userId })
      .then((response) => {
        console.log("Post shared successfully", response);
        onClose();
      })
      .catch((err) => {
        console.log("Error sharing post", err);
      });
  };

  const handleProfileShow = async () => {
    try {
      // Search for the profile of the person
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log("username ", postedBy, "id ", postedById);
      const response = await axios.get(`https://jobcatalyst.onrender.com/api/community/search?username=${postedBy}&id=${postedById}`, config);
      if (response === undefined) {
        console.log("no");
      }

      console.log('Search results:', response.data);
      setProfileData(response.data);
      setProfileModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200 w-3/4 p-2 rounded-lg">
      <div className="flex gap-1 items-center w-full h-15">
        <div className='flex flex-col justify-center items-start pl-4 select-none w-1/3 cursor-pointer ' onClick={handleProfileShow}>
          <IoPersonCircleSharp className="w-14 h-14 flex justify-center items-center cursor-pointer" />
          <div>
            <h6 className="text-slate-700 text-sm font-light">Posted by: <b className='font-semibold cursor-pointer hover:underline text-lg'>{postedBy}</b></h6>
            <p className="text-slate-700 text-sm font-light">{posted}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-center justify-between w-2/3 h-fit">
          <div className='text-center w-fit'>
            <h1 className=" font-normal pb-2">
              {title && title.length > 0 && (
                <h1 className="font-normal pt-2">{title[0].toUpperCase() + title.slice(1)}</h1>
              )}
            </h1>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center'>
        {image && <MediaDisplay url={image} />}
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-medium">Description: </h4>
        {description}
        <br />
        <span className="bg-gray-200 px-2 py-1 mr-6 rounded-xl w-20 text-2xl cursor-pointer text-center text-blue-600 hover:text-red-600">
          #{tags}
        </span>
      </div>

      <div className="w-full flex flex-col justify-between items-center p-2">
        <div className='flex justify-evenly items-center w-3/4 gap-1 '>
          <div className='flex flex-col w-fit p-1 items-center justify-center gap-1'>
            {
              post.likes.includes(userId)
                ? <FaThumbsUp className='cursor-pointer' onClick={() => handleReaction('like')} />
                : <FaRegThumbsUp className='cursor-pointer' onClick={() => handleReaction('like')} />
            }
            <div>
              <h5>{post.likes.length} Likes</h5>
            </div>
          </div>

          <div className='flex flex-col w-fit p-1 items-center justify-center gap-1'>
            {
              post.heart.includes(userId)
                ? <FaHeart className='cursor-pointer' onClick={() => handleReaction('heart')} />
                : <CiHeart className='cursor-pointer' onClick={() => handleReaction('heart')} />
            }
            <div>
              <h5>{post.heart.length} Loves</h5>
            </div>
          </div>

          <div className='flex flex-col w-fit p-1 items-center justify-center gap-1'>
            {
              post.congrats.includes(userId)
                ? <FaHandsClapping className='cursor-pointer' onClick={() => handleReaction('congrats')} />
                : <PiHandsClapping className='cursor-pointer' onClick={() => handleReaction('congrats')} />
            }
            <div>
              <h5>{post.congrats.length} Congrats</h5>
            </div>
          </div>
        </div>

        <div className='flex w-full rounded-md flex-col p-2 justify-start items-start min-h-fit gap-2'>
          <div className=" w-full  flex justify-evenly items-center">
            <Button colorScheme='blue' className='p-3' onClick={() => setOpenComments((open) => !open)}>
              {openComments ? 'Close Comments' : 'Open Comments'}
            </Button>

            <Button colorScheme='green' className='p-3' onClick={onOpen} mt={4}>
              Share Post
            </Button>
          </div>
          {openComments && <Comments2 postId={id} currentUserId={userId} />}
        </div>
      
      </div>

      <Modal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} className='p-2'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className='display-block'>
            User Profile
          </ModalHeader>
          <ModalCloseButton />
          

          <ModalBody className='flex flex-col gap-3 p-1'>
            <Box className='w-full'>
              <Button className='w-full'>
                Connect
              </Button>
            </Box>
            <Box>
            {profileData ? (
              <Box className='flex flex-col gap-1 justify-center'>
                <Image className='mx-auto' src={profileData.searchedUser.pic} alt="Profile Picture" boxSize="100px" />
                <Text className='flex gap-2 items-center'><b>Username:</b> {profileData.searchedUser.username}</Text>
                <Text className='flex gap-2 items-center'><b>Email:</b> {profileData.searchedUser.email}</Text>
                <Text className='flex gap-2 items-center'><b>Profession:</b> {profileData.searchedUser.profession || "N/A"}</Text>
                <Text className='flex gap-2 items-center'><b>Location:</b> {profileData.searchedUser.location}</Text>
                <Text className='flex gap-2 items-center'><b>Company:</b> {(profileData.searchedUser.isAdmin)?profileData.searchedUser?.companyName:<>N/A</>}</Text>
                <Text className='flex gap-2 items-center'><b>GitHub:</b> <a className='font-semibold' href={profileData.searchedUser.github.url} target="_blank" rel="noopener noreferrer">{profileData.searchedUser.github.url}</a></Text>
              </Box>
            ) : (
              <Spinner>Loading...</Spinner>
            )}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => setProfileModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              placeholder="Search user..."
              value={searchQuery}
              onChange={handleSearchChange}
              mb={4}
            />
            <List>
              {searchResults.map((user) => (
                <ListItem key={user.id} mb={2}>
                  <Button variant="link" onClick={() => handleShareToUser(user.id)}>
                    {user.name}
                  </Button>
                </ListItem>
              ))}
            </List>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default JobPosting;

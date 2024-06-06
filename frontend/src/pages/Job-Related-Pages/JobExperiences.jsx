import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Flex, Text, Button, Container, Spinner, useToast } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';

const JobExperiences = () => {
  const [jobRecords, setJobRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const toast = useToast();

  useEffect(() => {
    const fetchJobRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jobcatalyst.onrender.com/api/profile/jobrecords/getAllJobRecord?page=${currentPage}`);
        setJobRecords(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job records:', error);
        setLoading(false);
        toast({
          title: 'Error',
          description: 'Failed to fetch job records.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchJobRecords();
  }, [currentPage, toast]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      toast({
        title: 'Page Changed',
        description: `Page ${currentPage + 1} loaded.`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      toast({
        title: 'Page Changed',
        description: `Page ${currentPage - 1} loaded.`,
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.lg" py={8}>
        {loading ? (
          <Flex justify="center" align="center" h="200px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <>
            {jobRecords.length > 0 ? (
              jobRecords.map((record, index) => (
                <Box key={index} p={4} borderWidth="1px" borderRadius="lg" bg="gray.100" mb={4}>
                  <Text fontWeight="bold">Company: {record.company}</Text>
                  <Text>Position: {record.position}</Text>
                  <Text>Start Date: {record.startDate}</Text>
                  <Text>End Date: {record.endDate}</Text>
                  <Text>Description: {record.description}</Text>
                </Box>
              ))
            ) : (
              <Box p={4} borderWidth="1px" borderRadius="lg" bg="gray.100">
                <Text>No job records found.</Text>
              </Box>
            )}
          </>
        )}

        <Flex justify="center">
          <Button
            onClick={handlePrevPage}
            mr={2}
            disabled={currentPage === 1 || loading}
            bg="blue.400"
            color="white"
            _hover={{ bg: 'blue.500' }}
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || loading}
            bg="blue.400"
            color="white"
            _hover={{ bg: 'blue.500' }}
          >
            Next
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default JobExperiences;

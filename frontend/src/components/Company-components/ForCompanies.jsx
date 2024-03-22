import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 3;
  const [total, setTotal] = useState(0);
  const [facts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFacts = async (page, limit) => {
    const API_URL = `https://catfact.ninja/facts?page=${page}&limit=${limit}`;
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`An error occurred: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const showFacts = (facts) => {
    setFacts((prevFacts) => [...prevFacts, ...facts]);
  };

  const hideLoader = () => {
    setLoading(false);
  };

  const showLoader = () => {
    setLoading(true);
  };

  const hasMoreFacts = () => {
    const startIndex = (currentPage - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  const loadFacts = async (page, limit) => {
    showLoader();
    try {
      if (hasMoreFacts()) {
        const response = await getFacts(page, limit);
        if (response) {
          showFacts(response.data);
          setTotal(response.total);
        }
      }
    } finally {
      hideLoader();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5 && hasMoreFacts()) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, hasMoreFacts]);

  useEffect(() => {
    loadFacts(currentPage, limit);
  }, [currentPage, limit]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-semibold text-center mb-8 uppercase">Fun Facts about Cats</h1>

      <div className="facts flex flex-col justify-center">
        {facts.map((fact, index) => (
          <div key={index} className="blockfact mb-5">
            <div className="fact relative text-lg leading-7 break-words">
              {fact.fact}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="loader inline-block relative w-20 h-20 opacity-0">
          <div className="absolute left-2 w-4 bg-gray-200 animate-loader delay-300"></div>
          <div className="absolute left-8 w-4 bg-gray-200 animate-loader delay-150"></div>
          <div className="absolute left-14 w-4 bg-gray-200 animate-loader"></div>
        </div>
      )}
    </div>
  );
};

export default App;

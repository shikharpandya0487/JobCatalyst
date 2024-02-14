import React, { useState, useEffect } from "react";

const MyTeams = () => {
  const [teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      // Replace with your actual API call
      const data = [
        { id: 1, name: "Team A" },
        { id: 2, name: "Team B" },
        { id: 3, name: "Team C" },
      ];
      setTeamData(data);
    };

    fetchTeamData();
  }, []);

  return (
    <div style={{ width: "900px", margin: "auto", padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>My Teams</h2>
      <ul className="list-disc pl-6">
        {teamData.map((team) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyTeams;

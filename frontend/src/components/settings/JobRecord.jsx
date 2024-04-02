import React, { useState } from "react";
import { useTheme } from '../../Context/ThemeContext'; 
const JobRecord = () => {
  const {theme} = useTheme();
  const [jobRecords, setJobRecords] = useState([]);
  const [savedRecords, setSavedRecords] = useState([]);

  const addJobRecord = () => {
    setJobRecords([
      ...jobRecords,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const updatedRecords = [...jobRecords];
    updatedRecords[index][name] = value;
    setJobRecords(updatedRecords);
  };

  const saveRecord = (index) => {
    const recordToSave = jobRecords[index];
    setSavedRecords([...savedRecords, recordToSave]);
    setJobRecords(jobRecords.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        width: "900px",
        margin: "auto",
        padding: "20px",
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        color: theme === "dark" ? "#fff" : "#333",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Job Record</h2>
      <button
        onClick={addJobRecord}
        style={{ marginBottom: "20px" }}
        className="font-medium text-gray-900 text-lg bg-blue-500 p-2 rounded-xl"
      >
        Add Record
      </button>
      {jobRecords.map((record, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow mb-4"
        style={{
          backgroundColor: theme === "dark" ? "#333" : "#fff",
          color: theme === "dark" ? "#fff" : "#333",
          border:theme== "dark" ? ' 1px solid #fff': '',
        }}
        >
          <h5 className="mb-2 font-semibold pb-4 italic">
            Work Experience {index + 1}
          </h5>
          <div className=" w-full p-1 ">
            <label className="font-light font-serif w-1/4 text-xl text-center text-black  ">
              Company:
            </label>
            <input
              type="text"
              name="company"
              value={record.company}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </div>
          <div className=" w-full p-1">
            <label className="font-light font-serif w-1/4 text-xl text-center text-black">
              Position:
            </label>
            <input
              type="text"
              name="position"
              value={record.position}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </div>
          <div className=" w-full p-1">
            <label className="font-light font-serif w-1/4 text-xl text-center text-black">
              Start Date:
            </label>
            <input
              type="text"
              name="startDate"
              value={record.startDate}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </div>
          <div className=" w-full p-1">
            <label className="font-light font-serif w-1/4 text-xl text-center text-black">
              End Date:
            </label>
            <input
              type="text"
              name="endDate"
              value={record.endDate}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </div>
          <div className=" w-full p-1">
            <label className="font-light font-serif w-1/4 text-xl text-center text-black">
              Description:
            </label>
            <textarea
              name="description"
              value={record.description}
              onChange={(e) => handleChange(index, e)}
              className="input-field bg-white rounded-md p-1 w-3/4 hover:cursor-pointer"
            />
          </div>
          <button
            onClick={() => saveRecord(index)}
            className="bg-green-500 text-white py-2 px-4 mt-2 rounded"
          >
            Save Record
          </button>
        </div>
      ))}
      {savedRecords.map((record, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded shadow mb-4">
          <h5 className="mb-2 font-semibold pb-4 italic">
            Work Experience {index + 1}
          </h5>
          <p>
            <strong>Company:</strong> {record.company}
          </p>
          <p>
            <strong>Position:</strong> {record.position}
          </p>
          <p>
            <strong>Start Date:</strong> {record.startDate}
          </p>
          <p>
            <strong>End Date:</strong> {record.endDate}
          </p>
          <p>
            <strong>Description:</strong> {record.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default JobRecord;

import React from "react";

const PersonalDetails = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>

        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="email"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="phone"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your Contact no"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>

        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="github"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Github:
          </label>
          <input
            type="text"
            id="github"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="https://github/YOURUSERNAME"
            value={formData.github}
            onChange={(e) => {
              setFormData({ ...formData, github: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="Linkedln"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Linkedln:
          </label>
          <input
            type="text"
            id="Linkedln"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="https://linkedIn/YOURUSERNAME"
            value={formData.linkedin}
            onChange={(e) => {
              setFormData({ ...formData, linkedin: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="Skills"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Skills:
          </label>
          <input
            type="text"
            id="Skills"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your skills here "
            value={formData.skills}
            onChange={(e) => {
              setFormData({ ...formData, skills: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;

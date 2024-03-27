import React from 'react'

const Project = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
      <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Name of Project:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your project title here"
            value={formData.proj1_title}
            onChange={(e) => {
              setFormData({ ...formData, proj1_title: e.target.value });
            }}
          />
        </div>

        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Link to project:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="give the project link here"
            value={formData.proj1_link}
            onChange={(e) => {
              setFormData({ ...formData, proj1_link: e.target.value });
            }}
          />
        </div>
        <div className="col-12  w-full p-1 flex items-center">
          <label
            htmlFor="edu1_desc"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Description:
          </label>
          <textarea
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter short description of your project here"
            value={formData.proj1_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Second Project Name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your project title here "
            value={formData.proj2_title}
            onChange={(e) => {
              setFormData({ ...formData, proj2_title: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Link to project:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="give the link of your project"
            value={formData.proj2_link}
            onChange={(e) => {
              setFormData({ ...formData, proj2_link: e.target.value });
            }}
          />
        </div>

        <div className=" col-12  w-full p-1 flex items-center">
          <label
            htmlFor="edu1_desc"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Description:
          </label>
          <textarea
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter short description of your project here "
            value={formData.proj2_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default Project

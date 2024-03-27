import React from 'react'

const Education = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
      <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            First Institite Name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your first institute name"
            value={formData.edu1_school}
            onChange={(e) => {
              setFormData({ ...formData, edu1_school: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Year you graduated:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your graduation year"
            value={formData.edu1_year}
            onChange={(e) => {
              setFormData({ ...formData, edu1_year: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Degree you pursued:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your degree"
            value={formData.edu1_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu1_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="  col-12 w-full p-1 flex items-center">
          <label
            htmlFor="edu1_desc"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Enter a short description:
          </label>
          <textarea
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="XYZ "
            value={formData.edu1_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
           Second Institute name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your second institute name"
            value={formData.edu2_school}
            onChange={(e) => {
              setFormData({ ...formData, edu2_school: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Year you graduated:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your year you graduated from your second institute name"
            value={formData.edu2_year}
            onChange={(e) => {
              setFormData({ ...formData, edu2_year: e.target.value });
            }}
          />
        </div>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Degree you pursued:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your degree from second institution"
            value={formData.edu2_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu2_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="  col-12 w-full p-1 flex items-center">
          <label
            htmlFor="edu2_desc"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Enter a short description:
          </label>
          <textarea
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="XYZ"
            value={formData.edu2_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default Education

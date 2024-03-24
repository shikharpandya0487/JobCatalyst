import React from 'react'

const Extras = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <h4 className="font-semibold">Languages you can speak</h4>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Languages:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your Second Company name"
            value={formData.extra_1}
            onChange={(e) => {
              setFormData({ ...formData, extra_1: e.target.value });
            }}
          />
        </div>

        <hr />
        <h4>Things you like to do:</h4>
        <div className=" w-full p-1 flex items-center">
          <label
            htmlFor="name"
            className="font-light text-center text-black text-xl font-serif w-1/4 px-2"
          >
            Hobbies:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-md  input-field bg-white p-1 w-3/4 hover:cursor-pointer mr-2"
            placeholder="Enter your Second Company name"
            value={formData.extra_2}
            onChange={(e) => {
              setFormData({ ...formData, extra_2: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default Extras

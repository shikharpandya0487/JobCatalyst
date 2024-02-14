import React from 'react'

const Extras = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <h4>Languages you can speak</h4>
        <div>
          <label for="name" className="font-semibold mt-2">
            Languages:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.extra_1}
            onChange={(e) => {
              setFormData({ ...formData, extra_1: e.target.value });
            }}
          />
        </div>

        <hr />
        <h4>Things you like to do:</h4>
        <div>
          <label for="name" className="font-semibold mt-2">
            Hobbies:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
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

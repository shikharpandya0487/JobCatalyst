import React from 'react'

const Extras = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <h3>Languages you can speak:</h3>
        <div>
          <label for="name">
            Languages
          </label>
          <input
            type="text"
            id="name"
            value={formData.extra_1}
            onChange={(e) => {
              setFormData({ ...formData, extra_1: e.target.value });
            }}
          />
        </div>

        <hr />
        <h3>Things you like to do:</h3>
        <div>
          <label for="name">
            Hobbies
          </label>
          <input
            type="text"
            id="name"
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

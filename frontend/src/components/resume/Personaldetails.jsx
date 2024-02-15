import React from 'react'

const PersonalDetails = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            Email:
          </label>
          <input
            type="email"
            id="Email"
            value={formData.email}
            className="rounded-2xl ml-2"
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="phone" className="font-semibold">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            className="rounded-2xl ml-2"
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-2">
          <label for="github" className="font-semibold">
            Github:
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
            placeholder="https://github/YOURUSERNAME"
            value={formData.github}
            onChange={(e) => {
              setFormData({ ...formData, github: e.target.value });
            }}
          />
        </div>
        <div className="col-12 mb-2">
          <label for="LinkedIn" className="font-semibold">
            LinkedIn:
          </label>
          <input
            type="text"
            id="LinkedIn"
            className="rounded-2xl ml-2"
            placeholder="https://linkedIn/YOURUSERNAME"
            value={formData.linkedin}
            onChange={(e) => {
              setFormData({ ...formData, linkedin: e.target.value });
            }}
          />
        </div>
        <div className="col-12 mb-2">
          <label for="Skills" className="font-semibold">
            Skills:
          </label>
          <input
            type="text"
            id="Skills"
            className="rounded-2xl ml-2 px-3"
            placeholder="Enter skills and separate each of them with a comma "
            value={formData.skills}
            onChange={(e) => {
              setFormData({ ...formData, skills: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails

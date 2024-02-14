import React from 'react'

const PersonalDetails = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div>
          <label for="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            Email
          </label>
          <input
            type="email"
            id="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="phone">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
            }}
          />
        </div>

        <div className="col-12">
          <label for="github">
            Github
          </label>
          <input
            type="text"
            id="github"
            placeholder="https://github/YOURUSERNAME"
            value={formData.github}
            onChange={(e) => {
              setFormData({ ...formData, github: e.target.value });
            }}
          />
        </div>
        <div className="col-12">
          <label for="LinkedIn">
            LinkedIn
          </label>
          <input
            type="text"
            id="LinkedIn"
            placeholder="https://linkedIn/YOURUSERNAME"
            value={formData.linkedin}
            onChange={(e) => {
              setFormData({ ...formData, linkedin: e.target.value });
            }}
          />
        </div>
        <div className="col-12">
          <label for="Skills">
            Skills
          </label>
          <input
            type="text"
            id="Skills"
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

import React from 'react'

const Project = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div>
          <label for="name">
            Name of project
          </label>
          <input
            type="text"
            id="name"
            value={formData.proj1_title}
            onChange={(e) => {
              setFormData({ ...formData, proj1_title: e.target.value });
            }}
          />
        </div>

        <div>
          <label for="phone">
            Link to project
          </label>
          <input
            type="text"
            id="phone"
            value={formData.proj1_link}
            onChange={(e) => {
              setFormData({ ...formData, proj1_link: e.target.value });
            }}
          />
        </div>
        <div className="col-12">
          <label for="edu1_desc">
            Description about project
          </label>
          <input
            type="text"
            id="github"
            value={formData.proj1_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div>
          <label for="name">
            Enter your Second Project Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.proj2_title}
            onChange={(e) => {
              setFormData({ ...formData, proj2_title: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            Link of second project
          </label>
          <input
            type="email"
            id="Email"
            value={formData.proj2_link}
            onChange={(e) => {
              setFormData({ ...formData, proj2_link: e.target.value });
            }}
          />
        </div>

        <div className="col-12">
          <label for="edu1_desc">
            Description
          </label>
          <input
            type="text"
            id="github"
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

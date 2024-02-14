import React from 'react'

const Project = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Name of project:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.proj1_title}
            onChange={(e) => {
              setFormData({ ...formData, proj1_title: e.target.value });
            }}
          />
        </div>

        <div className="mb-2">
          <label for="phone" className="font-semibold">
            Link to project:
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-2xl ml-2"
            value={formData.proj1_link}
            onChange={(e) => {
              setFormData({ ...formData, proj1_link: e.target.value });
            }}
          />
        </div>
        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Description about project:
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
            value={formData.proj1_desc}
            onChange={(e) => {
              setFormData({ ...formData, proj1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Enter your Second Project Name
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.proj2_title}
            onChange={(e) => {
              setFormData({ ...formData, proj2_title: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            Link of second project
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-2xl ml-2"
            value={formData.proj2_link}
            onChange={(e) => {
              setFormData({ ...formData, proj2_link: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Description
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
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

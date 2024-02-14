import React from 'react'

const Experiences = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Enter your first company name you worked for
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.exp1_org}
            onChange={(e) => {
              setFormData({ ...formData, exp1_org: e.target.value });
            }}
          />
        </div>

        <div className="mb-2">
          <label for="phone" className="font-semibold">
            What was your designation?
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-2xl ml-2"
            value={formData.exp1_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp1_pos: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            How many years you worked there for?
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-2xl ml-2"
            value={formData.exp1_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp1_dur: e.target.value });
            }}
          />
        </div>
        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Tell us about your job description
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
            value={formData.exp1_desc}
            onChange={(e) => {
              setFormData({ ...formData, exp1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Enter your Second company name
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.exp2_org}
            onChange={(e) => {
              setFormData({ ...formData, exp2_org: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            What was your designation?
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-2xl ml-2"
            value={formData.exp2_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp2_pos: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="phone" className="font-semibold">
            How many years you worked there?
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-2xl ml-2"
            value={formData.exp2_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp2_dur: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Tell us about your job description
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
            value={formData.exp2_desc}
            onChange={(e) => {
              setFormData({ ...formData, exp2_desc: e.target.value });
            }}
          />
        </div>
      </form>
    </div>
  )
}

export default Experiences

import React from 'react'

const Experiences = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div>
          <label for="name">
            Enter your first company name you worked for
          </label>
          <input
            type="text"
            id="name"
            value={formData.exp1_org}
            onChange={(e) => {
              setFormData({ ...formData, exp1_org: e.target.value });
            }}
          />
        </div>

        <div>
          <label for="phone">
            What was your designation?
          </label>
          <input
            type="text"
            id="phone"
            value={formData.exp1_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp1_pos: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            How many years you worked there for?
          </label>
          <input
            type="email"
            id="Email"
            value={formData.exp1_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp1_dur: e.target.value });
            }}
          />
        </div>
        <div className="col-12">
          <label for="edu1_desc">
            Tell us about your job description
          </label>
          <input
            type="text"
            id="github"
            value={formData.exp1_desc}
            onChange={(e) => {
              setFormData({ ...formData, exp1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div>
          <label for="name">
            Enter your Second company name
          </label>
          <input
            type="text"
            id="name"
            value={formData.exp2_org}
            onChange={(e) => {
              setFormData({ ...formData, exp2_org: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            What was your designation?
          </label>
          <input
            type="email"
            id="Email"
            value={formData.exp2_pos}
            onChange={(e) => {
              setFormData({ ...formData, exp2_pos: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="phone">
            How many years you worked there?
          </label>
          <input
            type="text"
            id="phone"
            value={formData.exp2_dur}
            onChange={(e) => {
              setFormData({ ...formData, exp2_dur: e.target.value });
            }}
          />
        </div>

        <div className="col-12">
          <label for="edu1_desc">
            Tell us about your job description
          </label>
          <input
            type="text"
            id="github"
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

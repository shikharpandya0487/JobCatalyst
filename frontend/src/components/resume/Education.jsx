import React from 'react'

const Education = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div>
          <label for="name">
            Enter your First Institute name
          </label>
          <input
            type="text"
            id="name"
            value={formData.edu1_school}
            onChange={(e) => {
              setFormData({ ...formData, edu1_school: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            Year you graduated
          </label>
          <input
            type="email"
            id="Email"
            value={formData.edu1_year}
            onChange={(e) => {
              setFormData({ ...formData, edu1_year: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="phone">
            Degree you pursued
          </label>
          <input
            type="text"
            id="phone"
            value={formData.edu1_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu1_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="col-12">
          <label for="edu1_desc">
            Enter a short description
          </label>
          <input
            type="text"
            id="github"
            value={formData.edu1_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div>
          <label for="name">
            Enter your Second Institute name
          </label>
          <input
            type="text"
            id="name"
            value={formData.edu2_school}
            onChange={(e) => {
              setFormData({ ...formData, edu2_school: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="Email">
            Year you graduated from your second institute
          </label>
          <input
            type="email"
            id="Email"
            value={formData.edu2_year}
            onChange={(e) => {
              setFormData({ ...formData, edu2_year: e.target.value });
            }}
          />
        </div>
        <div>
          <label for="phone">
            Degree you pursued
          </label>
          <input
            type="text"
            id="phone"
            value={formData.edu2_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu2_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="col-12">
          <label for="edu1_desc">
            Enter a short description
          </label>
          <input
            type="text"
            id="github"
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

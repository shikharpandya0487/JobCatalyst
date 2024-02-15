import React from 'react'

const Education = ({ formData, setFormData }) => {
  return (
    <div>
      <form>
        <div className="mb-2">
          <label for="name" className="font-semibold">
           First Institute name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.edu1_school}
            onChange={(e) => {
              setFormData({ ...formData, edu1_school: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            Year you graduated:
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-2xl ml-2"
            value={formData.edu1_year}
            onChange={(e) => {
              setFormData({ ...formData, edu1_year: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="phone" className="font-semibold">
            Degree you pursued:
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-2xl ml-2"
            value={formData.edu1_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu1_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Enter a short description:
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
            value={formData.edu1_desc}
            onChange={(e) => {
              setFormData({ ...formData, edu1_desc: e.target.value });
            }}
          />
        </div>
        <hr />
        <div className="mb-2">
          <label for="name" className="font-semibold">
            Enter your Second Institute name:
          </label>
          <input
            type="text"
            id="name"
            className="rounded-2xl ml-2"
            value={formData.edu2_school}
            onChange={(e) => {
              setFormData({ ...formData, edu2_school: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="Email" className="font-semibold">
            Year you graduated from your second institute:
          </label>
          <input
            type="email"
            id="Email"
            className="rounded-2xl ml-2"
            value={formData.edu2_year}
            onChange={(e) => {
              setFormData({ ...formData, edu2_year: e.target.value });
            }}
          />
        </div>
        <div className="mb-2">
          <label for="phone" className="font-semibold">
            Degree you pursued:
          </label>
          <input
            type="text"
            id="phone"
            className="rounded-2xl ml-2"
            value={formData.edu2_qualificatin}
            onChange={(e) => {
              setFormData({ ...formData, edu2_qualificatin: e.target.value });
            }}
          />
        </div>

        <div className="col-12 mb-2">
          <label for="edu1_desc" className="font-semibold">
            Enter a short description:
          </label>
          <input
            type="text"
            id="github"
            className="rounded-2xl ml-2"
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

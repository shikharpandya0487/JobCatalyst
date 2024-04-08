const express = require('express');
const path = require('path');
const pdf = require('html-pdf');
const pdfSample = require('../../pdf-sample'); 
const router = express.Router();
const Resume = require("../../models/Resume/resume.js");
const requireLogin = require("../../middlewares/requireLogin.js");

router.post('/create-resume',requireLogin, async (req, res) => {
  try {
    const {
      name, email, phone, linkedin, github, skills,
      exp1_org, exp1_pos, exp1_desc, exp1_dur, exp2_org, exp2_pos, exp2_desc, exp2_dur,
      proj1_title, proj1_link, proj1_desc, proj2_title, proj2_link, proj2_desc,
      edu1_school, edu1_year, edu1_qualification, edu1_desc, edu2_school, edu2_year, edu2_qualification, edu2_desc,
      extra_1, extra_2,postedBy
    } = req.body;

    const newResume = new Resume({
      name, email, phone, linkedin, github, skills,
      exp1_org, exp1_pos, exp1_desc, exp1_dur, exp2_org, exp2_pos, exp2_desc, exp2_dur,
      proj1_title, proj1_link, proj1_desc, proj2_title, proj2_link, proj2_desc,
      edu1_school, edu1_year, edu1_qualification, edu1_desc, edu2_school, edu2_year, edu2_qualification, edu2_desc,
      extra_1, extra_2,postedBy: req.user
    });

    console.log(req.user);
    const savedResume = await newResume.save();

    res.status(201).json({ message: 'Resume created successfully', data: savedResume });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});


router.post("/create-pdf", (req, res) => {
  pdf.create(pdfSample(req.body), {}).toFile("Resume.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
      console.log(err);
    }
    res.send(Promise.resolve());
    console.log("Success");
  });
});

router.get("/fetch-pdf", (req, res) => {
  const filePath = path.join(__dirname, '../../../Resume.pdf');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'PDF not found' });
    }
  });
});

module.exports = router;
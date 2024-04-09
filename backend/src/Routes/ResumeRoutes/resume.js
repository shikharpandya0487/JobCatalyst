const express = require('express');
const path = require('path');
const pdf = require('html-pdf');
const pdfSample = require('../../pdf-sample'); 
const router = express.Router();
const Resume = require("../../models/Resume/resume.js");
const requireLogin = require("../../middlewares/requireLogin.js");

router.post('/create-resume', async (req,res) => {
  try { 
    const { resumeData, userId } = req.body; 
    const newResume = new Resume({ userId, ...resumeData }); 
    const savedResume = await newResume.save();

    res.status(201).json({ message: 'Resume created successfully', data: savedResume });
  } catch (error) {
    console.error('Error creating resume:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});


router.get('/get-resume/:userId', async (req, res) => {
  try {
    const userId = req.params.userId; 
    const resume = await Resume.findOne({ userId });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    res.status(200).json({ message: 'Resume retrieved successfully', data: resume });
  } catch (error) {
    console.error('Error retrieving resume:', error);
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
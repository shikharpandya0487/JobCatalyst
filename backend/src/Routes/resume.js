const express = require('express');
const path = require('path');
const pdf = require('html-pdf');
const pdfSample = require('../pdf-sample'); // Replace with the correct path to your pdfSample file

const router = express.Router();

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
  const filePath = path.join(__dirname, '../Resume.pdf');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ error: 'PDF not found' });
    }
  });
});

module.exports = router;
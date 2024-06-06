const nodemailer = require("nodemailer");
const { User } = require("../../models/user/User");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASS,
  },
});

const emailList = async (req, res) => {
  try {
    // Get all the email addresses registered on the site
    const currUser = req.user;
    const users = await User.find({});

    const emails = users
      .filter(user => user.email !== currUser.email)
      .map(user => user.email);

    return emails;
  } catch (e) {
    console.log("Can't get all emails", e);
    res.status(500).send("Error retrieving emails"); 
    throw e; // Rethrow to handle it in the caller function
  }
};



const sendMail = async (transporter, mailOptions) => {
  try {
    const response=await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully",response);
    return response
  } catch (error) {
    console.log("Error sending mail:", error);
  }
};

const notify = async (req, res) => {
  try {
    const emails = await emailList(req, res);
    const user=req.user

    if (emails.length === 0) {
      console.log("No emails to send");
      return;
    }
    console.log("USER:", process.env.USER);
console.log("MAILPASS:", process.env.APP_PASS ? '****' : 'Not Set');
    const mailOptions = {
      from: {
        name: "Jobcatalyst",
        address: process.env.USER,
      }, // Sender address
      to: emails, // List of receivers
      subject: "New Job Opening, Checkout as soon as possible", // Subject line
      text: "Notifying you about the new opportunity", // Plain text body
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Job Posted</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #e0e0e0;
              }
              .header img {
                  max-width: 150px;
              }
              .content {
                  padding: 20px;
              }
              .content h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              .content p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 20px;
              }
              .btn {
                  display: inline-block;
                  padding: 10px 20px;
                  background-color: #007BFF;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
                  cursor:pointer
              }
              .footer {
                  text-align: center;
                  padding: 20px;
                  border-top: 1px solid #e0e0e0;
                  font-size: 14px;
                  color: #666666;
              }
              .footer a {
                  color: #007BFF;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="YOUR_LOGO_URL" alt="Job Portal Logo">
              </div>
              <div class="content">
                  <h1>New Job Posted!</h1>
                  <p>Hello,</p>
                  <p>We are excited to inform you that a new job has just been posted on our job portal.</p>
                  <p><strong>Job Title:</strong>  </p>
                  <p><strong>Company:</strong> ${user?.companyName}</p>
                  <p><strong>Location:</strong> ${user?.location}</p>
                  <p>To view more details and apply for the job, click the button below:</p>
                  <p><a href="{{jobUrl}}" class="btn">View Job</a></p>
              </div>
              <div class="footer">
                  <p>Thank you for using our job portal!</p>
                  <p><a href="YOUR_WEBSITE_URL">Visit our website</a> | <a href="mailto:support@yourdomain.com">Contact Support</a></p>
              </div>
          </div>
      </body>
      </html>`, // HTML body
    };

    const response=await sendMail(transporter, mailOptions);
    console.log("response",response)
  } catch (error) {
    console.log("Error in notify function:", error);
  }
};

const notifypart=async (req,res)=>{
  try {
    const user=req.user 
    const email=req.body.email
    const {content,subject}=req.body 
    if (email.length === 0) {
      console.log("No emails to send");
      return;
    }
    console.log("USER:", process.env.USER);
console.log("MAILPASS:", process.env.APP_PASS ? '****' : 'Not Set');
    const mailOptions = {
      from: {
        name: `${user.username}`,
        address: process.env.USER,
      }, // Sender address
      to: email,
      subject:`${subject}`, // Subject line
      text: `${content}`, // Plain text body
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Message from ${user.username}</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border: 1px solid #e0e0e0;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  text-align: center;
                  padding: 10px 0;
                  border-bottom: 1px solid #e0e0e0;
              }
              .header img {
                  max-width: 150px;
              }
              .content {
                  padding: 20px;
              }
              .content h1 {
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              .content p {
                  font-size: 16px;
                  line-height: 1.5;
                  margin-bottom: 20px;
              }
              .footer {
                  text-align: center;
                  padding: 20px;
                  border-top: 1px solid #e0e0e0;
                  font-size: 14px;
                  color: #666666;
              }
              .footer a {
                  color: #007BFF;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img src="YOUR_LOGO_URL" alt="Logo">
              </div>
              <div class="content">
                  <h1>Message from ${user.username}</h1>
                  <p>${content}</p>
              </div>
              <div class="footer">
                  <p>Thank you for using our service!</p>
                  <p><a href="YOUR_WEBSITE_URL">Visit our website</a> | <a href="mailto:support@yourdomain.com">Contact Support</a></p>
              </div>
          </div>
      </body>
      </html>`,
    };

    const response=await sendMail(transporter, mailOptions);
    console.log("response",response)
  } catch (error) {
    console.log("Error in notify function:", error);
  }
};


module.exports ={ notify,notifypart};

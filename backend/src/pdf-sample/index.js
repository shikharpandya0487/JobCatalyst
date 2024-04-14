module.exports = ({
  name,
  email,
  phone,
  linkedin,
  github,
  skills,
  exp1_org,
  exp1_pos,
  exp1_desc,
  exp1_dur,
  exp2_org,
  exp2_pos,
  exp2_desc,
  exp2_dur,
  proj1_title,
  proj1_link,
  proj1_desc,
  proj2_title,
  proj2_link,
  proj2_desc,
  edu1_school,
  edu1_year,
  edu1_qualification,
  edu1_desc,
  edu2_school,
  edu2_year,
  edu2_qualification,
  edu2_desc,
  extra_1,
  extra_2,
}) => {
  return `
            <!doctype html>
            <html>
                <head>
                    <!-- Font Awesome -->
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
                    <!-- Bootstrap core CSS -->
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
                    <!-- Material Design Bootstrap -->
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
        
                    <style>
                      body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f5f5f5;
                        color: #333;
                      }
                      .blue-color {
                        color: rgb(15, 105, 240);
                      }
                      
                      .resume-header {
                        color: #333;
                        padding: 20px;
                        text-align: center;
                      }
                      .resume-header h1 {
                        margin-bottom: 0;
                      }
                      .resume-contact-info {
                        margin-top: 20px;
                      }
                      .resume-section {
                        background-color: rgb(246, 242, 242);
                        border-radius: 5px;
                        padding: 20px;
                        margin-top: 20px;
                      }
                      .resume-section h3 {
                        color: black;
                        margin-top: 0;
                        font-size: large;
                        background-color: rgb(194, 192, 192);
                        padding: 2px;
                      }
                      .resume-section p {
                        margin-bottom: 10px;
                      }
                      .resume-section ul {
                        margin-bottom: 0;
                      }
                      .resume-section ul li {
                        list-style-type: none;
                        margin-bottom: 5px;
                      }
                      .resume-footer {
                        text-align: center;
                        margin-top: 20px;
                        color: #666;
                      }
                    </style>
                
                </head>
                <body>
                <div class="resume-header">
    <h1>${name}</h1>
    <p>Email: <span class="blue-color" style="text-decoration: underline;">${email}</span></p>
    <p>Contact: <span>${phone}</span></p>
    <p>LinkedIn: <a href="${linkedin}" class="blue-color" style="text-decoration: underline;">${linkedin}</a></p>
    <p>GitHub: <a href="${github}" class="blue-color" style="text-decoration: underline;">${github}</a></p>
</div>
<hr style={{ border: "1px solid #333", margin: "10px 0" }} />

            
                  <div class="container">
                    <div class="row">
                      <div class="col-lg-8 mx-auto">
                        <div class="resume-section">
                          <h3>Skills</h3>
                          <p>${skills}</p>
                        </div>
                        
                        <div class="resume-section">
                          <h3>Experience</h3>
                          <p><b>${exp1_org}, ${exp1_pos}</b> (${exp1_dur})</p>
                          <p>${exp1_desc}</p>
                          <p><b>${exp2_org}, ${exp2_pos}</b> (${exp2_dur})</p>
                          <p>${exp2_desc}</p>
                        </div>
                        
                        <div class="resume-section">
                          <h3>Projects</h3>
                          <p><b>${proj1_title}</b> (<a href="${proj1_link}">${proj1_link}</a>)</p>
                          <p>${proj1_desc}</p>
                          <p><b>${proj2_title}</b> (<a href="${proj2_link}">${proj2_link}</a>)</p>
                          <p>${proj2_desc}</p>
                        </div>
                        
                        <div class="resume-section">
                          <h3>Education</h3>
                          <p><b>${edu1_school}</b> (${edu1_qualification}, ${edu1_year})</p>
                          <p>${edu1_desc}</p>
                          <p><b>${edu2_school}</b> (${edu2_qualification}, ${edu2_year})</p>
                          <p>${edu2_desc}</p>
                        </div>
                        
                        <div class="resume-section">
                          <h3>Extra-Curriculars/Activities</h3>
                          <ul style="list-style-type: circle">
                            <li><b>Languages: </b>${extra_1}</li>
                            <li><b>Hobbies: </b>${extra_2}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="resume-footer">
                    <p>Generated by Resume Generator</p>
                  </div>
                  
                  <!-- JQuery -->
                  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                  <!-- Bootstrap tooltips -->
                  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
                  <!-- Bootstrap core JavaScript -->
                  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
                  <!-- MDB core JavaScript -->
                  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/js/mdb.min.js"></script>
                </body>
            </html> 
          `;
};

exports.emailVerificationTemplate = (otp) => {

    return `<!DOCTYPE html>
    
    <html>
    
    <head>
    
    <meta charset="UTF-8">
    
    <title>Course Registration Confirmation</title>
    
    <style>
    
    body {
    
    background-color: #ffffff;
    
    font-family: Arial, sans-serif;
    
    font-size: 16px;
    
    line-height: 1.4;
    
    color: #333333;
    
    margin: 0;
    
    padding: 0;
    
    }
    
    .container {
    
    max-width: 600px;
    
    margin: 0 auto;
    
    padding: 20px;
    
    text-align: center;
    
    }
    
    .logo {
    
    max-width: 200px;
    
    margin-bottom: 20px;
    
    }
    
    .message {-message {
    
    font-size: 18px;
    
    font-weight: bold;
    
    margin-bottom: 20px;
    
    }
    
    .body {
    
    font-size: 16px;
    
    margin-bottom: 20px;
    
    }
    
    .cta {
    
    display: inline-block;
    
    padding: 10px 20px;
    
    background-color: #FFD60A;
    
    color: #000000;
    
    text-decoration: none;
    
    border-radius: 5px;
    
    font-size: 16px;
    
    font-weight: bold;
    
    margin-top: 20px;
    
    }
    
    .support {
    
    font-size: 14px;
    
    color: #999999;color: #999999;
    
    margin-top: 20px;
    
    .highlight { font-weight: bold;
    
    } </style>
    
    </head>
    
    <body>
    
    
    
    <div class="container">
    
    <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj
    
    alt="Lear.In Logo"></a>
    
    <div class="message">OTP Verification Email</div>
    
    <div class="body">
    
    <p>Dear User,</p>
    
    <p>Thakyou for registered with Lear.In. To complete your registration, please use the following (ONE-TIME-PASSWORD) in order to verify your account :</p>
    <h2 class= "highlight"> ${otp}</h2>
    <p> This OTP is valif for 5 Minutes, If you did not request the verification, please disregard this mail.
    Once your account is verifies, you can have access to our platform and it's features.</p>
    
    
    </div><div class="support">If you have any questions or need assistance, please feel free to reach out to href="mailto:info@LearnIn.com">info@LearnIn.com</a>, We are here to help!</div>
    
    </div>
    
    </body>
    
    </html>`;

};
module.exports = emailVerificationTemplate;
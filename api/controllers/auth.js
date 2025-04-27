const uploadImage = require("../middlewares/uploadImage");
const nodemailer = require("nodemailer");
const EmailTemplate = require("email-templates");
const dotenv = require("dotenv");
const User = require("../models/User");
dotenv.config();
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');


const {
    MAIL_FROM_ADDRESS,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_PORT,
    MAIL_HOST,
  } = process.env;
  
  // Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
    },
  });


async function register(req, res){
    try {
        if(req.body.email != null && req.body.username){

            const emailAlreadyExists = await User.findOne({ email: req.body.email });
            const usernameAlreadyExists = await User.findOne({ username: req.body.username });

            if( !emailAlreadyExists ){

                if(!usernameAlreadyExists){

                  

                    const {email, password, name, username} = req.body;

                    const hashedPassword = await bcrypt.hash(password, 10);


                    async function sendVerificationEmail(req, res) {
                        const { email } = req.body; // Assuming email is passed in the request body
                      
                        function generateRandomOTP() {
                            return Math.floor(1000 + Math.random() * 9000);
                          }
        
                          
                        // Generate a random four-digit number (OTP)
                        const otp = generateRandomOTP();
                      
                        // HTML content with OTP
                        const htmlContent = `
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                          <meta charset="UTF-8">
                          <meta http-equiv="X-UA-Compatible" content="IE=edge">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              line-height: 1.6;
                              color: #333;
                              margin: 0;
                              padding: 0;
                              background-color: white;
                            }
                        
                            .container {
                              max-width: 600px;
                              margin: 50px auto;
                              background-color: #fff;
                              padding: 20px;
                              border-radius: 10px;
                              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                        
                            .header {
                              text-align: center;
                              border-bottom: 1px solid #eee;
                              padding-bottom: 10px;
                              margin-bottom: 20px;
                            }
                        
                            .header img {
                              max-width: 100px;
                              margin-bottom: 10px;
                            }
                        
                            h1 {
                              color: #f5c0be;
                            }
                        
                            p {
                              margin: 10px 0;
                            }
                        
                            strong {
                              color: #f5c0be;
                              font-size: 1.2em;
                            }
                        
                            .footer {
                              text-align: center;
                              margin-top: 20px;
                              font-size: 0.9em;
                              color: #777;
                            }
                          </style>
                        </head>
                        <body>
                          <div class="container">
                            <div class="header">
                          
                              <h1>Cybertales</h1>
                            </div>
                            <p>Welcome to Cybertales</p>
                            <p>Sign up token</p>
                            <p>${otp}</p>
                            <div class="footer">
                              <p>Thank you for choosing Cybertales.</p>
                              <p>&copy; ${new Date().getFullYear()} CYBERTALES. All rights reserved.</p>
                            </div>
                          </div>
                        </body>
                        </html>
                        `;
                  
                
                      
                        const emailTemplateInstance = new EmailTemplate({
                            message: {
                                from: MAIL_FROM_ADDRESS,
                                subject: "Verification Code",
                                html: htmlContent,
                            },
                            send: true,
                            transport: transporter,
                            preview: false,
                        });
                    
                        try {
                            // Send the email
                            await emailTemplateInstance.send({
                                template: "templates",
                                message: {
                                    to: email,
                                },
                            });
        


                      const newUser = await User.create({
                        email,
                        password: hashedPassword,
                        name,
                        username,
                        // has_activated:true
                    });
                     const token = await JWT.sign(
                        {email: newUser.email},
                        process.env.JWT_SECRET,
                        {expiresIn: 360000}
                     )

                  return res.json({
                        message: "Email created successfully",
                        data: {
                            token,
                            user:{
                                id: newUser._id,
                                email: newUser.email,
                                username: newUser.username,
                                name: newUser.name,
                                otp: otp
                            }
                        }
                    })
                
                      
                          // Return the OTP along with the response
                        //   return res.send({ message: "Email sent successfully!", user });
                        } catch (error) {
                          console.error("Error sending email:", error);
                          
                          return res.status(500).send({ error: "Error sending email" });
                        }
                      }



                
                      sendVerificationEmail(req, res)

                    // const user = {
                    //   name,
                    //   password: hashedPassword,
                    //   username,
                    //   email
                    // }

                    // return res.send({ message: "Registration Successful!",user });
                    // return res.send({ message: "Email sent successfully!", user });


                }else{
                    return res.send({message: "Username already exist"})
                }
               
            }else{
               return res.send({message:"Email already exist"});
            }

        }else{

        }
    } catch (error) {
       return res.send({error: "Error creating user: " + error})
    }
}

async function verificationOfSignup(req, res) {
    try {
        
        const userFound = await User.findOne({ email: req.params.email });

        
        if (!userFound) {
            return res.status(404).json({ message: "User not found" });
        }

       
        if (userFound) {
          
            userFound.has_activated = true;

            
            await userFound.save();

            const token = await JWT.sign(
                {email: userFound.email},
                process.env.JWT_SECRET,
                {expiresIn: 360000}
             )

            return res.status(200).json({
                message: "Account successfully activated!",
                data: {
                    token: token,
                    user: {
                        id: userFound._id,
                        email: userFound.email,
                        username: userFound.username,
                        name: userFound.name,
                    },
                },
            });
        } else {
            
            return res.status(400).json({
                message: "Invalid OTP. Please try again.",
            });
        }
    } catch (error) {
        console.error("Error verifying signup:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function login(req,res) {
    const {username, password} = req.body;

      
      const isEmail = username.includes('@'); 

    
      let user;
      if (isEmail) {
          user = await User.findOne({ email: username }); 
      } else {
          user = await User.findOne({ username });  
      }

    // const user = await User.findOne({username});
    if(!user){
        return res.json({
            errors: [
                {
                    msg: "Username does not exist, check the username and try again"
                }
            ],
            data: null
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.json({
            errors: [
                {
                    msg: "Password is Incorrect"
                }
            ],
            data: null
        })
    }
  

    // Send token

    async function sendVerificationEmail(req, res) {
      
      
        function generateRandomOTP() {
            return Math.floor(1000 + Math.random() * 9000);
          }
          
        // Generate a random four-digit number (OTP)
        const otp = generateRandomOTP();
      
        // HTML content with OTP
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              margin: 0;
              padding: 0;
              background-color: white;
            }
        
            .container {
              max-width: 600px;
              margin: 50px auto;
              background-color: #fff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
        
            .header {
              text-align: center;
              border-bottom: 1px solid #eee;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
        
            .header img {
              max-width: 100px;
              margin-bottom: 10px;
            }
        
            h1 {
              color: #f5c0be;
            }
        
            p {
              margin: 10px 0;
            }
        
            strong {
              color: #f5c0be;
              font-size: 1.2em;
            }
        
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 0.9em;
              color: #777;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
          
              <h1>Cybertales</h1>
            </div>
            <p>Welcome to Cybertales</p>
            <p>Login token</p>
            <p>${otp}</p>
            <div class="footer">
              <p>Thank you for choosing Cybertales.</p>
              <p>&copy; ${new Date().getFullYear()} CYBERTALES. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `;
  

      
        const emailTemplateInstance = new EmailTemplate({
            message: {
                from: MAIL_FROM_ADDRESS,
                subject: "Login Code",
                html: htmlContent,
            },
            send: true,
            transport: transporter,
            preview: false,
        });
    
        try {
            // Send the email
            await emailTemplateInstance.send({
                template: "templates",
                message: {
                    to: user.email,
                },
            });



     const token = await JWT.sign(
        {email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: 360000}
     )

     return res.json({
        errors: [],
        data: {
            token,
            message: "Login Initiated",
            user:{
                id: user._id,
                email: user.email,
                username: user.username,
                otp: otp
                
            }
        }
    })

      
        
        } catch (error) {
          console.error("Error sending email:", error);
          
          return res.status(500).send({ error: "Error sending email" });
        }
      }




      sendVerificationEmail(req, res)



    // send token ends


 
}

// async function loginVerify(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// }

const getMe = async(req,res)=>{
  
    const user = await User.findOne({email: req.user});
  
    return res.json({

      data: {
         user:{
          id: user._id,
          email: user.email,
          department: user.department,
          experience:user.experience,
          name: user.name,
          phoneNumber: user.phoneNumber,
          about: user.about,
          profilePic: user.profilePic,
          pointsScored: user.pointsScored,
          attemptedQuestions: user.attemptedQuestions

         } 
      }
  })
}

const updateMe = async(req,res)=>{
    const user = await User.findOne({email: req.user});
    const updateUser = req.body;

    if(!user){
        return res.json({
            errors: [
                {
                    msg: "Unauthorized username"
                }
            ],
            data: null
        })
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: updateUser },
            { new: true, runValidators: true }
          );

          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }catch(err){
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }



}


const updateMyProfileImage = async(req,res)=>{
    const user = await User.findOne({email: req.user});
    const file = req.files.profilePic;
    // const updateUser = req.body;

    // console.log(user)
    // console.log(req.file)
    // console.log(req.files)

    // console.log(file)

    if(!user){
        return res.json({
            errors: [
                {
                    msg: "Unauthorized username"
                }
            ],
            data: null
        })
    }

    try{

        const imageUrl = await uploadImage(file.tempFilePath, 'cybertales', `user_id_${Date.now()}`)
        .then(imageUrl => {
        console.log('Image uploaded successfully:', imageUrl);
        console.log(imageUrl.url)
        console.log(user)
        console.log(user.profilePic)
        
         user.profilePic.url = imageUrl;
    })

    // const updatedProfile =
    // console.log(imageUrl.url)
    // console.log(user)
    // console.log(user.profilePic)

    //  user.profilePic.url = imageUrl.url;

        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            { $set: user },
            { new: true, runValidators: true }
          );

          if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    }catch(err){
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }



}


const forgottenPasswordVerificationEmail =  async(req,res)=>{
  console.log(req.params)
  const {email} = req.params
  try {
    const user = await User.findOne({email: email});
    console.log(user)

    if(!user){
      return res.json({
          errors: [
              {
                  msg: "Email does not exist"
              }
          ],
          data: null
      })
  }

     // Send token

     async function sendVerificationEmail(req, res) {
      
      
      function generateRandomOTP() {
          return Math.floor(1000 + Math.random() * 9000);
        }
        
      // Generate a random four-digit number (OTP)
      const otp = generateRandomOTP();
    
      // HTML content with OTP
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: white;
          }
      
          .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
      
          .header {
            text-align: center;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
      
          .header img {
            max-width: 100px;
            margin-bottom: 10px;
          }
      
          h1 {
            color: #f5c0be;
          }
      
          p {
            margin: 10px 0;
          }
      
          strong {
            color: #f5c0be;
            font-size: 1.2em;
          }
      
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
        
            <h1>Cybertales</h1>
          </div>
          <p>Welcome to Cybertales</p>
          <p>Login token</p>
          <p>${otp}</p>
          <div class="footer">
            <p>Thank you for choosing Cybertales.</p>
            <p>&copy; ${new Date().getFullYear()} CYBERTALES. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
      `;


    
      const emailTemplateInstance = new EmailTemplate({
          message: {
              from: MAIL_FROM_ADDRESS,
              subject: "Recover Password Code",
              html: htmlContent,
          },
          send: true,
          transport: transporter,
          preview: false,
      });
  
      try {
          // Send the email
          await emailTemplateInstance.send({
              template: "templates",
              message: {
                  to: email,
              },
          });



   return res.json({
      errors: [],
     
          message: "Update Password Initiated",
          user:{
              id: user._id,
              email: user.email,
              username: user.username,
              otp: otp
              
          }
  })

    
      
      } catch (error) {
        console.error("Error sending email:", error);
        
        return res.status(500).send({ error: "Error sending email" });
      }
    }




    sendVerificationEmail(req, res)


    
  } catch (error) {
    return res.status(500).send({ error: `Error updating password ${error}` });
  }
}



const forgotPasswordUpdate=async(req,res)=>{


  try {
    const user = await User.findOne({email: req.params.email});
    const { password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: user },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully', user: updatedUser });
    
  } catch (error) {
    res.status(400).json({ message: 'Error updating password', error: error });
  }

}

const getAllUsersFilteredByPointsScoredForLeaderboard= async(req,res)=>{
  try {
    // const allUsers = await User.find().sort({ pointsScored: -1 });
    // const message = "All Users"
    // return   res.status(200).json({ message, users: allUsers });
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;

    const allUsers = await User.find()
      .sort({ pointsScored: -1 })
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    const message = "All Users sorted by pointsScored";
    return res.status(200).json({ message, users: allUsers, totalUsers });
    
  } catch (error) {
    res.status(400).json({ message: 'Error getting users', error: error });
  }
}

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});

  res.status(200).json(allUsers);
};

module.exports = {
    register, login, getMe, updateMe, updateMyProfileImage, verificationOfSignup, forgottenPasswordVerificationEmail,forgotPasswordUpdate, getAllUsersFilteredByPointsScoredForLeaderboard, getAllUsers
  };
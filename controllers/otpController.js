const Userotp = require('../models/userotp');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');


 
// Function to send OTP via email
function sendOTPByEmail(email, otp) {
    const mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailDetails = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'OTP',
        text: `Your OTP is: ${otp}`,
    };

    // Return a promise to handle success and error in the calling route
    return mailTransporter.sendMail(mailDetails)
    // .then(data => {
    //     console.log('Email sent successfully:', data);
    // })
    // .catch(error => {
    //     console.error('Error sending email:', error);
    //     throw error; // Re-throw the error to be caught in the calling route
    // });
}


const otpController={
    otp:async(req,res)=>{
        const email=req.body.email;
            // Generate a secret key with a length of 20 characters
    const secret = speakeasy.generateSecret({ length: 20 });

    // Generate a TOTP code using the secret key
    const code = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
    });

    // Log the secret key and TOTP code to the console (for demonstration purposes)
    console.log('Secret:', secret.base32);
    console.log('TOTP Code:', code);

const otp=code;
    const newUserotp = new Userotp({
        email,
        otp,
    });

    await newUserotp.save();


    // Send the OTP to the entered email
    sendOTPByEmail(email, code)
        .then(() => {
            console.log('Email sent successfully');
            res.json({ success: true, message: 'Email sent successfully' });
        })
        .catch(error => {
            console.error('Error sending email:', error);
            res.json({ success: false, message: 'Error sending email' });
        });

},

verifyOtp: async(req,res)=>{

 const enteredOTP=req.body.otp;
 console.log(`entered otp:${enteredOTP}`)

const userOtp = await Userotp.findOne({email:req.body.email})
console.log(`userotp:${userOtp}`);

if(!userOtp){
    console.log('tva')
    return res.json({success: false,message:"User not found"})
}
    if(enteredOTP===userOtp.otp){
        console.log('workes')
        res.json({success:true,message:'OTP is valid'})
    }
    else{
console.log('else worked');
        res.json({success:false,message:'Invalid OTP'})
    }
}

}

module.exports = otpController;
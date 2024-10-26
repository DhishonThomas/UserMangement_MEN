// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const otpController = require('../controllers/otpController');


const router = express.Router();


// const isAuthenticated = (req, res, next) => {
//     if (req.session.isAuthenticated) {
//         
//         res.redirect('/home'); // Change '/home' to your desired route
//     } else {
//         next();
//     }
// };



router.get('/sign', (req, res) => {
    res.header('Cache-Control', 'no-store, no-cache,private');
    res.render('sign', { message: '' });
});



router.get('/', (req, res) => {
    if(req.session.isAuthenticated){
        res.redirect('/home')
    }
   else{ 
    res.setHeader('Cache-Control', 'no-store, no-cache,private');
    res.render('login', { message: '', req: req }); // Pass the req object
}
});


router.get('/home', (req, res) => {
    // res.setHeader('Cache-Control', 'no-store, no-cache,private');
    if(req.session.isAuthenticated){
        res.render('home', { message: '' });   
    }
    else{
        res.redirect('/')
    }
});



router.post('/validateotp', otpController.verifyOtp);

router.post('/sendotp', otpController.otp);

router.post('/sign',authController.signup);

router.post('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/checkUsernameAvailability', authController.checkUser); 


module.exports = router;
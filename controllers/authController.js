
// controllers/authController.js
const User = require('../models/user');
const bcrypt=require('bcrypt')



const authController = { 
   
    signup: async (req, res) => {

        try {
            const { username, password, email, firstname, lastname, gender, birth, phonenumber } = req.body;
            const hashPassword=await bcrypt.hash(password,10);
            const newUser = new User({
                username,
                password:hashPassword,
                email,
                firstname,
                lastname,
                gender,
                birth,
                phonenumber,
            });
if(newUser){
            await newUser.save();
            res.setHeader('Cache-Control', 'no-store, no-cache,private');
            res.redirect('/');
}
else{
    res.render('sign', { message: '' });
}
        } catch (error) {
            res.render('sign', { message: 'Error Creating user' });
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;

        try {
            const user = await User.findOne({ username });

            if (user && (await bcrypt.compare(password, user.password))) {
                req.session.isAuthenticated = true;
                res.redirect('/home');
            } else {
                
                res.redirect('/?error=1');
            }
        } catch (error) {
            res.redirect('/?error=1');   
             }
    },

    
    logout: (req, res) => {
        req.session.isAuthenticated = false;
        req.session.destroy(() => {
            res.redirect('/');
            
        });
    },

    checkUser: async (req, res) => {
        const username = req.query.username;
        console.log('Received request to check username:', username);

        try {
            
    
            const existingUser = await User.findOne({ username: username });
    
            res.json({ isAvailable: !existingUser });
        } catch (error) {
            console.error('Error checking username availability:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


module.exports = authController;
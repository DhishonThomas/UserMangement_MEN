const Admin = require('../models/useradmin');
const User=require('../models/user')
const bcrypt = require('bcrypt');

const adminController = {
    adminlogin: async (req, res) => {
        const { username, password } = req.body;
        try {
            const useradmin = await Admin.findOne({ username });

            const hashPasswordq=await bcrypt.hash(password,10);
            const newUsers = new Admin({
                username,
                password:hashPasswordq,
            });

            await newUsers.save();

            if (useradmin && (await bcrypt.compare(password, useradmin.password))) {
                req.session.isAdminAuthenticated = true;
                res.redirect('/adminhome');
            } 
            else {
                console.error('User...not found pass');
                res.redirect('/admin?error=1');
            }
        } catch (error) {
            console.error('error in adminlogin:', error);
            res.redirect('/admin?error=1');
        }
    },
    adminlogout: (req, res) => {
        req.session.isAdminAuthenticated = false;
        req.session.destroy(() => {
            res.redirect('/admin');
            
        });
    },
    adminhome: async (req, res) => {
        // res.setHeader('Cache-Control', 'no-store, no-cache,private');
        if(req.session.isAdminAuthenticated){
            try {
                const users = await User.find();
                res.render('adminhome', { users });
            } catch (error) {
                res.render('adminhome', { message: 'Error fetching user data' });
            } 
        }
        else{
            res.redirect('/admin')
        }
    },
    adminuser: async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(userId);
            const user = await User.findById(userId);
            console.log('Fetched user:', user); 

    
            if (user) {
                res.render('userDetail', { user });
            } else {
                res.render('userDetail', { message: 'User not found' });
            }
        } catch (error) {
            console.error('Error fetching user data:', error); 

            res.render('userDetail', { message: 'Error fetching user data' });
        }
    },


    createuser: async (req, res) => {
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

            await newUser.save();
            res.setHeader('Cache-Control', 'no-store, no-cache,private');
            res.render('create-user');
        } catch (error) {
            res.render('sign', { message: 'Error Creating user' });
        }
    },
    adminedit: async (req, res) => {
        const userId = req.params.id;
        const { username, password, email, firstname, lastname, gender, birth, phonenumber } = req.body;
        console.log(username);
    
        try {
            await User.findByIdAndUpdate(userId, { username, password, email, firstname, lastname, gender, birth, phonenumber });
            const user = await User.findById(userId); // Fetch the updated user details
    
            if (user) {
                res.render('editDetail', { user, message: 'Updated' });
                console.log("user");
            } else {
                res.render('editDetail', { message: 'User not found' })
            }
        } catch (error) {
            res.render('editDetail', { message: 'Error updating user' });
        }
    },
    admindelete: async (req, res) => {
        const userId = req.params.id;
    
        console.log(userId);
    
        try {
            // Find the user by ID and remove it
            const user = await User.findByIdAndDelete(userId);
            console.log(user);
    
            if (user) {
                res.redirect('/adminhome'); 
            } else {
                res.redirect('/adminhome');
            }
        } catch (error) {
            res.render('userDetail', { message: 'Error deleting user' });
        }
    },
    // Add this route to your app.js
adminsearch:async (req, res) => {
    const searchTerm = req.query.search;
    console.log(searchTerm);

    try {
        const users = await User.find({
            username: { $regex: searchTerm, $options: 'i' }
          });
                  console.log(users);
        res.render('adminhome', { users,searchTerm});
    } catch (error) {
 console.error(error);
        res.status(500).send('Internal Server Error');    }
},

adminlogout:(req, res) => {
    req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.redirect('/admin');
        
    });
}
}

module.exports = adminController;

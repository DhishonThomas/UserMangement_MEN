const express = require('express');
const adminController = require('../controllers/adminController');
const User = require('../models/user');
const bcrypt=require('bcrypt')

const routerAdmin = express.Router();

//Admin only
routerAdmin.get('/admin', (req, res) => {
    if (req.session.isAdminAuthenticated) {
        res.redirect('/adminhome')

    } else {
        res.setHeader('Cache-Control', 'no-store, no-cache,private');
        res.render('adminlogin', { message: '',req:req });
    }
});

routerAdmin.get('/adminlogout', adminController.adminlogout);

routerAdmin.get('/admin/search-users', adminController.adminsearch);

routerAdmin.post('/admin/create-user', adminController.createuser);

routerAdmin.get('/admin/delete/:id', adminController.admindelete)

routerAdmin.post('/admin/kill/:id/edit', adminController.adminedit);

routerAdmin.get('/admin/user/:id', adminController.adminuser);

routerAdmin.get('/admin/edit/:id', adminController.adminedit);

routerAdmin.get('/adminhome', adminController.adminhome);

routerAdmin.post('/adminlogin', adminController.adminlogin);

routerAdmin.get('/logoutAdmin', adminController.adminlogout);


module.exports = routerAdmin;

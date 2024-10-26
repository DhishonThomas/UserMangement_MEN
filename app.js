const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const authAdminRoutes= require('./routes/authAdminRoutes')
const app = express();
const port = 3001;

dotenv.config()

app.use(express.json());

// ... (session, middleware, etc.)
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, private');
    next();
});


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/UserMangement', { serverSelectionTimeoutMS: 5000, }).then((data)=>console.log("mongodb connected")).catch((error)=>console.log(error))

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes                
app.use('/', authRoutes);
app.use('/', authAdminRoutes);


app.use((req,res)=>{
    res.status(404).send('Not Found')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
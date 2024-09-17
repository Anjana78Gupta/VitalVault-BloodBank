const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const userRoutes = require('./routes/user');
const methodOverride = require('method-override');

const dbUrl = "mongodb+srv://anjana2003anajna:zXVF8wiKpiquznys@cluster0.hmfxhwe.mongodb.net/BloodBankDB?retryWrites=true&w=majority";
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
    app.listen(5001);
    console.log("Database Connected....");
    console.log("Listening to Port 5001");

}
const app = express();
app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'));

const sessionConfig = {
    name: 'session',
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig));
//passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.send('hello');
})

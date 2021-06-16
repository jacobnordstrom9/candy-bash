const express = require('express');
const router = express.Router();

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
// const db = require('../models')

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/logout', (req, res)=>{
    req.logout(); // cears the session
    res.redirect('/')
})

passport.use(new localStrategy(async(username, password, done)=>{
try{
    // make db call to check if username is in our db.

    let records = await db.users.findAll({where: {username: username}});
    // [{},{},{},{},{}]

    if(records != null){
        // check passwords
        let record = records[0]; 

        bcrypt.compare(password, record.password, (err, response)=>{

            if(response){
                // this means a match, user has correct password. 
                done(null, {id: record.id, username: record.username})
            }
            else{
                // passwords didn't match
                done(null, false)
            }
        })

    }
    else{
        // user wasn't found in our database
        done(null, false)
    }
    // if user is inside db, then check if password is valid.

    // done(null, {})

    // done(null, false)
    }
    catch(error){

    }
}))

router.post('/login', passport.authenticate('local', {failureRedirect: '/login' }), (req, res) =>{

    res.send('you made it through')

});

passport.serializeUser((user, done)=>{

    //passport is adding information to the sessions {id:"", username:""}

    done(null, user.id)
})

passport.deserializeUser(async(id, done)=>{
    try{

        // additional security 
        // checking to see if user is valid with the cookie that was passed from the request.
        // id is coming from the session
        let user = await db.users.findByPk(id);

        done(null,user)

    }
    catch(error){
        done(null, false)
    }
})

module.exports = router;

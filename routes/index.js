const express = require('express');
const router = express.Router();
const auth = require('../auth')

router.get('/', (req, res)=>{
    res.render('index');
});

router.get('/admin/dashboard', auth, (req, res)=>{
    res.send('you made it to the admin dashboard page');
});

router.get('/admin', (req, res)=>{
    res.send('you made it to the admin page');
});





module.exports = router;
const express = require('express');
const router = express.Router();
const {PersonValidator} = require("../middleware/ValidatorMiddleware/Validateurs");
const {
    signUpAdmin,
    signUpUser,
    login,
    authenticatToIDP

}=require('../controllers/securityController');


//create admin
router.post('/admin',PersonValidator,signUpAdmin );

//create a user
router.post('/user',PersonValidator,signUpUser );

//login
router.post('/login',login);
//authentifier app to idp
router.post('/authenticatToIDP',authenticatToIDP);

module.exports = router;
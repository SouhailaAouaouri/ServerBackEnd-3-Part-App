const express = require('express');
const router = express.Router();
const {PersonValidator} = require("../middleware/ValidatorMiddleware/Validateurs");
const auth =require('../middleware/AuthenticateMiddleware/auth');
const adminMiddleware =require('../middleware/AuthorizedMiddleware/adminMiddleware');
const hasScope =require('../middleware/AuthorizedMiddleware/hasScope');
const validateToken =require('../middleware/AuthorizedMiddleware/validateToken');

const {
    getAllUser,
    getUsersPageable,
    getUserById,
    updateUser,
    deleteUser,
    sendMailToUser

}=require('../controllers/adminController');
// get all users
router.get('/users',validateToken,hasScope('read:users'),getAllUser);
//get user by id
router.get('/user/:id',validateToken,hasScope('read:userById'),getUserById);
//update user
router.put('/user/:id',[auth,adminMiddleware,PersonValidator],updateUser);
//delete user
router.delete('/user/:id',[auth,adminMiddleware],deleteUser);
//get users pageable
router.get('/UsersPageable/:pageNumber/:pageSize',[auth,adminMiddleware],getUsersPageable)
//send mail to user
router.post('/sendMail',[auth,adminMiddleware],sendMailToUser);

module.exports = router;

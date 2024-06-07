const express = require('express');
const router = express.Router();
const {hello} = require('../controllers/userController');
const auth =require('../middleware/AuthenticateMiddleware/auth');
const userMiddleware =require('../middleware/AuthorizedMiddleware/userMiddleware');

router.post('/hello', hello);

module.exports = router;
const express = require('express');
const { signUp, logIn, get_all_users, deactiveAUser, getUser, updateUser, addUser } = require('../controllers/user_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_users)
router
    .route('/register')
    .post(signUp)
router
    .route('/add-user')
    .post(addUser)
router
    .route('/login')
    .post(logIn)
router
    .route('/:userId')
    .get(getUser)
    .patch(updateUser)
router
    .route('/deactivate/:id')
    .patch(deactiveAUser)
// router
//     .route('/send-message')
//     .post(sendMessage)
// router
//     .route('/logout')
//     .get(logOut)
// router
//     .route('/forgot-password')
//     .post(forgotPassword)
const user_router = router;
module.exports = user_router
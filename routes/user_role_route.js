const express = require('express');
const { create_a_user_role } = require('../controllers/user_role_controller');
const router = express.Router();

router
    .route('/')
    .post(create_a_user_role)


const user_role_router = router;
module.exports = user_role_router
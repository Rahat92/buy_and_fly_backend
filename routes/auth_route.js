const express = require('express');
const { resetPassword } = require('../controllers/auth_controller');
const router = express.Router();

router.route('/reset-password/:reset_token').post(resetPassword)

const auth_router = router;
module.exports = auth_router
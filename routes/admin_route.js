const express = require('express');
const { get_all_admins } = require('../controllers/admin_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_admins)

const admin_router = router;
module.exports = admin_router
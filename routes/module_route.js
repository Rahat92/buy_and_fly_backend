const express = require('express');
const { get_all_modules } = require('../controllers/module_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_modules)
const module_router = router;
module.exports = module_router
const express = require('express');
const { uploadFiles } = require('../utils/fileUpload');
const { update_basic, get_all_basic } = require('../controllers/basic_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_basic)
    .patch(uploadFiles, update_basic)



const basic_router = router;
module.exports = basic_router
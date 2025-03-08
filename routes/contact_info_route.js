const express = require('express');
const { update_contact_Info, get_all_contact_info } = require('../controllers/contact_info_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_contact_info)
    .patch(update_contact_Info)

const contact_info_router = router;
module.exports = contact_info_router
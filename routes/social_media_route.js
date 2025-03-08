const express = require('express');
const { update_social_media, get_all_social_media } = require('../controllers/social_media_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_social_media)
    .patch(update_social_media)


const social_media_router = router;
module.exports = social_media_router
const express = require('express');
const { get_airs } = require('../controllers/flight_controller');
const router = express.Router();

router
    .route('/')
    .post(get_airs)


const air_router = router;
module.exports = air_router
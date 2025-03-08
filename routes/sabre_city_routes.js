const express = require('express');
const { get_all_cities } = require('../controllers/sabre_city_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_cities)


const city_router = router;
module.exports = city_router
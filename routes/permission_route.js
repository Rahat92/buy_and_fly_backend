const express = require('express');
const { update_a_permission, get_all_permissions, create_a_permission, get_a_permission } = require('../controllers/permission_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_permissions)
    .post(create_a_permission)

router
    .route('/:permission_name')
    .get(get_a_permission)
    .patch(update_a_permission)



const permission_router = router;
module.exports = permission_router




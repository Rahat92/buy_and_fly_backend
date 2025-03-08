const express = require('express');
const { update_a_role, get_all_roles, create_a_role, get_a_role, update_a_role_permission } = require('../controllers/role_controller');
const router = express.Router();

router
    .route('/')
    .get(get_all_roles)
    .post(create_a_role)

router
    .route('/permissions/:id')
    .patch(update_a_role_permission)

router
    .route('/:id')
    .get(get_a_role)
    .patch(update_a_role)




const role_router = router;
module.exports = role_router
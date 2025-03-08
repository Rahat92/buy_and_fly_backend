const express = require('express');
const router = express.Router();
const { create_a_user_permission, get_all_user_permissions, delete_a_user_permission, create_or_delete_user_permissions } = require('./../controllers/user_permission_controller')
router
    .route('/')
    .get(get_all_user_permissions)
    .post(create_a_user_permission)

router
    .route('/create-or-delete-user-permissions')
    .delete(create_or_delete_user_permissions)

router
    .route('/delete/:user_permission_id')
    .delete(delete_a_user_permission)

const user_permission_router = router;
module.exports = user_permission_router
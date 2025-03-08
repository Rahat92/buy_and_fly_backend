const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_user_permissions = catchAsyncError(async (req, res) => {
    const all_user_permissions = await prisma.userPermission.findMany()
    res.status(200).json({
        status: 'Success',
        data: {
            all_user_permissions
        }
    })
})
exports.create_a_user_permission = catchAsyncError(async (req, res) => {
    const { userId, permissionId } = req.body;
    const user_permission = await prisma.userPermission.create({
        data: {
            userId,
            permissionId
        }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            user_permission
        }
    })
})
exports.create_or_delete_user_permissions = catchAsyncError(async (req, res) => {
    const { user_id, removed_items, add_items } = req.body;
    console.log(req.body)
    const add_items_obj_arr = add_items.map((item, i) => (
        { userId: user_id, permissionId: item.id }
    ))
    const user_permission = await prisma.userPermission.createMany({
        data: [...add_items_obj_arr]
    })
    const remove_items_obj_arr = removed_items.map((item, i) => (
        item.id
    ))
    await prisma.userPermission.deleteMany({
        where: {
            userId:user_id,
            permissionId: {
                in: [...remove_items_obj_arr]
            }
        }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            user_permission
        }
    })
})

exports.delete_a_user_permission = catchAsyncError(async (req, res) => {
    const { user_permission_id } = req.params;
    await prisma.userPermission.delete({
        where: {
            id: user_permission_id
        }
    })
    res.status(200).json({
        status: "Success",
        message: "Successfully delete user permissions"
    })
})

exports.update_a_user_permission = catchAsyncError(async (req, res) => {
    const role = await prisma.user_permissions.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })
    res.status(200).json({
        status: 'Success',
        data: {
            role
        }
    })
})
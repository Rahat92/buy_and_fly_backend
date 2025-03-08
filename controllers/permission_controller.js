const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_permissions = catchAsyncError(async (req, res) => {
    const all_permissions = await prisma.permission.findMany()
    res.status(200).json({
        status: 'Success',
        data: {
            all_permissions
        }
    })
})
exports.get_a_permission = catchAsyncError(async (req, res) => {
    const permission = await prisma.permission.findUnique({
        where: {
            name: req.params.permission_name
        },
        include: {
            userPermissions: {
                select: {
                    actions: true
                }
            }
        }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            permission
        }
    })
})
exports.create_a_permission = catchAsyncError(async (req, res) => {
   const permission = await prisma.permission.create({
        data: {
            name:req.body.name,
            moduleId: req.body.moduleId
        }
   })
    res.status(200).json({
        status: 'Success',
        data: {
            permission
        }
    })
})
exports.update_a_permission = catchAsyncError(async (req, res) => {
    const role = await prisma.permission.update({
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
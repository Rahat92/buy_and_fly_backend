const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_roles = catchAsyncError(async (req, res) => {
    const all_roles = await prisma.role.findMany()
    res.status(200).json({
        status: 'Success',
        data: {
            all_roles
        }
    })
})
exports.create_a_role = catchAsyncError(async (req, res) => {
    const role = await prisma.role.create({
        data: {
            name: req.body.name.toUpperCase()
        }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            role
        }
    })
})
exports.get_a_role = catchAsyncError(async (req, res) => {
    console.log(req.params.id)
    const role = await prisma.user_role.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            role
        }
    })
})

exports.update_a_role = catchAsyncError(async (req, res) => {
    const role = await prisma.user_role.update({
        where: {
            id: Number(req.params.id)
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

exports.update_a_role_permission = catchAsyncError(async (req, res) => {
    const { permissions } = req.body;
    const {id} = req.params;
    console.log(req.body)
    console.log('iiiid',id)
    const role = await prisma.user_role.update({
        where: {
            id: Number(id)
        },
        data: { permissions }
    })
    res.status(200).json({
        status: 'Success',
        data: {
            role
        }
    })
})
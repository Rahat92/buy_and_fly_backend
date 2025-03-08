const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.create_a_user_role = catchAsyncError(async (req, res) => {
    const {userId, roleId} = req.body;
    await prisma.userRole.create({
        data: {
            userId,
            roleId
        }
    })
    res.status(200).json({
        status: 'Success',
        message: "Successfully created a user role",
    })
})
const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_basic = catchAsyncError(async (req, res) => {
    const basic = await prisma.basic.findMany()
    res.status(200).json({
        status: 'Success',
        data: {
            basic
        }
    })
})
exports.update_basic = catchAsyncError(async (req, res) => {
    const { basic_id } = req.params;
    await prisma.basic.update({
        where: {
            basic_id
        },
        data: req.body,
    })
    res.status(200).json({
        status: 'Success',
        message: 'Basic data update successfully'
    })
})

exports.update_basic 
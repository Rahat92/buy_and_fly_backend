const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_modules = catchAsyncError(async (req, res) => {
    const all_modules = await prisma.module.findMany({
        include: {
            permissions: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    res.status(200).json({
        status: 'Success',
        data: {
            all_modules
        }
    })
})
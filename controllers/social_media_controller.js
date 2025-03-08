const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_social_media = catchAsyncError(async (req, res) => {
    const all_social_media = await prisma.social_media.findMany()
    res.status(200).json({
        status: 'Success',
        data: {
            all_social_media
        }
    })
})

exports.update_social_media = catchAsyncError(async (req, res) => {    
    console.log(req.body)
    
    await prisma.social_media.upsert({
        where: {
            social_media_id: 1
        },
        update: req.body,
        create: {social_media_id: 1, ...req.body}
    })
    res.status(200).json({
        status:'Success',
        message: 'Basic data update successfully'
    })
})
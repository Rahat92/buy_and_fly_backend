const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

exports.get_all_contact_info = catchAsyncError(async (req, res) => {
    const all_contact_info = await prisma.contact_info.findMany()
    res.status(200).json({
        status: 'Success',
        data: all_contact_info
    })
})

exports.update_contact_Info = catchAsyncError(async (req, res) => {
    const contactInfo = await prisma.contact_info.upsert({
        where: { contact_info_id: 1 }, // Assuming `id` is a primary key and always 1
        update: req.body,
        create: { contact_info_id: 1, ...req.body }, // Ensure the row always has the same ID
    });

    res.status(200).json({
        message: 'contact_info updated successfully.',
        data: contactInfo,
    });
})
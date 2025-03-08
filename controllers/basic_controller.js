const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");


exports.get_all_basic = catchAsyncError(async (req, res) => {
    const basic = await prisma.basic.findMany()
    console.log('basic', basic)
    res.status(200).json({
        status: 'Success',
        data: {
            basic
        }
    })
})
exports.update_basic = catchAsyncError(async (req, res) => {
    const basic_logo = req.files&&req.files.mainLogo&&req.files.mainLogo[0].filename
    const basic_favicon = req.files&&req.files.favicon&&req.files.favicon[0].filename
    const basic_flogo = req.files&&req.files.footerLogo&&req.files.footerLogo[0].filename
    const obj = {
        basic_company: req.body.companyName,
        basic_title: req.body.companyTitle,
    }

    if(basic_logo){
        obj.basic_logo = req.files.mainLogo[0].filename
    }
    if(basic_favicon){
        obj.basic_favicon = req.files.favicon[0].filename
    }
    if(basic_flogo){
        obj.basic_flogo = req.files.footerLogo[0].filename
    }
    const basic = await prisma.basic.upsert({
        where: { basic_id: 1 },
        update:  obj,
        create: { basic_id: 1, ...obj }
    });


    res.status(200).json({
        message: 'basic updated successfully.',
        data: basic,
    });
})
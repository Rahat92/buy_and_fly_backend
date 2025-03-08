const multer = require('multer');
const sharp = require('sharp')
const path = require('path');

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const customName = `${file.fieldname}${ext}`; // Create custom file name
        cb(null, customName);
    }
})
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error('Not an image'), false)
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

exports.uploadFiles = upload.fields([
    { name: 'mainLogo' },
    { name: 'favicon' },
    { name: 'footerLogo' },
])

// exports.resizeUploadedImage = (async (req, res, next) => {
//     if (!req.file) return

//     req.body.image = Date.now();
//     await sharp(req.file.buffer)
//         // .resize(132, 170)
//         .resize(300, 80)
//         .toFormat("jpeg")
//         .jpeg({ quality: 80 })
//         .toFile(`public/${req.body.signature}`);

//     // // 2) Images
//     // req.body.images = [];

//     // await Promise.all(
//     //   req.files.images.map(async (file, i) => {
//     //     const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//     //     await sharp(file.buffer)
//     //       .resize(2000, 1333)
//     //       .toFormat("jpeg")
//     //       .jpeg({ quality: 90 })
//     //       .toFile(`public/img/tours/${filename}`);

//     //     req.body.images.push(filename);
//     //   })
//     // );

//     next();
// });


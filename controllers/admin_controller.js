const catchAsyncError = require("../utils/catchAsyncError");
const prisma = require("../utils/db_connection");

// exports.get_all_admin = catchAsyncError(async (req, res, next) => {
//     let page = req.query.currentPage;
//     let limit = 3;
//     let skip = (page - 1) * limit;
//     const totalRecords = await prisma.user.count({
//         where: {
//             isActive: true,
//             roleId: {
//                 not: 2,
//             },
//             OR: [
//                 {
//                     name: {
//                         contains: req.query.name
//                     }
//                 },
//                 {
//                     email: {
//                         contains: req.query.name
//                     }
//                 }
//             ]
//         }
//     });

//     const users = await prisma.user.findMany({
//         where: {
//             isActive: true,
//             roleId: {
//                 not: 2,
//             },
//             OR: [
//                 {
//                     name: {
//                         contains: req.query.name
//                     }
//                 },
//                 {
//                     email: {
//                         contains: req.query.name
//                     }
//                 }
//             ],
//         },
//         include: {
//             role: {
//                 select: {
//                     name: true
//                 }
//             }
//         },
//         orderBy: {
//             createdAt: 'desc'
//         },
//         skip,
//         take: limit
//     })

//     const totalPages = Math.ceil(totalRecords / limit);
//     res.status(200).json({
//         currentPage: page,
//         totalPages,
//         limit,
//         totalRecords,
//         status: 'Success',
//         data: {
//             users
//         }
//     })
// })
exports.get_all_admins = catchAsyncError(async (req, res, next) => {
    let page = req.query.currentPage || 1; // Default to page 1 if not provided
    let limit = 3;
    let skip = (page - 1) * limit;

    // Count total records of users with the "SUPERADMIN" role
    const totalRecords = await prisma.user.count({
        where: {
            roles: {
                some: {
                    role: {
                        name: 'SUPERADMIN' // Filter users who have the "SUPERADMIN" role
                    }
                }
            }
        }
    });

    // Fetch users with the "SUPERADMIN" role
    const users = await prisma.user.findMany({
        where: {
            roles: {
                some: {
                    role: {
                        name: 'SUPERADMIN' // Filter users who have the "SUPERADMIN" role
                    }
                }
            }
        },
        include: {
            permissions: {
                include: {
                    permission: {
                        select: {
                            name: true
                        }
                    }
                }
            },
            roles: {
                include: {
                    role: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        skip,
        take: limit
    });
    console.log(users)
    res.status(200).json({
        status: 'Success',
        data: {
            users
        },
        pagination: {
            currentPage: page,
            limit,
            totalRecords
        }
    });
});

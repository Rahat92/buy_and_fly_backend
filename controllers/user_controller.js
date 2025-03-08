const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const catchAsyncError = require("../utils/catchAsyncError");
const { hashSync } = require('bcryptjs');
const bcrypt = require('bcryptjs');
const generateRandomPassword = require('../utils/tempPassGen');
const { requestPasswordReset } = require('./auth_controller');
const Email = require('../utils/Mail');
const { permission } = require('../utils/db_connection');

const tokenProducer = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRE_TOKEN,
  });
};

const resAndSendToken = (user, res, statusCode, password) => {
  const token = tokenProducer(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.cookie("token", token, cookieOptions);
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  if (password) {
    new Email(user, `Welcome ${user.name}, your password is ${password}`).sendPassword()
  }
  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

exports.signUp = catchAsyncError(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role, createdBy } = req.body;
  if (password !== passwordConfirm) {
    return res.status(401).json({
      status: "fail",
      message: "Password and Confirm Password doesn't match",
    });
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password),
    }
  });

  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId: "e7561b28-fe23-4dd3-b1e7-cb05ce3df046"
    }
  })
  resAndSendToken(user, res, 201);
});

exports.addUser = catchAsyncError(async (req, res, next) => {
  const { name, email, roleId, createdBy } = req.body;
  console.log(req.body)
  // return
  const pass = generateRandomPassword('0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  const password = pass

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password),
      createdBy
    }
  });
  await prisma.userRole.create({
    data: {
      userId: user.id,
      roleId
    }
  })
  requestPasswordReset(user)
  resAndSendToken(user, res, 201, password);
})

exports.logIn = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    // return next(new AppError(`Please Provide Email and Password`, 400));
    res.status(400).json({
      status: 'Fail',
      message: 'Please Provide Email and Password'
    })
  const user = await prisma.user.findUnique({
    where: {
      email
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
    }
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: 'Fail',
      message: 'Invalid email or password!'
    })
  }
  console.log(user)
  resAndSendToken(user, res, 200);

  // return next(new AppError(`Invalid email or password!`, 400));
});


exports.get_all_users = catchAsyncError(async (req, res, next) => {
  const users = await prisma.user.findMany({
    where: {
      roles: {
        some: {
          role: {
            name: 'USER' // Filter users who have the "Admin" role
          },
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
    }
  })

  res.status(200).json({
    status: 'Success',
    data: {
      users
    }
  })
})
// exports.get_all_users = catchAsyncError(async (req, res, next) => {
//   let page = req.query.currentPage;
//   let limit = 3;
//   let skip = (page - 1) * limit;
//   const totalRecords = await prisma.user.count({
//     where: {
//       isActive: true,
//       roleId:2,
//       OR: [
//         {
//           name: {
//             contains: req.query.name
//           }
//         },
//         {
//           email: {
//             contains: req.query.name
//           }
//         }
//       ]
//     }
//   });

//   const users = await prisma.user.findMany({
//     where: {
//       isActive: true,
//       roleId:2,
//       OR: [
//         {
//           name: {
//             contains: req.query.name
//           }
//         },
//         {
//           email: {
//             contains: req.query.name
//           }
//         }
//       ],
//     },
//     include: {
//       role: {
//         select: {
//           name: true
//         }
//       }
//     },
//     orderBy: {
//       createdAt: 'desc'
//     },
//     skip,
//     take: limit
//   })

//   const totalPages = Math.ceil(totalRecords / limit);
//   res.status(200).json({
//     currentPage: page,
//     totalPages,
//     limit,
//     totalRecords,
//     status: 'Success',
//     data: {
//       users
//     }
//   })
// })


exports.getUser = catchAsyncError(async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.userId
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
    }
  })
  res.status(200).json({
    status: 'Success',
    data: {
      user
    }
  })
})

exports.deactiveAUser = catchAsyncError(async (req, res, next) => {
  // await user.prisma.deleteOne(req.params.id, {
  // isActive: false
  // }, { new: true })
  // return
  await prisma.user.update({
    where: {
      id: Number(req.params.id)
    },
    data: {
      isActive: false
    }
  })
  res.status(200).json({
    status: 'Success',
    message: 'Successfully deactive a user'
  })
})

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const { name, role, permissions } = req.body;
  await prisma.user.update({
    where: {
      id: Number(req.params.userId)
    },
    data: { ...req.body, id: Number(req.params.userId) }
  })
  res.status(200).json({
    status: 'Success',
    message: 'Successfully Update user'
  })
})
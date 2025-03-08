const catchAsyncError = require("../utils/catchAsyncError");
const {promisify} = require('util')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const Email = require("../utils/Mail");
const { hashSync } = require("bcryptjs");
const prisma = require("../utils/db_connection");
dotenv.config()
exports.requestPasswordReset = async(user) => { 
    try {
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TOKEN });
        new Email(user, `http://localhost:8000/api/v1/auth/reset-password/${token}`).sendPasswordReset()
        res.status(200).json({ message: "Password reset email sent" });
    } catch (error) {
        // res.status(500).json({ message: "Error requesting password reset", error });
    }
}


exports.resetPassword = catchAsyncError(async (req, res) => {
    const { reset_token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    console.log(newPassword, confirmPassword)
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            status: 'Fail',
            message: 'Password does not match.'
        })
    }

    try {
        const decoded = jwt.verify(reset_token, process.env.SECRET_KEY)

        console.log(decoded)
        const hashedPassword = hashSync(newPassword);

        await prisma.user.update({
            where: {
                id: decoded.id
            },
            data: {
                password: hashedPassword
            }
        });
        await prisma.user.update({
            where: {
                id: decoded.id
            },
            data: {
                passwordResetToken: null
            }
        })
        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: "Invalid or expired token", error });
    }
})

const UserModel = require('./model');

const PasswordResetModel = require('./modelPR')
// mã hóa mật khẩu
const bcryptjs = require('bcryptjs');
// token
const jwt = require('jsonwebtoken');
// xác thực email
const Mailer = require('../helper/Mailer')



// dang ky
const register = async (data) => {
    try {
        const { email, password, name, role } = data;
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        const user = new UserModel({ email, password: hashPassword, name, role });
        await user.save();
        setTimeout(() => {
            Mailer.sendMail({
                email: user.email,
                subject: 'Xác thực tài khoản',
                content: `Link xác thực tài khoản: http://localhost:3000/verify-user/${user._id}`
            });
        }, 0);
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi đăng kí')
    }
}
// đăng nhập
const login = async (data) => {
    try {
        const { email, password } = data;
        let user = await UserModel.findOne({ email });
        if (!user) throw new Error('Không tìm thấy tài khoản');
        const isMatch = bcryptjs.compareSync(password, user.password);
        if (!isMatch) throw new Error('Mật khẩu không chính xác');
        // xóa field password
        delete user._doc.password
        // taọ tooken gửi kèm thông tin
        const token = jwt.sign(
            { _id: user._id, email: user.email, role: user.role }, //  thông tin lưu vào token
            'token_ne', //process.jwt.JWT_SECRET_KEY, dùng để mã hóa
            { expiresIn: 60 * 60 } // hết hạn khi nào tính từ phải qua đầu tiên là s 
        );
        user = { ...user._doc, token }
        return user;
    } catch (error) {
        console.log(error);
        throw new Error('Có lỗi xảy ra khi đăng nhập')
    }
}

const verify = async (id) => {
    try {
        const user = await UserModel.findById(id);
        if (!user) throw new Error("Không tìm thấy tài khoản");
        if (user.isVerified) throw new Error("Tài khoản đã được xác thực");
        user.isVerified = true;
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}

const fogotPass = async (email) => {
    try {
        // tìm user theo email
        const user = await UserModel.findOne({ email });
        if (!user) throw new Error("Không tìm thấy email")
        const token = jwt.sign(
            { id: user._id, email: user.email }, // thông tin cần lưu vào token
            'token_pss', // key token
            { expiresIn: 1 * 1 * 3 * 60 }// hết hạn khi nào
        )
        const PasswordReset = new PasswordResetModel({ email, token });
        await PasswordReset.save();
        // gửi email khôi phục mật khẩu 
        setTimeout(() => {
            Mailer.sendMail({
                email: user.email,
                subject: 'Khôi phục mật khẩu',
                content: `Link khôi phục mật khẩu: http://localhost:3000/reset-password/${token}`
            });
        }, 0);
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

const checkTokenResetPassword = async (token) => {
    try {
        const decoded = jwt.verify(token, 'token_pss');
        if (decoded) {
            const { email } = decoded;
            const PasswordReset = await PasswordResetModel.findOne({
                email,
                token,
                status: true,
                create_at: { $gte: new Date(Date.now() - 1 * 1 * 3 * 60 * 1000) }
            });
            if (PasswordReset) return true;
            return false
        }
        return false
    } catch (error) {
        console.log(error);
        return false;
    }
}

const resetPassword = async (password) => {
    try {
        const decoded = jwt.verify(token, 'token_pss');
        if (!decoded) throw new Error("Token không hợp lệ");
        const { email } = decoded;
        const PasswordReset = await PasswordResetModel.findOne({
            email,
            token,
            status: true,
            create_at: { $gte: new Date(Date.now() - 1 * 1 * 3 * 60 * 1000) }
        });
        if (PasswordReset) throw new Error("Token không hợp lệ");

        // mã hóa mật khẩu
        const salt = bcryptjs.genSaltSync(10);
        const hashPassword = bcryptjs.hashSync(password, salt);
        const user = new UserModel({ email, password: hashPassword, name, role });
        await user.save();
        // xóa token
        await PasswordResetModel.updateOne({ email, token }, { status: false });
        return true;
    } catch (error) {
        console.log(error);
        return false
    }
}
module.exports = {
    register, login, verify, fogotPass, checkTokenResetPassword, resetPassword
}
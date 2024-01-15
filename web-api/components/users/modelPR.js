const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    create_at: { type: Date, default: Date.now }, // thời gian tạo token
    status: { type: Boolean, default: true }, // trạng thái token, được sử dụng hay không
});

module.exports = mongoose.model('PasswordReset', UserSchema)
    || mongoose.models.User;
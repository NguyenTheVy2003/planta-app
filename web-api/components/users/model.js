const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    name: { type: String, required: true},
    role: {type: Number},
    isVerified: {type: Boolean, default: false}
});

module.exports = mongoose.model('User',UserSchema) 
                        || mongoose.models.User;
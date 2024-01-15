const jwt = require('jsonwebtoken');

const CheckToken = (req,res,next) => {
    try {
        // đọc token từ headers
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            throw new Error("Không tìm thấy token")
        }else{
            // giải mã token
            // sai token, sai key, token hết hạn
            jwt.verify(token,'token_ne', (error,decoded) => {
                if(error){
                    throw new Error("Token không hợp lệ")
                }else{
                    // lưu thông tin giải mã vào req dùng cho các xử lí sau
                    //    { _id: user.id, email: user.email, role: user.role },
                    req.user = decoded;
                    next();
                }
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: error})
    }
}

module.exports = CheckToken;
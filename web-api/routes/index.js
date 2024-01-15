var express = require('express');
var router = express.Router();
const upload = require('../components/helper/Upload')
// http://localhost:8686/

/**
 * http://localhost:8686/upload-file
 * method: POST
 * Cập nhật hình ảnh lên server
 * middleware
 * bắt lỗi from-data, check login, phân quyền, upload-file, ..
 */

router.post('/upload-file', [upload.single('image')], (req, res, next) => {
    if (req.file) {
        // req.file : lưu thông tin file
        // const path = req.file.path.replace('public', '');
        // cmd ----> ipconfig ---> ipv4: 192.168..
        // 10.82.26.77
        console.log(req.file);
        const path =  "http://192.168.1.12:8686/images/" + req.file.filename;
        return res.json({ path: path})
    }
    else {
        res.json({ path: null })
    }
});
module.exports = router;



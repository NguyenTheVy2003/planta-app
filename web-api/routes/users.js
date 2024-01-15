var express = require('express');
var router = express.Router();
const UsersController = require('../components/users/controller');
const CheckToken = require('../components/helper/CheckToken');
const CheckRole = require('../components/helper/CheckRole');

// http://localhost:8686/users


/**
 * http://localhost:8686/users/login
 * method: POST
 * Đăng nhập email và password
 */

router.post('/login', async (req, res, next) => {
  try {
    const body = req.body;
    const user = await UsersController.login(body);
    res.status(200).json({ status: true, user })
  } catch (error) {
    res.status(500).json({ success: false, error: error })
  }
})


/**
 * http://localhost:8686/users/register
 * method: POST
 * Đăng kí email và password
 */
router.post('/register', async (req, res, next) => {
  try {
    const body = req.body;
    await UsersController.register(body);
    res.status(200).json({ status: true })
  } catch (error) {
    res.status(500).json({ success: false, error: error })
  }
})

/**
 * http://localhost:8686/users/update-profile
 * method: POST
 * Cập nhật thông tin user
 */

/**
 * http://localhost:8686/users/logout
 * method: GET
 * thoát tài khoản
 */

/**
 * http://localhost:8686/users/change-password
 * method: POST
 * Cập nhật mật khẩu
 */

router.get('/', function (req, res, news) {
  res.json({ Message: 'DangNhap' })
})

// api test token
//http://localhost:8686/users/test-token
// authentication: chứng thực
// authorization : phân quyền

router.get('/test-token', [CheckToken, CheckRole.CheckRoleAdmin], (req, res, next) => {
  try {
    console.log('======>', req.user);
    res.status(200).json({ success: true, Message: 'thành công' })
  } catch (error) {
    res.status(401).json({ success: fale, Message: 'Không thành công' })
  }
})

//
/**
 * http://localhost:8686/users/verify/:id
 * method: POST
 * Xác thực tài khoản
 */
router.post('/verify/:id', async (req, res, next) => {
  try {
    const { id } = req.body;
    const resuslt = await UsersController.verify(id);
    res.status(200).json({ status: resuslt })
  } catch (error) {
    res.status(500).json({ status: false, error: error })
  }
})
/**
 * http://localhost:8686/users/reset-password/:token
 * method: POST
 * Xác thực token 
 * 
 * 
 */
/**
 * http://localhost:8686/users/forgot-password
 * method: POST
 * Quyên mật khẩu
 */
router.post('/forgot-password', async (req, res, next) => {
  try {
    const { email } = req.body;
    const resuslt = await UsersController.fogotPass(email);
    res.status(200).json({ status: resuslt })
  } catch (error) {
    res.status(500).json({ status: false, error: error })
  }
})


/**
 * http://localhost:8686/users/check-token-reset-password
 * method: POST
 * Gửi token
 */
router.post('/check-token-reset-password', async (req, res, next) => {
  try {
    const { token } = req.body;
    const resuslt = await UsersController.checkTokenResetPassword(token);
    res.status(200).json({ status: resuslt })
  } catch (error) {
    res.status(500).json({ status: false, error: error })
  }
})

module.exports = router;

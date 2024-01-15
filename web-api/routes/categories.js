var express = require('express');
var router = express.Router();
const CategoryController = require('../components/categories/controller');
// http://localhost:8686/categories


/**
 * http://localhost:8686/categories
 * method: GET
 * lấy danh sách danh mục
 */
router.get('/', async (req, res, next) => {
  try {
    const categories = await CategoryController.getAll();
    return res.status(200).json(categories);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Có lỗi xảy ra' });
  }
})


/**
 * http://localhost:8686/categories/1
 * method: GET
 * lấy chi tiết 1 danh mục có id:1
 */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await CategoryController.getOneById(id)
    return res.status(200).json(category);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Có lỗi xảy ra nè' });
  }
})



/**
 * http://localhost:8686/categories
 * method: POST
 * thêm mới 1 danh mục
 */

router.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    await CategoryController.addNews(body);
    return res.status(200).json({ Message: 'Thêm mới thành công' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Có lỗi xảy ra nè' });
  }
})

/**
 * http://localhost:8686/categories/1
 * method: PUT
 * cập nhật danh mục có id:1
 */
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await CategoryController.updateById(id, body)
    return res.status(200).json({ Message: 'Cập nhật thành công' });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Có lỗi xảy ra nè' });
  }
})

/**
 * http://localhost:8686/categories/1
 * method: DELETE
 * xóa danh mục có id:1
 */

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await CategoryController.deleteById(id);
    return res.status(200).json({ Message: 'Xóa thành công' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: 'Có lỗi xảy ra nè' });
  }
}
)

module.exports = router;



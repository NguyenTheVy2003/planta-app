var express = require('express');
var router = express.Router();
const ProductController = require('../components/products/controller')
const Validation = require('../components/helper/Validation')
// http://localhost:8686/products


/**
 * // http://localhost:8686/products?size=10&page=1
 * method: GET
 * lấy danh sách sản phẩm
 */

router.get('/', async (req, res, next) => {
    try {
        const { size, page } = req.query;
        const product = await ProductController.getAll(size, page);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})

/**
 * // http://localhost:8686/products/search/name?keyword=abc
 * method: GET
 * tìm kiếm các sản phẩm có chứa từ khóa
 */

router.get('/search/name', async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const product = await ProductController.searchByName(keyword);
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})



/**
 * // http://localhost:8686/products/1
 * method: GET
 * lấy chi tiết 1 sản phẩm theo id
 */

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductController.getOneById(id);
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})




/**
 * // http://localhost:8686/products/
 * method: POST
 * thêm mới 1 sản phẩm
 */

router.post('/', [Validation.ValidateProduct], async (req, res, next) => {
    try {
        const { body } = req;
        await ProductController.addNews(body);
        return res.status(200).json({ Message: 'Thêm mới sản phẩm thành công' });
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})


/**
 * // http://localhost:8686/products/1
 * method: PUT
 * cập nhật sản phẩm có id: 1
 */

router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        await ProductController.update(id, body)
        return res.status(200).json({ Message: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})


/**
 * // http://localhost:8686/product/1
 * method: DELETE
 * xóa sản phẩm có id: 1
 */

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await ProductController.remove(id);
        return res.status(200).json({ Message: 'Xóa sản phẩm thành công' });
    } catch (error) {
        return res.status(500).json({ Message: 'Có lỗi xảy ra' })
    }
})


module.exports = router;



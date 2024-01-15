const CategoryModel = require('./model')
const ProductModel = require("../products/model")

// lấy danh sách danh mục
const getAll = async () => {
    try {
        // select * from categories
        const categories = await CategoryModel.find({})
        return categories;
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Có lỗi xảy ra');
    }
}

// lấy chi tiết 1 danh mục
const getOneById = async (id) => {
    try {
        const category = await CategoryModel.findById(id);
        return category;
    } catch (error) {
        console.log('error: ', error);
        throw new Error('Có lỗi xảy ra');
    }
}

// thêm mới danh mục
const addNews = async (data) => {
    try {
        const { name, description } = data;
        const category = new CategoryModel({ name, description });
        await category.save();
    } catch (error) {
        console.log(error);
        throw new Error('Thêm mới thất bại')
    }
}
const addNewsProductByCategory = async (product) => {
    try {
        const upproduct = new CategoryModel.findOne({ $set: {product} });
        await upproduct.save();
    } catch (error) {
        throw new Error('Thêm sản phẩm thất bại')
    }
}

// update danh mục theo id
const updateById = async (id, data) => {
    try {
        const { name, description } = data;
        const category = await CategoryModel.findById(id)
        if (category) {
            category.name = name;
            category.description = description;
            await category.save();
        }
        else {
            throw new Error('Không tìm thấy danh mục')
        }
    } catch (error) {
        console.log(error);
        throw new Error('Update danh mục thất bại')
    }
}

// xoá danh mục theo id,
const deleteById = async (id) => {
    const categories = await ProductModel.find({ category_id: id })
    try {
        if (categories.length == 0) {
            await CategoryModel.findByIdAndDelete(id)

        }
        else {
            throw new Error('trung khoa ngoai');
        }

    } catch (error) {
        console.log(error);
        throw new Error('Xóa thất bại')
    }
}

module.exports = {
    getAll, getOneById, addNews, updateById, deleteById
}
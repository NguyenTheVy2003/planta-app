const CareAccessorieModle = require('./model');

// lấy danh sách sản phẩm
const getAll = async (size, page) => {
    try {
        size = size ? parseInt(size) : 10;
        page = page ? parseInt(page) : 1;
        const skip = (page - 1) * size // bỏ qua bao nhiêu sản phẩm đầu tiên;
        // page = 1 -> skip = 0;
        // page = 2 -> skip = 10;

        // query
        let query = {};
        // lấy sản phẩm có tên là iphone
        // select * from products where name = 'iphone' and pirce = 1000
        // query = {name: 'iphone', pirce : 1000};

        // lấy sản phẩm có giá lớn hơn 50 hoặc số lượng nhỏ hơn 100
        // select * from products where price > 50 or quantity < 100
        // query = { $or: [{ price: { $gt: 50 } }, { quantity: { $lt: 100 } }] };

        // lấy sản phẩm có giá lớn hơn 50 và giá nhỏ hơn 100
        // select * from products where price > 50 or quantity < 100
        query = { $and: [{ price: { $gt: 50 } }, { price: { $lt: 200 } }] };
        // cách 2: 
        // query = { price: { $gt: 50, $lt: 100 } };

        // lấy cột :
        let columns = 'name price quantity';

        // sắp xếp theo tên giảm dần
        let sort = { name: -1 }; // -1 = giảm dần 1 = tăng dần
        const product = await CareAccessorieModle.find()
            // .sort(sort)
            // .skip(skip)
            // .limit(size);
        return product;
    } catch (error) {
        throw new Error('Lấy danh sách sản phẩm thất bại')
    }
}
//lấy chi tiết 1 sản phẩm
const getOneById = async (id) => {
    try {
        const product = await CareAccessorieModle.findById(id);
        return product;
    } catch (error) {
        throw new Error('Lấy chi tiết sản phẩm thất bại')
    }
}
// tìm kiểm sản phẩm theo từ khóa
const searchByName = async (name) => {
    try {
        // select * from products where name like '%iphone'
        const product = await CareAccessorieModle.find({ name: { $regex: name, $options: 'i' } });
        return product;
    } catch (error) {
        throw new Error('Tìm kiếm sản phẩm thất bại')
    }
}
// thêm sản phẩm
const addNews = async (data) => {
    try {
        const { name, price, origin, size, image } = data;
        const product = new CareAccessorieModle({
            name, price, origin, size, image
        });
        await product.save();
    } catch (error) {
        throw new Error('Thêm sản phẩm thất bại')
    }
}
// cập nhật sản phẩm
const update = async (id, data) => {
    try {
        const {   name, price, origin, size, image, status} = data;
        const product = await CareAccessorieModle.findById(id);
        if (!product) throw new Error('Không tìm thấy sản phẩm');
        product.name = name || product.name;
        product.price = price || product.price;
        product.origin = origin || product.origin;
        product.image = image || product.image;
        product.size = status || product.size;
        await product.save();
    } catch (error) {
        throw new Error('Sửa sản phẩm thất bại');
    }
}
// xóa sản phẩm theo id 
const remove = async (id) => {
    try {
      await CareAccessorieModle.findByIdAndDelete(id);
    } catch (error) {
        console.log(error);
        throw new Error('Xóa thất bại')
    }
}


    module.exports = {
        getAll, getOneById, searchByName, addNews, update, remove
    }
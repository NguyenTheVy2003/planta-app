const ValidateProduct = (req,res,next)=>{
    try {
        const {name, price, quantity} = req.body;
        if(!name)
        {
            throw new Error("Tên sản phẩm không được để trống");
        } 
        if(isNaN(quantity)) {
            throw new Error("Số lượng sản phẩm không hợp lệ")
        }
        if(!quantity){
            throw new Error("Số lượng sản phẩm không hợp lệ")
        }
        if(!price || price < 0) {   
            throw new Error("giá sản phẩm không hợp lệ")
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const ValidatePlantPost = (req,res,next)=>{
    try {
        const {name, price, origin, size, status} = req.body;
        if(!name)
        {
            throw new Error("Tên sản phẩm không được để trống");
        } 
        if(isNaN(price)) {
            throw new Error("Số tiền sản phẩm không hợp lệ")
        }
        if(!price || !origin || !size || !status){
            throw new Error("Số lượng sản phẩm không hợp lệ")
        }
        if(!price || price < 0) {   
            throw new Error("giá sản phẩm không hợp lệ")
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const ValidateCareAccessorie = (req,res,next)=>{
    try {
        const {name, size, origin, price} = req.body;
        if(!name)
        {
            throw new Error("Tên sản phẩm không được để trống");
        } 
        if(isNaN(price)) {
            throw new Error("Số tiền sản phẩm không hợp lệ")
        }
        if(!price || !origin || !size ){
            throw new Error("không hợp lệ")
        }
        if(!price || price < 0) {   
            throw new Error("giá sản phẩm không hợp lệ")
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}



module.exports = {
    ValidateProduct, ValidatePlantPost, ValidateCareAccessorie
}
// 1: user
// 2: manager
// 3 : admin

const CheckRoleManager = (req, res, next) => {
    try {
        const { user } = req;
        if (user.role < 2) {
            throw new Error("Bạn không có quyền truy cập")
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            Message: "Bạn Không có quyền truy cập"
        })
    }
}

const CheckRoleAdmin = (req, res, next) => {
    try {
        const { user } = req;
        if (user.role < 3) {
            throw new Error("Bạn không có quyền truy cập")
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            Message: "Bạn Không có quyền truy cập"
        })
    }
}

module.exports = {
    CheckRoleManager, CheckRoleAdmin
}
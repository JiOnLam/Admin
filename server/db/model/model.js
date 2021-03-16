//模型层

//收编所有模型
const User = require(path.resolve(__basename,'db/model/user.js'));
const Code = require(path.resolve(__basename,'db/model/code.js'));
const Type = require(path.resolve(__basename,'db/model/Type.js'));
const UserType = require(path.resolve(__basename,'db/model/userType.js'));
const Product = require(path.resolve(__basename,'db/model/product.js'));
const ProductType = require(path.resolve(__basename,'db/model/productType.js'));
const UserProduct = require(path.resolve(__basename,'db/model/UserProduct.js'));


//导出所有模型
module.exports = {
    User,
    Code,
    Type,
    UserType,
    Product,
    ProductType,
    UserProduct
}
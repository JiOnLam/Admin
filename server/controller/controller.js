//控制器层

//收编所有控制器
let register = require(path.resolve(__basename,'controller/register.js'));
let login = require(path.resolve(__basename,'controller/login.js'));
let sendVaildCode = require(path.resolve(__basename,'controller/sendVaildCode.js'));
let createType = require(path.resolve(__basename,'controller/createType.js'));
let findTypeList = require(path.resolve(__basename,'controller/findTypeList.js'));
let toggleTypeStatus = require(path.resolve(__basename,'controller/toggleTypeStatus.js'));
let typeDataByTypeId = require(path.resolve(__basename,'controller/findTypeDataByTypeId.js'));
let editType = require(path.resolve(__basename,'controller/editType.js'));
let removeType = require(path.resolve(__basename,'controller/removeType.js'));
let typeCount = require(path.resolve(__basename,'controller/typeCount.js'));
let findUserInfo = require(path.resolve(__basename,'controller/findUserInfo.js'));
let postProduct = require(path.resolve(__basename,'controller/postProduct.js'));
let typeData = require(path.resolve(__basename,'controller/findTypeData.js'));
let productList = require(path.resolve(__basename,'controller/findProductList.js'));
let findProductCount = require(path.resolve(__basename,'controller/findProductCount.js'));
let toggleProductStatus = require(path.resolve(__basename,'controller/toggleProductStatus.js'));
let removeProduct = require(path.resolve(__basename,'controller/removeProduct.js'));
let productByProId = require(path.resolve(__basename,'controller/findProductByProId.js'));
let editProduct = require(path.resolve(__basename,'controller/editProduct.js'));

module.exports = {
    //注册界面
    register,
    login,
    //发送验证码
    sendVaildCode,
    //创建商品类型
    createType,
    //查询商品类型列表
    findTypeList,
    //切换商品类型状态
    toggleTypeStatus,
    //根据typeId查询商品类型数据
    typeDataByTypeId,
    //根据typeId编辑商品类型数据
    editType,
    //移除商品类型(假删除)
    removeType,
    //查询商品类型总数量
    typeCount,
    //获取用户信息
    findUserInfo,
    //发布商品
    postProduct,
    //查询商品类型
    typeData,
    //查询商品列表
    productList,
    //查询商品总数量
    findProductCount,
    //切换商品状态
    toggleProductStatus,
    //删除商品
    removeProduct,
    //根据proId查询商品数据
    productByProId,
    //根据proId编辑商品数据
    editProduct
}
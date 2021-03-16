//路由层


//导入控制器层
const controller = require(path.resolve(__basename, 'controller/controller.js'));

module.exports = app => {
    console.log('执行路由');

    //manage
    //注册
    app.post('/register', controller.register);

    //登录
    app.post('/login', controller.login);

    //发送验证码
    app.post('/sendVaildCode', controller.sendVaildCode);

    //创建商品类型
    app.post('/createType', controller.createType);

    //查询商品类型列表
    app.get('/findTypeList', controller.findTypeList);

    //切换商品类型
    app.post('/toggleTypeStatus', controller.toggleTypeStatus);

    //根据typeId查询商品类型数据
    app.get('/typeDataByTypeId', controller.typeDataByTypeId);

    //根据typeId编辑商品类型数据
    app.post('/editType', controller.editType);

    //移除商品类型(假删除)
    app.post('/removeType', controller.removeType);

    //查询商品类型总数量
    app.get('/typeCount', controller.typeCount);


    //获取用户信息
    app.get('/userInfo', controller.findUserInfo);
    //发布商品
    app.post('/postProduct',controller.postProduct);
    //查询商品类型
    app.get('/typeData', controller.typeData);
    
    //查询商品列表
    app.get('/productList', controller.productList);
    //查询商品总数量
    app.get('/productCount',controller.findProductCount)
    //切换商品状态
    app.post('/productStatus',controller.toggleProductStatus)
    //移除商品
    app.post('/removeProduct',controller.removeProduct);
    //根据proId查询商品数据
    app.get('/productByProId',controller.productByProId);
    //根据proId编辑商品数据
    app.post('/editProduct',controller.editProduct);

}
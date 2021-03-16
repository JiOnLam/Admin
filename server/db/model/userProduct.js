//用户和商品类型的关系模型

//导入sequelize,并且解构DataTypes,Model
const { DataTypes, Model } = require('sequelize');

//创建UserProduct模型并继承Model基类
class UserProduct extends Model { }

UserProduct.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '表id'
    },
    userId: {
        //UUID会自动转成char(36)
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '用户id'
    },
    proId: {
        //UUID会自动转成char(36)
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '商品id'
    },
},{
    sequelize,

    tableName:'user_product'
})

UserProduct.sync({force:false});

module.exports = UserProduct;
//用户和商品类型的关系模型

//导入sequelize,并且解构DataTypes,Model
const { DataTypes, Model } = require('sequelize');

//创建ProductType模型并继承Model基类
class ProductType extends Model { }

ProductType.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '表id'
    },
    typeId: {
        //UUID会自动转成char(36)
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '类型id'
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

    tableName:'product_type'
})

ProductType.sync({force:false});

module.exports = ProductType;
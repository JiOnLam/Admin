//商品模型

//导入sequelize,并且结构DataTypes,Model
const { DataTypes, Model } = require('sequelize');

//创建Product模型并且继承Model基类
class Product extends Model { }

//定义模型字段
Product.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '表id'
    },
    name:{
        type:DataTypes.STRING(32),
        allowNull:false,
        defaultValue:'',
        comment:"商品名称"
    },
    enname:{
        type:DataTypes.STRING(32),
        allowNull:false,
        defaultValue:'',
        comment:"商品英文名称"
    },
    proId: {
        //UUID会自动转成char(36)
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '商品id',
        //索引,是否具有唯一性
        unique: true
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        comment: '商品价格'
    },

    img: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: '商品图片'
    },

    detailImg: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
        comment: '详情图片'
    },

    desc: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: '',
        comment: '商品描述'
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '状态0正常1冻结'
    },

    remove: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否删除商品0正常1删除'
    }
}, {
    //将模型映射到数据库中
    sequelize,

    //定义表名 
    tableName: 'product',
})

//Product模型同步到mysql
Product.sync({ force: false });

module.exports = Product;
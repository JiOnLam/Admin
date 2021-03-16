//商品类型模型

//导入sequelize,并且解构DataTypes,Model
const { DataTypes, Model } = require('sequelize');

//创建Type模型并继承Model基类
class Type extends Model { }

Type.init({
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
        comment: '类型id',
        //索引,是否具有唯一性
        unique: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '',
        comment: '类型名称'
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '类型状态正常0冻结1'
    },

    remove:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0,
        comment:'是否删除类型0正常1已删除'
    }
},{
    sequelize,

    tableName:'type'
})

Type.sync({force:false});

module.exports = Type;
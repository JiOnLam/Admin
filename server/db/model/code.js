//用户模型

//导入sequelize,并且解构DataTypes,Model
const { DataTypes, Model } = require('sequelize');

//创建Code模型并继承Model基类
class Code extends Model { }

Code.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: '表id'
    },
    codeId: {
        //UUID会自动转成char(36)
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '验证码id',
        //索引,是否具有唯一性
        unique: true
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '',
        comment: '注册邮箱'
    },

    code: {
        type: DataTypes.STRING(12),
        allowNull: false,
        defaultValue: '',
        comment: '验证码'
    },
},{
    sequelize,

    tableName:'code'
})

Code.sync({force:false});

module.exports = Code;

//连接数据库

//导入Sequelize，解构Sequelize
const { Sequelize } = require('sequelize');

//导出连接实例
module.exports = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.user, config.mysqlOptions.password, {
    host: config.mysqlOptions.host,
    dialect: config.mysqlOptions.dialect,
    define: {
        //具有多个单词组成的字段名以_分隔,比如userId=>user_id
        underscored: config.mysqlOptions.underscored
    },
    //东八区
    timezone: config.mysqlOptions.timezone
});
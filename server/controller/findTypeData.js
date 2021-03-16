
//查询商品类型
module.exports = (req, res) => {
    console.log('req==>', req.userId)
    // let sql = "select `t`.`type_id` as `typeId`,`t`.`name`,`t`.`status`,`t`.`created_at` as `createdAt`,`t`.`updated_at` as `updatedAt` from `type` as `t` inner join `user_type` as `ut` on `ut`.`type_id` = `t`.`type_id` and `ut`.`user_id`= :userId and `t`.`remove` = 0 order by `t`.`created_at` DESC"
    let sql = "SELECT `t`.`type_id` AS `typeId`, `t`.`name`, `t`.`status`, `t`.`created_at` AS `createdAt`, `t`.`updated_at` AS `updatedAt` FROM `type` AS `t` INNER JOIN `user_type` AS `ut` ON `ut`.`type_id` = `t`.`type_id` AND `ut`.`user_id` = :userId AND `t`.`remove` = 0 ORDER BY `t`.`created_at` DESC"
    

    api.queryData(sql, 'SELECT', {
        userId: req.userId
    }).then((result) => {
        res.send({ msg: '查询商品类型成功', status: 1530, data: result });
    }).catch(err => {
        console.log(err);
        res.send({ msg: '查询商品类型失败', status: 1531 });
    })
}
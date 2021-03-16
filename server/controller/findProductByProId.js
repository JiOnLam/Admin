//manage

//根据proId查询商品类型数据
module.exports = (req, res) => {
    console.log(req.query)
    let sql = "SELECT `p`.`pro_id` AS `pro_id`,`p`.`name`,`p`.`enname`,`p`.`price`,`p`.`img`,`p`.`detail_img` AS `detailImg`,`p`.`status`,`p`.`created_at` AS `createdAt`,`p`.`updated_at` AS `updatedAt`,`pt`.`type_id` AS `typeId`,`p`.`desc` FROM `product` AS `p` INNER JOIN `product_type` AS `pt` ON `p`.`pro_id` = `pt`.`pro_id` INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id` INNER JOIN `user_product` AS `up` ON `up`.`pro_id` = `p`.`pro_id` AND `up`.`user_id` = :userId AND `p`.`remove` = 0 AND `t`.`remove` = 0 AND `p`.`pro_id` = :proId";
    api.queryData(sql,'SELECT',{
        userId : req.userId,
        proId : req.query.proId
    }).then(result =>{
        res.send({ msg: '查询商品列表成功', status: 1910, data: result,staticUrl:`${config.staticBaseUrl.url}${config.staticBaseUrl.base}/proImgs/` });
    }).catch(err =>{
        res.send({ msg: '查询商品列表失败', status: 1911 });
    })
}
//manage

//切换商品类型状态
module.exports = (req, res) => {
    // console.log('req.body=>', req.body);


    //根据userId和typeId查询类型是否存在
    api.findData('UserType', {
        userId: req.userId,
        typeId: req.body.typeId
    }).then(r => {
        // console.log(r)
        if (r.length > 0) {
            //根据typeId修改status
            api.updateData('Type', {
                status: req.body.status
            }, {
                typeId: req.body.typeId
            }).then(result => {
                res.send({ msg: '切换商品类型状态成功', status: 1080, data: { result, status: req.body.status } });
            }).catch(err => {
                console.log(err);
                res.send({ msg: '切换商品类型状态失败', status: 1081 });
            })
        } else {
            res.send({ msg: '切换商品类型状态失败', status: 1081 });
        }

    }).catch(error => {
        res.send({ msg: '切换商品类型状态失败', status: 1081 });
    })

    return;

}